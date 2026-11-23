"use client";

import { useMemo, useSyncExternalStore } from "react";
import CalendarEmbed from "@/components/sections/CalendarEmbed";
import { CHECKOUT_PREFILL_KEY } from "@/lib/lead-forms";

type Prefill = Record<string, string>;

// The stored details don't change while the page is open, so there's nothing to subscribe to.
const subscribe = () => () => {};

function readStored(): string {
  try {
    return sessionStorage.getItem(CHECKOUT_PREFILL_KEY) ?? "";
  } catch {
    return "";
  }
}

function parsePrefill(raw: string): Prefill {
  try {
    const parsed: unknown = JSON.parse(raw || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
    );
  } catch {
    return {};
  }
}

/**
 * The GHL calendar for the workshop's "talk to Shane" step, prefilled with the details the landing page form kept
 * in this tab's sessionStorage (they never come back through Stripe). The server render leaves a placeholder, so
 * the calendar loads once, in the browser, with the details already in its URL.
 */
export default function WorkshopCallCalendar({ calendarId }: { calendarId: string }) {
  const raw = useSyncExternalStore(subscribe, readStored, () => null);
  const prefill = useMemo(() => (raw === null ? null : parsePrefill(raw)), [raw]);

  if (!prefill) return <div className="min-h-[720px]" aria-hidden="true" />;
  return <CalendarEmbed calendarId={calendarId} prefill={prefill} title="Book a call with Shane" />;
}
