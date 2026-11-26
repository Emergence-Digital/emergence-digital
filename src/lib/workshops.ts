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
 * (worksheet, then the optional call with Shane) → zoom (what Zoom sends).
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
  /** Vimeo IDs for the videos on the after-payment steps. Blank hides that step's video. */
  stepVideos: { thankYou: string; zoom: string };
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
  // The workshop VSL (approved 26 Nov 2026). It's 16:9 only, so phones get the same cut.
  heroVideo: {
    desktop: "1250231808",
    mobile: "",
    title: "Let's Build your 2027 Marketing Strategy",
    autoplay: true,
  },
  // The thank-you video runs on into the "book a call" offer, so the call calendar sits on the thank-you page.
  stepVideos: { thankYou: "1250231809", zoom: "1250231807" },
  // PLACEHOLDER: Shane to supply the worksheet PDF (save it to public/workshops/ and set the path here).
  worksheetHref: "",
  hook: "Know where your 2027 clients will come from.",
  // DRAFT from Shane's agenda (24 Nov 2026): lesson 1 is the ICP, lesson 2 the 12-month calendar. Two points on
  // revenue (ICP, proof), two on marketing (consistency, AI). The images are homepage benefit tiles standing in until
  // each point gets its own tile in the Illustrator card library.
  learnIntro:
    "Ninety minutes, live on Zoom, in two lessons. You'll leave with your ideal client written down and the tools to turn it into a 12-month marketing plan.",
  learn: [
    {
      title: "Find the clients who lift your margin",
      body: "Pin down the clients you want more of: the ones who pay well and stay. When all your marketing speaks to them, more of your revenue comes from work worth doing.",
      image: "/benefits/higher-margin.webp",
    },
    {
      title: "Turn your proof into pipeline",
      body: "Go after the market where you already have results, not a brand new one. Buyers who see firms like theirs succeeding with you start the conversation already trusting you.",
      image: "/benefits/pipeline.webp",
    },
    {
      title: "Stay visible all year, not in bursts",
      body: "Map out 12 months of marketing your team can keep up with. Buyers keep seeing you between projects, so new work doesn't dry up when you get busy.",
      image: "/benefits/opportunities.webp",
    },
    {
      title: "Get AI writing for your buyers",
      body: "Give Claude your ideal client once, and everything it helps you write speaks to the people you want to win. Your team's know-how reaches the market without eating their week.",
      image: "/benefits/busy-team.webp",
    },
  ],
  // DRAFT from Shane's agenda (24 Nov 2026): two Claude skills, two templates and two decks, downloaded at the end of
  // the workshop. Skill, template and deck names are working names until Shane and the team settle them. The skills and
  // templates scenes are SC.workshop in the Illustrator card library (~/Adobe MCPs/centurion-cards); the worksheet and
  // replay cards borrow services library scenes.
  included: [
    {
      title: "Two Claude skills",
      body: "Your ideal client profile, then a 2027 plan and deck built around it, drafted by Claude from your worksheet answers. Yours to download at the end of the workshop.",
      image: "/workshops/claude-skills.webp",
      features: ["ICP generator", "2027 plan builder"],
    },
    {
      title: "Templates and decks",
      body: "Your ideal client and your year of marketing laid out for the team, so everyone knows who you're for and what goes out each month. Download them at the end of the workshop.",
      image: "/workshops/templates.webp",
      features: ["ICP template", "12-month strategy template", "ICP deck", "Strategy deck"],
    },
    {
      title: "The workshop worksheet",
      body: "Your ideal client, written down before the workshop ends. Download it as soon as you book, and we'll fill it in together on the day.",
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
        "The worksheet as soon as you book. Two Claude skills, plus templates and decks for your plan, to download at the end of the workshop. And 48 hours to rewatch the recording.",
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
