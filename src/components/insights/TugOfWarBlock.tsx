"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { TugOfWarGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

interface TugOfWarBlockProps {
  graphic: TugOfWarGraphic;
  jump?: ReactNode;
}

/**
 * One full-width bar split at `left.value`%, drawn to scale: sage on the left, white on the right, with a thin tick
 * at the halfway mark. The split starts even, wobbles either side twice and settles.
 */
export default function TugOfWarBlock({ graphic, jump }: TugOfWarBlockProps) {
  const { eyebrow, left, right, sourceTab } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const split = { "--split": `${left.value}%`, width: `${left.value}%` } as CSSProperties;
  const description =
    `${eyebrow}: ${left.label}, ${spoken(left.display)}; ${right.label}, ${spoken(right.display)}. ` +
    `Source: ${sourceTab.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      <NewsCard source={sourceTab} jump={jump}>
        <CardEyebrow>{smartQuotes(eyebrow)}</CardEyebrow>
        <div className="mt-6 flex items-end justify-between gap-6">
          <div>
            <p className="font-serif text-5xl font-bold leading-none tracking-tight text-sage">{left.display}</p>
            <p className="mt-2 text-sm text-white/85">{left.label}</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-5xl font-bold leading-none tracking-tight">{right.display}</p>
            <p className="mt-2 text-sm text-white/85">{right.label}</p>
          </div>
        </div>

        <div className="relative mt-6 h-5">
          <div className="absolute inset-0 overflow-hidden rounded-full bg-white/60">
            <div className="h-full bg-sage armed:w-1/2! playing:animate-tug" style={split} />
          </div>
          {/* Halfway, so the near-even split reads as one */}
          <span className="absolute -top-2 -bottom-2 left-1/2 w-px -translate-x-1/2 bg-white/80" />
        </div>
        <div className="mt-2 flex justify-center text-xs text-white/60">
          <span>50%</span>
        </div>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
