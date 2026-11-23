"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

interface MetaPurchaseProps {
  value: number;
  currency: string;
  contentName: string;
}

/**
 * Sends Meta a Purchase from the browser when Stripe redirects here after a payment. Stripe adds
 * ?session_id=cs_…, which doubles as the event ID, so a refresh (or a second tab) still counts once.
 * Without a session ID, someone just opened the page, so nothing is sent.
 *
 * The value is the list price: the browser can't see whether a promo code was used. Renders nothing.
 */
export default function MetaPurchase({ value, currency, contentName }: MetaPurchaseProps) {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id") ?? "";
    if (!/^cs_(live|test)_[\w-]{10,200}$/.test(sessionId)) return;

    const key = `meta-purchase:${sessionId}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      // Storage blocked: Meta still drops a repeat with the same event ID.
    }
    trackMetaEvent("Purchase", { value, currency, content_name: contentName }, sessionId);
  }, [value, currency, contentName]);

  return null;
}
