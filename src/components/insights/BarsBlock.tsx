"use client";

import { useRef, type ReactNode } from "react";
import type { BarsGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

/** Seconds between one bar starting and the next. */
const STEP = 0.12;
/** Height of the tallest vertical bar, in px. */
const TALLEST = 150;

type Item = BarsGraphic["items"][number];

interface BarsBlockProps {
  graphic: BarsGraphic;
  source: string;
  jump?: ReactNode;
}

/**
 * Horizontal: label on the left, figure at the bar's end. Plain bars grow top to bottom, the highlighted one last.
 * With `track`, each bar sits on a faint full-width track (bars out of a fixed scale).
 */
function HorizontalBars({ items, max, track }: { items: Item[]; max: number; track: boolean }) {
  const plain = items.filter((item) => !item.highlight);
  const startOf = (item: Item) => (item.highlight ? plain.length * STEP + 0.15 : plain.indexOf(item) * STEP);
  // Room past the longest bar for the longest figure ("$851M · +67.5%").
  const longest = Math.max(...items.map((item) => item.display.length));

  return (
    <ul className="mt-6 space-y-4 sm:space-y-3.5">
      {items.map((item) => {
        const at = startOf(item);
        return (
          <li key={item.label} className="sm:grid sm:grid-cols-[11.5rem_minmax(0,1fr)] sm:items-center sm:gap-x-4">
            <span className={`block text-sm leading-snug ${item.highlight ? "font-semibold text-sage" : "text-white/80"}`}>
              {item.label}
            </span>
            <div className="relative mt-1.5 h-3.5 sm:mt-0" style={{ marginRight: `calc(${longest * 0.9}ch + 0.75rem)` }}>
              {track && <div className="absolute inset-0 rounded-full bg-white/10" />}
              <div
                className={`relative h-full rounded-full origin-left armed:scale-x-0 playing:animate-bar-grow ${
                  item.highlight ? "bg-sage" : track ? "bg-white/35" : "bg-white/25"
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
  );
}

/** Vertical: bars side by side growing up, left to right, figures above and labels (years) below; chips pop in last. */
function VerticalBars({ items, max }: { items: Item[]; max: number }) {
  return (
    <ul className="mt-6 flex items-end justify-around gap-4 sm:justify-start sm:gap-10">
      {items.map((item, i) => {
        const at = 0.1 + i * 0.2;
        return (
          <li key={item.label} className="flex w-20 flex-col items-center sm:w-24">
            {item.chip && (
              <span
                className="mb-2 rounded-full bg-mid-green px-2.5 py-1 text-xs font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
                style={{ animationDelay: `${at + 0.75}s` }}
              >
                {item.chip}
              </span>
            )}
            <span
              className={`font-serif text-2xl font-bold leading-none tracking-tight armed:opacity-0 playing:animate-fade-in ${
                item.highlight ? "text-sage" : "text-white"
              }`}
              style={{ animationDelay: `${at + 0.5}s` }}
            >
              {item.display}
            </span>
            <span
              className={`mt-2.5 w-full rounded-t-lg origin-bottom armed:scale-y-0 playing:animate-bar-rise ${
                item.highlight ? "bg-sage" : "bg-white/25"
              }`}
              style={{ height: `${Math.round((item.value / max) * TALLEST)}px`, animationDelay: `${at}s` }}
            />
            <span className={`mt-2.5 text-sm ${item.highlight ? "font-semibold text-sage" : "text-white/75"}`}>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Bars on a news card, horizontal or vertical, with an optional note under them in sage. */
export default function BarsBlock({ graphic, source, jump }: BarsBlockProps) {
  const { eyebrow, items, note, scale, orientation = "horizontal" } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  // Out of `scale` when given (67% of 100), otherwise scaled to the largest item.
  const max = scale ?? Math.max(...items.map((item) => item.value));
  const vertical = orientation === "vertical";

  const description =
    `${eyebrow}: ` +
    items.map((item) => [item.label, spoken(item.display), item.chip && spoken(item.chip)].filter(Boolean).join(", ")).join("; ") +
    `.${note ? ` ${smartQuotes(note)}.` : ""} Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      <NewsCard source={source} jump={jump}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        {vertical ? <VerticalBars items={items} max={max} /> : <HorizontalBars items={items} max={max} track={scale !== undefined} />}
        {note && (
          <p
            className="mt-6 text-sm font-semibold text-sage armed:opacity-0 playing:animate-fade-in"
            style={{ animationDelay: `${0.2 + items.length * (vertical ? 0.2 : STEP) + 0.6}s` }}
          >
            {smartQuotes(note)}
          </p>
        )}
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
