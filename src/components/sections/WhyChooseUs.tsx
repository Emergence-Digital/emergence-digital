import SectionLabel from "@/components/ui/SectionLabel";

const features = [
  {
    title: "Digital Strategy, Done For You",
    description:
      "We build and run your marketing strategy as seamlessly as possible, so consistent thought leadership never competes with delivery work again.",
  },
  {
    title: "Content That Compounds",
    description:
      "Your thought leadership delivered through digital events, guides, blog series, and social content — one conversation repurposed into weeks of proof that you know your category.",
  },
  {
    title: "Real Pipeline, Not Just Reach",
    description:
      "CRM segmentation, sales follow-up, and reporting are built into every campaign, so attention converts into tracked, qualified opportunities.",
  },
  {
    title: "Built Around Your Point of View",
    description:
      "We start every campaign by extracting your expertise, not writing generic content — so your brand sounds like you, not like everyone else in your category.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-dark-green py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <div>
            <SectionLabel light>Why Choose Emergence</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              The agency that turns expertise into authority.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              We&apos;re a Melbourne marketing team built specifically for IT, MSP
              and consulting firm owners who are excellent at the work but
              invisible in the market. We combine strategic positioning with
              hands-on campaign delivery — so recognition turns into real
              pipeline, not just attention.
            </p>
          </div>

          {/* Right — feature checkpoints */}
          <div className="space-y-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                {/* Checkmark */}
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-mid-green flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
