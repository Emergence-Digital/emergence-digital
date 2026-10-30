"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import type { SquareGridGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

/** Tints of white and mid-green for the segments in turn, so the grid reads as blocks. The highlight is sage. */
const TINTS = ["bg-white/85", "bg-white/55", "bg-white/30", "bg-mid-green", "bg-mid-green/50", "bg-white/15"];

/** Seconds between one square filling and the next; the highlighted segment waits a moment longer. */
const STEP = 0.011;
const PAUSE = 0.15;

interface SquareGridBlockProps {
  graphic: SquareGridGraphic;
  source: string;
  jump?: ReactNode;
}

/**
 * A 10 × 10 grid of squares that fills segment by segment, the highlighted segment last and in sage, with a legend of
 * each segment's figure. The cut-out (N1: a calculator) sits on the cream beside the card and rises in with the first
 * segment.
 */
export default function SquareGridBlock({ graphic, source, jump }: SquareGridBlockProps) {
  const { eyebrow, segments, caption, cutout } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  // Highlighted segments fill last.
  const ordered = [...segments.filter((s) => !s.highlight), ...segments.filter((s) => s.highlight)];
  const colour = (segment: (typeof segments)[number]) =>
    segment.highlight ? "bg-sage" : TINTS[ordered.indexOf(segment) % TINTS.length];

  const cells: { colour: string; at: number }[] = [];
  for (const segment of ordered) {
    for (let k = 0; k < segment.squares; k++) {
      cells.push({ colour: colour(segment), at: cells.length * STEP + (segment.highlight ? PAUSE : 0) });
    }
  }

  const description =
    `${eyebrow}: ` +
    segments.map((s) => `${s.label}, ${spoken(s.value)}, ${s.squares} of 100 squares`).join("; ") +
    `. ${smartQuotes(caption)} Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref} className="relative">
      <NewsCard source={source} jump={jump} className={cutout ? "sm:mr-20" : ""}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <div className="mt-6 sm:flex sm:items-start sm:gap-8">
          <div className="grid w-full max-w-[280px] grid-cols-10 gap-1 sm:w-[220px] sm:flex-none">
            {Array.from({ length: 100 }, (_, i) => {
              const cell = cells[i];
              return (
                <span key={i} className="aspect-square rounded-[4px] bg-white/[0.07]">
                  {cell && (
                    <span
                      className={`block h-full w-full rounded-[4px] ${cell.colour} armed:opacity-0 playing:animate-chip-pop`}
                      style={{ animationDelay: `${cell.at}s` }}
                    />
                  )}
                </span>
              );
            })}
          </div>

          <ul className="mt-6 min-w-0 flex-1 space-y-2.5 text-sm sm:mt-0">
            {segments.map((segment) => (
              <li key={segment.label} className="flex items-center gap-3">
                <span className={`h-3 w-3 flex-none rounded-[3px] ${colour(segment)}`} />
                <span className={`flex-1 leading-snug ${segment.highlight ? "font-semibold text-sage" : "text-white/80"}`}>
                  {segment.label}
                </span>
                <span className={`font-semibold ${segment.highlight ? "text-sage" : "text-white"}`}>{segment.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className={`mt-6 text-xs leading-relaxed text-white/60 ${cutout ? "pr-20 sm:pr-16" : ""}`}>{smartQuotes(caption)}</p>
      </NewsCard>

      {cutout && (
        // On the cream past the card's corner: bottom right, overlapping the card's edge.
        <div aria-hidden="true" className="absolute -bottom-6 -right-2 w-[110px] sm:-bottom-4 sm:right-0 sm:w-[160px]">
          <Image
            src={cutout}
            alt=""
            width={965}
            height={700}
            sizes="(min-width: 640px) 160px, 110px"
            className="h-auto w-full [filter:drop-shadow(0_16px_20px_rgba(28,56,48,0.28))] armed:opacity-0 playing:animate-cutout-rise"
          />
        </div>
      )}
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
