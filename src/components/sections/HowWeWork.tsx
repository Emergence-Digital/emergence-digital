import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a single strategy call to map your expertise, your ideal clients, and the theme your next campaign should be built around — no generic content calendar, just your actual point of view.",
  },
  {
    number: "02",
    title: "Build & Run",
    description:
      "We build your monthly digital strategy from the ground up — content, structure, lead capture, and delivery — then develop a full suite of guides, articles, and social content.",
  },
  {
    number: "03",
    title: "Promote & Convert",
    description:
      "We promote every campaign across email and social, then follow up with attendees and leads directly, so momentum turns into booked meetings and tracked sales opportunities.",
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
            A process built for results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">
              {/* Circular step number */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-mid-green mb-6">
                <span className="font-serif font-bold text-mid-green text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark-green mb-3">
                {step.title}
              </h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
