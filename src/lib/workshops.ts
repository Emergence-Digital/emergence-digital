/**
 * Paid workshops: single source of truth.
 *
 * Each workshop's funnel reads its entry here: the landing page and its form,
 * the three thank-you steps, and the Stripe webhook that registers paid buyers
 * in Zoom and tags them in GHL. Event details, copy, Stripe links and IDs all
 * live here, so the pages hold layout only.
 *
 * The funnel: landing page form (/api/lead tags web:<slug>) → Stripe payment
 * link (email prefilled, GHL contact ID as client_reference_id) → thank-you
 * (worksheet) → zoom (what Zoom sends) → call (book a call with Shane).
 * Stripe tells /api/stripe/webhook about each payment, which adds the paid tag
 * and registers the buyer for the Zoom webinar, so Zoom emails their join link
 * and reminders. See SETUP.md, "Paid workshops".
 */

import type { HeroVideo } from "@/components/sections/Hero";

export interface WorkshopItem {
  title: string;
  body: string;
}

export interface Workshop {
  /** URL path segment, also the form ID and GHL tag stem. */
  slug: string;
  name: string;
  /** ISO start time with its UTC offset. */
  startsAt: string;
  durationMinutes: number;
  dateLabel: string;
  shortDateLabel: string;
  /** e.g. "3pm AEDT". */
  startTimeLabel: string;
  /** e.g. "3:00 to 4:30pm AEDT". */
  timeLabel: string;
  priceAud: number;
  priceLabel: string;
  seatLimit: number;
  /** Stripe payment links. Previews and local dev use the sandbox one. */
  checkout: { live: string; test: string };
  /** The payment link's metadata.event, copied onto each Checkout Session; the webhook matches on it. */
  stripeEventKey: string;
  tags: {
    /** Added by the landing page form, before payment. */
    registered: string;
    /** Added by the Stripe webhook once they've paid. */
    paid: string;
  };
  /** Zoom webinar ID (digits, no spaces). Blank until the webinar exists: the webhook then skips Zoom. */
  zoomWebinarId: string;
  /** GHL contact custom fields the webhook fills for each buyer (IDs from `npm run ghl:fields`). */
  ghlFieldIds: { zoomJoinLink: string; webinarDate: string };
  /** GHL calendar for the "book a call with Shane" step. */
  callCalendarId: string;
  heroVideo: HeroVideo;
  /** Vimeo ID for the thank-you video. Blank hides it. */
  thankYouVideoId: string;
  /** The worksheet download, under /public. Blank shows a placeholder line instead of the button. */
  worksheetHref: string;
  hook: { before: string; highlight: string; after: string };
  learn: WorkshopItem[];
  included: (WorkshopItem & { icon: "sparkles" | "template" | "worksheet" | "replay" })[];
  faq: { question: string; answer: string }[];
}

/** "30 Minute Pipeline Scale Call" (round robin), as in bookingCalendarIds in lead-forms.ts. */
const PIPELINE_SCALE_CALL_CALENDAR = "TygCbiZhLM8nPUil74R6";

