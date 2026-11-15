"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import type { CardsGraphic } from "@/lib/insights-data";
import { smartQuotes } from "@/lib/insights-format";
import { useReveal } from "./useReveal";

/** Seconds between one card dealing in and the next. */
const STEP = 0.15;

interface CardsBlockProps {
  graphic: CardsGraphic;
  jump?: ReactNode;
}

/**
 * A short list as cards on a white panel, dealt in one by one: the video's list (D1's four personas, D7's three
 * types). A `highlight` card turns sage and its `badge` pops in last. The optional cut-out stands on the panel's top
 * edge, right, as on the carousels: people are cropped at the waist, so the panel is their ground.
 */
export default function CardsBlock({ graphic, jump }: CardsBlockProps) {
  const { eyebrow, items, cutout, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const cols = items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const badgeAt = items.length * STEP + 0.2;
  const description =
    `${eyebrow}: ` +
    items.map((item) => `${smartQuotes(item.title)}, ${smartQuotes(item.text)}${item.badge ? ` (${item.badge})` : ""}`).join(". ") +
    ".";

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}

      <div aria-hidden="true">
        <div className="flex items-end justify-between gap-4">
          <p className="pb-4 text-xs font-semibold tracking-[0.16em] uppercase text-mid-green">{eyebrow}</p>
          {cutout && (
            <div className="mr-4 w-32 flex-none sm:mr-8 sm:w-48">
              <Image
                src={cutout}
                alt=""
                width={600}
                height={600}
                sizes="(min-width: 640px) 192px, 128px"
                className="block h-auto w-full armed:opacity-0 playing:animate-cutout-rise"
              />
            </div>
          )}
        </div>

        <div className="relative rounded-2xl border border-dark-green/10 bg-white p-3 shadow-[0_18px_36px_-22px_rgba(28,56,48,0.45),0_2px_6px_-2px_rgba(28,56,48,0.08)] sm:p-4">
          <ul className={`grid grid-cols-1 gap-3 ${cols}`}>
            {items.map((item, i) => (
              <li
                key={item.title}
                className={`rounded-xl px-4 py-4 sm:px-5 armed:opacity-0 playing:animate-step-rise ${
                  item.highlight ? "bg-sage/40 ring-2 ring-mid-green" : "bg-cream"
                }`}
                style={{ animationDelay: `${0.15 + i * STEP}s` }}
              >
                <p className="font-serif text-xl font-bold leading-tight text-dark-green">{smartQuotes(item.title)}</p>
                <p className="mt-1.5 text-sm leading-snug text-body">{smartQuotes(item.text)}</p>
                {item.badge && (
                  <span
                    className="mt-3 inline-block rounded-full bg-mid-green px-3 py-1 text-xs font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
                    style={{ animationDelay: `${badgeAt}s` }}
                  >
                    {item.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-muted">
          {caption}
          <span className="sr-only">: {description}</span>
        </figcaption>
      ) : (
        <figcaption className="sr-only">{description}</figcaption>
      )}
    </figure>
  );
}
