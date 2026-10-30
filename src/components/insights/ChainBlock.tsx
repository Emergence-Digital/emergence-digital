"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { Circle, Cpu, Receipt, Target, TrendingDown, type LucideIcon } from "lucide-react";
import type { ChainGraphic } from "@/lib/insights-data";
import { spoken } from "@/lib/insights-format";
import NewsCard, { CardEyebrow } from "./NewsCard";
import { useReveal } from "./useReveal";

const icons: Record<string, LucideIcon> = { cpu: Cpu, receipt: Receipt, target: Target, "trending-down": TrendingDown };

/** Seconds between steps. Each connector draws in that gap, reaching the next step as it appears. */
const STEP = 0.25;

/** The arrow from one step down to the next, drawn with stroke-dashoffset. */
function Connector({ delay }: { delay: number }) {
  return (
    <span className="flex flex-1 flex-col items-center pt-1.5 pb-1 text-sage/60">
      {/* Stretched to the row's height; the line is vertical, so stretching never changes its width. */}
      <svg viewBox="0 0 12 100" preserveAspectRatio="none" className="w-3 flex-1 min-h-3">
        <path
          d="M6 0V100"
          stroke="currentColor"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray="1"
          className="armed:[stroke-dashoffset:1] playing:animate-line-draw"
          style={{ animationDelay: `${delay}s` }}
        />
      </svg>
      <svg viewBox="0 0 12 8" className="w-3 h-2 flex-none">
        <path
          d="M1.5 1.5 6 6l4.5-4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="armed:opacity-0 playing:animate-fade-in"
          style={{ animationDelay: `${delay + 0.15}s`, animationDuration: "0.1s" }}
        />
      </svg>
    </span>
  );
}

interface ChainBlockProps {
  graphic: ChainGraphic;
  source: string;
  jump?: ReactNode;
}

/** Cause and effect: steps reveal one by one as an arrow draws down to each; a step's cut-out slides in beside the card. */
export default function ChainBlock({ graphic, source, jump }: ChainBlockProps) {
  const { eyebrow, steps } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const description =
    `${eyebrow}: ` +
    steps.map((step) => [step.big && spoken(step.big), step.chip && spoken(step.chip), step.text].filter(Boolean).join(", ")).join(". ") +
    `. Source: ${source.replaceAll(" · ", ", ")}.`;

  return (
    <figure ref={ref}>
      {/* Room on the right, from sm up, for cut-outs that hang over the card's edge. */}
      <NewsCard source={source} jump={jump} className={steps.some((s) => s.cutout) ? "sm:mr-14" : ""}>
        <CardEyebrow>{eyebrow}</CardEyebrow>
        <ol className="mt-6">
          {steps.map((step, i) => {
            const Icon = icons[step.icon] ?? Circle;
            const last = i === steps.length - 1;
            const at = i * STEP;
            return (
              <li key={i} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className="grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-sage text-sage armed:opacity-0 playing:animate-chip-pop"
                    style={{ animationDelay: `${at}s` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  {!last && <Connector delay={at + 0.05} />}
                </div>

                <div
                  className={`min-w-0 flex-1 ${last ? "" : "pb-7"} ${step.big ? "" : "pt-2.5"} ${
                    step.cutout ? "pr-16 sm:pr-28" : ""
                  } armed:opacity-0 playing:animate-step-rise`}
                  style={{ animationDelay: `${at}s` }}
                >
                  {(step.big || step.chip) && (
                    <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      {step.big && <span className="font-serif text-4xl font-bold leading-none tracking-tight">{step.big}</span>}
                      {step.chip && (
                        <span
                          className="rounded-full bg-mid-green px-3 py-1 text-sm font-semibold text-white armed:opacity-0 playing:animate-chip-pop"
                          style={{ animationDelay: `${at + 0.3}s` }}
                        >
                          {step.chip}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-white/85 leading-snug">{step.text}</p>
                </div>

                {step.cutout && (
                  <div className="absolute top-1/2 -right-7 w-[72px] -translate-y-1/2 sm:-right-[5.5rem] sm:w-[150px]">
                    <Image
                      src={step.cutout}
                      alt=""
                      width={696}
                      height={900}
                      sizes="(min-width: 640px) 150px, 72px"
                      className="h-auto w-full [filter:drop-shadow(0_14px_18px_rgba(0,0,0,0.3))] armed:opacity-0 playing:animate-cutout-slide"
                      style={{ animationDelay: `${at + 0.1}s` }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </NewsCard>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
