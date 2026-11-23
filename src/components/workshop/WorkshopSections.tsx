import { CirclePlay, FileText, LayoutTemplate, Sparkles, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Workshop } from "@/lib/workshops";

const INCLUDED_ICONS: Record<Workshop["included"][number]["icon"], LucideIcon> = {
  sparkles: Sparkles,
  template: LayoutTemplate,
  worksheet: FileText,
  replay: CirclePlay,
};

/** "What you'll learn": numbered cards, two across from md up. */
export function WorkshopLearn({ workshop, ctaHref }: { workshop: Workshop; ctaHref: string }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>What you&apos;ll learn</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
            What we&apos;ll work through together
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {workshop.learn.map((item, i) => (
            <li key={item.title} className="bg-cream rounded-2xl p-7 md:p-8 flex gap-5">
              <span className="w-10 h-10 shrink-0 rounded-full bg-mid-green text-white font-semibold grid place-items-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-dark-green mb-2">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12">
          <Button href={ctaHref} variant="primary" className="text-base px-10 py-4">
            Reserve your seat
          </Button>
        </div>
      </div>
    </section>
  );
}

/** "Everything you get": what comes with a seat, on dark-green-edged cards. */
export function WorkshopIncluded({ workshop, ctaHref }: { workshop: Workshop; ctaHref: string }) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Everything you get</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">What comes with your seat</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {workshop.included.map((item) => {
            const Icon = INCLUDED_ICONS[item.icon];
            return (
              <li key={item.title} className="bg-white rounded-2xl shadow-sm p-7 md:p-8 flex gap-5">
                <span className="w-12 h-12 shrink-0 rounded-xl bg-mid-green/10 text-mid-green grid place-items-center">
                  <Icon aria-hidden="true" className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-dark-green mb-2">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="text-center mt-12">
          <Button href={ctaHref} variant="primary" className="text-base px-10 py-4">
            Reserve your seat
          </Button>
        </div>
      </div>
    </section>
  );
}

/** A short closing band with one more button to the form. */
export function WorkshopFinalCta({ workshop, ctaHref }: { workshop: Workshop; ctaHref: string }) {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionLabel>{workshop.shortDateLabel}</SectionLabel>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green mb-5">Ready to plan 2027?</h2>
        <p className="text-muted text-lg leading-relaxed mb-8">
          {workshop.timeLabel}, live on Zoom. {workshop.priceLabel}, with seats limited to {workshop.seatLimit}.
        </p>
        <Button href={ctaHref} variant="primary" className="text-base px-10 py-4">
          Reserve your seat
        </Button>
      </div>
    </section>
  );
}
