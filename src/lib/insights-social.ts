import type { InsightPost } from "@/lib/insights-data";

/**
 * Social covers for the Insights strip on the home page: the first slide of each post's LinkedIn carousel, or its
 * single 4:5 LinkedIn image if it has no carousel. They come from the video project
 * (batch-shoot-oct-2026/news/stills/exports/), converted to WebP at their own 1080×1350 and saved as
 * public/insights/<slug>/carousel-cover.webp.
 *
 * This lives here, not in the post JSON, because the JSON is copied as delivered from the video project. A post with
 * no entry keeps its 5:3 card tile.
 */
export interface SocialCover {
  /** Path under public/. */
  cover: string;
  /** Slides in the carousel, as many as its LinkedIn carousel PDF has pages. 1 for a single image. */
  slides: number;
}

/** Keyed by post id. */
const socialCovers: Record<string, SocialCover> = {
  N1: { cover: "/insights/australian-it-spending-2027/carousel-cover.webp", slides: 1 },
  N2: { cover: "/insights/fde-washing-vendor-built-ai-agents/carousel-cover.webp", slides: 8 },
  N3: { cover: "/insights/pc-shipments-fall-22-percent/carousel-cover.webp", slides: 1 },
  N4: { cover: "/insights/sap-ecc-2027-dsag-pushback/carousel-cover.webp", slides: 1 },
  N5: { cover: "/insights/securing-ai-market-2027/carousel-cover.webp", slides: 7 },
  N6: { cover: "/insights/b2b-buyers-check-ai-with-reps/carousel-cover.webp", slides: 7 },
};

export function socialCover(post: InsightPost): SocialCover | undefined {
  return socialCovers[post.id];
}
