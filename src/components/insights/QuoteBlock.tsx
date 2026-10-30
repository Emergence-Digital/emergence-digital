"use client";

import { useRef, type ReactNode } from "react";
import type { QuoteGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { countUp, numberFormat, useReveal } from "./useReveal";

/** Seconds between one word lighting and the next. */
const WORD = 0.06;

interface QuoteBlockProps {
  graphic: QuoteGraphic;
  /** SOURCE tab text, shown when the quote leads with a figure. */
  source: string;
  jump?: ReactNode;
}

/**
 * A quote on a news card. With a `lead`, a figure counts up first, with its label. Then the words light from 35% to
 * full white one by one, and the speaker fades in.
 */
export default function QuoteBlock({ graphic, source, jump }: QuoteBlockProps) {
  const { text, who, lead } = graphic;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useReveal(ref, {
    onArm: () => {
      if (lead && numberRef.current) numberRef.current.textContent = numberFormat(lead.display)(0);
    },
    onPlay: () => {
      if (lead) countUp(numberRef.current, lead.value, numberFormat(lead.display), lead.display, 1000);
    },
  });

  const words = `“${smartQuotes(text)}”`.split(" ");
  const start = lead ? 0.6 : 0.1;

  const description =
    (lead ? `${spoken(lead.display)} ${lead.label}. ` : "") +
    `${who}: “${smartQuotes(text)}”` +
    (lead ? ` Source: ${source.replaceAll(" · ", ", ")}.` : "");

  return (
    <figure ref={ref}>
      <NewsCard source={lead ? source : undefined} jump={jump}>
        {lead && (
          <div className="mb-7">
            <span className="inline-grid font-serif text-6xl font-bold leading-none tracking-tight">
              <span className="invisible col-start-1 row-start-1">{lead.display}</span>
              <span ref={numberRef} className="col-start-1 row-start-1">
                {lead.display}
              </span>
            </span>
            <CardEyebrow className="mt-3">{lead.label}</CardEyebrow>
          </div>
        )}
        <p className="font-serif text-2xl sm:text-[1.75rem] font-bold leading-snug tracking-tight text-white">
          {words.map((word, i) => (
            <span key={i} className="armed:text-white/35 playing:animate-word-light" style={{ animationDelay: `${start + i * WORD}s` }}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <p
          className="mt-5 text-sm font-semibold text-sage armed:opacity-0 playing:animate-fade-in"
          style={{ animationDelay: `${start + words.length * WORD + 0.15}s` }}
        >
          {who}
        </p>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
