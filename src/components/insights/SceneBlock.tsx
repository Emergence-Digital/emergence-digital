"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import type { PriceTagScene } from "@/lib/insights-data";
import { spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

interface SceneBlockProps {
  graphic: PriceTagScene;
  source: string;
  jump?: ReactNode;
}

/**
 * Bars on a news card beside a cut-out scene. "price-tag": the laptop stack (`base`) sits still while the kraft tag
 * (`swing`) drops in from about −25°, swings and settles at −8°, hanging off the top laptop, with its label on it.
 */
export default function SceneBlock({ graphic, source, jump }: SceneBlockProps) {
  const { eyebrow, bars, layers } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const max = Math.max(...bars.map((bar) => bar.value));
  const base = layers.find((layer) => layer.role === "base");
  const swing = layers.find((layer) => layer.role === "swing");

  const description =
    `${eyebrow}: ` +
    bars.map((bar) => `${bar.label}, ${spoken(bar.display)}`).join("; ") +
    `. Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref} className="grid items-center gap-x-6 gap-y-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
      <NewsCard source={source} jump={jump}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <ul className="mt-6 space-y-5">
          {bars.map((bar, i) => {
            const at = 0.1 + i * 0.35;
            return (
              <li key={bar.label}>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm text-white/75">{bar.label}</span>
                  <span
                    className={`font-serif text-4xl font-bold leading-none tracking-tight armed:opacity-0 playing:animate-chip-pop ${
                      bar.highlight ? "text-sage" : "text-white"
                    }`}
                    style={{ animationDelay: `${at + 0.45}s` }}
                  >
                    {bar.display}
                  </span>
                </div>
                <div
                  className={`mt-2.5 h-3.5 rounded-full origin-left armed:scale-x-0 playing:animate-bar-grow ${
                    bar.highlight ? "bg-sage" : "bg-white/25"
                  }`}
                  style={{ width: `${(bar.value / max) * 100}%`, animationDelay: `${at}s` }}
                />
              </li>
            );
          })}
        </ul>
      </NewsCard>

      {base && (
        <div aria-hidden="true" className="relative mx-auto w-full max-w-[230px] sm:max-w-[250px]">
          <Image
            src={base.src}
            alt=""
            width={900}
            height={1000}
            sizes="250px"
            className="h-auto w-full [filter:drop-shadow(0_18px_22px_rgba(28,56,48,0.22))]"
          />
          {swing && (
            // Placed so the knot at the top of the tag's string sits on the top laptop's right-hand corner. The tag
            // pivots there (91% across, 1% down the tag image).
            <div className="@container absolute left-[63%] top-[47%] w-[39%]">
              <div
                className="relative origin-[91%_1%] rotate-[-8deg] armed:opacity-0 playing:animate-tag-swing"
                style={{ animationDelay: "0.35s" }}
              >
                <Image src={swing.src} alt="" width={525} height={700} sizes="100px" className="h-auto w-full [filter:drop-shadow(0_8px_10px_rgba(28,56,48,0.25))]" />
                {swing.label && (
                  <span className="absolute left-[37%] top-[60%] -translate-x-1/2 -translate-y-1/2 rotate-[20deg] font-serif text-[30cqw] font-bold leading-none text-dark-green whitespace-nowrap">
                    {swing.label}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
