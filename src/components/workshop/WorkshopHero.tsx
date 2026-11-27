import { mangalProBold, sageShadow, THICKEN } from "@/lib/fonts";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ResponsiveVimeoEmbed from "@/components/ui/ResponsiveVimeoEmbed";
import type { Workshop, WorkshopTitle } from "@/lib/workshops";

interface WorkshopHeroProps {
  workshop: Workshop;
  /** The headline and hook for the ad's ?title= (see `titles` in workshops.ts). */
  title: WorkshopTitle;
  ctaHref: string;
}

/**
 * Workshop landing page hero, in the home hero's style. Everything that matters sits above the fold on a phone and a
 * laptop, as Cormac laid it out at Office Hours (25 Nov 2026): who it's for, the event line, the headline (dark green
 * with a sage drop shadow, then the payoff on a tilted sage block), the hook, the VSL, then a big button that glows
 * and hops. The VSL's width is capped by the screen's height so the button always fits; the facts can fall below.
 */
export default function WorkshopHero({ workshop, title, ctaHref }: WorkshopHeroProps) {
  const facts = ["Live on Zoom", `${workshop.durationMinutes} minutes`, workshop.priceLabel, `${workshop.seatLimit} seats`];

  return (
    <section className="relative flex items-center justify-center bg-cream pt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,124,89,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 text-center pt-5 pb-16 md:pt-4 md:pb-20">
        <p className="inline-block max-w-3xl rounded-2xl bg-dark-green text-cream text-xs sm:text-sm font-semibold leading-snug px-4 py-1.5 mb-4">
          {workshop.audience}
        </p>
        <div>
          <SectionLabel>
            Live workshop · {workshop.shortDateLabel} · {workshop.startTimeLabel}
          </SectionLabel>
        </div>
        <h1
          className={`${mangalProBold.className} font-bold leading-none tracking-tight whitespace-nowrap text-[6.4vw] sm:text-4xl md:text-5xl mx-auto mb-5`}
        >
          <span className={`inline-block text-dark-green ${THICKEN}`} style={sageShadow(0.06)}>
            {title.headline[0]}
          </span>{" "}
          <span className="block mt-[0.12em]">
            <span
              className={`inline-block bg-sage text-dark-green text-[1.1em] px-[0.33em] pt-[0.16em] pb-[0.1em] rounded-[0.13em] -rotate-[2.5deg] ${THICKEN}`}
            >
              {title.headline[1]}
            </span>
          </span>
        </h1>
        <p className="text-base md:text-lg text-body leading-snug max-w-2xl mx-auto mb-5">{title.hook}</p>
        <ResponsiveVimeoEmbed
          desktopId={workshop.heroVideo.desktop}
          mobileId={workshop.heroVideo.mobile}
          title={workshop.heroVideo.title}
          autoplay={workshop.heroVideo.autoplay}
          className="mx-auto max-w-[min(56rem,calc((100svh-30.5rem)*16/9))]"
        />
        <Button
          href={ctaHref}
          variant="primary"
          className="mt-7 text-lg font-semibold px-12 py-5 motion-safe:animate-cta-pulse"
        >
          Reserve your seat
        </Button>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-5 text-sm text-muted">
          {facts.map((fact, i) => (
            <li key={fact} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-mid-green" />}
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
