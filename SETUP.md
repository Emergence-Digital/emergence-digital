# Lead capture → GoHighLevel: setup

Funnel pages on this site collect leads with `<LeadForm formId="…" />`. Each
submission goes to `/api/lead`, which puts a clean, tagged, attributed contact
into GHL. **GHL workflows do everything after that**: opportunities,
pipelines, follow-ups and notifications. There's no pipeline logic in code.

```
Visitor lands ─▶ AttributionCapture stores first touch in the "ed_attribution" cookie (30 days)
      │
      ▼
<LeadForm> ─POST─▶ /api/lead
                     1. validate fields (config in src/lib/lead-forms.ts)
                     2. spam check: honeypot empty, form open ≥ 3s (bots get a fake { ok: true })
                     3. POST /contacts/upsert           name, email, E.164 phone, company, source, attribution fields
                     4. DELETE /contacts/{id}/tags      returning contacts only, so the tag is "new" again
                     5. POST /contacts/{id}/tags        tags from the server-side config, never the browser
                     6. POST /contacts/{id}/notes       message + unmapped answers, form name, page URL
                         │
                         ▼
               GHL workflow: "Contact Tag" trigger ─▶ opportunity, follow-ups…
```

| File | What it is |
|---|---|
| `src/lib/lead-forms.ts` | **The config.** Every form, its tags, fields and success step; attribution field IDs; calendar IDs |
| `src/app/api/lead/route.ts` | The API route |
| `src/lib/ghl.ts` | Server-only GHL client (retry, logging) |
| `src/components/sections/LeadForm.tsx` | The form component |
| `src/components/sections/CalendarEmbed.tsx` | GHL booking widget with prefill |
| `src/components/layout/AttributionCapture.tsx` + `src/lib/attribution.ts` | First-touch cookie |
| `src/app/lp/example-lead/` | Example funnel (`/lp/example-lead`) and its booking step (`/book`) |
| `scripts/ghl-custom-fields.mjs` | Prints custom field names and IDs (`npm run ghl:fields`) |
| `scripts/test-lead.mjs` | End-to-end test (`npm run test:lead -- <url>`) |

---

## 1. Create the Private Integration token

In the Emergence sub-account (location `mdQf5usTFVR2pg8Zm9RJ`):

1. **Settings → Private Integrations → Create new Integration.** Name it something like "emergencedigital.com.au lead forms".
2. Give it only these scopes:

   | Scope | Why |
   |---|---|
   | View Contacts (`contacts.readonly`) | `test-lead.mjs` looks the test contact up |
   | Edit Contacts (`contacts.write`) | Upsert, tags and notes |
   | View Custom Fields (`locations/customFields.readonly`) | `npm run ghl:fields` |

