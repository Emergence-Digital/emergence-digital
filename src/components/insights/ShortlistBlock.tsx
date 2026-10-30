"use client";

import { useRef, type ReactNode } from "react";
import type { ShortlistGraphic } from "@/lib/insights-data";
import { useReveal } from "./useReveal";

/** Seconds between one firm being ticked (or greyed out) and the next. */
const STEP = 0.3;

function Tick({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="M3.5 8.4 6.6 11.4 12.5 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        className={className}
        style={style}
      />
    </svg>
  );
}

interface ShortlistBlockProps {
  graphic: ShortlistGraphic;
  jump?: ReactNode;
}

/**
 * A buyer's shortlist on a white card, in the Centurion card style. Going down the list, the known firms get a tick
 * drawn in and the unknown one greys out. An illustration with generic names, captioned as one.
 */
export default function ShortlistBlock({ graphic, jump }: ShortlistBlockProps) {
  const { eyebrow, items, tickLabel, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const known = items.filter((item) => item.known).map((item) => item.name);
  const unknown = items.filter((item) => !item.known).map((item) => item.name);

  return (
    <figure ref={ref} className="mx-auto max-w-[440px]">
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div
        aria-hidden="true"
        className="rounded-2xl border border-dark-green/10 bg-white px-6 py-5 shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)]"
      >
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-mid-green">{eyebrow}</p>
        <ul className="mt-3 divide-y divide-dark-green/10">
          {items.map((item, i) => {
            const at = 0.15 + i * STEP;
            return (
              <li
                key={item.name}
                className={`flex items-center justify-between gap-4 py-3.5 ${
                  item.known ? "" : "opacity-40 armed:opacity-100 playing:animate-row-dim"
                }`}
                style={item.known ? undefined : { animationDelay: `${at}s` }}
              >
                <span className="font-serif text-xl font-bold text-dark-green">{item.name}</span>
                {/* An empty circle; a known firm's fills in green and its tick draws. */}
                <span className="relative grid h-7 w-7 flex-none place-items-center rounded-full ring-2 ring-inset ring-dark-green/15">
                  {item.known && (
                    <span
                      className="absolute inset-0 grid place-items-center rounded-full bg-mid-green text-white armed:opacity-0 playing:animate-chip-pop"
                      style={{ animationDelay: `${at}s` }}
                    >
                      <Tick
                        className="armed:[stroke-dashoffset:1] playing:animate-line-draw"
                        style={{ animationDelay: `${at + 0.15}s`, animationDuration: "0.3s" }}
                      />
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-body" aria-hidden="true">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-mid-green text-white">
          <Tick />
        </span>
        {tickLabel}
      </p>
      <figcaption className="mt-2 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">
          {" "}
          {eyebrow}: {items.map((item) => item.name).join(", ")}. {tickLabel}: {known.join(", ")}.
          {unknown.length > 0 && ` Left off: ${unknown.join(", ")}.`}
        </span>
      </figcaption>
    </figure>
  );
}
