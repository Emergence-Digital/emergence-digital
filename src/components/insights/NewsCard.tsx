import type { ReactNode } from "react";

/**
 * The white SOURCE pill, as on the news videos' headline card. Sits under a post's headline and on graphics that quote
 * a figure. A long source wraps onto a second line rather than run past the card on phones.
 */
export function SourceChip({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-2 sm:gap-2.5 rounded-[18px] bg-white px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold leading-snug text-dark-green shadow-[0_6px_16px_-8px_rgba(28,56,48,0.4)] ${className}`}
    >
      <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-mid-green">Source</span>
      {text}
    </span>
  );
}

/** The jump chip's place on a graphic: its own row on phones, on the card's top edge from sm up. */
export function JumpSlot({ children, className = "" }: { children?: ReactNode; className?: string }) {
  if (!children) return null;
  return <div className={`flex justify-end mb-4 sm:mb-0 sm:absolute sm:-top-4 sm:right-7 sm:z-10 ${className}`}>{children}</div>;
}

interface NewsCardProps {
  /** Shows the SOURCE tab across the card's top edge. */
  source?: string;
  /** The "▶ 0:18 in the video" chip. */
  jump?: ReactNode;
  /** Leaves the contents readable by screen readers, for cards people use (the checklist). */
  readable?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The dark green news card the Insights graphics are built on. Its contents are hidden from screen readers: each
 * graphic's figcaption says the same in words. The jump chip stays reachable.
 */
export default function NewsCard({ source, jump, readable = false, className = "", children }: NewsCardProps) {
  return (
    <div
      className={`relative rounded-[24px] bg-dark-green text-white px-5 pb-7 sm:px-8 sm:pb-8 shadow-[0_32px_60px_-28px_rgba(28,56,48,0.6),0_10px_24px_-14px_rgba(28,56,48,0.35)] ${
        source || jump ? "pt-9 sm:pt-11" : "pt-7 sm:pt-8"
      } ${className}`}
    >
      {source && (
        <SourceChip
          text={source}
          className="absolute -top-3.5 sm:-top-4 left-4 sm:left-7 max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-3.5rem)]"
        />
      )}
      <JumpSlot>{jump}</JumpSlot>
      <div aria-hidden={readable ? undefined : true}>{children}</div>
    </div>
  );
}

/** Small uppercase line at the top of a card. */
export function CardEyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold tracking-[0.16em] uppercase text-sage leading-relaxed ${className}`}>{children}</p>;
}
