"use client";

import { useRef, type ReactNode } from "react";
import { LoaderCircle, ScanSearch, TriangleAlert } from "lucide-react";
import type { ScanGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

/** Seconds between one row starting its check and the next. */
const STEP = 0.45;

interface ScanBlockProps {
  graphic: ScanGraphic;
  jump?: ReactNode;
}

/**
 * A white security-tool card. Rows tick through one by one: a spinner, then the result in grey. A row with a `flag`
 * turns amber once its result is in, with the flag under it. An illustration, captioned as one.
 */
export default function ScanBlock({ graphic, jump }: ScanBlockProps) {
  const { title, rows, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <figure ref={ref} className="mx-auto max-w-[460px]">
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-dark-green/10 bg-white shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)]"
      >
        <div className="flex items-center gap-2.5 border-b border-dark-green/10 px-5 py-3.5">
          <ScanSearch className="h-5 w-5 text-mid-green" strokeWidth={1.75} />
          <p className="text-sm font-semibold text-dark-green">{title}</p>
        </div>
        <ul className="divide-y divide-dark-green/10 px-2 py-1.5">
          {rows.map((row, i) => {
            const at = 0.1 + i * STEP;
            return (
              <li key={row.name} className="relative px-3 py-3.5">
                {row.flag && (
                  <span
                    className="absolute inset-1 rounded-xl bg-amber-50 ring-1 ring-amber-300 armed:opacity-0 playing:animate-fade-in"
                    style={{ animationDelay: `${at + 0.55}s` }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-4">
                  <span className="font-semibold text-dark-green">{row.name}</span>
                  <span className="relative text-sm text-muted">
                    <LoaderCircle
                      className="absolute right-0 top-0.5 h-4 w-4 text-mid-green opacity-0 playing:animate-spinner"
                      style={{ animationDelay: `${at}s`, animationDuration: "0.5s" }}
                    />
                    <span className="armed:opacity-0 playing:animate-fade-in" style={{ animationDelay: `${at + 0.45}s` }}>
                      {row.result}
                    </span>
                  </span>
                </div>
                {row.flag && (
                  <p
                    className="relative mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-amber-800 armed:opacity-0 playing:animate-fade-in"
                    style={{ animationDelay: `${at + 0.7}s` }}
                  >
                    <TriangleAlert className="h-4 w-4 flex-none text-amber-600" strokeWidth={2} />
                    {smartQuotes(row.flag)}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">
          : {title}.{" "}
          {rows.map((row) => `${row.name}: ${row.result}${row.flag ? `, flagged: ${smartQuotes(row.flag)}` : ""}.`).join(" ")}
        </span>
      </figcaption>
    </figure>
  );
}
