"use client";

import { useRef, type ReactNode } from "react";
import type { StatGraphic } from "@/lib/insights-data";
import { spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { countUp, numberFormat, useReveal } from "./useReveal";

interface StatBlockProps {
  graphic: StatGraphic;
  source: string;
  jump?: ReactNode;
}

/** The headline figure: counts up from 0 (1.2s), the chip pops in, then one bar per compared period grows in turn. */
export default function StatBlock({ graphic, source, jump }: StatBlockProps) {
  const { eyebrow, value, display, chip, compare, note } = graphic;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const max = Math.max(...compare.items.map((item) => item.value));

  useReveal(ref, {
    onArm: () => {
      if (numberRef.current) numberRef.current.textContent = numberFormat(display)(0);
    },
    onPlay: () => countUp(numberRef.current, value, numberFormat(display), display),
  });

  const description =
    `${eyebrow}: ${spoken(display)}, ${spoken(chip)}. ` +
    compare.items.map((item) => `${item.label}: ${spoken(`${item.value}${compare.unit}`)}.`).join(" ") +
    ` ${note}. Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      <NewsCard source={source} jump={jump}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
          {/* The finished figure holds the width while the count-up runs over it. */}
          <span className="inline-grid font-serif text-6xl sm:text-7xl font-bold leading-none tracking-tight">
            <span className="invisible col-start-1 row-start-1">{display}</span>
            <span ref={numberRef} className="col-start-1 row-start-1">
              {display}
            </span>
          </span>
          <span
            className="rounded-full bg-mid-green px-3.5 py-1.5 text-sm font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
            style={{ animationDelay: "1.05s" }}
          >
            {chip}
          </span>
        </div>

        <ul className="mt-8 space-y-4">
          {compare.items.map((item, i) => (
            <li key={item.label}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-white/75">{item.label}</span>
                <span className={`font-semibold ${item.highlight ? "text-sage" : "text-white"}`}>
                  {item.value}
                  {compare.unit}
                </span>
              </div>
              <div
                className={`mt-2 h-3.5 rounded-full origin-left armed:scale-x-0 playing:animate-bar-grow ${
                  item.highlight ? "bg-sage" : "bg-white/25"
                }`}
                style={{ width: `${(item.value / max) * 100}%`, animationDelay: `${0.2 + i * 0.3}s` }}
              />
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm font-semibold text-sage armed:opacity-0 playing:animate-fade-in" style={{ animationDelay: "1.2s" }}>
          {note}
        </p>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
