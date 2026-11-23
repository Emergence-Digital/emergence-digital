import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import VimeoEmbed from "@/components/ui/VimeoEmbed";
import MetaPurchase from "@/components/workshop/MetaPurchase";
import { WorkshopNextStep, WorkshopStepHeader } from "@/components/workshop/WorkshopSteps";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

// 2027 strategy workshop funnel, after payment, step 1 of 3. The Stripe payment
// link redirects here with ?session_id=…, which <MetaPurchase /> uses as the
// Purchase event ID. The thank-you video and worksheet come from workshops.ts
// and stay hidden until they're set.
export const metadata: Metadata = {
  title: "You're Booked In — Emergence Digital",
  robots: { index: false, follow: false },
};

export default function WorkshopThankYouPage() {
  return (
    <>
      <MetaPurchase value={workshop.priceAud} currency="AUD" contentName={workshop.name} />
      <section className="bg-cream pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <WorkshopStepHeader
            step={1}
            heading="Thank you."
            intro={`Your seat at ${workshop.name} is booked for ${workshop.dateLabel}, ${workshop.timeLabel}.`}
          />

          {workshop.thankYouVideoId && (
            <VimeoEmbed
              id={workshop.thankYouVideoId}
              title={`You're booked in for ${workshop.name}`}
              autoplay
              className="max-w-4xl mx-auto mb-12"
            />
          )}

          <div className="bg-white rounded-2xl shadow-sm p-7 md:p-10 max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:items-center">
            <span className="w-14 h-14 shrink-0 rounded-xl bg-mid-green/10 text-mid-green grid place-items-center">
              <FileText aria-hidden="true" className="w-7 h-7" />
            </span>
            <div className="flex-1">
              <h2 className="font-serif text-2xl font-bold text-dark-green mb-2">Your workshop worksheet</h2>
              <p className="text-muted leading-relaxed">
                {workshop.worksheetHref
                  ? "Download it now and bring it along on the day. We'll work through it together."
                  : "Worksheet download coming soon (Shane to supply the PDF)."}
              </p>
            </div>
            {workshop.worksheetHref && (
              <a
                href={workshop.worksheetHref}
                download
                className="inline-flex items-center justify-center gap-2 bg-dark-green text-white border border-dark-green px-7 py-3 text-sm font-medium tracking-wide hover:bg-mid-green hover:border-mid-green transition-colors duration-200"
              >
                <Download aria-hidden="true" className="w-4 h-4" />
                Download
              </a>
            )}
          </div>

          <WorkshopNextStep href={`/${workshop.slug}/zoom`} label="Next: joining on Zoom" />
        </div>
      </section>
    </>
  );
}
