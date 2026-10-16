"use client";

import { useEffect } from "react";
import Script from "next/script";

/** Query params the GHL booking widget reads to prefill its form (checked against a live widget, Oct 2026). */
const BOOKING_PREFILL_PARAMS = ["first_name", "last_name", "email", "phone"];

interface CalendarEmbedProps {
  /** GHL calendar ID (see bookingCalendarIds in src/lib/lead-forms.ts). */
  calendarId: string;
  /**
   * The page's searchParams. first_name, last_name, email and phone (as added
   * by a <LeadForm /> redirect with prefillBooking) prefill the widget.
   */
  prefill?: Record<string, string | string[] | undefined>;
  title?: string;
}

/**
 * GHL calendar booking widget. GHL's form_embed.js sizes the iframe to its
 * content and passes UTM params through to the booking.
 */
export default function CalendarEmbed({ calendarId, prefill = {}, title = "Book a time" }: CalendarEmbedProps) {
  const src = new URL(`https://api.leadconnectorhq.com/widget/booking/${encodeURIComponent(calendarId)}`);
  for (const key of BOOKING_PREFILL_PARAMS) {
    const value = prefill[key];
    if (typeof value === "string" && value.trim()) src.searchParams.set(key, value.trim().slice(0, 200));
  }

  // The details are already in the widget's URL, so take them out of the
  // address bar: they shouldn't linger in browser history or analytics.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!BOOKING_PREFILL_PARAMS.some((key) => url.searchParams.has(key))) return;
    for (const key of BOOKING_PREFILL_PARAMS) url.searchParams.delete(key);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  return (
    <>
      <iframe
        id={`${calendarId}_booking`}
        src={src.toString()}
        title={title}
        scrolling="no"
        className="w-full min-h-[720px] border-0 overflow-hidden"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
