import { NextResponse, type NextRequest } from "next/server";
import { isUnpublishedPost } from "@/lib/insights-data";

/**
 * Insights posts that aren't live yet get a 404 from here, before the page cache, so no 404 is ever cached at a
 * post's own URL. The post then renders fresh on the first request at its publish time. (When ISR replaces a cached
 * 404 with the live page in the background, Next 16.1 keeps the 404's <head>: the default title, noindex and the
 * site's preview image, which is what LinkedIn would show.)
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && isUnpublishedPost(slug)) {
    // Not a route, so it renders the site's 404 page with a 404 status.
    return NextResponse.rewrite(new URL("/_unpublished", request.url));
  }
}

export const config = { matcher: "/insights/:slug" };
