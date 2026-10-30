"use client";

import { useRef, type ReactNode } from "react";
import { Laptop, type LucideIcon } from "lucide-react";
import type { IconGridGraphic } from "@/lib/insights-data";
import { useReveal } from "./useReveal";

const icons: Record<string, LucideIcon> = { laptop: Laptop };

/** Seconds between one icon dimming and the next. */
const DIM_STEP = 0.045;

/** The grid's cells in a scattered order that's the same on every render (a seeded shuffle). */
function scatter(count: number) {
  const order = Array.from({ length: count }, (_, i) => i);
  let seed = 0x14b; // picked so 4 of 24 lit sit one per row, none touching
  for (let i = count - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

interface IconGridBlockProps {
  graphic: IconGridGraphic;
  jump?: ReactNode;
}

/**
 * A grid of icons on the cream page. As it scrolls in they dim to 20% in a scattered order until only `lit` remain,
 * which turn mid-green. It's an illustration, and says so under the grid: the lit share isn't a statistic.
 */
export default function IconGridBlock({ graphic, jump }: IconGridBlockProps) {
  const { icon, count, lit, litLabel, dimLabel, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const Icon = icons[icon] ?? Laptop;
  // The first `lit` cells of the scattered order stay lit; the rest dim in that order.
  const order = scatter(count);
  const rank = new Map(order.map((cell, i) => [cell, i]));
  const dimTime = (count - lit) * DIM_STEP;

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div aria-hidden="true" className="mx-auto grid max-w-[440px] grid-cols-6 gap-x-3 gap-y-4 sm:gap-x-5 sm:gap-y-5">
        {Array.from({ length: count }, (_, cell) => {
          const r = rank.get(cell) ?? 0;
          const isLit = r < lit;
          return (
            <Icon
              key={cell}
              strokeWidth={1.5}
              className={`h-auto w-full ${
                isLit
                  ? "text-mid-green armed:text-dark-green playing:animate-icon-light"
                  : "text-dark-green opacity-20 armed:opacity-100 playing:animate-icon-dim"
              }`}
              style={{ animationDelay: `${isLit ? dimTime : (r - lit) * DIM_STEP}s` }}
            />
          );
        })}
      </div>

      <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-body">
        <li className="inline-flex items-center gap-2">
          <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-mid-green" />
          {litLabel}
        </li>
        <li className="inline-flex items-center gap-2">
          <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-dark-green opacity-30" />
          {dimLabel}
        </li>
      </ul>
      <figcaption className="mt-3 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">
          : a grid of {icon}s, most dimmed for {dimLabel.toLowerCase()} and a few lit for {litLabel.toLowerCase()}.
        </span>
      </figcaption>
    </figure>
  );
}
