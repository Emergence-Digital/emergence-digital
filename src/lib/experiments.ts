/**
 * Split tests on funnel pages: single source of truth.
 *
 * The workshop landing page runs two tests at once:
 * - design: the clean page (a) against a plain, "ugly" one (b), as Cormac suggested at Office Hours (25 Nov 2026).
 *   src/proxy.ts gives each new visitor one at random, 50/50, keeps it in a cookie so return visits match, and serves
 *   it at the same URL, so ads and links don't change.
 * - title: the headline, picked by the ad's ?title=<key> (`titles` in src/lib/workshops.ts).
 *
 * Each version tells its form which design and title it is, and /api/lead turns those into GHL tags, but only tags
 * listed here (e.g. ab:workshop-2027-strategy:b). The Stripe webhook's paid tag lands on the same contact, so GHL can
 * count registrations and paid seats for each version. Visitors are split 50/50, so comparing those counts is fair
 * without counting visitors. Google Analytics gets an `experiment_view` event with both too.
 *
 * Visitors with ?code= (the CENTURION member link) always see the clean page and aren't counted: members are a
 * warmer audience and would skew the result.
 *
 * Picking the winner: in Vercel → Storage → the Global Config store connected to the project (Vercel's new name for
 * Edge Config) → Items, set `winner-workshop-2027-strategy` to "a" or "b". Everyone gets that design from then on,
 * with no deploy. Delete the item to split again. With no store connected, the split just keeps running.
 */

import { workshop2027Strategy as workshop } from "@/lib/workshops";

export const DESIGNS = ["a", "b"] as const;
export type Design = (typeof DESIGNS)[number];

export const isDesign = (value: unknown): value is Design => value === "a" || value === "b";

export const workshopSplitTest = {
  /** The landing page the proxy splits. */
  path: `/${workshop.slug}`,
  /** Remembers which design a visitor got. Listed on /privacy. */
  cookie: "ed_ab_workshop-2027-strategy",
  cookieMaxAgeSeconds: 60 * 60 * 24 * 60,
  /** The Global Config item that ends the test: "a" or "b". */
  winnerKey: "winner-workshop-2027-strategy",
  /** The ?title= keys the landing page has a headline for. */
  titleKeys: Object.keys(workshop.titles),
} as const;

/** A ?title= value the page knows, or "default". */
export function workshopTitleKey(raw: string | null | undefined): string {
  return raw && Object.hasOwn(workshop.titles, raw) ? raw : "default";
}

/**
 * Where the proxy serves each version from. The clean page with the default title is the landing page's own route;
 * every other version is pre-rendered under ./v/<design>/<title>, which also works as a preview link.
 */
export function workshopVersionPath(design: Design, title: string): string {
  return design === "a" && title === "default" ? workshopSplitTest.path : `${workshopSplitTest.path}/v/${design}/${title}`;
}

/**
 * The tags /api/lead may add for each test, by the version the form says it's on. Keep them lowercase (GHL stores
 * tags lowercase).
 */
export const workshopExperimentTags = {
  design: Object.fromEntries(DESIGNS.map((design) => [design, `ab:${workshop.slug}:${design}`])),
  title: Object.fromEntries(workshopSplitTest.titleKeys.map((key) => [key, `ab:${workshop.slug}-title:${key}`])),
} satisfies Record<string, Record<string, string>>;
