"use client";

import { useRef, type ReactNode } from "react";
import { MapPin } from "lucide-react";
import type { CalloutGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

interface CalloutBlockProps {
  graphic: CalloutGraphic;
  jump?: ReactNode;
}

/** A small white card with a map pin. The pin hops, its caption swaps from `from` to `to`, and `label` appears under it. No map. */
export default function CalloutBlock({ graphic, jump }: CalloutBlockProps) {
  const { from, to, label } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const caption = "col-start-1 row-start-1 font-serif text-2xl font-bold leading-tight text-dark-green";

  return (
    <figure ref={ref} className="mx-auto max-w-[440px]">
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div
        aria-hidden="true"
        className="flex items-start gap-4 rounded-2xl border border-dark-green/10 bg-white px-6 py-5 shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)]"
      >
        <span
          className="mt-0.5 grid h-11 w-11 flex-none place-items-center rounded-full bg-mid-green/10 text-mid-green playing:animate-pin-hop"
          style={{ animationDelay: "0.25s" }}
        >
          <MapPin className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          {/* Both places share one cell. The old one collapses as it slides out, so a longer `from` (two lines on
              phones) leaves no gap under `to`. */}
          <div className="grid overflow-hidden">
            <span
              className={`${caption} overflow-hidden max-h-0 opacity-0 -translate-y-full armed:max-h-20 armed:opacity-100 armed:translate-y-0 playing:animate-caption-out`}
              style={{ animationDelay: "0.35s" }}
            >
              {from}
            </span>
            <span className={`${caption} armed:opacity-0 armed:translate-y-full playing:animate-caption-in`} style={{ animationDelay: "0.5s" }}>
              {to}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-snug text-muted armed:opacity-0 playing:animate-fade-in" style={{ animationDelay: "0.9s" }}>
            {smartQuotes(label)}
          </p>
        </div>
      </div>
      <figcaption className="sr-only">
        From {from} to {to}: {smartQuotes(label)}.
      </figcaption>
    </figure>
  );
}
