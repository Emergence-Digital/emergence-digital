import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";
import IndustryHeroCards from "@/components/sections/IndustryHeroCards";
import IndustryServices from "@/components/sections/IndustryServices";
import type { Shift } from "@/lib/industries-data";
import { shiftIcons, type ShiftIcon } from "@/lib/shift-icons";

interface IndustryPageLayoutProps {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  beforeParagraph: string;
  shifts: Shift[];
  afterParagraph: string;
  relatedServices: string[];
}

// The closing-the-gap rows share one grid: what it costs today, the arrow, ninety days with us.
const shiftColumns = "lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)]";

function ShiftIconTile({ name, after = false }: { name: ShiftIcon; after?: boolean }) {
  const Icon = shiftIcons[name];
  return (
    <span
      className={`flex-none grid place-items-center w-12 h-12 rounded-xl ${
        after ? "bg-mid-green text-white" : "bg-body/[0.08] text-body"
      }`}
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export default function IndustryPageLayout({
  slug,
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
      {/* Hero: the copy, with this audience's cards floating beside it */}
      <section className="bg-cream pt-32 pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] gap-12 lg:gap-10 items-center">
          <div>
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
          <IndustryHeroCards slug={slug} />
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

      {/* Closing the gap: each pain costing them today, paired with where it stands ninety days with us */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 md:mb-14">
            <SectionLabel>Closing the Gap</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
              Every one of these is costing you deals.
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mt-5 text-balance">
              The right marketing closes each one. Here&rsquo;s what changes in your first ninety days with us.
            </p>
          </div>

          <div
            aria-hidden="true"
            className={`flex flex-wrap justify-center lg:grid ${shiftColumns} lg:justify-normal items-center gap-x-2.5 gap-y-1 lg:gap-0 mb-5 text-[11px] lg:text-xs font-semibold tracking-wider lg:tracking-widest uppercase whitespace-nowrap`}
          >
            <span className="text-body/70 lg:px-6">Costing you today</span>
            <ArrowRight size={14} className="text-body/70 lg:hidden" />
            <span className="hidden lg:block" />
            <span className="text-mid-green lg:px-6">Ninety days with us</span>
          </div>

          <ol className="flex flex-col gap-9 lg:gap-5">
            {shifts.map((shift) => (
              <li key={shift.from} className={`grid grid-cols-1 ${shiftColumns}`}>
                <div className="flex items-center gap-4 rounded-2xl bg-[#EAE3DA] border border-body/10 px-5 py-5 md:px-6">
                  <ShiftIconTile name={shift.fromIcon} />
                  <p className="text-body leading-snug">
                    <span className="sr-only">Costing you today: </span>
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
                    <span className="sr-only">Ninety days with us: </span>
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
