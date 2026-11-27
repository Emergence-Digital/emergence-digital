import type { Metadata } from "next";
import { Bell, CalendarCheck, Download, FileText, Mail, MonitorPlay, type LucideIcon } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import VimeoEmbed from "@/components/ui/VimeoEmbed";
import ResponsiveVimeoEmbed from "@/components/ui/ResponsiveVimeoEmbed";
import MetaPurchase from "@/components/workshop/MetaPurchase";
import CheckoutPrefilledLeadForm from "@/components/workshop/CheckoutPrefilledLeadForm";
import { pipelineScalePlanVsl } from "@/lib/pipeline-scale-plan";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

// 2027 strategy workshop funnel, after payment: everything on one page, as Cormac
// suggested at Office Hours (25 Nov 2026), since every extra page is a place to drop
// off. The Stripe payment link redirects here with ?session_id=…, which
// <MetaPurchase /> uses as the Purchase event ID. In order:
// 1. the thank-you video and the worksheet,
// 2. joining on Zoom (#zoom): the Zoom explainer in a smaller window beside the steps,
//    which used to be their own page (/zoom, now a redirect here),
// 3. the call offer (#book-a-call): the Pipeline Scale Plan VSL, then a form prefilled
//    from the registration, which goes on to ./book (calendar) and then ./call-booked.
// Videos and the worksheet come from workshops.ts; a blank ID hides that video.
export const metadata: Metadata = {
  title: "You're Booked In — Emergence Digital",
  robots: { index: false, follow: false },
};

const zoomSteps: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Mail,
    title: "Look for an email from Zoom",
    body: "It arrives within a few minutes, from Zoom Events, with your personal join link. If it's not in your inbox, check spam or promotions.",
  },
  {
    icon: CalendarCheck,
    title: "Add it to your calendar",
    body: "Use the calendar buttons in Zoom's email, so the join link is right there in the event when it's time.",
  },
  {
    icon: Bell,
    title: "Zoom sends the reminders",
    body: "You'll get reminder emails from Zoom before the workshop starts, each with the same join link.",
  },
  {
    icon: MonitorPlay,
    title: "Can't make it live?",
    body: "The recording is available for 48 hours after the workshop.",
  },
];

export default function WorkshopThankYouPage() {
  return (
    <>
      <MetaPurchase value={workshop.priceAud} currency="AUD" contentName={workshop.name} />

      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>You&apos;re booked in</SectionLabel>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-dark-green mt-2 mb-5">Thank you.</h1>
            <p className="text-muted text-lg md:text-xl leading-normal">
              Your seat at {workshop.name} is booked for {workshop.dateLabel}, {workshop.timeLabel}. Watch this first,
              then everything you need is below.
            </p>
          </div>

          {workshop.stepVideos.thankYou && (
            <VimeoEmbed
              id={workshop.stepVideos.thankYou}
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
        </div>
      </section>

      <section id="zoom" className="bg-white py-20 md:py-24 scroll-mt-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Joining on Zoom</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-green mb-4">How you&apos;ll join on the day</h2>
            <p className="text-muted text-lg leading-normal">
              The workshop runs live on Zoom, {workshop.dateLabel}, {workshop.timeLabel}. Zoom emails you everything
              you need.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-8 lg:gap-12 items-start ${workshop.stepVideos.zoom ? "md:grid-cols-[2fr_3fr]" : "max-w-3xl mx-auto"}`}
          >
            {workshop.stepVideos.zoom && (
              <VimeoEmbed id={workshop.stepVideos.zoom} title="Joining the workshop on Zoom" className="md:sticky md:top-28" />
            )}
            <ol className="space-y-4">
              {zoomSteps.map((step) => (
                <li key={step.title} className="bg-cream rounded-2xl p-5 md:p-6 flex gap-4">
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-mid-green/10 text-mid-green grid place-items-center">
                    <step.icon aria-hidden="true" className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-dark-green mb-1">{step.title}</h3>
                    <p className="text-muted leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-center text-muted mt-10 max-w-2xl mx-auto">
            No email from Zoom after 10 minutes? Email{" "}
            <a href="mailto:contact@emergencedigital.com.au" className="text-mid-green underline underline-offset-2">
              contact@emergencedigital.com.au
            </a>{" "}
            and we&apos;ll sort it out.
          </p>
          <p className="text-center font-serif text-2xl font-bold text-dark-green mt-8">
            See you on {workshop.shortDateLabel}.
          </p>
        </div>
      </section>

      <section id="book-a-call" className="bg-dark-green py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel light>Bonus: a call with Shane</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
              Ready to become the obvious choice in your market?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Watch this, then pick a time for a 30-minute Pipeline Scale Plan call with Shane, before or after the
              workshop. It&apos;s optional: your seat is booked either way.
            </p>
          </div>

          <ResponsiveVimeoEmbed
            desktopId={pipelineScalePlanVsl.desktop}
            mobileId={pipelineScalePlanVsl.mobile}
            title={pipelineScalePlanVsl.title}
            autoplay={pipelineScalePlanVsl.autoplay}
            className="max-w-4xl mx-auto mb-14 md:mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Check your details</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                If you&apos;ve just booked your seat, we&apos;ve filled them in for you. Then pick a time on the next
                page, and we&apos;ll map your first campaign together.
              </p>
            </div>
            <CheckoutPrefilledLeadForm formId="workshop-2027-strategy-call" />
          </div>
        </div>
      </section>
    </>
  );
}
