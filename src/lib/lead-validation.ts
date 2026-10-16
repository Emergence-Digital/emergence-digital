/**
 * Lead form validation, shared by <LeadForm /> (instant feedback) and
 * /api/lead (the check that counts).
 */

import type { LeadField, LeadFormConfig } from "@/lib/lead-forms";

export type LeadValues = Record<string, string>;
export type FieldErrors = Record<string, string>;

const ALWAYS_REQUIRED = new Set(["firstName", "email"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LENGTH = { textarea: 5000, other: 200 };

// After "+61": mobiles and landlines (9 digits), 1300/1800 numbers, 13 xx xx numbers.
const AU_NUMBER = /^\+61(?:[2-478]\d{8}|1[38]00\d{6}|13\d{4})$/;
const INTERNATIONAL_NUMBER = /^\+[1-9]\d{7,14}$/;

/**
 * Normalises a phone number to E.164, assuming Australia (+61) when no country
 * code is given. Returns null if the result isn't a plausible number.
 *
 *   "0412 345 678" → "+61412345678"     "(03) 9123 4567" → "+61391234567"
 *   "+61 (0)412 345 678" → "+61412345678"     "0011 64 21 123 4567" → "+64211234567"
 */
export function toE164(input: string): string | null {
  const compact = input.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");
  if (!compact || compact.lastIndexOf("+") > 0) return null;

  let e164: string;
  if (compact.startsWith("+")) e164 = compact;
  else if (compact.startsWith("0011")) e164 = `+${compact.slice(4)}`; // AU international prefix
  else if (compact.startsWith("00")) e164 = `+${compact.slice(2)}`; // international prefix used elsewhere
  else if (compact.startsWith("0")) e164 = `+61${compact.slice(1)}`; // AU trunk prefix
  else if (compact.startsWith("61") && compact.length === 11) e164 = `+${compact}`;
  else e164 = `+61${compact}`;

  if (e164.startsWith("+61")) return AU_NUMBER.test(e164) ? e164 : null;
  return INTERNATIONAL_NUMBER.test(e164) ? e164 : null;
}

export function isRequired(field: LeadField): boolean {
  return Boolean(field.required) || ALWAYS_REQUIRED.has(field.name);
}

/** One field's error message, or null if it's valid. */
export function validateLeadField(field: LeadField, rawValue: string | undefined): string | null {
  const value = (rawValue ?? "").trim();
  if (!value) {
    if (!isRequired(field)) return null;
    return field.type === "select" ? "Please choose an option." : `${field.label} is required.`;
  }
  const maxLength = field.type === "textarea" ? MAX_LENGTH.textarea : MAX_LENGTH.other;
  if (value.length > maxLength) return `${field.label} is too long.`;
  if (field.type === "email" && !EMAIL_PATTERN.test(value)) return "Please enter a valid email address.";
  if (field.type === "tel" && !toE164(value)) return "Please enter a valid phone number.";
  if (field.type === "select" && !field.options?.includes(value)) return "Please choose one of the options.";
  return null;
}

/** Errors keyed by field name; empty when the values are valid. */
export function validateLead(form: LeadFormConfig, values: LeadValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of form.fields) {
    const error = validateLeadField(field, values[field.name]);
    if (error) errors[field.name] = error;
  }
  // Belt and braces: a form config that leaves these out can't produce a contact.
  for (const name of ALWAYS_REQUIRED) {
    if (!form.fields.some((f) => f.name === name)) errors[name] = `The form is missing its ${name} field.`;
  }
  return errors;
}
