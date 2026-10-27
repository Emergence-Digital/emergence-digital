import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import CalendarEmbed from "@/components/sections/CalendarEmbed";
import { bookingCalendarIds } from "@/lib/lead-forms";

// Step 2 of the Pipeline Scale Plan call funnel, the same as /book/time. The
// form redirects here with first_name, last_name, email and phone, which
// prefill the GHL calendar.
export const metadata: Metadata = {
  title: "Pick a Time — Emergence Digital",
  robots: { index: false, follow: false },
};

export default async function PipelineScalePlanCallBookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const firstName = typeof params.first_name === "string" ? params.first_name.slice(0, 50) : "";

  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel>Last step</SectionLabel>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark-green mt-2 mb-4">
            {firstName ? `Thanks, ${firstName}. Pick a time` : "Pick a time"}
          </h1>
          <p className="text-muted text-lg">
            We&apos;ve got your details. Choose a time that suits and the call is locked in.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
          <CalendarEmbed calendarId={bookingCalendarIds.pipelineScaleCall} prefill={params} />
        </div>
      </div>
    </section>
  );
}
