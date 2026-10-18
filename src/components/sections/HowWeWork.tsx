"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

// The campaign cycle from the client's side: what each step asks of them ("Your part") and a small
// screen showing what they get to see at that point. Steps light up as they scroll into view; on
// desktop they play left to right, each step starting STEP_MS after the one before.
const STEP_MS = 500;

// Delay relative to the moment this step lights up. --wd is set per step on the <li>.
const after = (ms: number): CSSProperties => ({ transitionDelay: `calc(var(--wd) + ${ms}ms)` });

type IconProps = { className?: string };

function CheckIcon({ className = "w-3 h-3" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.5 8.5l3 3 6-6.5" />
    </svg>
  );
}

function CalendarIcon({ className = "w-3.5 h-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
      <path d="M2.5 6.75h11M5.5 2v3M10.5 2v3" />
    </svg>
  );
}

function DocIcon({ className = "w-3.5 h-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
      <path d="M4 1.75h5l3 3v9.5H4z" />
      <path d="M9 1.75v3h3M6.25 8.5h3.5M6.25 11h3.5" strokeLinecap="round" />
    </svg>
  );
}

function LoopIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13.25 8A5.25 5.25 0 1 1 11.7 4.3" />
      <path d="M12.25 1.5v3.25H9" />
    </svg>
  );
}

// A small white app screen. Decorative: the step text carries the meaning.
function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[17rem] rounded-xl bg-white border border-dark-green/10 shadow-[0_14px_30px_-16px_rgba(28,56,48,0.45)] p-3.5 lg:p-3 xl:p-3.5 text-[11px] leading-snug text-body select-none"
    >
      {children}
    </div>
  );
}

// A status pill that changes from `from` to `to` when the step lights up.
function Status({ on, from, to, delay = 250 }: { on: boolean; from: string; to: string; delay?: number }) {
  const fade = "col-start-1 row-start-1 rounded-full px-2 py-0.5 text-center whitespace-nowrap transition-opacity duration-300 motion-reduce:transition-none";
  return (
    <span className="grid text-[10px] font-semibold">
      <span className={`${fade} bg-dark-green/5 text-muted ${on ? "opacity-0" : ""}`} style={after(delay)}>
        {from}
      </span>
      <span className={`${fade} inline-flex items-center justify-center gap-1 bg-mid-green/15 text-mid-green ${on ? "" : "opacity-0"}`} style={after(delay)}>
        <CheckIcon className="w-2.5 h-2.5" />
        {to}
      </span>
    </span>
  );
}

type ViewProps = { on: boolean };

function KickoffView({ on }: ViewProps) {
  return (
    <Screen>
      <div className="flex items-center gap-2.5">
        <Image src="/shanek.jpeg" alt="" width={64} height={64} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-dark-green text-xs">Strategy session</p>
          <p className="text-muted">with Shane Kennedy</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-dark-green/10 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-muted">
          <CalendarIcon />
          Tue, 10am
        </span>
        <Status on={on} from="Invite sent" to="Booked" />
      </div>
    </Screen>
  );
}

