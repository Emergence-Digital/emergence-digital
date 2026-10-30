"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { RingGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard from "./NewsCard";
import { countUp, numberFormat, useReveal } from "./useReveal";

// A circle of radius 52 starting at 12 o'clock, drawn as a path so pathLength works in every browser.
const CIRCLE = "M60 8a52 52 0 1 1 0 104a52 52 0 1 1 0-104";

interface RingBlockProps {
  graphic: RingGraphic;
  jump?: ReactNode;
}

/** A percentage ring: the sage arc fills to `value`% while the figure in the middle counts up; the chip pops in after. */
export default function RingBlock({ graphic, jump }: RingBlockProps) {
  const { value, display, label, chip, sourceTab } = graphic;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useReveal(ref, {
    onArm: () => {
      if (numberRef.current) numberRef.current.textContent = numberFormat(display)(0);
    },
    onPlay: () => countUp(numberRef.current, value, numberFormat(display), display),
  });

  const description = `${spoken(display)} ${label}.${chip ? ` ${chip}.` : ""} Source: ${sourceTab.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      <NewsCard source={sourceTab} jump={jump}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative h-40 w-40 flex-none">
            <svg viewBox="0 0 120 120" className="h-full w-full">
              <path d={CIRCLE} fill="none" stroke="currentColor" strokeWidth="12" className="text-white/15" />
              <path
                d={CIRCLE}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                pathLength={100}
                strokeDasharray={`${value} 100`}
                className="text-sage armed:[stroke-dashoffset:var(--ring-from)] playing:animate-ring-fill"
                style={{ "--ring-from": value } as CSSProperties}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-serif text-4xl font-bold tracking-tight">
              <span className="inline-grid">
                <span className="invisible col-start-1 row-start-1">{display}</span>
                <span ref={numberRef} className="col-start-1 row-start-1 text-center">
                  {display}
                </span>
              </span>
            </span>
          </div>
          <div>
            <p className="text-lg leading-snug text-white/90 sm:text-xl">{smartQuotes(label)}</p>
            {chip && (
              <span
                className="mt-4 inline-block rounded-full bg-mid-green px-3.5 py-1.5 text-sm font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
                style={{ animationDelay: "1.15s" }}
              >
                {smartQuotes(chip)}
              </span>
            )}
          </div>
        </div>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
