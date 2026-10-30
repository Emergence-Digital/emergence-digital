import n1 from "@/content/insights/N1.json";
import n3 from "@/content/insights/N3.json";
import n4 from "@/content/insights/N4.json";

/**
 * Insights: posts in "The IT news worth knowing" series (and any later series). Each post is one JSON file in
 * src/content/insights/, copied as delivered from the Adobe MCPs project (batch-shoot-oct-2026/news/blog/<id>.json),
 * with its images in public/insights/<slug>/. Copy changes come back through that project, not edits to the JSON here.
 * Client components import types only from this file, so the post copy stays out of the browser bundle.
 */

export type GraphicType =
  | "stat" | "chain" | "scene" | "iconGrid" | "forecast" // N3
  | "ring" | "timeline" | "quote" | "callout" // N4, N1
  | "bars" | "squareGrid" | "shortlist" // N1
  | "checklist" | "compare" | "label" // N2
  | "shield" | "dots" | "scan" // N5
  | "chatCard" | "sources" | "tugOfWar" | "converge"; // N6

/** Big number that counts up, with one bar per compared period. */
export interface StatGraphic {
  type: "stat";
  eyebrow: string;
  value: number;
  /** The number as shown, e.g. "55.4M"; the count-up keeps this format. */
  display: string;
  chip: string;
  compare: { unit: string; items: { label: string; value: number; highlight?: boolean }[] };
  note: string;
}

export interface ChainStep {
  /** Lucide icon name: cpu, lock, receipt, target, trending-down, users or zap. */
  icon: string;
  big?: string;
  chip?: string;
  text: string;
  /** Cut-out that slides in beside the card at this step. */
  cutout?: string;
}

/** Cause and effect, drawn step by step. */
export interface ChainGraphic {
  type: "chain";
  eyebrow: string;
  steps: ChainStep[];
}

/** Bars on a card beside a cut-out scene; "price-tag" swings a price tag onto a stack of laptops. */
export interface SceneGraphic {
  type: "scene";
  variant: "price-tag";
  eyebrow: string;
  bars: { label: string; value: number; display: string; highlight?: boolean }[];
  layers: { src: string; role: "base" | "swing"; label?: string }[];
}

/** A grid of icons that dims to a lit few. Always illustrative: the lit share isn't a statistic. */
export interface IconGridGraphic {
  type: "iconGrid";
  icon: string;
  count: number;
  lit: number;
  litLabel: string;
  dimLabel: string;
  illustrative: boolean;
  caption: string;
}

/** A marker sliding along an unnumbered line, from `from` to `to`. */
export interface ForecastGraphic {
  type: "forecast";
  eyebrow: string;
  from: string;
  to: string;
  illustrative: boolean;
}

/** Labelled horizontal bars that grow top to bottom; the highlighted one grows last, in sage. */
export interface BarsGraphic {
  type: "bars";
  eyebrow: string;
  unit: string;
  items: { label: string; value: number; display: string; highlight?: boolean }[];
}

/** A 10 × 10 grid of squares filled segment by segment (the squares add up to 100), beside a cut-out. */
export interface SquareGridGraphic {
  type: "squareGrid";
  eyebrow: string;
  segments: { label: string; squares: number; value: string; highlight?: boolean }[];
  caption: string;
  cutout?: string;
}

/** A quote whose words light up one by one, optionally after a count-up figure. */
export interface QuoteGraphic {
  type: "quote";
  text: string;
  who: string;
  lead?: { value: number; display: string; label: string };
}

/** A buyer's shortlist of generic firm names; the known ones get ticks. Always illustrative. */
export interface ShortlistGraphic {
  type: "shortlist";
  eyebrow: string;
  items: { name: string; known: boolean }[];
  tickLabel: string;
  illustrative: boolean;
  caption: string;
}

/** A percentage ring that fills while its figure counts up. Carries its own SOURCE tab text. */
export interface RingGraphic {
  type: "ring";
  value: number;
  display: string;
  label: string;
  chip?: string;
  sourceTab: string;
}

/** Dated stops down a line, revealed as a marker travels past them, beside a cut-out. */
export interface TimelineGraphic {
  type: "timeline";
  eyebrow: string;
  stops: { date: string; big?: string; text: string; subtext?: string; chip?: string; highlight?: boolean }[];
  cutout?: string;
}

/** A map pin whose caption swaps from `from` to `to`, with `label` under it. */
export interface CalloutGraphic {
  type: "callout";
  from: string;
  to: string;
  label: string;
}

/** A box labelled `box` gets a `sticker` stuck over its label; under it, a stat card counts down to `stat.display`. */
export interface LabelGraphic {
  type: "label";
  box: string;
  sticker: string;
  stat: { display: string; label: string };
  sourceTab: string;
}