function PlanView({ on }: ViewProps) {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-semibold text-dark-green text-xs">
          <DocIcon />
          Campaign plan
        </p>
        <span className="text-muted">90 days</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {["Ideal clients", "Message and offer", "Targets"].map((item, j) => (
          <li key={item} className="flex items-center gap-2">
            <span
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors duration-300 motion-reduce:transition-none ${
                on ? "bg-mid-green border-mid-green text-white" : "border-dark-green/25 text-transparent"
              }`}
              style={after(j * 120)}
            >
              <CheckIcon className="w-2.5 h-2.5" />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-2.5 border-t border-dark-green/10 flex justify-end">
        <Status on={on} from="Awaiting sign-off" to="Signed off" delay={400} />
      </div>
    </Screen>
  );
}

function BuildView({ on }: ViewProps) {
  const swap = "col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none";
  return (
    <Screen>
      <p className="flex items-center justify-between font-semibold text-dark-green text-xs">
        Ready for your review
        <span className="w-1.5 h-1.5 rounded-full bg-mid-green" />
      </p>
      <div className="mt-2.5 rounded-lg bg-cream p-2.5 flex gap-2.5">
        <div className="w-9 h-9 rounded-md bg-mid-green/25 shrink-0" />
        <div className="flex-1 space-y-1.5 pt-1">
          <div className="h-1.5 rounded-full bg-dark-green/20" />
          <div className="h-1.5 rounded-full bg-dark-green/15 w-4/5" />
          <div className="h-1.5 rounded-full bg-dark-green/10 w-3/5" />
        </div>
      </div>
      <div className="mt-3 grid font-semibold">
        <div className={`${swap} flex gap-2 ${on ? "opacity-0" : ""}`} style={after(250)}>
          <span className="flex-1 rounded-md bg-mid-green text-white text-center py-1.5">Approve</span>
          <span className="flex-1 rounded-md border border-dark-green/15 text-dark-green text-center py-1.5">Comment</span>
        </div>
        <div
          className={`${swap} flex items-center justify-center gap-1.5 rounded-md bg-mid-green/15 text-mid-green py-1.5 ${on ? "" : "opacity-0"}`}
          style={after(250)}
        >
          <CheckIcon />
          Approved by you
        </div>
      </div>
    </Screen>
  );
}

const liveRows = [
  { label: "Conversations", bars: [30, 45, 40, 62, 78] },
  { label: "Meetings booked", bars: [20, 34, 50, 56, 82] },
];

function LiveView({ on }: ViewProps) {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-dark-green text-xs">Your dashboard</p>
        <span className="flex items-center gap-1.5 text-mid-green font-semibold">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-mid-green opacity-60 animate-ping motion-reduce:animate-none" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-mid-green" />
          </span>
          Live
        </span>
      </div>
      {liveRows.map((row) => (
        <div key={row.label} className="mt-2.5 flex items-end justify-between gap-3">
          <span className="text-muted">{row.label}</span>
          <span className="flex items-end gap-[3px] h-6">
            {row.bars.map((h, k) => (
              <span
                key={k}
                className="w-2 rounded-sm bg-mid-green origin-bottom transition-transform duration-500 motion-reduce:transition-none"
                style={{ height: `${h}%`, transform: on ? "scaleY(1)" : "scaleY(0.15)", ...after(k * 70) }}
              />
            ))}
          </span>
        </div>
      ))}
      <p className="mt-2.5 pt-2 border-t border-dark-green/10 text-muted">Updated today</p>
    </Screen>
  );
}

function ReviewView({ on }: ViewProps) {
  return (
    <Screen>
      <p className="font-semibold text-dark-green text-xs">Quarter in review</p>
      <div className="mt-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-muted">What&apos;s working</span>
          <span className="rounded-full bg-mid-green/15 text-mid-green font-semibold text-[10px] px-2 py-0.5">Keep</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">What isn&apos;t</span>
          <span className="rounded-full bg-dark-green/5 text-muted font-semibold text-[10px] px-2 py-0.5">Drop</span>
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-dark-green/10 flex items-center justify-between gap-2">
        <span className="text-muted">Next quarter</span>
        <Status on={on} from="Drafting" to="Planned" />
      </div>
    </Screen>
  );
}

const steps = [
  {
    title: "One conversation to start",
    outcome:
      "We draw out your expertise, your best clients and what sets you apart in a single strategy session. No briefs to write.",
    yourPart: "One strategy session",
    View: KickoffView,
  },
  {
    title: "A plan you sign off",
    outcome:
      "Before anything goes live, you know exactly who we're going after, what we'll say and the targets we'll be measured against.",
    yourPart: "Read it and sign off",
    View: PlanView,
  },
  {
    title: "We build and launch it",
    outcome:
      "Your campaign comes together without pulling you or your team off client work, and nothing goes out under your name until you've approved it.",
    yourPart: "Approve or comment",
    View: BuildView,
  },
  {
    title: "Live, in full view",
    outcome:
      "Every piece of work and every result sits in one place you can check any time, so you never have to chase us for an update.",
    yourPart: "A short regular check-in",
    View: LiveView,
  },
  {
    title: "Review and go again",
    outcome:
      "Each quarter we go through the results with you, keep what's winning work, drop what isn't and set the next targets together.",
    yourPart: "One review meeting",
    View: ReviewView,
  },
];

export default function HowWeWork() {
  const listRef = useRef<HTMLOListElement>(null);
  // Index of the furthest step that has scrolled into view (-1 = none yet).
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.step);
          setReached((r) => Math.max(r, index));
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 [--gap:1rem] xl:[--gap:1.5rem]">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight text-balance">
            We do the heavy lifting. You see every step.
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-6 text-pretty">
            Working with us takes very little of your time, and you&apos;ll never wonder what&apos;s
            happening or what you&apos;re paying for. You deal directly with our founder, Shane, from
            the first conversation to every quarterly review.
          </p>
        </div>

        <ol ref={listRef} className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[auto_auto_auto] lg:gap-x-(--gap)">
          {steps.map(({ title, outcome, yourPart, View }, i) => {
            const on = reached >= i;
            return (
              <li
                key={title}
                data-step={i}
                className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 sm:gap-x-6 pb-12 md:grid-cols-[2.5rem_1fr_16rem] lg:pb-0 lg:grid-cols-1 lg:row-span-3 lg:grid-rows-subgrid [--wd:150ms] lg:[--wd:var(--d)]"
                style={{ "--d": `${i * STEP_MS}ms` } as CSSProperties}
              >
                {/* Vertical track to the next step (and on to the loop after the last), below lg */}
                <span aria-hidden="true" className="lg:hidden absolute left-5 -translate-x-1/2 top-12 bottom-2 w-0.5 bg-mid-green/20 overflow-hidden">
                  <span
                    className={`block h-full bg-mid-green origin-top transition-transform duration-500 motion-reduce:transition-none ${on ? "scale-y-100" : "scale-y-0"}`}
                    style={after(100)}
                  />
                </span>

                {/* What the client sees at this step */}
                <div className="col-start-2 row-start-2 mt-6 md:col-start-3 md:row-start-1 md:mt-1 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end">
                  <View on={on} />
                </div>

                {/* Step node, with the track to the next step on desktop */}
                <div className="col-start-1 row-start-1 relative lg:row-start-2 lg:my-7">
                  <span
                    aria-hidden="true"
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-mid-green font-semibold text-sm transition-colors duration-300 motion-reduce:transition-none ${
                      on ? "bg-mid-green text-white" : "bg-cream text-mid-green"
                    }`}
                    style={after(0)}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-12 right-[calc(0.5rem-var(--gap))] h-0.5 bg-mid-green/20 overflow-hidden">
                      <span
                        className={`block h-full bg-mid-green origin-left transition-transform duration-[400ms] motion-reduce:transition-none ${on ? "scale-x-100" : "scale-x-0"}`}
                        style={after(50)}
                      />
                    </span>
                  )}
                </div>

                <div className="col-start-2 row-start-1 flex flex-col lg:col-start-1 lg:row-start-3">
                  <h3 className="font-serif text-2xl lg:text-xl font-semibold text-dark-green leading-snug mb-2 pt-1.5 lg:pt-0">
                    {title}
                  </h3>
                  <p className="text-muted leading-relaxed lg:text-[15px] mb-4">{outcome}</p>
                  <div className="mt-auto pt-3 border-t border-dark-green/10">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-mid-green">Your part</p>
                    <p className="text-sm font-medium text-dark-green mt-0.5">{yourPart}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* The cycle: after the review, back to the plan. A bracket from step 05 to step 02 on desktop. */}
        <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 sm:gap-x-6 lg:grid-cols-5 lg:gap-x-(--gap) lg:mt-8">
          <span
            aria-hidden="true"
            className="lg:hidden col-start-1 row-start-1 flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-mid-green/60 text-mid-green"
          >
            <LoopIcon />
          </span>
          <div className="col-start-2 row-start-1 self-center relative lg:col-[2/6] lg:ml-5 lg:mr-[calc((100%-3*var(--gap))/4-1.25rem)] lg:h-14 lg:rounded-b-3xl lg:border-2 lg:border-t-0 lg:border-dashed lg:border-mid-green/50">
            <svg aria-hidden="true" viewBox="0 0 12 8" className="hidden lg:block absolute -top-2 -left-[7px] w-3 h-2 text-mid-green">
              <path d="M6 0L12 8H0z" fill="currentColor" />
            </svg>
            <p className="flex items-center gap-2 text-dark-green font-medium lg:absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2 lg:bg-cream lg:px-4 lg:whitespace-nowrap">
              <LoopIcon className="hidden lg:block w-4 h-4 text-mid-green" />
              Every quarter we loop back to step 02, sharper for what we&apos;ve learned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
