"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { SourcesGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard from "./NewsCard";
import { useReveal } from "./useReveal";

/** Seconds between one card being dealt and the next. */
const DEAL = 0.18;

interface SourcesBlockProps {
  graphic: SourcesGraphic;
  /** SOURCE tab text, when the graphic doesn't give its own. */
  source: string;
  jump?: ReactNode;
}

/**
 * Blank cards (no labels or logos: the sources aren't named) deal in one by one into a fan, while a counter beside
 * them ticks up with each card to `display`.
 */
export default function SourcesBlock({ graphic, source, jump }: SourcesBlockProps) {
  const { count, display, label, caption, sourceTab = source } = graphic;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);

  useReveal(ref, {
    onArm: () => {
      if (numberRef.current) numberRef.current.textContent = "0";
    },
    onPlay: () => {
      // The counter goes up as each card lands; the last lands on `display`.
      for (let i = 0; i < count; i++) {
        timers.current.push(
          window.setTimeout(() => {
            if (numberRef.current) numberRef.current.textContent = i === count - 1 ? display : String(i + 1);
          }, (0.1 + i * DEAL + 0.3) * 1000),
        );
      }
    },
  });

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const spread = Math.min(8, 48 / Math.max(count - 1, 1)); // degrees between cards

  return (
    <figure ref={ref}>
      <NewsCard source={sourceTab} jump={jump}>
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="relative h-44 w-56 flex-none">
            {Array.from({ length: count }, (_, i) => {
              const r = -((count - 1) * spread) / 2 + i * spread;
              const vars = { "--r": `${r}deg`, "--tx": `${(i - (count - 1) / 2) * 6}px` } as CSSProperties;
              return (
                <span
                  key={i}
                  className="absolute bottom-2 left-1/2 -ml-12 flex h-36 w-24 origin-bottom flex-col gap-2 rounded-xl bg-white p-3 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.45)] [rotate:var(--r)] [translate:var(--tx)_0] armed:opacity-0 playing:animate-deal"
                  style={{ ...vars, animationDelay: `${0.1 + i * DEAL}s` }}
                >
                  <span className="h-2 w-3/4 rounded-full bg-dark-green/15" />
                  <span className="h-1.5 w-full rounded-full bg-dark-green/10" />
                  <span className="h-1.5 w-5/6 rounded-full bg-dark-green/10" />
                  <span className="h-1.5 w-2/3 rounded-full bg-dark-green/10" />
                </span>
              );
            })}
          </div>
          <div>
            <span className="inline-grid font-serif text-7xl font-bold leading-none tracking-tight">
              <span className="invisible col-start-1 row-start-1">{display}</span>
              <span ref={numberRef} className="col-start-1 row-start-1">
                {display}
              </span>
            </span>
            <p className="mt-3 text-lg leading-snug text-white/90">{smartQuotes(label)}</p>
          </div>
        </div>
      </NewsCard>
      <figcaption className="mt-3 text-xs text-muted">
        {smartQuotes(caption)}
        <span className="sr-only">
          : {spoken(display)} {smartQuotes(label)}. Source: {sourceTab.replaceAll(" · ", ", ")}.
        </span>
      </figcaption>
    </figure>
  );
}
