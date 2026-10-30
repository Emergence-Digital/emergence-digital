"use client";

import { useRef, type ReactNode } from "react";
import type { CompareGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

/** Seconds between one row appearing and the next. */
const STEP = 0.15;

interface CompareBlockProps {
  graphic: CompareGraphic;
  jump?: ReactNode;
}

/**
 * Two cards side by side (stacked on phones): the left dark green, the right white. Rows reveal alternately, left
 * then right, top to bottom. Plain text throughout, so screen readers read it as it is.
 */
export default function CompareBlock({ graphic, jump }: CompareBlockProps) {
  const { left, right, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  // Left 0, right 0, left 1, right 1, … and the longer side carries on alone.
  const order: string[] = [];
  for (let i = 0; i < Math.max(left.rows.length, right.rows.length); i++) {
    if (i < left.rows.length) order.push(`left-${i}`);
    if (i < right.rows.length) order.push(`right-${i}`);
  }
  const delay = (side: string, i: number) => ({ animationDelay: `${0.1 + order.indexOf(`${side}-${i}`) * STEP}s` });
  const row = "flex gap-3 leading-snug armed:opacity-0 playing:animate-step-rise";

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-[24px] bg-dark-green p-6 text-white shadow-[0_32px_60px_-28px_rgba(28,56,48,0.6),0_10px_24px_-14px_rgba(28,56,48,0.35)] sm:p-7">
          <h3 className="font-serif text-2xl font-bold leading-tight">{smartQuotes(left.title)}</h3>
          <ul className="mt-5 space-y-3.5">
            {left.rows.map((text, i) => (
              <li key={text} className={`${row} text-white/90`} style={delay("left", i)}>
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sage" />
                {smartQuotes(text)}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-dark-green/10 bg-white p-6 shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)] sm:p-7">
          <h3 className="font-serif text-2xl font-bold leading-tight text-dark-green">{smartQuotes(right.title)}</h3>
          {right.note && <p className="mt-1 text-sm italic text-muted">{smartQuotes(right.note)}</p>}
          <ul className="mt-5 space-y-3.5">
            {right.rows.map((text, i) => (
              <li key={text} className={`${row} text-body`} style={delay("right", i)}>
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-mid-green" />
                {smartQuotes(text)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted">{smartQuotes(caption)}</figcaption>
    </figure>
  );
}
