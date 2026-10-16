import Hero from "@/components/sections/Hero";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurStrategy from "@/components/sections/OurStrategy";
import HowWeWork from "@/components/sections/HowWeWork";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeHelp />
      <WhyChooseUs />
      <OurStrategy />
      <HowWeWork />
      <Testimonials />
      <CTABanner />
    </>
  );
}
