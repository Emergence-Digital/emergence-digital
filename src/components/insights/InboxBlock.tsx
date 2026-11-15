"use client";

import { useRef, type ReactNode } from "react";
import { Search, Send } from "lucide-react";
import type { InboxGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

/** When the rows start, once the search has typed itself in. */
const ROWS_AT = 1.1;
/** Seconds between one row appearing and the next. */
const STEP = 0.15;

interface InboxBlockProps {
  graphic: InboxGraphic;
  jump?: ReactNode;
}

/**
 * A mail app's folder on a white card. The search types itself into the bar, the rows appear one by one (each a
 * subject and a grey placeholder line for the reply), then the `pick` rows turn sage with a `pickLabel` tag. The
 * emails are made up, and the caption says so.
 */
export default function InboxBlock({ graphic, jump }: InboxBlockProps) {
  const { folder, search, rows, pickLabel, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const picksAt = ROWS_AT + rows.length * STEP + 0.3;
  const picks = rows.filter((row) => row.pick).map((row) => row.subject);

  return (
    <figure ref={ref} className="mx-auto max-w-[540px]">
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-dark-green/10 bg-white shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)]"
      >
        <div className="flex items-center gap-3 border-b border-dark-green/10 px-4 py-3 sm:px-5">
          <span className="flex flex-none items-center gap-2 text-sm font-semibold text-dark-green">
            <Send className="h-4 w-4 text-mid-green" strokeWidth={1.75} />
            {folder}
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs text-body sm:text-sm">
            <Search className="h-3.5 w-3.5 flex-none text-muted" strokeWidth={2} />
            <span className="truncate font-mono armed:[clip-path:inset(0_100%_0_0)] playing:animate-type-in">{search}</span>
          </span>
        </div>

        <ul className="divide-y divide-dark-green/10 px-2 py-1.5">
          {rows.map((row, i) => {
            const at = ROWS_AT + i * STEP;
            const pickAt = picksAt + Math.max(0, picks.indexOf(row.subject)) * 0.25;
            return (
              <li key={row.subject} className="relative px-3 py-3 armed:opacity-0 playing:animate-step-rise" style={{ animationDelay: `${at}s` }}>
                {row.pick && (
                  <span
                    className="absolute inset-1 rounded-xl bg-sage/35 ring-1 ring-mid-green/50 armed:opacity-0 playing:animate-fade-in"
                    style={{ animationDelay: `${pickAt}s` }}
                  />
                )}
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug text-dark-green">{smartQuotes(row.subject)}</p>
                    <span className="mt-2 block h-2 w-3/4 rounded-full bg-dark-green/10" />
                  </div>
                  {row.pick && (
                    <span
                      className="flex-none rounded-full bg-mid-green px-2.5 py-1 text-xs font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
                      style={{ animationDelay: `${pickAt + 0.1}s` }}
                    >
                      {pickLabel}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">
          : the {folder} folder, searched for {smartQuotes(search)}. {rows.map((row) => smartQuotes(row.subject)).join(". ")}. {pickLabel}:{" "}
          {picks.map(smartQuotes).join(" and ")}.
        </span>
      </figcaption>
    </figure>
  );
}
