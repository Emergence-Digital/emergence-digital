"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import type { PadlockScene } from "@/lib/insights-data";
import { useReveal } from "./useReveal";

interface PadlockBlockProps {
  graphic: PadlockScene;
  jump?: ReactNode;
}

/**
 * Two cut-outs in the same spot on the cream page: the `before` padlock (open) shows first, then gives way to the
 * `after` one (closed), which drops into place as if just locked. Without motion only `after` shows. `caption` is
 * read out in place of the pictures.
 */
export default function PadlockBlock({ graphic, jump }: PadlockBlockProps) {
  const { layers, caption } = graphic;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const before = layers.find((layer) => layer.role === "before");
  const after = layers.find((layer) => layer.role === "after");
  const image = "object-contain object-bottom [filter:drop-shadow(0_18px_22px_rgba(28,56,48,0.25))]";

  return (
    <figure ref={ref}>
      {jump && <div className="mb-4 flex justify-end">{jump}</div>}
      <div aria-hidden="true" className="relative mx-auto aspect-[528/700] w-full max-w-[200px]">
        {before && (
          <Image
            src={before.src}
            alt=""
            fill
            sizes="200px"
            className={`${image} opacity-0 armed:opacity-100 playing:animate-fade-out`}
            style={{ animationDelay: "0.35s" }}
          />
        )}
        {after && (
          <Image
            src={after.src}
            alt=""
            fill
            sizes="200px"
            className={`${image} armed:opacity-0 playing:animate-lock-drop`}
            style={{ animationDelay: "0.45s" }}
          />
        )}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