3. Copy the token (it's shown once).
4. Use a **new** token for the website rather than reusing Barney's, so either can be rotated or revoked on its own. GHL recommends rotating these tokens every 90 days. "Rotate and expire later" keeps the old one working for 7 days while you update Vercel.

## 2. Set the environment variables

| Name | Value |
|---|---|
| `GHL_PRIVATE_TOKEN` | The token from step 1 |
| `GHL_LOCATION_ID` | `mdQf5usTFVR2pg8Zm9RJ` (Settings → Business Profile) |

- **Vercel:** Project → Settings → Environment Variables. Add both to **Production** and **Preview**, then redeploy. Never prefix them with `NEXT_PUBLIC_`, or Next.js would ship them to the browser.
- **Local:** copy `.env.example` to `.env.local` and fill them in.

Missing variables don't break the site. `/api/lead` logs `lead.ghl_failed` with `step: "config"` and visitors see a "please try again or email us" message.

## 3. Create the attribution custom fields

**Settings → Custom Fields → Add Field**, type **Single Line**, model **Contact**. Putting them in a folder such as "Web Attribution" keeps them together. Use these exact names so GHL generates the keys the lookup script expects:

| Field name | Generated key | Holds |
|---|---|---|
| UTM Source | `contact.utm_source` | `utm_source` on the first visit |
| UTM Medium | `contact.utm_medium` | |
| UTM Campaign | `contact.utm_campaign` | |
| UTM Term | `contact.utm_term` | |
| UTM Content | `contact.utm_content` | |
| Google Click ID | `contact.google_click_id` | Google Ads click ID. GHL won't create a field called "GCLID" (the key is taken), so use this name |
| FBCLID | `contact.fbclid` | Meta click ID |
| Referrer | `contact.referrer` | External site that sent them (blank for direct) |
| Landing Page | `contact.landing_page` | First page they hit, with its query string |
| Conversion Page | `contact.conversion_page` | Page the form was submitted from |

Then fill in the IDs:

```bash
npm run ghl:fields
```

It lists every contact custom field and prints an `attributionFieldIds` block. Paste that block over the one in `src/lib/lead-forms.ts`. If a key came out differently (for example because GHL already had a field with that name), copy the ID from the table by hand. A blank ID just means that value isn't sent.

## 4. Check the duplicate-contact setting

**Settings → Business Profile → General → Allow Duplicate Contact** should be **off**, so `/contacts/upsert` updates the existing contact instead of creating a second one. If you turn it on, set the priority to **Email** first.

## 5. Tag naming convention

- One tag per form: **`web:{formId}`**, e.g. `web:example-lead`, `web:free-roadmap`.
- Lowercase only (GHL stores tags lowercase).
- Tags are applied from `tags` in the form's config. The browser only sends the `formId`.
- To run something for *every* web lead (e.g. one internal notification), give each form a second shared tag such as `web:lead`.
- On a repeat submission the route **removes then re-adds** the form's tags, because GHL's "Contact Tag" trigger only fires when a tag is newly added. That also fires any "tag removed" triggers for those tags, so don't build workflows on removing `web:*` tags.
- These tags also keep web leads out of Barney's cold prospecting: `centurion.py select` skips any company whose contact has a tag outside its cold-tag list.

## 6. Build the workflow (one per form)

**Automation → Workflows → Create Workflow → Start from scratch.**

1. **Trigger:** *Contact Tag*, with the filter *Tag Added* = `web:example-lead`.
2. **Settings tab:** turn on **Allow Re-entry**, so a contact who submits again goes through again.
3. **Actions**, for example:
   - **Create/Update Opportunity:** pick the pipeline and stage, opportunity name `{{contact.name}}`, source `{{contact.source}}`. Leave *Allow duplicate opportunities* **off**, so a repeat submission updates the existing opportunity rather than adding another.
   - **Internal Notification** (email or SMS to you), including `{{contact.utm_source}}` and the other attribution fields if useful.
   - Follow-up emails or SMS, with **Wait** steps between them.
   - A **Goal event** for *Appointment booked*, so follow-ups stop once they book.
4. **Save** and **Publish** the workflow (drafts don't fire).

Bookings from the calendar embed are normal GHL appointments, so use the calendar's own *Appointment Status* triggers for anything that happens after a booking.

## 7. Test it

**Locally** (needs `.env.local`):

```bash
npm run dev
```

```bash
npm run test:lead -- http://localhost:3000
```

**On a Vercel preview:** push the branch, copy the preview URL from the PR or the Vercel dashboard, then:

```bash
npm run test:lead -- https://<preview-url> --email you+leadtest1@yourdomain.com.au
```

The script:
1. sends a bot submission (honeypot filled) and expects a fake `{ ok: true }`
2. sends a real test lead and expects `{ ok: true }`
3. if `GHL_PRIVATE_TOKEN`/`GHL_LOCATION_ID` are set locally: finds the contact in GHL and checks the E.164 phone, the `web:example-lead` tag, that `utm_source` landed in a custom field, and the note. It also checks that the bot didn't create a contact.

Use a plus-address on your own mailbox with `--email` to receive the workflow's emails. The default `@example.com` address goes nowhere. The test phone, 0491 570 156, is reserved by ACMA for fiction, so workflow SMS can't reach a real person. Delete test contacts in GHL afterwards.

If the preview has **Deployment Protection** on, the script gets a 401. Create a bypass secret (Vercel → Settings → Deployment Protection → Protection Bypass for Automation) and add it to `.env.local` as `VERCEL_AUTOMATION_BYPASS_SECRET`.

Or with curl:

```bash
curl -i -X POST "https://<preview-url>/api/lead" -H "Content-Type: application/json" -H "x-vercel-protection-bypass: $VERCEL_AUTOMATION_BYPASS_SECRET" -d '{"formId":"example-lead","fields":{"firstName":"Curl","lastName":"Test","email":"leadtest+curl1@example.com","phone":"0491 570 156","company":"Lead Test Pty Ltd","focus":"Not sure yet","message":"Sent with curl"},"attribution":{"utm_source":"curl","utm_medium":"cli"},"pageUrl":"https://<preview-url>/lp/example-lead","website":"","elapsedMs":8000}'
```

Expect `HTTP/2 200` and `{"ok":true}`, then check GHL for the contact.

## Adding a funnel

1. Add an entry to `leadForms` in `src/lib/lead-forms.ts`: `name`, `tags: ["web:<formId>"]`, `fields`, `submitLabel`, `success`.
   - Fields: use `standardFields.*` for first name, last name, email, phone, company and message. First name and email are always required. Add your own `text`, `email`, `tel`, `textarea` or `select` fields too.
   - To save an extra field's answer to a GHL custom field, set its `ghlFieldId` (from `npm run ghl:fields`). Without one, the answer goes into the contact note.
   - `success`: `{ type: "message", heading, body }` shows an inline thank-you. `{ type: "redirect", url, prefillBooking: true }` sends them to a booking page with `first_name`, `last_name`, `email` and `phone` in the URL. The GHL booking widget prefills from those (checked on a live widget).
2. Copy `src/app/lp/example-lead/` to `src/app/lp/<slug>/`, change the copy and the `formId`. For a different calendar, add it to `bookingCalendarIds`.
3. Build the workflow for `web:<formId>` (step 6).
4. Test with `npm run test:lead -- <url> --form <formId> --fields '{"yourField":"value"}'`.

Funnel pages are `noindex` and aren't in the sitemap.

## Troubleshooting

`/api/lead` writes one JSON log line per event. In Vercel → Logs, search for `lead.`:

| Event | Meaning |
|---|---|
| `lead.ok` | Contact saved and tagged (`contactId`, `isNew`) |
| `lead.spam_dropped` | Honeypot filled or submitted in under 3 s (`reason`, `elapsedMs`) |
| `lead.ghl_failed` | Contact or tags not saved; the visitor saw the error message. `step` + `status` + `detail` give GHL's response. `401`: token invalid, expired or rotated. `403`: missing scope or wrong location. `422`: GHL rejected a value |
| `lead.remove_tags_failed` | Non-fatal; the workflow may not re-fire for that returning contact |
| `lead.note_failed` | Non-fatal; the contact and tags were saved |
| `lead.phone_rejected` | GHL refused the phone number; the contact was saved without it and the number is in the note |
| `lead.unknown_form` | A request named a `formId` that isn't in the config |

GHL calls time out after 10 s and are retried once on a 429, a 5xx or a network error. Emails in logs are masked (`j***@acme.com`).

## Things to know

- **Upsert overwrites.** A returning contact's name, company, phone and attribution fields are replaced with the latest submission's values. Blank values are never sent, so nothing is wiped. Attribution is "first touch *in the browser they converted from*", not first touch across all their visits. If you want the very first value kept forever, a GHL workflow can copy it into a separate field only when that field is empty.
- **The cookie.** `ed_attribution` is a first-party cookie (30 days, `SameSite=Lax`) holding UTMs, click IDs, the referrer and the landing page. Mention it in the privacy policy.
- **Booking prefill puts personal details in the URL.** The booking page removes them from the address bar once loaded, so they don't sit in browser history, but they still reach Vercel's request logs and GHL. If you add analytics later, exclude query strings on `/lp/*/book`.
- **Spam protection is basic** (honeypot + 3-second check), which stops form-filling bots but not someone scripting the API. If that becomes a problem, add a Vercel Firewall rate limit on `/api/lead`, or Cloudflare Turnstile.
- **Site chrome.** Funnel pages use the site's normal navbar and footer. A distraction-free funnel layout would need a route group with its own layout.

## Checked against the GHL API v2 docs (Oct 2026)

Everything in the brief matched the docs (base URL, `Version: 2021-07-28` on every endpoint, the upsert/tags/notes endpoints). Details worth knowing:

- `customFields` items are `{ id, field_value }`; `id` is required. Reading a contact back returns `{ id, value }`.
- Upsert accepts `tags`, but they **overwrite all existing tags**, so the route never sends them there and uses the tag endpoints instead.
- Upsert follows the location's "Allow Duplicate Contact" setting and returns `new: true|false`. The route uses `new` to skip the tag removal for new contacts.
- `DELETE /contacts/{id}/tags` takes the same JSON body as add: `{ "tags": [...] }`.
- Notes only require `body`.
- Not in the API docs: the booking widget's prefill params. Checked on the live "15 Minute Pipeline Scale Call" widget, where `first_name`, `last_name`, `email` and `phone` all prefilled.
