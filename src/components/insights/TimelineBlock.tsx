"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import type { TimelineGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

/** Seconds the marker takes from the first stop to the last (linear, so it meets each stop on time). */
const TRAVEL = 1.2;

interface TimelineBlockProps {
  graphic: TimelineGraphic;
  source: string;
  jump?: ReactNode;
}

/**
 * Dated stops down a sage line, the highlighted stop's dot filled. A marker travels down the line and each stop's
 * words reveal as it gets there. The cut-out (N4: a calendar) sits on the cream beside the card; it marks no date.
 */
export default function TimelineBlock({ graphic, source, jump }: TimelineBlockProps) {
  const { eyebrow, stops, cutout } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const n = stops.length;
  const arrival = (i: number) => (n > 1 ? (i / (n - 1)) * TRAVEL : 0);

  // In the order shown: `big` goes with the subtext when there is one, otherwise with the text.
  const description =
    `${eyebrow}: ` +
    stops
      .map((stop) => {
        const big = stop.big && spoken(stop.big);
        const lines = stop.subtext ? [stop.text, big && `${big} ${stop.subtext}`] : [big && `${big} ${stop.text}`, !big && stop.text];
        return smartQuotes([stop.date, ...lines, stop.chip].filter(Boolean).join(", "));
      })
      .join(". ") +
    `. Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref} className="relative">
      <NewsCard source={source} jump={jump} className={cutout ? "sm:mr-24" : ""}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        {/* Equal rows, so the stops sit evenly down the line and the marker's steady pace meets each in turn. */}
        <ol className="relative mt-7 grid auto-rows-fr">
          {/* The line, from the first dot's centre to the last's */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-[13px] w-0.5 rounded-full bg-sage/40"
            style={{ bottom: `calc(${100 / n}% - 13px)` }}
          >
            <span
              className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage opacity-0 shadow-[0_0_0_5px_rgba(167,205,178,0.25)] playing:animate-marker-travel"
              style={{ animationDuration: `${TRAVEL}s` }}
            />
          </span>

          {stops.map((stop, i) => {
            const at = arrival(i);
            const reveal = "armed:opacity-0 playing:animate-step-rise";
            // `big` reads with the line after it: the subtext when there is one ("~50% of DSAG's ECC users…"),
            // otherwise the text ("54% of DSAG companies…").
            const big = stop.big && (
              <p className="mt-1.5 font-serif text-4xl font-bold leading-none tracking-tight">{stop.big}</p>
            );
            return (
              <li key={stop.date} className={`relative pl-9 ${i < n - 1 ? "pb-8" : ""}`}>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-sage ${
                    stop.highlight ? "bg-sage" : "bg-dark-green"
                  }`}
                />
                <div className={reveal} style={{ animationDelay: `${at}s` }}>
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-sage">{smartQuotes(stop.date)}</p>
                  {stop.subtext ? (
                    <>
                      <p className="mt-1.5 leading-snug text-white/90">{smartQuotes(stop.text)}</p>
                      {big}
                      <p className="mt-1.5 text-sm leading-snug text-white/75">{smartQuotes(stop.subtext)}</p>
                    </>
                  ) : (
                    <>
                      {big}
                      <p className="mt-1.5 leading-snug text-white/90">{smartQuotes(stop.text)}</p>
                    </>
                  )}
                  {stop.chip && (
                    <span
                      className="mt-3 inline-block rounded-full bg-mid-green px-3 py-1 text-sm font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
                      style={{ animationDelay: `${at + 0.25}s` }}
                    >
                      {smartQuotes(stop.chip)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </NewsCard>

      {cutout && (
        <div aria-hidden="true" className="absolute -bottom-6 -right-2 w-[110px] sm:bottom-6 sm:right-0 sm:w-[170px]">
          <Image
            src={cutout}
            alt=""
            width={883}
            height={800}
            sizes="(min-width: 640px) 170px, 110px"
            className="h-auto w-full [filter:drop-shadow(0_16px_20px_rgba(28,56,48,0.25))] armed:opacity-0 playing:animate-cutout-rise"
          />
        </div>
      )}
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
