import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurStrategy from "@/components/sections/OurStrategy";
import HowWeWork from "@/components/sections/HowWeWork";
import AboutShane from "@/components/sections/AboutShane";
import ClientStories from "@/components/sections/ClientStories";
import SectionLabel from "@/components/ui/SectionLabel";
import LeadForm from "@/components/sections/LeadForm";

// Pipeline Scale Plan call funnel, step 1 of 3: the home page with the funnel's
// video and testimonials, and the booking form in place of the CTA banner. The
// form tags web:pipeline-scale-plan-call, then step 2 (./book) shows the calendar
// and the calendar's confirmation redirects to step 3 (./thank-you).
export const metadata: Metadata = {
  title: "Pipeline Scale Plan Call — Emergence Digital",
  description: "Book a 30-minute Pipeline Scale Plan call and we'll map your first campaign together.",
  robots: { index: false, follow: false },
};

// F1-01, the landing page video.
const LANDING_VIDEO = { id: "1239812265", title: "Pipeline Scale Plan call video" };

export default function PipelineScalePlanCallPage() {
  return (
    <>
      <Hero videoId={LANDING_VIDEO.id} videoTitle={LANDING_VIDEO.title} ctaHref="#book" />
      <ClientLogoWall />
      <VideoTestimonials />
      <WhoWeHelp />
      <WhyChooseUs />
      <OurStrategy />
      <HowWeWork />
      <AboutShane />
      <ClientStories />

      <section id="book" className="bg-dark-green py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel light>Pipeline Scale Plan Call</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to become the obvious choice in your market?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Tell us a little about your firm, then pick a time for a 30-minute call. We&apos;ll map your
                first campaign together.
              </p>
            </div>
            <LeadForm formId="pipeline-scale-plan-call" />
          </div>
        </div>
      </section>
    </>
  );
}
