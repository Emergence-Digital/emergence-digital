"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution";

/**
 * Stores first-touch attribution (UTMs, click IDs, referrer, landing page) in a
 * 30-day first-party cookie on the visitor's first page load. Renders nothing.
 * Mounted once in the root layout.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureFirstTouch();
  }, []);

  return null;
}
