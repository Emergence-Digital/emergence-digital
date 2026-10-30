"use client";

import { useRef, type ReactNode } from "react";
import type { LabelGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard from "./NewsCard";
import { countUp, numberFormat, useReveal } from "./useReveal";

/** Seconds before the stat starts counting down: once the sticker has landed. */
const COUNT_AFTER = 0.6;

interface LabelBlockProps {
  graphic: LabelGraphic;
  jump?: ReactNode;
}

/**
 * A plain white box labelled `box`. A mid-green `sticker` drops in from above and sticks over the label, slightly
 * crooked. Under it, a news card counts down from 100 to `stat.display` ("<20%").
 */
export default function LabelBlock({ graphic, jump }: LabelBlockProps) {
  const { box, sticker, stat, sourceTab } = graphic;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // While counting, the figure shows without its "<" ("87%"); it lands on the full display ("<20%").
  const target = parseFloat(stat.display.replace(/[^\d.]/g, ""));
  const counting = numberFormat(stat.display.replace(/^[<>~]\s*/, ""));

  useReveal(ref, {
    onArm: () => {
      if (numberRef.current) numberRef.current.textContent = counting(100);
    },
    onPlay: () => {
      window.setTimeout(() => countUp(numberRef.current, target, counting, stat.display, 1000, 100), COUNT_AFTER * 1000);
    },
  });

  const description =
    `A box labelled “${box}”, with a “${sticker}” sticker stuck over the label. ` +
    `${spoken(stat.display)} ${smartQuotes(stat.label)}. Source: ${sourceTab.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}

      <div aria-hidden="true" className="mx-auto max-w-[460px]">
        <div className="rounded-2xl border border-dark-green/10 bg-white p-5 shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)]">
          <div className="relative rounded-xl border-2 border-dashed border-dark-green/20 px-5 py-6 text-center">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted">Contents</p>
            <p className="mt-2 font-serif text-3xl font-bold leading-tight text-dark-green">{box}</p>
            {/* The sticker sits over the label's words, so their ends still peek out. */}
            <span className="absolute inset-x-0 top-[52%] flex justify-center">
              <span
                className="rounded-lg bg-mid-green px-5 py-2.5 font-serif text-2xl font-bold text-white -rotate-[4deg] shadow-[0_6px_10px_-4px_rgba(28,56,48,0.45)] armed:opacity-0 playing:animate-sticker-drop"
                style={{ animationDelay: "0.1s" }}
              >
                {sticker}
              </span>
            </span>
          </div>
        </div>
      </div>

      <NewsCard source={sourceTab} className="mt-12">
        <span className="inline-grid font-serif text-6xl font-bold leading-none tracking-tight">
          <span className="invisible col-start-1 row-start-1">{stat.display}</span>
          <span ref={numberRef} className="col-start-1 row-start-1">
            {stat.display}
          </span>
        </span>
        <p className="mt-4 text-lg leading-snug text-white/90">{smartQuotes(stat.label)}</p>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
