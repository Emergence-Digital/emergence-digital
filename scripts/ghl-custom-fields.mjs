#!/usr/bin/env node
/**
 * Lists the GHL location's contact custom fields (name, key, type, ID), then
 * prints an `attributionFieldIds` block to paste into src/lib/lead-forms.ts.
 *
 *   npm run ghl:fields
 *
 * Reads GHL_PRIVATE_TOKEN and GHL_LOCATION_ID from .env.local (or the shell).
 * Needs the token's "View Custom Fields" scope (locations/customFields.readonly).
 */

const token = process.env.GHL_PRIVATE_TOKEN;
const locationId = process.env.GHL_LOCATION_ID;
if (!token || !locationId) {
  console.error("Set GHL_PRIVATE_TOKEN and GHL_LOCATION_ID in .env.local first (see .env.example).");
  process.exit(1);
}

// Attribution key → the GHL field key that a field with the SETUP.md name gets.
const ATTRIBUTION_FIELD_KEYS = {
  utm_source: "contact.utm_source",
  utm_medium: "contact.utm_medium",
  utm_campaign: "contact.utm_campaign",
  utm_term: "contact.utm_term",
  utm_content: "contact.utm_content",
  gclid: "contact.google_click_id", // GHL won't create contact.gclid
  fbclid: "contact.fbclid",
  referrer: "contact.referrer",
  landing_page: "contact.landing_page",
  conversion_page: "contact.conversion_page",
};

const response = await fetch(
  `https://services.leadconnectorhq.com/locations/${encodeURIComponent(locationId)}/customFields?model=contact`,
  { headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json" } },
);
if (!response.ok) {
  console.error(`GHL returned ${response.status}: ${(await response.text()).slice(0, 500)}`);
  process.exit(1);
}
const { customFields = [] } = await response.json();
customFields.sort((a, b) => a.name.localeCompare(b.name));

console.log(`\n${customFields.length} contact custom fields in location ${locationId}\n`);
const nameWidth = Math.min(48, Math.max(4, ...customFields.map((f) => f.name.length)));
const keyWidth = Math.min(48, Math.max(3, ...customFields.map((f) => f.fieldKey.length)));
console.log(`${"Name".padEnd(nameWidth)}  ${"Key".padEnd(keyWidth)}  ${"Type".padEnd(14)}  ID`);
for (const f of customFields) {
  const name = f.name.length > nameWidth ? `${f.name.slice(0, nameWidth - 1)}…` : f.name;
  const key = f.fieldKey.length > keyWidth ? `${f.fieldKey.slice(0, keyWidth - 1)}…` : f.fieldKey;
  console.log(`${name.padEnd(nameWidth)}  ${key.padEnd(keyWidth)}  ${f.dataType.padEnd(14)}  ${f.id}`);
}

const byKey = new Map(customFields.map((f) => [f.fieldKey, f]));
const missing = [];
console.log("\n// Paste into src/lib/lead-forms.ts:");
console.log("export const attributionFieldIds: Record<AttributionKey | \"conversion_page\", string> = {");
for (const [attrKey, fieldKey] of Object.entries(ATTRIBUTION_FIELD_KEYS)) {
  const field = byKey.get(fieldKey);
  if (!field) missing.push(fieldKey);
  console.log(`  ${attrKey}: "${field?.id ?? ""}",${field ? "" : ` // not found: create a field with key ${fieldKey}`}`);
}
console.log("};");
if (missing.length > 0) {
  console.log(`\n${missing.length} attribution field(s) not found. Create them in GHL (SETUP.md, step 3) and run this again.`);
}
