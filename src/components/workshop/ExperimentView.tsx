"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface ExperimentViewProps {
  /** The split test's name, e.g. the workshop slug. */
  experiment: string;
  design: string;
  title: string;
}

/**
 * Tells Google Analytics which version of a split-tested page this visit saw (src/lib/experiments.ts), as an
 * `experiment_view` event with ab_design and ab_title. Members on a ?code= link aren't in the test, so they send
 * nothing. GA's own script loads after the page, so this waits a few seconds for it. Renders nothing.
 */
export default function ExperimentView({ experiment, design, title }: ExperimentViewProps) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("code")) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (window.gtag) trackEvent("experiment_view", { experiment, ab_design: design, ab_title: title });
      if (window.gtag || tries >= 20) window.clearInterval(timer);
    }, 250);
    return () => window.clearInterval(timer);
  }, [experiment, design, title]);

  return null;
}
