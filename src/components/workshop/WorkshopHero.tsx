import { mangalProBold, sageShadow, THICKEN } from "@/lib/fonts";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ResponsiveVimeoEmbed from "@/components/ui/ResponsiveVimeoEmbed";
import type { Workshop } from "@/lib/workshops";

interface WorkshopHeroProps {
  workshop: Workshop;
  /** Line one of the headline; the payoff sits on the tilted sage block below it. */
  headline: [string, string];
  ctaHref: string;
}

/**
 * Workshop landing page hero, in the home hero's style: the event line, the two-line headline (dark green with a
 * sage drop shadow, then the payoff on a tilted sage block), the hook, the event facts, the button and the video.
 */
export default function WorkshopHero({ workshop, headline, ctaHref }: WorkshopHeroProps) {
  const facts = ["Live on Zoom", `${workshop.durationMinutes} minutes`, workshop.priceLabel];

  return (
    <section className="relative flex items-center justify-center bg-cream pt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,124,89,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center pt-20 pb-24 md:pt-28 md:pb-28">
        <SectionLabel>
          Live workshop · {workshop.shortDateLabel} · {workshop.startTimeLabel}
        </SectionLabel>
        <h1
          className={`${mangalProBold.className} font-bold leading-none tracking-tight whitespace-nowrap text-[6.4vw] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mx-auto mt-3 mb-10`}
        >
          <span className={`inline-block text-dark-green ${THICKEN}`} style={sageShadow(0.06)}>
            {headline[0]}
          </span>{" "}
          <span className="block mt-[0.12em]">
            <span
              className={`inline-block bg-sage text-dark-green text-[1.1em] px-[0.33em] pt-[0.16em] pb-[0.1em] rounded-[0.13em] -rotate-[2.5deg] ${THICKEN}`}
            >
              {headline[1]}
            </span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-body leading-relaxed max-w-2xl mx-auto mb-6">{workshop.hook}</p>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-10 text-sm text-muted">
          {facts.map((fact, i) => (
            <li key={fact} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-mid-green" />
              )}
              {fact}
            </li>
          ))}
        </ul>
        <Button href={ctaHref} variant="primary" className="text-base px-10 py-4">
          Reserve your seat
        </Button>
        <ResponsiveVimeoEmbed
          desktopId={workshop.heroVideo.desktop}
          mobileId={workshop.heroVideo.mobile}
          title={workshop.heroVideo.title}
          autoplay={workshop.heroVideo.autoplay}
          className="max-w-4xl mx-auto mt-16"
        />
      </div>
    </section>
  );
}
