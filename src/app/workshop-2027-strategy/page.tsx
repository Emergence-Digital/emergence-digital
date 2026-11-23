import type { Metadata } from "next";
import { Check } from "lucide-react";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import Faq from "@/components/sections/Faq";
import LeadForm from "@/components/sections/LeadForm";
import SectionLabel from "@/components/ui/SectionLabel";
import WorkshopHero from "@/components/workshop/WorkshopHero";
import {
  WorkshopFinalCta,
  WorkshopIncluded,
  WorkshopIntroducing,
  WorkshopLearn,
} from "@/components/workshop/WorkshopSections";
import { workshop2027Strategy as workshop } from "@/lib/workshops";
import { pageMetadata } from "@/lib/seo";

// 2027 strategy workshop funnel, step 1: the landing page. The form tags
// web:workshop-2027-strategy, then sends them to Stripe with their email
// prefilled. After paying, Stripe redirects to ./thank-you (worksheet), then
// ./zoom and ./call. Members get the CENTURION discount through ?code=CENTURION
// on this page's URL. Copy and event details are in src/lib/workshops.ts.
export const metadata: Metadata = pageMetadata({
  title: workshop.name,
  description: `A ${workshop.durationMinutes}-minute live workshop for IT business owners on ${workshop.dateLabel}, ${workshop.timeLabel}.`,
  path: `/${workshop.slug}`,
  noindex: true,
});

const REGISTER_ID = "register";
const CTA_HREF = `#${REGISTER_ID}`;

export default function Workshop2027StrategyPage() {
  const registerPoints = [
    `${workshop.dateLabel}, ${workshop.timeLabel}`,
    "Live on Zoom, with your join link and reminders emailed by Zoom",
    "The recording is available for 48 hours afterwards",
  ];

  return (
    <>
      <WorkshopHero workshop={workshop} headline={["Let's build your", "2027 marketing strategy"]} ctaHref={CTA_HREF} />
      <WorkshopLearn workshop={workshop} ctaHref={CTA_HREF} />
      <WorkshopIncluded workshop={workshop} ctaHref={CTA_HREF} />

      <section id={REGISTER_ID} className="bg-dark-green py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel light>Reserve your seat</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Join us on {workshop.shortDateLabel}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {workshop.priceLabel}, and seats are limited to {workshop.seatLimit}. Enter your details, then pay
                securely with Stripe on the next page.
              </p>
              <ul className="space-y-4">
                {registerPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-white/90">
                    <Check aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-sage" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm formId="workshop-2027-strategy" />
          </div>
        </div>
      </section>

      <Faq items={workshop.faq} />
      <WorkshopIntroducing workshop={workshop} ctaHref={CTA_HREF} />
      <VideoTestimonials />
      <ClientLogoWall />
      <WorkshopFinalCta workshop={workshop} ctaHref={CTA_HREF} />
    </>
  );
}
