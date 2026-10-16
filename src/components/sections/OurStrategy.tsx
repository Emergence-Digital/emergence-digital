import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

// Scenes are exported from the Illustrator card library (~/Adobe MCPs/centurion-cards).
const pillars = [
  {
    title: "Attraction",
    outcome:
      "The right decision makers at the right companies know who you are. Your pipeline fills with buyers who fit, not whoever happens to find you.",
    image: "/strategy/attraction.webp",
    alt: "Outbound and inbound channel cards feeding a website visit from an ideal customer, marked as an ICP match",
  },
  {
    title: "Engagement",
    outcome:
      "Buyers trust you before the first meeting. Prospects arrive already convinced you can deliver, so conversations start with fit, not price.",
    image: "/strategy/engagement.webp",
    alt: "A video, a buyer's guide, a live workshop with 48 registered and a case study quote",
  },
  {
    title: "Conversion",
    outcome:
      "Interest turns into signed contracts. Opportunities close faster, with shorter sales cycles and less discounting along the way.",
    image: "/strategy/conversion.webp",
    alt: "A deal moving through nurture, signals, proposal and signed, a rising revenue chart and a deal won notification",
  },
];

export default function OurStrategy() {
  return (
    <section className="bg-dark-green py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel light>Our Strategy</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white text-balance">
            How we win enterprise and mid-market deals for you.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 max-w-md mx-auto lg:max-w-none">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="bg-white rounded-2xl p-6">
              <div className="relative aspect-[9/8] mb-6">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(min-width: 1024px) 340px, 448px"
                  className="object-contain"
                />
                {/* Connector to the next pillar, centred on the gap between cards */}
                {index < pillars.length - 1 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 64 16"
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+16px)] w-16 h-4 overflow-visible z-10"
                  >
                    <line x1="8" y1="8" x2="56" y2="8" stroke="white" strokeWidth="2" />
                    <circle cx="8" cy="8" r="6" fill="white" stroke="#1C3830" strokeWidth="2" />
                    <circle cx="56" cy="8" r="6" fill="white" stroke="#1C3830" strokeWidth="2" />
                  </svg>
                )}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-dark-green mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted leading-relaxed">{pillar.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
