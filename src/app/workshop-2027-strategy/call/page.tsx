import type { Metadata } from "next";
import WorkshopCallCalendar from "@/components/workshop/WorkshopCallCalendar";
import { WorkshopStepHeader } from "@/components/workshop/WorkshopSteps";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

// 2027 strategy workshop funnel, after payment, step 3 of 3: an optional call
// with Shane, before or after the workshop. The calendar is prefilled from the
// details the landing page form kept in this tab (see WorkshopCallCalendar).
export const metadata: Metadata = {
  title: "Talk to Shane — Emergence Digital",
  robots: { index: false, follow: false },
};

export default function WorkshopCallPage() {
  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="max-w-[900px] mx-auto px-6">
        <WorkshopStepHeader
          step={3}
          heading="Want to talk it through?"
          intro="If you'd like a call with Shane before or after the workshop, pick a time below. It's optional: your seat is booked either way."
        />
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
          <WorkshopCallCalendar calendarId={workshop.callCalendarId} />
        </div>
        <p className="text-center text-muted mt-10">
          Not right now? That&apos;s fine. See you on {workshop.shortDateLabel}.
        </p>
      </div>
    </section>
  );
}
