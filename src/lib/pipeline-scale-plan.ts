/**
 * The Pipeline Scale Plan call: single source of truth for its videos and the copy after a booking.
 *
 * Two funnels sell this call: its own (/pipeline-scale-plan-call → ./book → ./thank-you) and the workshop's call offer
 * (/workshop-2027-strategy/thank-you → ./book → ./call-booked). Both read the VSL and the "you're booked in" content here.
 */

import type { HeroVideo } from "@/components/sections/Hero";

/**
 * The Pipeline Scale Plan VSL (B1 v2), which plays muted while on screen. It replaced F1-01 (Vimeo 1239812265), the
 * short landing page video.
 */
export const pipelineScalePlanVsl: HeroVideo = {
  desktop: "1240137722",
  mobile: "1240137725",
  title: "The Pipeline Scale Plan",
  autoplay: true,
};

/** F1-02, "three quick things before your call", at the top of the page after a booking. */
export const bookedVideoId = "1239805007";

export const bookedNextSteps = [
  {
    title: "Accept the calendar invite",
    body: "Check your inbox for the invite and accept it, so the call is locked in your calendar and you get a reminder.",
  },
  {
    title: "Save our number",
    body: "We'll call you at the time you booked, on the number you gave us. Our number is in your confirmation email. Save it, so you know it's us when it rings.",
  },
  {
    title: "Think about two things",
    body: "Where your new work has come from over the last twelve months, and the type of client you'd like a lot more of. That's all the prep you need.",
  },
];

/** The Centurion videos, in order. None of them asks for a booking. */
export const centurionVideos = [
  {
    vimeoId: "1239802639",
    stage: "Attraction",
    body: "Buyers usually rank who they'd like to work with before they contact anyone. How your firm gets on that list.",
  },
  {
    vimeoId: "1239802637",
    stage: "Engagement",
    body: "The firm a buyer prefers before they talk to sales usually wins the deal. How attention turns into trust.",
  },
  {
    vimeoId: "1239802635",
    stage: "Conversion",
    body: "Interest only turns into signed work if someone stays in touch. How you make sure it's you.",
  },
];
