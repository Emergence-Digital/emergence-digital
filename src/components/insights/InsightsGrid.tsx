"use client";

import { useState, type ReactNode } from "react";

interface InsightsGridProps {
  /** Series names in the order the filter shows them. */
  series: string[];
  /** Cards rendered on the server, newest first, so the post copy stays out of the browser bundle. */
  cards: { key: string; series: string; card: ReactNode }[];
}

/**
 * The Insights library: every post in one grid, with a row of series buttons above it. "All" is the default; picking
 * a series shows only its posts. With one series there's nothing to filter, so the buttons don't show.
 */
export default function InsightsGrid({ series, cards }: InsightsGridProps) {
  const [current, setCurrent] = useState<string | null>(null);
  const shown = current ? cards.filter((c) => c.series === current) : cards;
  const options: { label: string; value: string | null; count: number }[] = [
    { label: "All", value: null, count: cards.length },
    ...series.map((name) => ({ label: name, value: name, count: cards.filter((c) => c.series === name).length })),
  ];

  return (
    <>
      {series.length > 1 && (
        <div role="group" aria-label="Show posts from" className="mb-12 flex flex-wrap justify-center gap-2.5 md:mb-14">
          {options.map((option) => {
            const active = option.value === current;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                onClick={() => setCurrent(option.value)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-mid-green ${
                  active
                    ? "border-dark-green bg-dark-green text-white"
                    : "border-dark-green/15 bg-white text-dark-green hover:border-mid-green hover:text-mid-green"
                }`}
              >
                {option.label}
                <span className={`text-xs font-medium ${active ? "text-sage" : "text-muted"}`}>{option.count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {shown.map((c) => (
          <div key={c.key}>{c.card}</div>
        ))}
      </div>
    </>
  );
}
