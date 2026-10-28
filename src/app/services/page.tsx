import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import ServicesLibrary from "@/components/sections/ServicesLibrary";
import CTABanner from "@/components/sections/CTABanner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Marketing Services for IT Firms",
  description:
    "Marketing and sales services for IT firms. Filter by goal: win bigger accounts, get more website leads, stand out from the big firms or close more deals.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cream pt-32 pb-10 md:pb-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <SectionLabel>Our Services</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green leading-[1.08] tracking-tight max-w-3xl mx-auto mb-5">
            Everything it takes to win bigger clients.
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Pick the goal that matters most right now, then open any service to see what&rsquo;s included.
          </p>
        </div>
      </section>

      <ServicesLibrary />

      <CTABanner />
    </>
  );
}
