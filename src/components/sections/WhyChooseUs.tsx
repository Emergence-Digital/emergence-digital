import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

// Benefit tiles are exported from the Illustrator card library (~/Adobe MCPs/centurion-cards).
type Benefit = { title: string; image: string };

const rows: { benefits: Benefit[]; direction: "left" | "right"; duration: string }[] = [
  {
    direction: "left",
    duration: "60s",
    benefits: [
      { title: "Win bigger clients", image: "/benefits/bigger-clients.webp" },
      { title: "Higher margin", image: "/benefits/higher-margin.webp" },
      { title: "Strong project pipeline", image: "/benefits/pipeline.webp" },
      { title: "Shorter sales cycles", image: "/benefits/shorter-cycles.webp" },
    ],
  },
  {
    direction: "right",
    duration: "70s",
    benefits: [
      { title: "Compete with the Big 4 and larger firms", image: "/benefits/compete.webp" },
      { title: "Increased cash flow", image: "/benefits/cash-flow.webp" },
      { title: "More opportunities", image: "/benefits/opportunities.webp" },
      { title: "Repeat customers", image: "/benefits/repeat-customers.webp" },
    ],
  },
  {
    direction: "left",
    duration: "52s",
    benefits: [
      { title: "More profit", image: "/benefits/more-profit.webp" },
      { title: "Increased revenue", image: "/benefits/revenue.webp" },
      { title: "Busy team, thin bench", image: "/benefits/busy-team.webp" },
      { title: "Business positioned for sale", image: "/benefits/for-sale.webp" },
    ],
  },
];

function BenefitCard({ benefit, hidden }: { benefit: Benefit; hidden?: boolean }) {
  return (
    <li className="w-64 shrink-0 pr-4" aria-hidden={hidden || undefined}>
      <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-2">
        <Image
          src={benefit.image}
          alt=""
          width={640}
          height={400}
          sizes="240px"
          className="w-full h-auto"
        />
        <p className="text-cream font-semibold text-sm leading-snug px-2 pt-1 pb-2 min-h-[2.75rem] flex items-center">
          {benefit.title}
        </p>
      </div>
    </li>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-dark-green py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — headline */}
          <div>
            <SectionLabel light>Why Choose Emergence</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              We don&apos;t chase likes. We chase what grows your business.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Impressions, followers and open rates look good in a monthly
              report, but they don&apos;t win contracts or pay your team. We
              judge our work by the numbers IT business owners actually care
              about.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Bigger clients, healthier margins, a pipeline you can plan around,
              steady cash flow and a business that&apos;s worth more when
              you&apos;re ready to sell. If it doesn&apos;t show up in your
              revenue, your margin or your calendar, we don&apos;t count it as a
              win.
            </p>
          </div>

          {/* Right — benefit tickers; each list is doubled so the loop is seamless */}
          <div className="space-y-4 -mx-6 lg:mx-0 min-w-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            {rows.map((row, i) => (
              <div key={i} className="overflow-hidden">
                <ul
                  className={`flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none ${
                    row.direction === "left" ? "animate-ticker-left" : "animate-ticker-right"
                  }`}
                  style={{ animationDuration: row.duration }}
                >
                  {row.benefits.map((b) => (
                    <BenefitCard key={b.title} benefit={b} />
                  ))}
                  {row.benefits.map((b) => (
                    <BenefitCard key={`${b.title}-copy`} benefit={b} hidden />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
