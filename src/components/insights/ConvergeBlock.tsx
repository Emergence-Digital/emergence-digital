"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { ConvergeGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

/** Seconds between one line starting and the next; each takes LINE to draw. */
const STEP = 0.45;
const LINE = 0.4;

// Layouts in percent of their box. From sm up the box is 2:1: chips stacked on the left, their right edges at 44%,
// lines running right to the headset's left edge. On phones it's 4:5: chips in a row above, their bottoms at 18%,
// lines running down to the headset's top, with room under it for the pill. The SVGs' viewBoxes match each box, so
// line ends land where they should.
const WIDE = { chipEndX: 44, headsetX: 64, headsetY: 47 };
const NARROW = { chipBottomY: 18, headsetY: 44 };

interface ConvergeBlockProps {
  graphic: ConvergeGraphic;
  jump?: ReactNode;
}

/**
 * On the cream page: the `sources` as white chips, each with a line that draws in to the headset in turn, ticking
 * the chip as it arrives. Once all have arrived the headset settles with a small bounce. `to` sits under the headset
 * in a sage pill. An illustration, captioned as one.
 */
export default function ConvergeBlock({ graphic, jump }: ConvergeBlockProps) {
  const { sources, to, cutout, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const n = sources.length;
  const start = (i: number) => 0.2 + i * STEP;
  const allIn = start(n - 1) + LINE;
  const wideY = (i: number) => (n === 1 ? 50 : 18 + (i * 64) / (n - 1));
  const narrowX = (i: number) => (100 / n) * (i + 0.5);

  const line = (d: string, i: number) => (
    <path
      key={i}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray="1"
      className="armed:[stroke-dashoffset:1] playing:animate-line-draw"
      style={{ animationDelay: `${start(i)}s`, animationDuration: `${LINE}s` }}
    />
  );

  const chip = (text: string, i: number, extra = "") => (
    <span
      className={`flex items-center gap-2 rounded-xl border border-dark-green/10 bg-white px-3 py-2 font-semibold leading-snug text-dark-green shadow-[0_10px_20px_-14px_rgba(28,56,48,0.5)] ${extra}`}
    >
      {smartQuotes(text)}
      <span
        className="grid h-5 w-5 flex-none place-items-center rounded-full bg-mid-green text-white armed:opacity-0 playing:animate-chip-pop"
        style={{ animationDelay: `${start(i) + LINE}s` }}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    </span>
  );

  const headset = (
    <div className="w-full playing:animate-settle-bounce" style={{ animationDelay: `${allIn + 0.05}s` }}>
      <Image src={cutout} alt="" width={653} height={700} sizes="(min-width: 640px) 190px, 150px" className="h-auto w-full" />
    </div>
  );
  const pill = <span className="rounded-full bg-sage px-4 py-1.5 text-sm font-semibold text-dark-green">{smartQuotes(to)}</span>;

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}

      {/* sm and up: chips on the left, lines running right */}
      <div aria-hidden="true" className="relative mx-auto hidden aspect-[2/1] max-w-[640px] sm:block">
        <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full text-mid-green/60">
          {sources.map((_, i) => line(`M${WIDE.chipEndX * 2 + 2} ${wideY(i)} L${WIDE.headsetX * 2 + 2} ${WIDE.headsetY}`, i))}
        </svg>
        {sources.map((text, i) => (
          <span key={text} className="absolute -translate-y-1/2 text-sm" style={{ right: `${100 - WIDE.chipEndX}%`, top: `${wideY(i)}%` }}>
            {chip(text, i)}
          </span>
        ))}
        <div className="absolute top-[4%] flex w-[30%] flex-col items-center gap-2" style={{ left: `${WIDE.headsetX}%` }}>
          {headset}
          {pill}
        </div>
      </div>

      {/* Phones: chips in a row above, lines running down */}
      <div aria-hidden="true" className="relative mx-auto aspect-[4/5] w-full sm:hidden">
        <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full text-mid-green/60">
          {sources.map((_, i) => line(`M${narrowX(i)} ${NARROW.chipBottomY * 1.25 + 1} L50 ${NARROW.headsetY * 1.25}`, i))}
        </svg>
        <div
          className="absolute inset-x-0 top-0 grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, height: `${NARROW.chipBottomY}%` }}
        >
          {sources.map((text, i) => (
            <div key={text} className="flex items-end justify-center">
              {chip(text, i, "flex-col gap-1.5 text-center text-xs")}
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 flex w-[46%] -translate-x-1/2 flex-col items-center gap-2" style={{ top: `${NARROW.headsetY}%` }}>
          {headset}
          {pill}
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">: {sources.map(smartQuotes).join(", ")}, each leading to {smartQuotes(to)}.</span>
      </figcaption>
    </figure>
  );
}
