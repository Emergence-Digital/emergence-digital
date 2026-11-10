"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

interface MetaEventProps {
  /** A standard Meta event name, e.g. "Schedule". */
  name: string;
  contentName?: string;
}

/**
 * Sends one Meta Pixel event when the page loads. Renders nothing. Once per
 * page per browser tab, so a refresh doesn't count it twice.
 */
export default function MetaEvent({ name, contentName }: MetaEventProps) {
  useEffect(() => {
    const key = `meta-event:${name}:${window.location.pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked: send it anyway.
    }
    trackMetaEvent(name, contentName ? { content_name: contentName } : {});
  }, [name, contentName]);

  return null;
}
