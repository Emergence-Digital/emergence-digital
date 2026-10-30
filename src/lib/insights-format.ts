// Formatting shared by the Insights pages and their client graphics. Kept apart from insights-data.ts so the
// graphics don't pull the post copy into the browser bundle.

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Australia/Melbourne",
});

const dateTimeFormat = new Intl.DateTimeFormat("en-AU", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Australia/Melbourne",
});

/** "3 Nov 2026", in Melbourne time. */
export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

/** "Tue, 3 Nov, 9:00 am", in Melbourne time. */
export const formatDateTime = (iso: string) => dateTimeFormat.format(new Date(iso));

/** 18.44 → "0:18". */
export function formatVideoTime(seconds: number) {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Straight quotes and apostrophes to typographic ones: "a" → “a”, it's → it’s. */
export function smartQuotes(text: string) {
  return text
    .replace(/(^|[\s(\[—–-])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(^|[\s(\[—–-])'/g, "$1‘")
    .replace(/'/g, "’");
}

/**
 * A figure as a screen reader should say it: "55.4M" → "55.4 million", "$192B" → "$192 billion", "5×" → "5 times",
 * "−22.4%" → "down 22.4%", "+8.7%" → "up 8.7%", "~50%" → "about 50%", "6,000+" → "more than 6,000".
 */
export function spoken(display: string) {
  return display
    .replace(/^[−-]\s*/, "down ")
    .replace(/^\+\s*/, "up ")
    .replace(/^~\s*/, "about ")
    .replace(/^([\d,.]+)\+$/, "more than $1")
    .replace(/(\d)\s*M\b/g, "$1 million")
    .replace(/(\d)\s*B\b/g, "$1 billion")
    .replace(/(\d)\s*×/g, "$1 times");
}
