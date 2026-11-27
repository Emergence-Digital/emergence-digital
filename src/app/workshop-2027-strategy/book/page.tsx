import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import CalendarEmbed from "@/components/sections/CalendarEmbed";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

// 2027 strategy workshop funnel, the call offer's second step. The thank-you
// page's call form redirects here with first_name, last_name, email and phone,
// which prefill the GHL calendar. Where GHL sends people after a booking is set
// on the calendar in GHL (see callCalendarId in workshops.ts).
export const metadata: Metadata = {
  title: "Pick a Time — Emergence Digital",
  robots: { index: false, follow: false },
};

export default async function WorkshopCallBookPage({
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
            We&apos;ve got your details. Choose a time that suits and your Pipeline Scale Plan call is locked in.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
          <CalendarEmbed calendarId={workshop.callCalendarId} prefill={params} title="Book a call with Shane" />
        </div>
      </div>
    </section>
  );
}
