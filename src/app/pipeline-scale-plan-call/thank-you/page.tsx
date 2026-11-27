import type { Metadata } from "next";
import PipelineScalePlanBooked from "@/components/sections/PipelineScalePlanBooked";

// Step 3 of the Pipeline Scale Plan call funnel. The GHL calendar's confirmation
// redirects here once someone books. The content is shared with the workshop's
// call offer (/workshop-2027-strategy/call-booked); it's in src/lib/pipeline-scale-plan.ts.
export const metadata: Metadata = {
  title: "You're Booked In — Emergence Digital",
  robots: { index: false, follow: false },
};

export default function PipelineScalePlanCallThankYouPage() {
  return <PipelineScalePlanBooked contentName="Pipeline Scale Plan call" />;
}
