"use client";

import { useEffect, useRef, type RefObject } from "react";

interface RevealHandlers {
  /** Called when the block is reset to its start state, before it scrolls in. */
  onArm?: () => void;
  /** Called when it starts playing. */
  onPlay?: () => void;
}

/**
 * Plays an Insights graphic once, the first time it scrolls into view. The server renders every graphic finished;
 * on mount this marks the block data-reveal="armed" (the `armed:` variant resets it to its start state), then
 * data-reveal="play" when a third of it is on screen (the `playing:` variant runs its animations). With reduced
 * motion, or no IntersectionObserver, it never arms, so the finished state stays.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, handlers: RevealHandlers = {}) {
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.dataset.reveal = "play";
        handlersRef.current.onPlay?.();
      },
      { threshold: 0.35 },
    );
    el.dataset.reveal = "armed";
    handlersRef.current.onArm?.();
    observer.observe(el);

    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, [ref]);
}

/**
 * A figure as shown ("55.4M", "1,200", "5×") split around its number, so a count-up can keep the format:
 * `numberFormat("55.4M")(12.3)` is "12.3M".
 */
export function numberFormat(display: string) {
  const match = display.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return () => display;
  const [, before, digits, after] = match;
  const decimals = digits.split(".")[1]?.length ?? 0;
  const grouped = digits.includes(",");
  return (n: number) =>
    before +
    n.toLocaleString("en-AU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped }) +
    after;
}

/** Counts an element's text up from 0 to `to`, easing out, then leaves `final` showing. */
export function countUp(el: HTMLElement | null, to: number, format: (n: number) => string, final: string, ms = 1200) {
  if (!el) return;
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min((now - start) / ms, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = t < 1 ? format(to * eased) : final;
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
