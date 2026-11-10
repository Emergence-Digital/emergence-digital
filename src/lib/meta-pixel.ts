/**
 * Meta Pixel browser events. fbq is defined by <MetaPixel /> in the root layout.
 * Events tracked before its snippet has run wait in window.__metaPixelQueue, and
 * the snippet sends them straight after the first PageView. With no Pixel ID
 * these are no-ops; with an ad blocker they're never sent (the server still
 * sends leads, see src/lib/meta-capi.ts).
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

/** Pixel (dataset) IDs are all digits. Anything else means no Pixel and no server events. */
export const metaPixelEnabled = /^\d{6,20}$/.test(META_PIXEL_ID);

export type MetaEventParams = Record<string, string | number>;
type QueuedMetaEvent = [name: string, params: MetaEventParams, eventId?: string];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __metaPixelQueue?: QueuedMetaEvent[];
  }
}

/**
 * Sends a standard Meta event (e.g. "Lead") from the browser. When the server
 * sends the same event, pass its event ID so Meta counts the two as one.
 */
export function trackMetaEvent(name: string, params: MetaEventParams = {}, eventId?: string): void {
  if (!metaPixelEnabled) return;
  if (!window.fbq) {
    (window.__metaPixelQueue ??= []).push([name, params, eventId]);
  } else if (eventId) {
    window.fbq("track", name, params, { eventID: eventId });
  } else {
    window.fbq("track", name, params);
  }
}
