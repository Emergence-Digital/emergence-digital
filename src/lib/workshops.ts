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
 * and gives the buyer a ticket to the Zoom Events event, so Zoom emails their
 * join link and reminders. See SETUP.md, "Paid workshops".
 */

import type { HeroVideo } from "@/components/sections/Hero";

export interface WorkshopItem {
  title: string;
  body: string;
}

/**
 * A "What you'll learn" card, styled like the homepage "Why choose Emergence" tiles. The image is a benefit-style
 * tile from the Illustrator card library (640 × 400, transparent, cream widgets for the dark green band).
 */
export interface WorkshopLearnItem extends WorkshopItem {
  image: string;
}

/**
 * A "What you get" card, styled like a services library row. The image is a services-style scene from the
 * Illustrator card library (1200 × 720, butter plate with white widgets).
 */
export interface WorkshopIncludedItem extends WorkshopItem {
  image: string;
  /** Short names shown as ticked chips, e.g. each skill or template. */
  features?: string[];
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
  /**
   * The Zoom Events event buyers get a ticket to: "Event ID for integrations or support" and "Ticket type ID", both
   * in the event's Overview → info panel. Blank event ID: the webhook skips Zoom.
   */
  zoomEvent: { eventId: string; ticketTypeId: string };
  /** GHL contact custom fields the webhook fills for each buyer (IDs from `npm run ghl:fields`). */
  ghlFieldIds: { zoomJoinLink: string; webinarDate: string };
  /** GHL calendar for the "book a call with Shane" step. */
  callCalendarId: string;
  heroVideo: HeroVideo;
  /** Vimeo IDs for the videos on the three after-payment steps. Blank hides that step's video. */
  stepVideos: { thankYou: string; zoom: string; call: string };
  /** The worksheet download, under /public. Blank shows a placeholder line instead of the button. */
  worksheetHref: string;
  /** One line under the headline, in body text. */
  hook: string;
  /** The line beside the "What you'll learn" heading. */
  learnIntro: string;
  learn: WorkshopLearnItem[];
  included: WorkshopIncludedItem[];
  /** The "Introducing..." section near the end of the page. Wrap words in **double asterisks** to bold them. */
  introducing: { name: string; paragraphs: string[] };
  faq: { question: string; answer: string }[];
}

/** "30 Minute Pipeline Scale Call" (round robin), as in bookingCalendarIds in lead-forms.ts. */
const PIPELINE_SCALE_CALL_CALENDAR = "TygCbiZhLM8nPUil74R6";

/** The Pipeline Scale Plan VSL (16:9), standing in for workshop videos that aren't recorded yet. */
const PIPELINE_VSL = "1240137722";

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
  zoomEvent: { eventId: "9grYqx0OQNueDXIIqffLSg", ticketTypeId: "zpLiu8CTSz6D75T8LFzNZA" },
  ghlFieldIds: {
    zoomJoinLink: "bd3SaRLqaomMfS8qwD6w",
    webinarDate: "wuew2aU4bUCH1d4wlZ79",
  },
  // PLACEHOLDER: Shane to confirm which calendar the call step uses.
  callCalendarId: PIPELINE_SCALE_CALL_CALENDAR,
  // PLACEHOLDER: the Pipeline Scale Plan VSL until the workshop promo video is recorded.
  heroVideo: {
    desktop: PIPELINE_VSL,
    mobile: "1240137725",
    title: "The Pipeline Scale Plan",
    autoplay: true,
  },
  // PLACEHOLDER: the Pipeline Scale Plan VSL on all three steps until Shane records the step videos.
  stepVideos: { thankYou: PIPELINE_VSL, zoom: PIPELINE_VSL, call: PIPELINE_VSL },
  // PLACEHOLDER: Shane to supply the worksheet PDF (save it to public/workshops/ and set the path here).
  worksheetHref: "",
  hook: "Know where your 2027 clients will come from.",
  // DRAFT: for Shane to confirm along with the learning points.
  learnIntro: "Ninety minutes, live on Zoom, planning where your 2027 clients will come from.",
  // PLACEHOLDER: Shane to supply "What you'll learn". The images are homepage benefit tiles standing in until each
  // point gets its own tile in the Illustrator card library.
  learn: [
    {
      title: "Learning point 1 (Shane to supply)",
      body: "One line on what changes for the attendee.",
      image: "/benefits/pipeline.webp",
    },
    {
      title: "Learning point 2 (Shane to supply)",
      body: "One line on what changes for the attendee.",
      image: "/benefits/opportunities.webp",
    },
    {
      title: "Learning point 3 (Shane to supply)",
      body: "One line on what changes for the attendee.",
      image: "/benefits/bigger-clients.webp",
    },
    {
      title: "Learning point 4 (Shane to supply)",
      body: "One line on what changes for the attendee.",
      image: "/benefits/shorter-cycles.webp",
    },
  ],
  // The images are services library scenes standing in until the workshop's own scenes are made in the
  // Illustrator card library.
  included: [
    // PLACEHOLDER: Shane to supply the Claude skills and templates handed out in the workshop.
    {
      title: "Claude skills (Shane to supply names)",
      body: "Handed out during the workshop. One line on what each one does for the attendee.",
      image: "/services/funnel-automation.webp",
      features: ["Skill name (TBC)", "Skill name (TBC)"],
    },
    {
      title: "Templates (Shane to supply names)",
      body: "Handed out during the workshop. One line on what each one does for the attendee.",
      image: "/services/pitch-decks.webp",
      features: ["Template name (TBC)", "Template name (TBC)"],
    },
    {
      title: "The workshop worksheet",
      body: "Download it as soon as you book, and bring it along on the day.",
      image: "/services/digital-guides.webp",
    },
    {
      title: "48-hour replay",
      body: "Can't make it live? Watch the recording for 48 hours afterwards.",
      image: "/services/webinars.webp",
    },
  ],
  // DRAFT: modelled on the reference page's "Introducing..." section, using only what the site already says about
  // Emergence and Shane. For Shane to confirm.
  introducing: {
    name: "Emergence Digital",
    paragraphs: [
      "**No more guesswork or wasted marketing spend.** This is where your 2027 pipeline gets planned.",
      "Most marketing is judged by impressions, followers and open rates. They look good in a report, but they don't win contracts or pay your team.",
      "Emergence is a Melbourne marketing company built for IT business owners: MSPs, ERP and cloud partners, consultancies and software companies. It's led by founder **Shane Kennedy**, who has spent 10 years in marketing, much of it inside the SAP partner ecosystem.",
      "We started the way most of our clients do, with more expertise than exposure. Closing that gap is what we do for IT firms, and **this workshop is how we're helping them plan 2027.**",
    ],
  },
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