export const workshop2027Strategy: Workshop = {
  slug: "workshop-2027-strategy",
  name: "Let's Build your 2027 Marketing Strategy",
  startsAt: "2026-12-08T15:00:00+11:00",
  durationMinutes: 90,
  dateLabel: "Tuesday 8 December 2026",
  shortDateLabel: "Tuesday 8 December",
  startTimeLabel: "3pm AEDT",
  timeLabel: "3:00 to 4:30pm AEDT",
  priceAud: 150,
  priceLabel: "A$150 incl GST",
  seatLimit: 100,
  checkout: {
    live: "https://book.stripe.com/aFadR8cb31QS63Y3JGb7y00",
    test: "https://book.stripe.com/test_fZu7sK4P7f3X6JW57H6oo00",
  },
  stripeEventKey: "workshop-2027-strategy",
  tags: {
    registered: "web:workshop-2027-strategy",
    paid: "web:workshop-2027-strategy-paid",
  },
  // PLACEHOLDER: Shane to send the webinar ID once it's created in Zoom.
  zoomWebinarId: "",
  ghlFieldIds: {
    zoomJoinLink: "bd3SaRLqaomMfS8qwD6w",
    webinarDate: "wuew2aU4bUCH1d4wlZ79",
  },
  // PLACEHOLDER: Shane to confirm which calendar the call step uses.
  callCalendarId: PIPELINE_SCALE_CALL_CALENDAR,
  // PLACEHOLDER: the Pipeline Scale Plan VSL until the workshop promo video is recorded.
  heroVideo: {
    desktop: "1240137722",
    mobile: "1240137725",
    title: "The Pipeline Scale Plan",
    autoplay: true,
  },
  // PLACEHOLDER: Shane to record the thank-you video.
  thankYouVideoId: "",
  // PLACEHOLDER: Shane to supply the worksheet PDF (save it to public/workshops/ and set the path here).
  worksheetHref: "",
  // DRAFT: hook option 1, for Shane to confirm.
  hook: { before: "Know where your ", highlight: "2027 clients", after: " will come from." },
  // PLACEHOLDER: Shane to supply "What you'll learn".
  learn: [
    { title: "Learning point 1 (Shane to supply)", body: "One line on what changes for the attendee." },
    { title: "Learning point 2 (Shane to supply)", body: "One line on what changes for the attendee." },
    { title: "Learning point 3 (Shane to supply)", body: "One line on what changes for the attendee." },
    { title: "Learning point 4 (Shane to supply)", body: "One line on what changes for the attendee." },
  ],
  included: [
    // PLACEHOLDER: Shane to supply the Claude skills and templates handed out in the workshop.
    {
      icon: "sparkles",
      title: "Claude skills (Shane to supply names)",
      body: "Handed out during the workshop. One line on what each one does for the attendee.",
    },
    {
      icon: "template",
      title: "Templates (Shane to supply names)",
      body: "Handed out during the workshop. One line on what each one does for the attendee.",
    },
    {
      icon: "worksheet",
      title: "The workshop worksheet",
      body: "Download it as soon as you book, and bring it along on the day.",
    },
    {
      icon: "replay",
      title: "48-hour replay",
      body: "Can't make it live? Watch the recording for 48 hours afterwards.",
    },
  ],
  faq: [
    {
      question: "When is it, and how long does it run?",
      answer: "Tuesday 8 December 2026, 3:00 to 4:30pm AEDT. It's 90 minutes, live on Zoom.",
    },
    {
      question: "How do I join?",
      answer:
        "Once you've booked, Zoom emails you a personal join link. It sends reminders before the workshop too, so there's nothing to keep track of.",
    },
    {
      question: "What if I can't make it live?",
      answer: "Book anyway. The recording is available for 48 hours after the workshop.",
    },
    {
      question: "Who is it for?",
      answer: "Owners and leaders of IT businesses who want to start 2027 knowing where their next clients will come from.",
    },
    {
      question: "What do I get with my seat?",
      answer:
        "The worksheet as soon as you book, the templates and Claude skills during the workshop, and 48 hours to rewatch the recording.",
    },
    {
      question: "How much is it?",
      answer: "A$150 including GST. You'll get a tax invoice with your booking.",
    },
    {
      question: "Can I talk to Shane before the workshop?",
      answer: "Yes. Once you've booked, you can pick a time for a call with Shane, before or after the workshop.",
    },
  ],
};

/** Every workshop the Stripe webhook should fulfil. */
export const workshops: Workshop[] = [workshop2027Strategy];

/** The workshop a Checkout Session belongs to, by the metadata its payment link copies onto it. */
export function workshopForStripeEvent(eventKey: unknown): Workshop | undefined {
  return typeof eventKey === "string" ? workshops.find((w) => w.stripeEventKey === eventKey) : undefined;
}
