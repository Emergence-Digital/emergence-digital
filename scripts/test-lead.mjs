#!/usr/bin/env node
/**
 * End-to-end check of /api/lead: submits a test lead (and a bot submission that
 * should be dropped), then, if GHL credentials are available locally, looks the
 * contact up in GHL and checks its tags, custom fields and note.
 *
 *   node --env-file-if-exists=.env.local scripts/test-lead.mjs <base-url> [options]
 *   npm run test:lead -- https://emergence-digital-git-xyz.vercel.app
 *
 * Options:
 *   --email <address>  Contact email (default leadtest+<timestamp>@example.com).
 *                      Use a plus-address on your own mailbox to receive the workflow's emails.
 *   --form <formId>    Form to submit (default example-lead)
 *   --tag <tag>        Tag to expect (default web:<formId>)
 *   --fields <json>    Extra/override field values, e.g. '{"focus":"Not sure yet"}'
 *
 * Env: GHL_PRIVATE_TOKEN + GHL_LOCATION_ID enable the GHL checks (the token needs
 * "View Contacts"). VERCEL_AUTOMATION_BYPASS_SECRET gets past Vercel Deployment
 * Protection on preview URLs.
 */

const args = process.argv.slice(2);
const options = {};
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) options[args[i].slice(2)] = args[++i];
  else positional.push(args[i]);
}
const baseUrl = positional[0];
const option = (name) => options[name];

if (!baseUrl) {
  console.error("Usage: node scripts/test-lead.mjs <base-url> [--email x] [--form id] [--tag t] [--fields json]");
  process.exit(1);
}

const stamp = Date.now();
const formId = option("form") ?? "example-lead";
const expectedTag = (option("tag") ?? `web:${formId}`).toLowerCase();
const email = (option("email") ?? `leadtest+${stamp}@example.com`).toLowerCase();
const botEmail = `leadtest-bot+${stamp}@example.com`;
const origin = baseUrl.replace(/\/$/, "");

const fields = {
  firstName: "Lead",
  lastName: `Test ${stamp}`,
  email,
  phone: "0491 570 156", // ACMA-reserved fictional number, so a workflow SMS reaches no one
  company: "Lead Test Pty Ltd",
  focus: "Not sure yet",
  message: `Test submission from scripts/test-lead.mjs at ${new Date(stamp).toISOString()}`,
  ...JSON.parse(option("fields") ?? "{}"),
};
const attribution = {
  utm_source: "test-script",
  utm_medium: "cli",
  utm_campaign: "lead-capture-check",
  utm_term: "lead test",
  utm_content: "v1",
  gclid: `test-gclid-${stamp}`,
  referrer: "https://www.google.com/",
  landing_page: `${origin}/lp/${formId}?utm_source=test-script`,
};

let failures = 0;
const pass = (msg) => console.log(`  PASS  ${msg}`);
const fail = (msg) => {
  failures++;
  console.log(`  FAIL  ${msg}`);
};

async function submit(body) {
  const headers = { "Content-Type": "application/json" };
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    headers["x-vercel-protection-bypass"] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  }
  const response = await fetch(`${origin}/api/lead`, { method: "POST", headers, body: JSON.stringify(body) });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 300) };
  }
  return { status: response.status, json };
}

console.log(`\nPOST ${origin}/api/lead  (form ${formId})\n`);

const bot = await submit({
  formId,
  fields: { ...fields, email: botEmail },
  attribution,
  pageUrl: `${origin}/lp/${formId}`,
  website: "https://spam.example",
  elapsedMs: 5000,
});
if (bot.status === 200 && bot.json.ok === true) pass("bot submission (honeypot filled) got a fake { ok: true }");
else fail(`bot submission: expected 200 { ok: true }, got ${bot.status} ${JSON.stringify(bot.json)}`);

const real = await submit({
  formId,
  fields,
  attribution,
  // The run's stamp goes in the page URL as well as the message, so the note
  // can be found for forms without a message field (e.g. book-call).
  pageUrl: `${origin}/lp/${formId}?utm_source=test-script&test_run=${stamp}`,
  website: "",
  elapsedMs: 8000,
});
if (real.status === 200 && real.json.ok === true) pass(`test lead accepted (${email})`);
else {
  fail(`test lead: expected 200 { ok: true }, got ${real.status} ${JSON.stringify(real.json)}`);
  if (real.status === 401 || real.status === 403) {
    console.log("        Preview protected? Set VERCEL_AUTOMATION_BYPASS_SECRET (Vercel → Settings → Deployment Protection).");
  }
  if (real.status >= 500) console.log("        Check the Vercel function logs for a lead.ghl_failed event.");
  process.exit(1);
}

const token = process.env.GHL_PRIVATE_TOKEN;
const locationId = process.env.GHL_LOCATION_ID;
if (!token || !locationId) {
  console.log("\nGHL_PRIVATE_TOKEN / GHL_LOCATION_ID not set, so skipping the GHL checks.");
  console.log(`Look for ${email} in GHL → Contacts and check for the tag "${expectedTag}".\n`);
  process.exit(failures ? 1 : 0);
}

async function ghl(path) {
  const response = await fetch(`https://services.leadconnectorhq.com${path}`, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`GET ${path.split("?")[0]} → ${response.status} ${(await response.text()).slice(0, 200)}`);
  return response.json();
}
const findContact = async (address) =>
  (await ghl(`/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(address)}`)).contact;

console.log("\nChecking GHL…\n");
await new Promise((resolve) => setTimeout(resolve, 2000));

try {
  const found = await findContact(email);
  if (!found?.id) {
    fail(`no GHL contact found for ${email}`);
    process.exit(1);
  }
  const { contact } = await ghl(`/contacts/${found.id}`);
  pass(`contact ${contact.id}: ${contact.firstName} ${contact.lastName}, ${contact.phone ?? "no phone"}`);

  if (contact.phone === "+61491570156") pass("phone normalised to E.164 (+61491570156)");
  else fail(`phone: expected +61491570156, got ${contact.phone}`);

  if ((contact.tags ?? []).includes(expectedTag)) pass(`tagged "${expectedTag}"`);
  else fail(`tag "${expectedTag}" missing; tags are ${JSON.stringify(contact.tags)}`);

  console.log(`        source: ${contact.source}`);

  let names = new Map();
  try {
    const { customFields = [] } = await ghl(`/locations/${locationId}/customFields?model=contact`);
    names = new Map(customFields.map((f) => [f.id, f.name]));
  } catch {
    // Token without "View Custom Fields": show IDs instead of names.
  }
  const values = (contact.customFields ?? []).filter((f) => f.value !== undefined && f.value !== "");
  if (values.some((f) => String(f.value) === "test-script")) pass("utm_source written to a custom field");
  else fail("utm_source not found in any custom field (are attributionFieldIds filled in and deployed?)");
  for (const f of values) console.log(`        ${names.get(f.id) ?? f.id}: ${f.value}`);

  const { notes = [] } = await ghl(`/contacts/${contact.id}/notes`);
  const note = notes.find((n) => n.body?.includes(String(stamp)));
  if (note) pass("note added:");
  else fail("note for this test run not found");
  if (note) console.log(note.body.replace(/^/gm, "        "));

  const botContact = await findContact(botEmail);
  if (!botContact?.id) pass("bot submission did not create a contact");
  else fail(`bot submission created contact ${botContact.id}`);
} catch (error) {
  fail(String(error.message ?? error));
}

console.log(failures ? `\n${failures} check(s) failed.\n` : "\nAll checks passed.\n");
process.exit(failures ? 1 : 0);
