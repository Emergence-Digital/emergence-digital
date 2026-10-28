import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/sections/CTABanner";
import AboutTeamVisual from "@/components/sections/AboutTeamVisual";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Melbourne Team",
  description:
    "Meet the Melbourne team behind Emergence Digital. We help IT, MSP and software firms turn deep expertise into the reputation that wins bigger clients.",
  path: "/about",
});

const values = [
  {
    title: "Craft",
    description: "We sweat the details. They're what separate work people notice from work they scroll past.",
  },
  {
    title: "Creativity",
    description: "We skip the safe, expected idea, because it rarely makes anyone stand out.",
  },
  {
    title: "Curiosity",
    description: "We keep learning new tools and approaches, so our clients stay ahead, not just current.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] gap-12 lg:gap-10 items-center">
          <div>
            <SectionLabel>About Us</SectionLabel>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6 max-w-3xl">
              About Emergence Digital
            </h1>
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              A Melbourne marketing company built for IT, MSP and software firm
              owners who&apos;ve outgrown their market positioning — and are ready
              to become recognised leaders in their category.
            </p>
          </div>
          <AboutTeamVisual />
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16 items-start">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green mt-2">
              Where we came from.
            </h2>
          </div>
          <div className="space-y-4 text-body text-lg leading-relaxed lg:pt-8">
            <p>
              Emergence started the way most of our clients do: with more expertise than exposure. We could
              deliver the work, but we didn&apos;t have the positioning or the pipeline to win it.
            </p>
            <p>
              Closing that gap is now what we do for MSPs, ERP and cloud partners, consultancies and software
              companies. We build the campaigns that turn quiet expertise into a reputation buyers seek out.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
              What drives us.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="text-center">
                <h3 className="font-serif text-2xl font-semibold text-dark-green mb-3">
                  {v.title}
                </h3>
                <p className="text-muted leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
              The people behind the work.
            </h2>
          </div>

          {/* Single team member card */}
          <div className="max-w-sm mx-auto">
            <Card className="text-center">
              <div className="w-24 h-24 rounded-full bg-dark-green/10 mx-auto mb-6 overflow-hidden relative">
                <Image
                  src="/shanek.jpeg"
                  alt="Shane Kennedy"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-dark-green">
                Shane Kennedy
              </h3>
              <p className="text-mid-green text-sm font-medium mt-1 mb-4">Founder</p>
              <p className="text-muted text-sm leading-relaxed">
                Shane has spent the last 10 years in marketing, a significant part
                of it inside the SAP partner ecosystem — working alongside
                software, consulting and implementation partners to help them
                stand out in a crowded, technical market.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
