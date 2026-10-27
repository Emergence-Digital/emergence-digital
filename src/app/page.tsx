import Hero from "@/components/sections/Hero";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurStrategy from "@/components/sections/OurStrategy";
import HowWeWork from "@/components/sections/HowWeWork";
import AboutShane from "@/components/sections/AboutShane";
import ClientStories from "@/components/sections/ClientStories";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
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
