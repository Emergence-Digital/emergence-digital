"use client";

import { useRef, type ReactNode } from "react";
import { JumpSlot } from "./NewsCard";
import { useReveal } from "./useReveal";

interface TakeLineProps {
  line: string;
  /** The words on the sage block. */
  keyWords: string;
  jump?: ReactNode;
}

/** Shane's take in the video's style: the line in dark green, then the key words on a sage block that slides in from the left and tips to −2.5°. */
export default function TakeLine({ line, keyWords, jump }: TakeLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref} className={`relative mt-6 ${jump ? "sm:pt-6" : ""}`}>
      <JumpSlot className="sm:top-0 sm:right-0">{jump}</JumpSlot>
      <p className="font-serif text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-dark-green">
        <span className="block">{line}</span>{" "}
        <span
          className="mt-1.5 inline-block rounded-lg bg-sage px-3 pt-1.5 pb-1 -rotate-[2.5deg] armed:opacity-0 playing:animate-key-slide"
          style={{ animationDelay: "0.15s" }}
        >
          {keyWords}
        </span>
      </p>
    </div>
  );
}
