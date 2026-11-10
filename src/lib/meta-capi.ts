/**
 * Server-only Meta Conversions API client. Sends website events straight from
 * the server, so Meta still gets them when an ad blocker or browser privacy
 * setting stops the Pixel. The browser's Pixel sends the same event with the
 * same event ID, and Meta keeps one of the two.
 *
 * Personal details are normalised and SHA-256 hashed here, as Meta requires.
 * The IP address, user agent and the Pixel's _fbp/_fbc cookie values are sent
 * unhashed, which is what Meta expects for those.
 */

import "server-only";
import { createHash } from "node:crypto";
import { logLeadEvent } from "@/lib/ghl";
import { META_PIXEL_ID, metaPixelEnabled } from "@/lib/meta-pixel";

/** Graph API versions stay supported for about two years after release. */
const GRAPH_API_VERSION = "v24.0";
const REQUEST_TIMEOUT_MS = 5_000;

export interface MetaUser {
  email?: string;
  /** E.164, e.g. +61412345678. */
  phone?: string;
  firstName?: string;
  lastName?: string;
  /** Our own ID for the person: the GHL contact ID. */
  externalId?: string;
  ipAddress?: string;
  userAgent?: string;
  /** The Pixel's browser ID (_fbp cookie). */
  fbp?: string;
  /** The ad click ID (_fbc cookie, or built from an fbclid with fbcFromClickId). */
  fbc?: string;
}

export interface MetaServerEvent {
  /** A standard event name, e.g. "Lead". */
  eventName: string;
  /** Shared with the browser's Pixel event so Meta counts the pair once. */
  eventId: string;
  /** The page the event happened on. */
  eventSourceUrl: string;
  user: MetaUser;
  customData?: Record<string, string | number>;
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Trimmed and lowercased, then hashed; undefined when blank. */
function hashText(value: string | undefined): string | undefined {
  const normalised = value?.trim().toLowerCase();
  return normalised ? sha256(normalised) : undefined;
}

/** Meta's user_data, normalised and hashed per its rules. Blank values are left out. */
export function buildUserData(user: MetaUser): Record<string, string | string[]> {
  const phoneDigits = user.phone?.replace(/\D/g, ""); // country code included, no "+"
  const hashed = {
    em: hashText(user.email),
    ph: phoneDigits ? sha256(phoneDigits) : undefined,
    fn: hashText(user.firstName),
    ln: hashText(user.lastName),
    // Case-sensitive (GHL IDs are), so trimmed but not lowercased.
    external_id: user.externalId?.trim() ? sha256(user.externalId.trim()) : undefined,
  };
  const plain = {
    client_ip_address: user.ipAddress,
    client_user_agent: user.userAgent,
    fbp: user.fbp,
    fbc: user.fbc,
  };

  const data: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(hashed)) if (value) data[key] = [value];
  for (const [key, value] of Object.entries(plain)) if (value?.trim()) data[key] = value.trim();
  return data;
}

/** An fbc value from an ad click ID, for when the Pixel didn't set the _fbc cookie (e.g. it was blocked). */
export function fbcFromClickId(fbclid: string): string {
  return `fb.1.${Date.now()}.${fbclid}`;
}

/** Sends one website event to Meta. Never throws: the outcome is logged as a lead.meta_* line. */
export async function sendMetaEvent(event: MetaServerEvent): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  const log = { eventName: event.eventName, eventId: event.eventId };

  if (!metaPixelEnabled || !token) {
    // Neither set means Meta isn't in use, which needs no log line.
    if (metaPixelEnabled || token) {
      logLeadEvent("warn", "lead.meta_skipped", { ...log, missing: token ? "NEXT_PUBLIC_META_PIXEL_ID" : "META_CAPI_ACCESS_TOKEN" });
    }
    return;
  }

  const testEventCode = process.env.META_TEST_EVENT_CODE?.trim();
  const body = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: buildUserData(event.user),
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
    access_token: token,
  };

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const result: { events_received?: number; error?: { message?: string; code?: number; fbtrace_id?: string } } =
      await response.json().catch(() => ({}));

    if (!response.ok) {
      logLeadEvent("error", "lead.meta_failed", {
        ...log,
        status: response.status,
        code: result.error?.code,
        detail: result.error?.message ?? "",
        fbtraceId: result.error?.fbtrace_id,
      });
      return;
    }
    logLeadEvent("info", "lead.meta_sent", { ...log, eventsReceived: result.events_received, test: Boolean(testEventCode) });
  } catch (error) {
    logLeadEvent("error", "lead.meta_failed", { ...log, status: 0, detail: String(error) });
  }
}
