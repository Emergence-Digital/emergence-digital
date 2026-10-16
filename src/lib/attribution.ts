/**
 * First-touch attribution, stored in a first-party cookie for 30 days.
 *
 * <AttributionCapture /> (mounted in the root layout) calls captureFirstTouch()
 * on every full page load; it only writes when no cookie exists yet, so the
 * values describe how this browser first reached the site. <LeadForm /> reads
 * the cookie and sends it with each submission, and /api/lead maps each value to
 * a GHL contact custom field (IDs in src/lib/lead-forms.ts).
 */

export const ATTRIBUTION_COOKIE = "ed_attribution";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "referrer",
  "landing_page",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

const URL_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const satisfies readonly AttributionKey[];

// Query params that can carry personal details (e.g. booking prefill links).
// They're stripped from any URL we store or send to GHL as attribution.
const PERSONAL_PARAMS = ["first_name", "last_name", "name", "email", "phone"];

const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const MAX_VALUE_LENGTH = 500;

/** Keeps known keys with non-empty string values, trimmed and length-capped. Safe on client and server. */
export function sanitizeAttribution(input: unknown): Attribution {
  const out: Attribution = {};
  if (!input || typeof input !== "object") return out;
  for (const key of ATTRIBUTION_KEYS) {
    const value = (input as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) {
      out[key] = value.trim().slice(0, MAX_VALUE_LENGTH);
    }
  }
  return out;
}

/** Returns the URL as a string without any personal-detail query params. */
export function stripPersonalParams(url: string | URL): string {
  const clean = new URL(url);
  for (const param of PERSONAL_PARAMS) clean.searchParams.delete(param);
  return clean.toString();
}

function readCookie(): string | null {
  const prefix = `${ATTRIBUTION_COOKIE}=`;
  const match = document.cookie.split("; ").find((c) => c.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

/** Client only: the stored first-touch attribution, or {} if there is none. */
export function readAttribution(): Attribution {
  const raw = readCookie();
  if (!raw) return {};
  try {
    return sanitizeAttribution(JSON.parse(decodeURIComponent(raw)));
  } catch {
    return {};
  }
}

function externalReferrer(): string {
  if (!document.referrer) return "";
  try {
    return new URL(document.referrer).host === window.location.host ? "" : document.referrer;
  } catch {
    return "";
  }
}

/** Client only: stores this visit as the first touch unless one is already stored. */
export function captureFirstTouch(): void {
  if (readCookie() !== null) return;

  const url = new URL(window.location.href);
  const touch: Attribution = {};
  for (const key of URL_PARAM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) touch[key] = value;
  }
  const referrer = externalReferrer();
  if (referrer) touch.referrer = referrer;
  touch.landing_page = stripPersonalParams(url);

  const value = encodeURIComponent(JSON.stringify(sanitizeAttribution(touch)));
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${ATTRIBUTION_COOKIE}=${value}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax${secure}`;
}
