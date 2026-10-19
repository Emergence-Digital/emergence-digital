import Image from "next/image";
import heroCards from "@/lib/industry-hero-cards.json";

interface HeroCard {
  name: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface HeroCardSet {
  width: number;
  height: number;
  cards: HeroCard[];
}

const sets: Record<string, HeroCardSet> = heroCards;

/**
 * The floating cards beside an industry page's hero. Each card is its own image from the Illustrator card library
 * (centurion-cards, SC.hero), placed where it sits in Hero-<Set>.ai, so the layout scales with the column. Cards rise
 * in one after another, then each floats on its own loop; both stop for reduced motion.
 * To change a set: rebuild it in Illustrator, then run hero_to_site.py, which rewrites the images and the JSON.
 */
export default function IndustryHeroCards({ slug }: { slug: string }) {
  const set = sets[slug];
  if (!set) return null;

  return (
    <div aria-hidden="true" className="relative w-full max-w-[560px] mx-auto" style={{ aspectRatio: `${set.width} / ${set.height}` }}>
      {set.cards.map((card, i) => (
        <div
          key={card.src}
          className="absolute animate-card-rise motion-reduce:animate-none"
          style={{
            left: `${(card.x / set.width) * 100}%`,
            top: `${(card.y / set.height) * 100}%`,
            width: `${(card.w / set.width) * 100}%`,
            animationDelay: `${150 + i * 120}ms`,
          }}
        >
          <div
            className="animate-card-float motion-reduce:animate-none"
            style={{ animationDuration: `${6 + (i % 3) * 1.25}s`, animationDelay: `${-i * 1.7}s` }}
          >
            <Image
              src={card.src}
              alt=""
              width={Math.round(card.w * 2)}
              height={Math.round(card.h * 2)}
              sizes={`(min-width: 1024px) ${Math.round(card.w)}px, ${Math.round((card.w / set.width) * 100)}vw`}
              loading="eager"
              className="w-full h-auto [filter:drop-shadow(0_16px_22px_rgba(28,56,48,0.16))_drop-shadow(0_2px_4px_rgba(28,56,48,0.08))]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
