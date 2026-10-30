"use client";

import { useId, useState, type ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { ChecklistGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import NewsCard from "./NewsCard";

interface ChecklistBlockProps {
  graphic: ChecklistGraphic;
  jump?: ReactNode;
}

/**
 * Real checkboxes for the reader to tick, with a live "n of 6" and the unticked items as gaps. At six of six the
 * `complete` line shows and its cut-out (N2: keys) drops in beside the card. The ticks live in this component only:
 * nothing is stored, sent or tracked, and the note under the card says so. The server renders it unticked.
 */
export default function ChecklistBlock({ graphic, jump }: ChecklistBlockProps) {
  const { prompt, items, resultTemplate, gapsLabel, complete, privacyNote, sourceTab } = graphic;
  const id = useId();
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => false));

  const n = ticked.filter(Boolean).length;
  const done = n === items.length;
  const gaps = items.filter((_, i) => !ticked[i]);
  const toggle = (i: number) => setTicked((t) => t.map((on, j) => (j === i ? !on : on)));

  return (
    <figure className="relative">
      <NewsCard source={sourceTab} jump={jump} readable className={complete.cutout ? "sm:mr-24" : ""}>
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="font-serif text-2xl font-bold leading-snug text-white">{smartQuotes(prompt)}</legend>
          <ul className="mt-5 space-y-1">
            {items.map((item, i) => (
              <li key={item}>
                <label className="-mx-3 flex min-h-12 cursor-pointer items-center gap-4 rounded-xl px-3 py-2 transition-colors duration-150 hover:bg-white/5 has-[:checked]:bg-white/[0.06]">
                  <span className="relative grid h-6 w-6 flex-none place-items-center">
                    <input
                      type="checkbox"
                      name={`${id}-item`}
                      checked={ticked[i]}
                      onChange={() => toggle(i)}
                      className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-sage/70 transition-colors duration-150 checked:border-sage checked:bg-sage focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sage"
                    />
                    <Check
                      aria-hidden="true"
                      strokeWidth={3}
                      className="pointer-events-none absolute h-4 w-4 text-dark-green opacity-0 peer-checked:opacity-100"
                    />
                  </span>
                  <span className="leading-snug text-white/90">{smartQuotes(item)}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="mt-6 border-t border-white/10 pt-5">
          {/* At six of six the complete line takes the count's place: it already says "6 of 6". */}
          <p
            aria-live="polite"
            className={`font-serif font-bold text-sage ${
              done ? `text-2xl sm:text-3xl leading-tight ${complete.cutout ? "pr-24" : ""}` : "text-4xl leading-none"
            }`}
          >
            {done ? smartQuotes(complete.label) : resultTemplate.replace("{n}", String(n))}
          </p>
          {!done && (
            <>
              <p className="mt-4 text-xs font-semibold tracking-[0.16em] uppercase text-white/60">{gapsLabel}</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {gaps.map((gap) => (
                  <li key={gap} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/85">
                    {smartQuotes(gap)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </NewsCard>

      {complete.cutout && (
        // Beside the card's lower corner, out of the way until six of six.
        <div aria-hidden="true" className="pointer-events-none absolute bottom-6 -right-2 w-[120px] sm:bottom-10 sm:right-0 sm:w-[190px]">
          <Image
            src={complete.cutout}
            alt=""
            width={980}
            height={500}
            sizes="(min-width: 640px) 190px, 120px"
            className={`h-auto w-full [filter:drop-shadow(0_14px_18px_rgba(28,56,48,0.3))] ${
              done ? "animate-keys-drop motion-reduce:animate-none" : "opacity-0"
            }`}
          />
        </div>
      )}

      <figcaption className="mt-3 text-xs text-muted">{smartQuotes(privacyNote)}</figcaption>
    </figure>
  );
}
