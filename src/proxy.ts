import { NextResponse, type NextRequest } from "next/server";
import { get as getGlobalConfig } from "@vercel/global-config";
import { isUnpublishedPost } from "@/lib/insights-data";
import { isDesign, workshopSplitTest, workshopTitleKey, workshopVersionPath, type Design } from "@/lib/experiments";

/**
 * Insights posts that aren't live yet get a 404 from here, before the page cache, so no 404 is ever cached at a
 * post's own URL. The post then renders fresh on the first request at its publish time. (When ISR replaces a cached
 * 404 with the live page in the background, Next 16.1 keeps the 404's <head>: the default title, noindex and the
 * site's preview image, which is what LinkedIn would show.)
 */
function hideUnpublishedPost(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && isUnpublishedPost(slug)) {
    // Not a route, so it renders the site's 404 page with a 404 status.
    return NextResponse.rewrite(new URL("/_unpublished", request.url));
  }
}

/**
 * The design everyone gets once a winner is picked (the Global Config item), or null while the test runs. Also null
 * with no store connected, or if the store can't be read, so the split carries on rather than failing the page.
 * Connecting a store sets GLOBAL_CONFIG (EDGE_CONFIG before Vercel renamed Edge Config); the package reads either.
 */
async function workshopWinner(): Promise<Design | null> {
  if (!process.env.GLOBAL_CONFIG && !process.env.EDGE_CONFIG) return null;
  try {
    const winner = await getGlobalConfig(workshopSplitTest.winnerKey);
    return isDesign(winner) ? winner : null;
  } catch {
    return null;
  }
}

/**
 * The workshop landing page's split test (src/lib/experiments.ts): picks the design (members on a ?code= link get the
 * clean one, then the winner if there is one, then the visitor's cookie, then 50/50 for a new visitor) and the title
 * (?title=), then serves that version at the same URL.
 */
async function splitWorkshopPage(request: NextRequest) {
  const { searchParams, search } = request.nextUrl;
  const title = workshopTitleKey(searchParams.get("title"));
  const stored = request.cookies.get(workshopSplitTest.cookie)?.value;

  let design: Design;
  let assigned: Design | null = null;
  if (searchParams.has("code")) {
    design = "a";
  } else {
    const winner = await workshopWinner();
    if (winner) design = winner;
    else if (isDesign(stored)) design = stored;
    else design = assigned = Math.random() < 0.5 ? "a" : "b";
  }

  const target = workshopVersionPath(design, title);
  const response =
    target === workshopSplitTest.path ? NextResponse.next() : NextResponse.rewrite(new URL(`${target}${search}`, request.url));
  if (assigned) {
    response.cookies.set(workshopSplitTest.cookie, assigned, {
      maxAge: workshopSplitTest.cookieMaxAgeSeconds,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === workshopSplitTest.path) return splitWorkshopPage(request);
  return hideUnpublishedPost(request);
}

export const config = { matcher: ["/insights/:slug", "/workshop-2027-strategy"] };
