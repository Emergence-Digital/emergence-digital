import type { Metadata } from "next";
import { Bell, CalendarCheck, Mail, MonitorPlay, type LucideIcon } from "lucide-react";
import VimeoEmbed from "@/components/ui/VimeoEmbed";
import { WorkshopStepHeader } from "@/components/workshop/WorkshopSteps";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

// 2027 strategy workshop funnel, after payment, step 2 of 2: what Zoom sends and
// when. The Stripe webhook gives each buyer a ticket to the Zoom Events event,
// so the confirmation, join link and reminders all come from Zoom's own emails.
// The video ID is in workshops.ts (stepVideos.zoom); blank hides it.
export const metadata: Metadata = {
  title: "Joining on Zoom — Emergence Digital",
  robots: { index: false, follow: false },
};

const steps: { icon: LucideIcon; title: string; body: string }[] = [
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

export default function WorkshopZoomPage() {
  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <WorkshopStepHeader
          step={2}
          heading="Joining on Zoom"
          intro={`${workshop.name} runs live on Zoom, ${workshop.dateLabel}, ${workshop.timeLabel}. Here's what happens next.`}
        />

        {workshop.stepVideos.zoom && (
          <VimeoEmbed id={workshop.stepVideos.zoom} title="Joining the workshop on Zoom" className="max-w-4xl mx-auto mb-12" />
        )}

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {steps.map((step) => (
            <li key={step.title} className="bg-white rounded-2xl shadow-sm p-6 md:p-7 flex gap-5">
              <span className="w-12 h-12 shrink-0 rounded-xl bg-mid-green/10 text-mid-green grid place-items-center">
                <step.icon aria-hidden="true" className="w-6 h-6" />
              </span>
              <div>
                <h2 className="font-serif text-xl font-bold text-dark-green mb-2">{step.title}</h2>
                <p className="text-muted leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-center text-muted mt-10 max-w-2xl mx-auto">
          No email from Zoom after 10 minutes? Email{" "}
          <a href="mailto:contact@emergencedigital.com.au" className="text-mid-green underline underline-offset-2">
            contact@emergencedigital.com.au
          </a>{" "}
          and we&apos;ll sort it out.
        </p>

        <p className="text-center font-serif text-2xl font-bold text-dark-green mt-12">See you on {workshop.shortDateLabel}.</p>
      </div>
    </section>
  );
}
