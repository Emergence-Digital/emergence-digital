import type { Metadata } from "next";
import PipelineScalePlanBooked from "@/components/sections/PipelineScalePlanBooked";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

// 2027 strategy workshop funnel, the call offer's last step: the same content as the
// Pipeline Scale Plan funnel's thank-you page (src/lib/pipeline-scale-plan.ts). GHL
// only sends people here if the call calendar's confirmation redirects here; the
// shared Pipeline Scale Plan calendar goes to /pipeline-scale-plan-call/thank-you.
export const metadata: Metadata = {
  title: "You're Booked In — Emergence Digital",
  robots: { index: false, follow: false },
};

export default function WorkshopCallBookedPage() {
  return (
    <PipelineScalePlanBooked
      contentName="Workshop: Pipeline Scale Plan call"
      intro={`Three quick things, so we get the most out of our time together. And we'll see you at the workshop on ${workshop.shortDateLabel}.`}
    />
  );
}
