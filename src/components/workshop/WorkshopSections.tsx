import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { ShanePortrait } from "@/components/sections/AboutShane";
import type { Workshop } from "@/lib/workshops";

/** Renders the **bold** runs in a line of copy from workshops.ts. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-dark-green">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

/** The tick on the services library's chips. */
function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="flex-none">
      <circle cx="7" cy="7" r="7" className="fill-mid-green" />
      <path d="M4 7.2l2 2 4-4.2" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "What you'll learn", in the style of the homepage "Why choose Emergence" section: the heading on the left of a
 * dark green band, and glass cards with a benefit tile on the right. On phones the button follows the cards.
 */
export function WorkshopLearn({ workshop, ctaHref }: { workshop: Workshop; ctaHref: string }) {
  return (
    <section className="bg-dark-green py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-x-16 gap-y-10 items-center">
        <div className="lg:self-end">
          <SectionLabel light>What you&apos;ll learn</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            What we&apos;ll work through together
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">{workshop.learnIntro}</p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          {workshop.learn.map((item) => (
            <li key={item.title} className="rounded-2xl bg-white/5 border border-white/10 p-2">
              <Image
                src={item.image}
                alt=""
                width={640}
                height={400}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="w-full h-auto"
              />
              <div className="px-2 pt-1 pb-2">
                <h3 className="text-cream font-semibold leading-snug">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mt-1">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="lg:self-start">
          <Button href={ctaHref} variant="outline-light" className="text-base px-10 py-4">
            Reserve your seat
          </Button>
        </div>
      </div>
    </section>
  );
}

/** "Everything you get", in the style of the services library rows: a scene, the title, the outcome and chips. */
export function WorkshopIncluded({ workshop, ctaHref }: { workshop: Workshop; ctaHref: string }) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Everything you get</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">What comes with your seat</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {workshop.included.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-dark-green/10 bg-white px-6 py-6 md:px-7 shadow-[0_14px_30px_-18px_rgba(28,56,48,0.4)]"
            >
              <div className="relative aspect-[5/3] -mx-3 -mt-3 mb-5">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 470px, (min-width: 768px) 45vw, 100vw"
                  className="object-contain"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark-green leading-tight">{item.title}</h3>
              <p className="text-muted mt-1.5 leading-snug">{item.body}</p>
              {item.features && item.features.length > 0 && (
                <ul aria-label="Includes" className="mt-4 flex flex-wrap gap-2">
                  {item.features.map((feature, i) => (
                    <li
                      key={`${feature}-${i}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream border border-dark-green/10 px-3 py-1 text-[13px] text-dark-green"
                    >
                      <Tick />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
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

/**
 * "Introducing...": who runs the workshop, modelled on the reference page's section of the same name, with
 * Shane's portrait beside the copy and one more button to the form.
 */
export function WorkshopIntroducing({ workshop, ctaHref }: { workshop: Workshop; ctaHref: string }) {
  const { name, paragraphs } = workshop.introducing;
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-12 lg:gap-20 items-center">
        <div>
          <p className="text-lg text-muted mb-2">Introducing&hellip;</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-dark-green leading-[1.05] tracking-tight mb-8">
            {name}
          </h2>
          <div className="space-y-5 text-body text-lg leading-relaxed">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{withBold(paragraph)}</p>
            ))}
          </div>
          <Button href={ctaHref} variant="primary" className="text-base px-10 py-4 mt-10">
            Reserve your seat
          </Button>
        </div>
        <ShanePortrait />
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
