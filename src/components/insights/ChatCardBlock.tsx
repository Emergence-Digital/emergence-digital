"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { ChatCardGraphic } from "@/lib/insights-data";
import { smartQuotes, spoken } from "@/lib/insights-format";
import { countUp, numberFormat, useReveal } from "./useReveal";

// Where the phone's blank screen sits in phone.webp, as percentages of the image: 47.3% to 87.6% across,
// 1.6% to 67.8% down.
const SCREEN = { left: 47.3, top: 1.6, width: 87.6 - 47.3, height: 67.8 - 1.6 };

/** Seconds: the ask pops in, the typing dots show, then the reply's lines draw in. */
const ASK = 0.2;
const TYPING = 0.55;
const REPLY = 1.3;

interface ChatCardBlockProps {
  graphic: ChatCardGraphic;
  jump?: ReactNode;
}

/**
 * On the cream page: a hand holding a phone, with an AI chat drawn over its blank screen. The ask pops in, three
 * dots type, and the reply arrives as grey placeholder lines, never words: it's an illustration. Beside it, the
 * stat counts up.
 */
export default function ChatCardBlock({ graphic, jump }: ChatCardBlockProps) {
  const { eyebrow, stat, title, ask, replyLines, cutout, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useReveal(ref, {
    onArm: () => {
      if (numberRef.current) numberRef.current.textContent = numberFormat(stat.display)(0);
    },
    onPlay: () => countUp(numberRef.current, stat.value, numberFormat(stat.display), stat.display),
  });

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] sm:gap-4">
        <div aria-hidden="true" className="relative order-2 mx-auto w-full max-w-[330px] sm:order-1">
          <Image src={cutout} alt="" width={525} height={700} sizes="330px" className="h-auto w-full" />

          {/* The chat, sized to the screen; type is in cqw, so it scales with the phone */}
          <div
            className="@container absolute overflow-hidden rounded-[9%/6%]"
            style={{ left: `${SCREEN.left}%`, top: `${SCREEN.top}%`, width: `${SCREEN.width}%`, height: `${SCREEN.height}%` }}
          >
            <div className="flex h-full flex-col gap-[5cqw] p-[7cqw] pt-[9cqw]">
              <div className="flex items-center gap-[3cqw] border-b border-dark-green/10 pb-[4cqw]">
                <Sparkles className="h-[9cqw] w-[9cqw] text-mid-green" strokeWidth={2} />
                <span className="text-[8cqw] font-semibold leading-none text-dark-green">{title}</span>
              </div>
              <span
                className="ml-auto max-w-[85%] rounded-[6cqw] rounded-br-[1.5cqw] bg-sage px-[5cqw] py-[3cqw] text-[7.5cqw] leading-tight text-dark-green armed:opacity-0 playing:animate-chip-pop"
                style={{ animationDelay: `${ASK}s` }}
              >
                {smartQuotes(ask)}
              </span>
              {/* The typing dots and the reply share one spot: the dots come and go, then the reply arrives there. */}
              <div className="grid items-start">
                <span
                  className="col-start-1 row-start-1 flex gap-[2.5cqw] self-start justify-self-start rounded-[6cqw] bg-dark-green/[0.06] px-[5cqw] py-[4cqw] opacity-0 playing:animate-dots-show"
                  style={{ animationDelay: `${TYPING}s` }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-[3cqw] w-[3cqw] rounded-full bg-dark-green/50 playing:animate-dot-pulse"
                      style={{ animationDelay: `${TYPING + d * 0.13}s` }}
                    />
                  ))}
                </span>
                <span
                  className="col-start-1 row-start-1 flex w-[88%] flex-col gap-[3cqw] rounded-[6cqw] rounded-bl-[1.5cqw] bg-dark-green/[0.06] px-[5cqw] py-[5cqw] armed:opacity-0 playing:animate-fade-in"
                  style={{ animationDelay: `${REPLY}s`, animationDuration: "0.2s" }}
                >
                  {Array.from({ length: replyLines }, (_, i) => (
                    <span
                      key={i}
                      className="h-[3.5cqw] rounded-full bg-dark-green/20 origin-left armed:scale-x-0 playing:animate-bar-grow"
                      style={{ width: i === replyLines - 1 ? "60%" : "100%", animationDelay: `${REPLY + 0.1 + i * 0.12}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="order-1 sm:order-2">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-mid-green">{eyebrow}</p>
          <span className="mt-3 inline-grid font-serif text-6xl font-bold leading-none tracking-tight text-dark-green">
            <span className="invisible col-start-1 row-start-1">{stat.display}</span>
            <span ref={numberRef} className="col-start-1 row-start-1">
              {stat.display}
            </span>
          </span>
          <p className="mt-3 text-lg leading-snug text-body">{smartQuotes(stat.label)}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        {caption}
        <span className="sr-only">
          : {eyebrow}. {spoken(stat.display)} {smartQuotes(stat.label)}. A phone shows an {title} asked {"“"}
          {smartQuotes(ask)}
          {"”"}.
        </span>
      </figcaption>
    </figure>
  );
}