/** Real checkboxes the reader ticks, with a live "n of 6" and the gaps. Nothing is stored or sent. */
export interface ChecklistGraphic {
  type: "checklist";
  prompt: string;
  items: string[];
  /** "{n} of 6", with {n} filled in. */
  resultTemplate: string;
  gapsLabel: string;
  complete: { label: string; cutout?: string };
  privacyNote: string;
  sourceTab: string;
}

/** Two cards side by side, dark on the left and white on the right, their rows revealed alternately. */
export interface CompareGraphic {
  type: "compare";
  left: { title: string; rows: string[] };
  right: { title: string; note?: string; rows: string[] };
  caption: string;
}

type BuiltGraphic =
  | StatGraphic
  | ChainGraphic
  | SceneGraphic
  | IconGridGraphic
  | ForecastGraphic
  | BarsGraphic
  | SquareGridGraphic
  | QuoteGraphic
  | ShortlistGraphic
  | RingGraphic
  | TimelineGraphic
  | CalloutGraphic
  | LabelGraphic
  | ChecklistGraphic
  | CompareGraphic;

/** Graphic types for later posts. Their props are settled when each post's JSON arrives; until then they don't render. */
export interface LaterGraphic {
  type: Exclude<GraphicType, BuiltGraphic["type"]>;
  [prop: string]: unknown;
}

export type Graphic = BuiltGraphic | LaterGraphic;

export interface Beat {
  /** Anchor id, e.g. "the-cause". */
  id: string;
  heading: string;
  /** Paragraphs, plain text. Straight quotes are made typographic when shown. */
  body: string[];
  /** Seconds into the video this beat matches; shows the jump chip. */
  videoAt?: number;
  graphic: Graphic;
}

export interface InsightPost {
  id: string;
  slug: string;
  series: string;
  status: "draft" | "approved";
  /** ISO time with offset, e.g. "2026-11-03T09:00:00+11:00". */
  publishAt: string;
  title: string;
  /** The <title>, before " — Emergence Digital". */
  metaTitle: string;
  description: string;
  dek: string;
  author: string;
  readMinutes: number;
  audience: string;
  sourceChip: string;
  video: { vimeoId: string | null; title: string; poster: string; durationSec: number };
  images: { preview: string; card: string; cardBase: string; cardCutout: string; alt: string };
  shortVersion: string[];
  beats: Beat[];
  /** `download` adds a button under the take, e.g. N2's carousel PDF. */
  take: { line: string; key: string; videoAt?: number; body: string[]; download?: { label: string; file: string } };
  sources: { outlet: string; title: string; date: string; url: string }[];
  notes: string[];
  /** Fact trace for reviewers. Never shown. */
  trace?: Record<string, string>;
}

// Add a post by importing its JSON and listing it here. JSON imports widen literal types ("approved" becomes
// string), hence the cast.
const posts = [n1, n3, n4] as unknown as InsightPost[];

/**
 * Vercel preview deployments and `npm run dev` show every post, drafts and future ones included, so a post can be
 * checked before it goes live. Production shows only live posts.
 */
export const showsUnpublished = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";

/** Approved, and its publish time has passed. */
export function isLive(post: InsightPost, now = new Date()) {
  return post.status === "approved" && Date.parse(post.publishAt) <= now.getTime();
}

/**
 * The posts to show, newest first. No deploy is needed when a post goes live: its own page serves from its publish
 * time (see src/proxy.ts), and the index and sitemap, which revalidate every five minutes, list it within five.
 */
export function publishedPosts(now = new Date()) {
  return posts
    .filter((post) => showsUnpublished || isLive(post, now))
    .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt));
}

/** A post that exists but isn't shown yet: a draft, or one whose publish time hasn't come. */
export function isUnpublishedPost(slug: string, now = new Date()) {
  return !showsUnpublished && posts.some((post) => post.slug === slug && !isLive(post, now));
}

export function getPost(slug: string, now = new Date()) {
  return publishedPosts(now).find((post) => post.slug === slug);
}

/** The published posts either side of this one in its series: `previous` is older, `next` is newer. */
export function seriesNeighbours(slug: string, now = new Date()) {
  const post = getPost(slug, now);
  const series = publishedPosts(now)
    .filter((p) => p.series === post?.series)
    .reverse();
  const i = post ? series.indexOf(post) : -1;
  return { previous: i > 0 ? series[i - 1] : undefined, next: i >= 0 ? series[i + 1] : undefined };
}

/** A path from a post's JSON ("assets/N3/poster.jpg") as served from public/ ("/insights/<slug>/poster.jpg"). */
export function postAsset(post: InsightPost, path: string) {
  const prefix = `assets/${post.id}/`;
  return `/insights/${post.slug}/${path.startsWith(prefix) ? path.slice(prefix.length) : path}`;
}
