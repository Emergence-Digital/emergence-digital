/**
 * Lead capture forms: single source of truth.
 *
 * Every <LeadForm formId="…" /> and every POST to /api/lead is driven by an
 * entry in `leadForms`. To add a funnel: add an entry here, build a page that
 * renders <LeadForm formId="your-id" />, then create the GHL workflow for its
 * tag (see SETUP.md).
 *
 * The server only ever takes tags from this file; the browser sends a formId,
 * never tags. GHL custom field and calendar IDs aren't secrets (they're
 * identifiers inside the location), so they live here rather than in env vars.
 * Get field IDs with `npm run ghl:fields`.
 */

import type { AttributionKey } from "@/lib/attribution";

export type StandardFieldName = "firstName" | "lastName" | "email" | "phone" | "company" | "message";

export type LeadFieldType = "text" | "email" | "tel" | "textarea" | "select";

export interface LeadField {
  /** Key sent to /api/lead. Standard names map to GHL's built-in contact fields. */
  name: string;
  label: string;
  type: LeadFieldType;
  /** firstName and email are always required, whatever this says. */
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  /** Choices for type "select". */
  options?: readonly string[];
  /** Sits beside the next half-width field from the sm breakpoint up. */
  half?: boolean;
  /**
   * Extra (non-standard) fields only: the GHL contact custom field ID to write
   * the answer to. Unmapped answers are added to the contact note instead.
   */
  ghlFieldId?: string;
}

export type LeadFormSuccess =
  | { type: "message"; heading: string; body: string }
  | {
      type: "redirect";
      /** Site path (e.g. "/lp/x/book") or full URL. */
      url: string;
      /** Append first_name, last_name, email and phone so a GHL calendar embed can prefill them. */
      prefillBooking?: boolean;
    };

export interface LeadFormConfig {
  /** Human name: used in the GHL contact source and note. */
  name: string;
  /**
   * Applied on every submission. They're removed then re-added on repeat
   * submissions so a "Contact Tag" workflow trigger fires again. Keep them
   * lowercase (GHL stores tags lowercase); convention is "web:{formId}".
   */
  tags: readonly string[];
  /** Rendered in this order. */
  fields: readonly LeadField[];
  submitLabel: string;
  success: LeadFormSuccess;
  /**
   * Also email the submission through EmailJS (the template the old contact
   * form used), whatever GHL returns. A stopgap so no enquiry is missed until a
   * GHL workflow sends the internal notification; see SETUP.md.
   */
  emailCopy?: boolean;
}

export const standardFields = {
  firstName: { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name" },
  lastName: { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "you@company.com.au",
  },
  phone: { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "04xx xxx xxx" },
  company: { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  message: { name: "message", label: "Message", type: "textarea" },
} as const satisfies Record<StandardFieldName, LeadField>;

export function isStandardField(name: string): name is StandardFieldName {
  return Object.hasOwn(standardFields, name);
}

/**
 * GHL contact custom field IDs for attribution. Create the fields listed in
 * SETUP.md, run `npm run ghl:fields`, and paste the IDs here. A blank ID means
 * that value isn't sent to GHL.
 */
export const attributionFieldIds: Record<AttributionKey | "conversion_page", string> = {
  utm_source: "ydGmHLLJT1Qqd6m4fspU",
  utm_medium: "yqfNfCkL0sodUU2ZVSaD",
  utm_campaign: "O4REFfrBQeBc9xmcdHlA",
  utm_term: "9ToIU65BgOOjSaVc2E3X",
  utm_content: "mEjDittLVJPFNXu6Cw5n",
  // GHL won't create a "GCLID" field (the key is taken), so there's none yet.
  // The gclid still reaches GHL inside landing_page. See SETUP.md, step 3.
  gclid: "",
  fbclid: "w14RJZxT13n35giuIajk",
  referrer: "lW2FvJrDW8VrN4OHGpI8",
  landing_page: "SYpQ6m2utpCkfZNZhx2L",
  /** The page the form was submitted from. */
  conversion_page: "QE8RPq4nmUUAXwx9ww80",
};

/** GHL calendars embedded on booking pages (Calendars → Calendar settings → the calendar's ID). */
export const bookingCalendarIds = {
  /** "30 Minute Pipeline Scale Call" (round robin) */
  pipelineScaleCall: "TygCbiZhLM8nPUil74R6",
} as const;

export const leadForms = {
  contact: {
    name: "Contact page",
    tags: ["web:contact"],
    fields: [
      { ...standardFields.firstName, half: true },
      { ...standardFields.lastName, half: true },
      { ...standardFields.email, half: true },
      { ...standardFields.phone, half: true },
      standardFields.company,
      { ...standardFields.message, required: true, placeholder: "Tell us about your project..." },
    ],
    submitLabel: "Send Message",
    success: {
      type: "message",
      heading: "Message Sent!",
      body: "Thanks for getting in touch. We'll be back to you shortly.",
    },
    emailCopy: true,
  },
  // Every "Book a Strategy Call" button on the site goes here (/book), so these
  // are organic leads, unlike funnel forms such as example-lead.
  "book-call": {
    name: "Book a strategy call",
    tags: ["web:book-call"],
    fields: [
      { ...standardFields.firstName, half: true },
      { ...standardFields.lastName, half: true },
      { ...standardFields.email, half: true },
      { ...standardFields.phone, half: true },
      standardFields.company,
    ],
    submitLabel: "Pick a time",
    success: { type: "redirect", url: "/book/time", prefillBooking: true },
  },
  "example-lead": {
    name: "Example lead form",
    tags: ["web:example-lead"],
    fields: [
      { ...standardFields.firstName, half: true },
      { ...standardFields.lastName, half: true },
      standardFields.email,
      { ...standardFields.phone, half: true },
      { ...standardFields.company, half: true },
      {
        name: "focus",
        label: "What do you most want help with?",
        type: "select",
        required: true,
        options: ["Digital events", "Content from our expertise", "Outbound campaigns", "CRM and automation", "Not sure yet"],
        // No ghlFieldId, so the answer goes into the contact note.
      },
      { ...standardFields.message, label: "Anything else we should know?" },
    ],
    submitLabel: "Book my strategy call",
    success: { type: "redirect", url: "/lp/example-lead/book", prefillBooking: true },
    // Inline alternative:
    // success: { type: "message", heading: "Thanks, we've got it", body: "We'll be in touch within one business day." },
  },
} satisfies Record<string, LeadFormConfig>;

export type LeadFormId = keyof typeof leadForms;

/** Looks up a form by an untrusted ID (e.g. from a request body). */
export function getLeadForm(formId: string): LeadFormConfig | undefined {
  return Object.hasOwn(leadForms, formId) ? leadForms[formId as LeadFormId] : undefined;
}
