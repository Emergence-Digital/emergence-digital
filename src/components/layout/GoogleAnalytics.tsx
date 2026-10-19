import Script from "next/script";
import { PERSONAL_PARAMS } from "@/lib/attribution";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

/**
 * Google Analytics 4 (gtag.js). Renders nothing unless
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set, and in Vercel it's set for Production
 * only, so previews and local dev don't send data. See SETUP.md.
 *
 * GA4 records client-side navigations itself (enhanced measurement's "page
 * changes based on browser history events"), so there's no router hook here.
 * Google's terms forbid sending personal details to GA, so before the first
 * page view the snippet takes any personal-detail params (booking prefill
 * links) out of the address bar.
 */
export default function GoogleAnalytics() {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          (function () {
            var url = new URL(window.location.href);
            var personal = ${JSON.stringify(PERSONAL_PARAMS)};
            if (!personal.some(function (p) { return url.searchParams.has(p); })) return;
            personal.forEach(function (p) { url.searchParams.delete(p); });
            window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
          })();
          gtag("js", new Date());
          gtag("config", "${measurementId}");
        `}
      </Script>
    </>
  );
}
