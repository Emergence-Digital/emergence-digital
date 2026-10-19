/**
 * Google Analytics 4 events. gtag is defined by <GoogleAnalytics /> in the root
 * layout; when GA isn't loaded (no measurement ID, or an ad blocker) these are
 * no-ops.
 */

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Record<string, string | number>) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string | number>): void {
  window.gtag?.("event", name, params);
}
