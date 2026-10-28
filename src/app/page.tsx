import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurStrategy from "@/components/sections/OurStrategy";
import HowWeWork from "@/components/sections/HowWeWork";
import AboutShane from "@/components/sections/AboutShane";
import ClientStories from "@/components/sections/ClientStories";
import CTABanner from "@/components/sections/CTABanner";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE_TITLE,
  absolute: true,
  description: SITE_DESCRIPTION,
  path: "/",
});

// Who we are and where we're based, for search engines (schema.org). Kept to what the site already says.
const organisation = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "contact@emergencedigital.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 4, 184 Main Street",
    addressLocality: "Lilydale",
    addressRegion: "VIC",
    postalCode: "3140",
    addressCountry: "AU",
  },
  areaServed: "AU",
  founder: { "@type": "Person", name: "Shane Kennedy" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ClientLogoWall />
      <WhoWeHelp />
      <WhyChooseUs />
      <OurStrategy />
      <HowWeWork />
      <AboutShane />
      <ClientStories />
      <CTABanner />
    </>
  );
}
