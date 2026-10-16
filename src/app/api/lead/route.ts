/**
 * POST /api/lead: takes a <LeadForm /> submission and pushes it into GHL.
 *
 * Body: { formId, fields, attribution, pageUrl, website, elapsedMs }
 *   website    honeypot; must be empty
 *   elapsedMs  ms between the form mounting and submitting (measured in the browser)
 *
 * Responses: 200 { ok: true } · 400 { ok: false, errors } for field problems ·
 * 400/500/502 { ok: false, error } otherwise, with the detail in the server log.
 */

import { NextResponse } from "next/server";
import { attributionFieldIds, getLeadForm, isStandardField, type LeadFormConfig } from "@/lib/lead-forms";
import { toE164, validateLead, type LeadValues } from "@/lib/lead-validation";
import { ATTRIBUTION_KEYS, sanitizeAttribution, stripPersonalParams } from "@/lib/attribution";
import { GhlError, logLeadEvent, maskEmail, pushLeadToGhl, type GhlLead } from "@/lib/ghl";

/** Up to 4 GHL calls, each with one retry and a 10s timeout. */
export const maxDuration = 30;

const MIN_FILL_TIME_MS = 3000;
const GENERIC_ERROR =
  "Sorry, we couldn't send your details just now. Please try again, or email contact@emergencedigital.com.au.";

interface LeadRequestBody {
  formId?: unknown;
  fields?: unknown;
  attribution?: unknown;
  pageUrl?: unknown;
  website?: unknown;
  elapsedMs?: unknown;
}

const json = (body: object, status = 200) => NextResponse.json(body, { status });

/** Only the form's own fields, as trimmed strings. */
function pickValues(form: LeadFormConfig, input: unknown): LeadValues {
  const values: LeadValues = {};
  const raw = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  for (const field of form.fields) {
    const value = raw[field.name];
    values[field.name] = typeof value === "string" ? value.trim() : "";
  }
  return values;
}

function cleanPageUrl(input: unknown): string {
  if (typeof input !== "string") return "";
  try {
    const url = new URL(input);
    return url.protocol === "https:" || url.protocol === "http:" ? stripPersonalParams(url).slice(0, 500) : "";
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  let body: LeadRequestBody;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const formId = typeof body.formId === "string" ? body.formId : "";
  const form = getLeadForm(formId);
  if (!form) {
    logLeadEvent("warn", "lead.unknown_form", { formId: formId.slice(0, 100) });
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Spam: a filled honeypot, or a submission faster than a person could manage.
  // Answer with a normal success so bots get no signal to adapt to.
  const honeypotFilled = typeof body.website === "string" && body.website.trim() !== "";
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (honeypotFilled || elapsedMs < MIN_FILL_TIME_MS) {
    logLeadEvent("info", "lead.spam_dropped", {
      formId,
      reason: honeypotFilled ? "honeypot" : "too_fast",
      elapsedMs,
    });
    return json({ ok: true });
  }

  const values = pickValues(form, body.fields);
  const errors = validateLead(form, values);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 400);

  const pageUrl = cleanPageUrl(body.pageUrl);
  const attribution = sanitizeAttribution(body.attribution);

  const customFields: GhlLead["contact"]["customFields"] = [];
  for (const key of ATTRIBUTION_KEYS) {
    const id = attributionFieldIds[key];
    const value = attribution[key];
    if (id && value) customFields.push({ id, field_value: value });
  }
  if (attributionFieldIds.conversion_page && pageUrl) {
    customFields.push({ id: attributionFieldIds.conversion_page, field_value: pageUrl });
  }

  // Extra (non-standard) fields go to their GHL custom field, or into the note.
  const noteSections: GhlLead["noteSections"] = [];
  for (const field of form.fields) {
    const value = values[field.name];
    if (!value || isStandardField(field.name)) continue;
    if (field.ghlFieldId) customFields.push({ id: field.ghlFieldId, field_value: value });
    else noteSections.push({ label: field.label, value });
  }
  if (values.message) noteSections.push({ label: "Message", value: values.message });

  const lead: GhlLead = {
    formId,
    formName: form.name,
    pageUrl,
    tags: form.tags,
    contact: {
      firstName: values.firstName,
      lastName: values.lastName || undefined,
      email: values.email.toLowerCase(),
      phone: values.phone ? (toE164(values.phone) ?? undefined) : undefined,
      companyName: values.company || undefined,
      source: `Website form: ${form.name}`,
      customFields,
    },
    noteSections,
  };

  try {
    const { contactId, isNew } = await pushLeadToGhl(lead);
    logLeadEvent("info", "lead.ok", { formId, contactId, isNew });
    return json({ ok: true });
  } catch (error) {
    logLeadEvent("error", "lead.ghl_failed", {
      formId,
      email: maskEmail(lead.contact.email),
      ...(error instanceof GhlError
        ? { step: error.step, status: error.status, detail: error.detail }
        : { detail: String(error) }),
    });
    const isConfigError = error instanceof GhlError && error.step === "config";
    return json({ ok: false, error: GENERIC_ERROR }, isConfigError ? 500 : 502);
  }
}
