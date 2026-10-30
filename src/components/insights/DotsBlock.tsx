"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { DotsGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

// Where the small dots start (percent across, percent down), scattered over the left of the block…
const SCATTER = [
  [8, 22], [16, 54], [11, 76], [22, 32], [27, 64], [19, 12], [33, 46],
  [37, 20], [30, 82], [40, 66], [14, 40], [24, 48], [39, 34], [6, 60],
];
// …and the three larger dots they merge into on the right, with their sizes in px.
const CLUSTERS = [
  { x: 68, y: 30, size: 44 },
  { x: 83, y: 52, size: 34 },
  { x: 70, y: 70, size: 38 },
];

interface DotsBlockProps {
  graphic: DotsGraphic;
  jump?: ReactNode;
}

/**
 * On the cream page: about 14 small dots appear in a scatter (`from`), drift together and merge into three larger ones
 * (`to`). A faint copy of the scatter stays behind, so the finished state still reads as many becoming few. No
 * numbers, and captioned as an illustration.
 */
export default function DotsBlock({ graphic, jump }: DotsBlockProps) {
  const { from, to, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const dot = "absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-mid-green";

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div aria-hidden="true" className="relative mx-auto h-56 max-w-[560px] sm:h-64">
        {/* The scatter, faint, where it started */}
        {SCATTER.map(([x, y], i) => (
          <span key={`ghost-${i}`} className={`${dot} h-3 w-3 opacity-20`} style={{ left: `${x}%`, top: `${y}%` }} />
        ))}

        {/* The dots on the move: hidden when done, at their start when armed, drifting to a cluster while playing */}
        {SCATTER.map(([x, y], i) => {
          const target = CLUSTERS[i % CLUSTERS.length];
          const vars = { "--x0": `${x}%`, "--y0": `${y}%`, "--x1": `${target.x}%`, "--y1": `${target.y}%` } as CSSProperties;
          return (
            <span
              key={`dot-${i}`}
              className={`${dot} h-3 w-3 opacity-0 [left:var(--x1)] [top:var(--y1)] armed:[left:var(--x0)] armed:[top:var(--y0)] playing:animate-dot-merge`}
              style={{ ...vars, animationDelay: `${i * 0.02}s` }}
            />
          );
        })}

        {CLUSTERS.map((c, i) => (
          <span
            key={`cluster-${i}`}
            className={`${dot} armed:opacity-0 playing:animate-chip-pop`}
            style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.size, height: c.size, animationDelay: `${1.1 + i * 0.08}s` }}
          />
        ))}

        <span className="absolute bottom-0 left-[23%] -translate-x-1/2 whitespace-nowrap text-sm text-muted">{smartQuotes(from)}</span>
        <span className="absolute bottom-0 left-[75%] -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-dark-green">
          {smartQuotes(to)}
        </span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">
          : a scatter of small dots, labelled {"“"}
          {smartQuotes(from)}
          {"”"}, drifts together into three larger dots, labelled {"“"}
          {smartQuotes(to)}
          {"”"}.
        </span>
      </figcaption>
    </figure>
  );
}
