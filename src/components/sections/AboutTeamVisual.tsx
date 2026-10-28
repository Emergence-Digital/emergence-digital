"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Briefcase, MapPin, Users, type LucideIcon } from "lucide-react";

/**
 * The team beside the About page hero: Jordan, Shane and Nikki standing in a dark green panel, heads above its top
 * edge, with a "Your team to help you…" card whose goal swaps every 3.2 s, and two chips. It moves like the industry
 * hero cards (IndustryHeroCards): the panel, people and card rise in and stay put, then the chips rise and float. Every
 * position is in a 560×520 design box and set as a percentage, so it scales with the column. Motion stops for reduced
 * motion, and the goal then stays on the first line.
 */

const BOX = { width: 560, height: 520 };
const x = (px: number) => `${(px / BOX.width) * 100}%`;
const y = (px: number) => `${(px / BOX.height) * 100}%`;

const SHADOW = "[filter:drop-shadow(0_16px_22px_rgba(28,56,48,0.16))_drop-shadow(0_2px_4px_rgba(28,56,48,0.08))]";
const TILE = "bg-[#2F9E5E]";

/** Bottom-aligned in the people layer, Shane last so he stands in front. */
const people = [
  { src: "/about/jordan.webp", style: { left: x(-18), width: x(292) } },
  { src: "/about/nikki.webp", style: { right: x(-16), width: x(292) } },
  { src: "/about/shane-kennedy.webp", style: { left: "50%", width: x(306), transform: "translateX(-50%)" } },
];

/**
 * The twelve benefit tiles from Why Choose Emergence (WhyChooseUs.tsx), worded to finish "Your team to help you".
 * Kept here so either list can change on its own. The order keeps the money lines apart.
 */
const goals = [
  "win bigger clients.",
  "lift your margins.",
  "compete with the Big 4.",
  "fill your project pipeline.",
  "increase your cash flow.",
  "shorten your sales cycles.",
  "keep customers coming back.",
  "grow your revenue.",
  "open up more opportunities.",
  "grow without hiring.",
  "make more profit.",
  "build a business worth buying.",
];

const chips: { title: string; subtitle: string; Icon: LucideIcon; style: CSSProperties; float: CSSProperties }[] = [
  {
    title: "Based in Melbourne",
    subtitle: "Victoria, Australia",
    Icon: MapPin,
    style: { left: x(-44), top: y(30), animationDelay: "510ms" },
    float: { animationDuration: "6s" },
  },
  {
    title: "Built for IT firms",
    subtitle: "MSP · ERP · Cloud · SaaS",
    Icon: Briefcase,
    style: { right: x(-34), top: y(-6), animationDelay: "630ms" },
    float: { animationDuration: "7.25s", animationDelay: "-1.7s" },
  },
];

const SWAP_EVERY_MS = 3200;
/** The card rises in at 390 ms and takes 800 ms, so the swapping starts once it's in place. */
const SWAP_START_MS = 1200;

export default function AboutTeamVisual() {
  const [goal, setGoal] = useState({ current: 0, previous: -1 });
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setSwapping(true);
      interval = window.setInterval(() => {
        setGoal(({ current }) => ({ current: (current + 1) % goals.length, previous: current }));
      }, SWAP_EVERY_MS);
    }, SWAP_START_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="@container relative w-full max-w-[560px] mx-auto"
      style={{ aspectRatio: `${BOX.width} / ${BOX.height}` }}
    >
      {/* Green panel */}
      <div
        className={`absolute left-0 w-full overflow-hidden rounded-[28px] bg-dark-green animate-card-rise motion-reduce:animate-none ${SHADOW}`}
        style={{ top: y(236), height: y(210), animationDelay: "150ms" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(74,124,89,0.55) 0%, transparent 70%)" }}
        />
      </div>

      {/* People: clipped to the panel's sides and rounded bottom corners, free above it */}
      <div
        role="img"
        aria-label="Jordan, Shane and Nikki, the Emergence Digital team"
        className="absolute left-0 top-0 w-full animate-card-rise motion-reduce:animate-none [clip-path:inset(-20%_0_0_0_round_0_0_28px_28px)]"
        style={{ height: y(446), animationDelay: "270ms" }}
      >
        {people.map((person) => (
          <Image
            key={person.src}
            src={person.src}
            alt=""
            width={1000}
            height={1232}
            sizes="(min-width: 640px) 310px, 55vw"
            loading="eager"
            className="absolute bottom-0 h-auto max-w-none"
            style={person.style}
          />
        ))}
      </div>

      {/* "Your team to help you…" card, over the panel's bottom edge */}
      <div
        className={`absolute left-[2%] w-[96%] sm:left-(--card-left) sm:w-(--card-width) rounded-[18px] bg-white animate-card-rise motion-reduce:animate-none ${SHADOW}`}
        style={{ top: y(404), "--card-left": x(36), "--card-width": x(488), animationDelay: "390ms" } as CSSProperties}
      >
        <div className="flex items-center gap-4 p-3.5 sm:px-[22px] sm:py-[18px]">
          <div className={`hidden sm:grid size-11 shrink-0 place-items-center rounded-[12px] ${TILE}`}>
            <Users aria-hidden="true" className="size-[22px] text-white" />
          </div>
          <div aria-hidden="true" className="flex-1 min-w-0">
            <p className="font-serif font-bold text-dark-green leading-[1.2] text-[clamp(14px,3.4cqw,19px)]">
              Your team to help you
            </p>
            <p className="relative mt-0.5 h-[1.4em] overflow-hidden font-serif font-bold text-mid-green text-[clamp(15px,3.9cqw,22px)]">
              {goals.map((line, i) => (
                <span
                  key={line}
                  className={`absolute left-0 top-0 whitespace-nowrap leading-[1.4em] transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === goal.current
                      ? "translate-y-0 opacity-100"
                      : i === goal.previous
                        ? "-translate-y-full opacity-0"
                        : "translate-y-full opacity-0"
                  }`}
                >
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-[9px] h-[3px] w-14 overflow-hidden rounded-[2px] bg-[#e3ddd5] motion-reduce:hidden">
              {swapping && <i key={goal.current} className="block h-full rounded-[inherit] bg-mid-green animate-goal-fill" />}
            </div>
          </div>
          <span className="sr-only">
            Your team to help you win bigger clients, grow your revenue and build a business worth buying.
          </span>
        </div>
      </div>

      {/* Chips: hidden on phones, where they'd shrink too far to read */}
      {chips.map(({ title, subtitle, Icon, style, float }) => (
        <div key={title} className="absolute hidden sm:block animate-card-rise motion-reduce:animate-none" style={style}>
          <div className="animate-card-float motion-reduce:animate-none" style={float}>
            <div className={`flex items-center gap-3 whitespace-nowrap rounded-[14px] bg-white py-2.5 pl-2.5 pr-4 ${SHADOW}`}>
              <div className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${TILE}`}>
                <Icon aria-hidden="true" className="size-5 text-white" />
              </div>
              <div>
                <p className="text-[15px] font-semibold leading-[1.2] text-[#111]">{title}</p>
                <p className="mt-0.5 text-[12.5px] leading-[1.3] text-muted">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
