"use client";

import { useId, useRef, type ReactNode } from "react";
import type { ShieldGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import NewsCard from "./NewsCard";
import { useReveal } from "./useReveal";

// Lucide's shield (24 × 24). Its outline runs from about y = 2 at the top to y = 22 at the point.
const SHIELD =
  "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z";
const TOP = 2;
const BOTTOM = 22;

interface ShieldBlockProps {
  graphic: ShieldGraphic;
  jump?: ReactNode;
}

/** A large outlined shield that fills with sage from the bottom to `fill`, beside `display` and `label`; the tags pop in after. */
export default function ShieldBlock({ graphic, jump }: ShieldBlockProps) {
  const { fill, display, label, tags, sourceTab } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const clip = `shield-${useId().replace(/[^\w-]/g, "")}`;
  const level = BOTTOM - fill * (BOTTOM - TOP);

  const description = `${display} ${smartQuotes(label)}: ${tags.join(" and ")}. Source: ${sourceTab.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      <NewsCard source={sourceTab} jump={jump}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <svg viewBox="0 0 24 24" className="h-40 w-40 flex-none sm:h-44 sm:w-44">
            <defs>
              <clipPath id={clip}>
                <path d={SHIELD} />
              </clipPath>
            </defs>
            <path d={SHIELD} className="fill-white/[0.06]" />
            <rect
              x="0"
              y={level}
              width="24"
              height={BOTTOM - level + 1}
              clipPath={`url(#${clip})`}
              className="fill-sage origin-bottom [transform-box:fill-box] armed:scale-y-0 playing:animate-bar-rise"
              style={{ animationDuration: "0.9s", animationDelay: "0.1s" }}
            />
            <path d={SHIELD} fill="none" stroke="currentColor" strokeWidth="0.45" strokeLinejoin="round" className="text-sage" />
          </svg>
          <div>
            <p
              className="font-serif text-5xl font-bold leading-none tracking-tight armed:opacity-0 playing:animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {display}
            </p>
            <p className="mt-3 text-lg leading-snug text-white/90">{smartQuotes(label)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <li
                  key={tag}
                  className="rounded-full bg-sage px-3 py-1 text-sm font-semibold text-dark-green armed:opacity-0 playing:animate-chip-pop"
                  style={{ animationDelay: `${0.95 + i * 0.2}s` }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
