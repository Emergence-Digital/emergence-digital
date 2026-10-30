"use client";

import { useRef, type ReactNode } from "react";
import type { ForecastGraphic } from "@/lib/insights-data";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

const TICKS = 13;

interface ForecastBlockProps {
  graphic: ForecastGraphic;
  jump?: ReactNode;
}

/**
 * A plain line with ticks and no numbers. The "Refresh" marker starts at the left third, under the `from` label,
 * then slides right to `to` and shrinks to 70%; a dashed outline stays where it started. An illustration, captioned
 * as one.
 */
export default function ForecastBlock({ graphic, jump }: ForecastBlockProps) {
  const { eyebrow, from, to } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const pill = "rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap";

  return (
    <figure ref={ref}>
      <NewsCard jump={jump}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <div className="relative mt-7 h-[6.25rem]">
          {/* Labels sit on their line above where the marker starts and ends: the left third, and 82% across (the
              middle of the last 36%, where `to` may wrap on phones). */}
          <span className="absolute bottom-[3.75rem] left-1/3 -translate-x-1/2 text-sm text-white/75 whitespace-nowrap">{from}</span>
          <span className="absolute bottom-[3.75rem] right-0 w-[36%] text-center text-sm font-semibold leading-snug text-sage">{to}</span>

          {/* The line and its ticks. Stretched to the card's width, so strokes keep their own width. */}
          <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="absolute inset-x-0 top-12 h-4 w-full text-white/35">
            <path d="M0 8H100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {Array.from({ length: TICKS }, (_, i) => {
              const x = (i / (TICKS - 1)) * 100;
              return <path key={i} d={`M${x} 3V13`} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />;
            })}
          </svg>

          {/* Where the refresh was planned */}
          <span className={`absolute left-1/3 top-[4.125rem] -translate-x-1/2 border border-dashed border-white/35 text-transparent ${pill}`}>
            Refresh
          </span>

          {/* The marker, resting where it ends up */}
          <span className="absolute left-[82%] top-[4.125rem] armed:left-1/3 playing:animate-marker-slide">
            <span
              className={`block -translate-x-1/2 bg-mid-green text-white origin-center scale-70 armed:scale-100 playing:animate-marker-shrink ${pill}`}
            >
              Refresh
            </span>
          </span>
        </div>
      </NewsCard>
      <figcaption className="mt-3 text-xs text-muted">
        Illustration
        <span className="sr-only">
          : {eyebrow.toLowerCase()}, moving from {from.toLowerCase()} to {to.toLowerCase()}
        </span>
      </figcaption>
    </figure>
  );
}
