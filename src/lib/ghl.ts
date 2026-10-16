/**
 * Server-only GoHighLevel (LeadConnector) API v2 client for lead capture.
 *
 * Its only job is to get a clean, tagged, attributed contact into GHL.
 * Pipelines, opportunities and follow-ups belong in GHL workflows, triggered
 * by the tags applied here.
 */

import "server-only";

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RETRY_DELAY_MS = 3_000;

export class GhlError extends Error {
  constructor(
    readonly step: string,
    /** HTTP status from GHL; 0 for config, network or timeout errors. */
    readonly status: number,
    readonly detail: string,
  ) {
    super(`GHL ${step} failed (${status || "no response"}): ${detail}`);
    this.name = "GhlError";
  }
}

/** One JSON line per event, so Vercel's log search can filter on "lead.". */
export function logLeadEvent(level: "info" | "warn" | "error", event: string, data: Record<string, unknown>) {
  console[level](JSON.stringify({ event, ...data }));
}

/** "jane.citizen@acme.com" → "j***@acme.com": enough to find the contact, without the full address in logs. */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  return domain ? `${user.slice(0, 1)}***@${domain}` : "***";
}

function credentials() {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    throw new GhlError("config", 0, "GHL_PRIVATE_TOKEN or GHL_LOCATION_ID is not set");
  }
  return { token, locationId };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function retryDelayMs(response: Response): number {
  const seconds = Number(response.headers.get("retry-after"));
  return Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds * 1000, MAX_RETRY_DELAY_MS) : 1000;
}

/** Calls GHL, retrying once on 429, 5xx or a network error/timeout. */
async function ghlRequest<T>(step: string, method: "POST" | "DELETE", path: string, body: unknown): Promise<T> {
  const { token } = credentials();

  for (let attempt = 1; ; attempt++) {
    const canRetry = attempt === 1;
    let response: Response;
    try {
      response = await fetch(`${GHL_BASE_URL}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_API_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      if (canRetry) {
        await sleep(500);
        continue;
      }
      throw new GhlError(step, 0, error instanceof Error ? error.message : String(error));
    }

    if (response.ok) return (await response.json().catch(() => ({}))) as T;

    const detail = (await response.text().catch(() => "")).slice(0, 1000);
    if (canRetry && (response.status === 429 || response.status >= 500)) {
      await sleep(retryDelayMs(response));
      continue;
    }
    throw new GhlError(step, response.status, detail);
  }
}

export interface GhlLead {
  formId: string;
  formName: string;
  /** The page the form was submitted from. */
  pageUrl: string;
  /** From the server-side form config, never the client. */
  tags: readonly string[];
  contact: {
    firstName: string;
    lastName?: string;
    email: string;
    /** E.164. */
    phone?: string;
    companyName?: string;
    source: string;
    customFields: { id: string; field_value: string }[];
  };
  /** Free-text message and unmapped extra answers. A note is only added when this has entries. */
  noteSections: { label: string; value: string }[];
}

interface UpsertResponse {
  new?: boolean;
  contact?: { id?: string };
}

async function upsertContact(locationId: string, contact: GhlLead["contact"]) {
  const result = await ghlRequest<UpsertResponse>("upsert", "POST", "/contacts/upsert", {
    locationId,
    ...contact,
  });
  const contactId = result.contact?.id;
  if (!contactId) throw new GhlError("upsert", 200, "response had no contact.id");
  return { contactId, isNew: result.new === true };
}

function buildNote(lead: GhlLead, sections: GhlLead["noteSections"]): string {
  return [
    `Website form: ${lead.formName}`,
    `Page: ${lead.pageUrl || "(unknown)"}`,
    ...sections.map(({ label, value }) => `\n${label}\n${value}`),
  ].join("\n");
}

/**
 * Upserts the contact, re-applies the form's tags, and adds a note when there's
 * something to say. Throws GhlError if the contact or its tags couldn't be
 * saved; a failed tag removal or note is logged and skipped.
 */
export async function pushLeadToGhl(lead: GhlLead): Promise<{ contactId: string; isNew: boolean }> {
  const { locationId } = credentials();
  const noteSections = [...lead.noteSections];
  const logContext = { formId: lead.formId, email: maskEmail(lead.contact.email) };

  let upserted: { contactId: string; isNew: boolean };
  try {
    upserted = await upsertContact(locationId, lead.contact);
  } catch (error) {
    // Our E.164 check is looser than GHL's. Rather than lose the lead over a
    // phone number GHL won't accept, save the contact without it and keep the
    // number in the note.
    const phoneRejected =
      error instanceof GhlError && (error.status === 400 || error.status === 422) && /phone/i.test(error.detail);
    if (!lead.contact.phone || !phoneRejected) throw error;
    logLeadEvent("warn", "lead.phone_rejected", { ...logContext, detail: error.detail });
    noteSections.unshift({ label: "Phone (not accepted by GHL's phone check)", value: lead.contact.phone });
    upserted = await upsertContact(locationId, { ...lead.contact, phone: undefined });
  }
  const { contactId, isNew } = upserted;
  const tagBody = { tags: [...lead.tags] };

  // GHL's "Contact Tag" trigger only fires when a tag is newly added, so take
  // the tags off a returning contact first. New contacts can't have them yet.
  if (!isNew) {
    try {
      await ghlRequest("remove-tags", "DELETE", `/contacts/${contactId}/tags`, tagBody);
    } catch (error) {
      logLeadEvent("warn", "lead.remove_tags_failed", { ...logContext, contactId, error: String(error) });
    }
  }

  await ghlRequest("add-tags", "POST", `/contacts/${contactId}/tags`, tagBody);

  if (noteSections.length > 0) {
    try {
      await ghlRequest("add-note", "POST", `/contacts/${contactId}/notes`, { body: buildNote(lead, noteSections) });
    } catch (error) {
      logLeadEvent("warn", "lead.note_failed", { ...logContext, contactId, error: String(error) });
    }
  }

  return { contactId, isNew };
}
