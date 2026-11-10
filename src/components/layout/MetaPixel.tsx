import Script from "next/script";
import { STRIP_PERSONAL_PARAMS_SCRIPT } from "@/lib/attribution";
import { META_PIXEL_ID, metaPixelEnabled } from "@/lib/meta-pixel";

/**
 * Meta Pixel (fbevents.js). Renders nothing unless NEXT_PUBLIC_META_PIXEL_ID is
 * set, and in Vercel it's set for Production only, so previews and local dev
 * don't send data. See SETUP.md.
 *
 * The snippet sends the first PageView; the Pixel records client-side
 * navigations itself (it watches history.pushState), so there's no router hook.
 * Like <GoogleAnalytics />, it takes personal-detail params (booking prefill
 * links) out of the address bar before that first PageView. Events tracked
 * before it ran (trackMetaEvent in src/lib/meta-pixel.ts) are sent after it.
 */
export default function MetaPixel() {
  if (!metaPixelEnabled) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        ${STRIP_PERSONAL_PARAMS_SCRIPT}
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq("init", "${META_PIXEL_ID}");
        fbq("track", "PageView");
        (window.__metaPixelQueue || []).forEach(function (e) {
          if (e[2]) fbq("track", e[0], e[1], { eventID: e[2] });
          else fbq("track", e[0], e[1]);
        });
        window.__metaPixelQueue = [];
      `}
    </Script>
  );
}
