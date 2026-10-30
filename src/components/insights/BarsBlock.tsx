"use client";

import { useRef, type ReactNode } from "react";
import type { BarsGraphic } from "@/lib/insights-data";
import { spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

/** Seconds between one bar starting and the next. */
const STEP = 0.12;

interface BarsBlockProps {
  graphic: BarsGraphic;
  source: string;
  jump?: ReactNode;
}

/**
 * One horizontal bar per item, scaled to the largest, with its label on the left and its figure at its end. Bars grow
 * top to bottom; the highlighted one grows last, in sage.
 */
export default function BarsBlock({ graphic, source, jump }: BarsBlockProps) {
  const { eyebrow, items } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const max = Math.max(...items.map((item) => item.value));
  const plain = items.filter((item) => !item.highlight);
  // Plain bars go in order; highlighted ones follow after a short pause.
  const startOf = (i: number) => {
    const item = items[i];
    return item.highlight ? plain.length * STEP + 0.15 : plain.indexOf(item) * STEP;
  };

  const description =
    `${eyebrow}: ` + items.map((item) => `${item.label}, ${spoken(item.display)}`).join("; ") + `. Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      <NewsCard source={source} jump={jump}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <ul className="mt-6 space-y-4 sm:space-y-3.5">
          {items.map((item, i) => {
            const at = startOf(i);
            return (
              <li key={item.label} className="sm:grid sm:grid-cols-[11.5rem_minmax(0,1fr)] sm:items-center sm:gap-x-4">
                <span className={`block text-sm leading-snug ${item.highlight ? "font-semibold text-sage" : "text-white/80"}`}>
                  {item.label}
                </span>
                {/* The right margin keeps room for the figure past the longest bar. */}
                <div className="relative mt-1.5 mr-16 h-3.5 sm:mt-0">
                  <div
                    className={`h-full rounded-full origin-left armed:scale-x-0 playing:animate-bar-grow ${
                      item.highlight ? "bg-sage" : "bg-white/25"
                    }`}
                    style={{ width: `${(item.value / max) * 100}%`, animationDelay: `${at}s` }}
                  />
                  <span
                    className={`absolute top-1/2 ml-2.5 -translate-y-1/2 whitespace-nowrap text-sm font-semibold armed:opacity-0 playing:animate-fade-in ${
                      item.highlight ? "text-sage" : "text-white"
                    }`}
                    style={{ left: `${(item.value / max) * 100}%`, animationDelay: `${at + 0.45}s` }}
                  >
                    {item.display}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
