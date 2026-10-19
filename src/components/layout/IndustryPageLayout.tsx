import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";
import IndustryServices from "@/components/sections/IndustryServices";
import type { Shift } from "@/lib/industries-data";
import { shiftIcons, type ShiftIcon } from "@/lib/shift-icons";

interface IndustryPageLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  beforeParagraph: string;
  shifts: Shift[];
  afterParagraph: string;
  relatedServices: string[];
}

// The "from this, to this" rows share one grid: today, the arrow, ninety days in.
const shiftColumns = "lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)]";

function ShiftIconTile({ name, after = false }: { name: ShiftIcon; after?: boolean }) {
  const Icon = shiftIcons[name];
  return (
    <span
      className={`flex-none grid place-items-center w-12 h-12 rounded-xl ${
        after ? "bg-mid-green text-white" : "bg-dark-green/[0.06] text-dark-green/50"
      }`}
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export default function IndustryPageLayout({
  eyebrow,
  title,
  subtitle,
  beforeParagraph,
  shifts,
  afterParagraph,
  relatedServices,
}: IndustryPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6 max-w-3xl">
            {title}
          </h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed mb-10">
            {subtitle}
          </p>
          <Button href="/contact" variant="primary">
            Book a Strategy Call
          </Button>
        </div>
      </section>

      {/* The gap you're standing in */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16 items-start">
          <div>
            <SectionLabel>The Gap You&apos;re Standing In</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-tight">
              You&rsquo;re better than you look from the outside.
            </h2>
          </div>
          <p className="text-body text-lg md:text-xl leading-relaxed lg:pt-9">
            {beforeParagraph}
          </p>
        </div>
      </section>

      {/* From this, to this: each pain today paired with where it stands ninety days in */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 md:mb-14">
            <SectionLabel>What Changes</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
              From this, to this.
            </h2>
          </div>

          <div
            aria-hidden="true"
            className={`grid grid-cols-[auto_auto_auto] justify-center lg:justify-normal ${shiftColumns} items-center gap-3 lg:gap-0 mb-5 text-xs font-semibold tracking-widest uppercase`}
          >
            <span className="text-muted lg:px-6">Today</span>
            <ArrowRight size={14} className="text-muted lg:hidden" />
            <span className="hidden lg:block" />
            <span className="text-mid-green lg:px-6">Ninety days in</span>
          </div>

          <ol className="flex flex-col gap-9 lg:gap-5">
            {shifts.map((shift) => (
              <li key={shift.from} className={`grid grid-cols-1 ${shiftColumns}`}>
                <div className="flex items-center gap-4 rounded-2xl border border-dashed border-dark-green/25 px-5 py-5 md:px-6">
                  <ShiftIconTile name={shift.fromIcon} />
                  <p className="text-muted leading-snug">
                    <span className="sr-only">Today: </span>
                    {shift.from}
                  </p>
                </div>
                <div aria-hidden="true" className="relative z-10 flex justify-center items-center -my-3 lg:my-0">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-dark-green text-white ring-4 ring-cream">
                    <ArrowRight size={18} strokeWidth={2} className="rotate-90 lg:rotate-0" />
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white border border-dark-green/10 shadow-[0_14px_30px_-18px_rgba(28,56,48,0.35)] px-5 py-5 md:px-6">
                  <ShiftIconTile name={shift.toIcon} after />
                  <p className="text-dark-green font-medium leading-snug">
                    <span className="sr-only">Ninety days in: </span>
                    {shift.to}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where this gets you */}
      <section className="bg-dark-green py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16 items-start">
          <div>
            <SectionLabel light>Where This Gets You</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Now you look as good as you are.
            </h2>
          </div>
          <p className="text-white/75 text-lg md:text-xl leading-relaxed lg:pt-9">
            {afterParagraph}
          </p>
        </div>
      </section>

      <IndustryServices slugs={relatedServices} />

      <CTABanner />
    </>
  );
}
