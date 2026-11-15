"use client";

import { useRef, type ReactNode } from "react";
import type { LabelGraphic } from "@/lib/insights-data";
import { smartQuotes, sourceNote, spoken } from "@/lib/insights-format";
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
 * crooked. Under it, a news card counts down from 100 to `stat.display` ("<20%"), or, with no stat, the caption.
 */
export default function LabelBlock({ graphic, jump }: LabelBlockProps) {
  const { box, sticker, stat, sourceTab, caption } = graphic;
  // A sticker that runs to two lines (D2, D5) gets room under the label, so it doesn't hang off the box.
  const long = sticker.length > 28;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // While counting, the figure shows without its "<" ("87%"); it lands on the full display ("<20%").
  const target = stat ? parseFloat(stat.display.replace(/[^\d.]/g, "")) : 0;
  const counting = numberFormat(stat ? stat.display.replace(/^[<>~]\s*/, "") : "0");

  useReveal(ref, {
    onArm: () => {
      if (stat && numberRef.current) numberRef.current.textContent = counting(100);
    },
    onPlay: () => {
      if (stat) window.setTimeout(() => countUp(numberRef.current, target, counting, stat.display, 1000, 100), COUNT_AFTER * 1000);
    },
  });

  const description =
    `A box labelled “${smartQuotes(box)}”, with a “${smartQuotes(sticker)}” sticker stuck over the label.` +
    (stat ? ` ${spoken(stat.display)} ${smartQuotes(stat.label)}.${sourceNote(sourceTab)}` : "");

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}

      <div aria-hidden="true" className="mx-auto max-w-[460px]">
        <div className="rounded-2xl border border-dark-green/10 bg-white p-5 shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)]">
          <div className={`relative rounded-xl border-2 border-dashed border-dark-green/20 px-5 text-center ${long ? "pt-6 pb-24" : "py-6"}`}>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted">Contents</p>
            <p className="mt-2 font-serif text-3xl font-bold leading-tight text-dark-green">{smartQuotes(box)}</p>
            {/* The sticker sits over the label's words, so their ends still peek out. */}
            <span className={`absolute inset-x-3 flex justify-center ${long ? "top-[46%]" : "top-[52%]"}`}>
              <span
                className={`rounded-lg bg-mid-green px-5 py-2.5 font-serif font-bold text-white -rotate-[4deg] ${long ? "text-xl leading-snug" : "text-2xl"} shadow-[0_6px_10px_-4px_rgba(28,56,48,0.45)] armed:opacity-0 playing:animate-sticker-drop`}
                style={{ animationDelay: "0.1s" }}
              >
                {smartQuotes(sticker)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {stat && (
        <NewsCard source={sourceTab} className="mt-12">
          <span className="inline-grid font-serif text-6xl font-bold leading-none tracking-tight">
            <span className="invisible col-start-1 row-start-1">{stat.display}</span>
            <span ref={numberRef} className="col-start-1 row-start-1">
              {stat.display}
            </span>
          </span>
          <p className="mt-4 text-lg leading-snug text-white/90">{smartQuotes(stat.label)}</p>
        </NewsCard>
      )}
      {caption ? (
        <figcaption className="mt-4 text-center text-xs text-muted">
          {caption}
          <span className="sr-only">: {description}</span>
        </figcaption>
      ) : (
        <figcaption className="sr-only">{description}</figcaption>
      )}
    </figure>
  );
}
