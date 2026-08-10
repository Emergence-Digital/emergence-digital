import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "About — Emergence Digital",
  description:
    "A Melbourne marketing company built for IT, MSP and consulting firm owners ready to become recognised leaders in their category.",
};

const values = [
  {
    title: "Honest Positioning",
    description:
      "We tell clients the truth about how the market actually sees them, even when it's uncomfortable — because you can't fix a positioning problem you won't name.",
  },
  {
    title: "Substance Over Noise",
    description:
      "We'd rather build one campaign around a genuine point of view than publish content for the sake of a calendar. Quality of insight beats frequency of posting, every time.",
  },
  {
    title: "Momentum With Intention",
    description:
      "We move fast on delivery, but never at the expense of getting your positioning right first — a rushed campaign built on the wrong angle just wastes everyone's time.",
  },
  {
    title: "Category Thinking",
    description:
      "We don't just help you get noticed, we help you get recognised for something specific — because being known for everything is the same as being known for nothing.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>About Us</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6 max-w-3xl">
            About Emergence Digital
          </h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed">
            A Melbourne marketing company built for IT, MSP and consulting firm
            owners who&apos;ve outgrown their market positioning — and are ready
            to become recognised leaders in their category.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-serif text-4xl font-bold text-dark-green mt-2 mb-6">
              Where we came from.
            </h2>
            <p className="text-body leading-relaxed mb-4">
              Emergence Digital started the same way most of our clients do —
              with more expertise than exposure. We&apos;d get excited by an
              opportunity, know we could deliver on it, but lack the
              positioning and pipeline to make it real. That gap between
              capability and recognition is exactly what we now help other
              firms close.
            </p>
            <p className="text-body leading-relaxed">
              Today we work with IT services firms, MSPs, ERP partners and
              consulting businesses who are technically excellent but
              under-recognised in their market. We build the campaigns —
              digital events, content, and follow-through — that turn quiet
              expertise into a reputation people actively seek out.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-dark-green/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Modern professional workspace"
              className="w-full h-full object-cover"
            />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <Card key={v.title}>
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
              <div className="w-24 h-24 rounded-full bg-dark-green/10 mx-auto mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-dark-green">
                Shane Kennedy
              </h3>
              <p className="text-mid-green text-sm font-medium mt-1 mb-4">[ROLE]</p>
              <p className="text-muted text-sm leading-relaxed">
                [BIO PLACEHOLDER] A passionate digital professional with deep experience
                in software development and digital strategy. Dedicated to building
                products that make a real difference for clients and their customers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
