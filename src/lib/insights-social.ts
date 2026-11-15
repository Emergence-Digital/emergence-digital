import type { InsightPost } from "@/lib/insights-data";

/**
 * Social covers for the Insights strip on the home page: the first slide of each post's LinkedIn carousel, or its
 * single 4:5 LinkedIn image if it has no carousel. They come from the video projects (N: batch-shoot-oct-2026/news/
 * stills/exports/; D: the carousel slide folders on EMERDRIVE, the manifest's files.carouselImages), converted to
 * WebP at their own 1080×1350 and saved as public/insights/<slug>/carousel-cover.webp.
 *
 * This lives here, not in the post JSON, because the JSON is copied as delivered from the video project. A post with
 * no entry keeps its 5:3 card tile, and an entry for a post that isn't in insights-data.ts yet does nothing.
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
  // Marketing for IT firms (desk tips)
  D1: { cover: "/insights/buying-group-personas/carousel-cover.webp", slides: 6 },
  D2: { cover: "/insights/outbound-about-the-customer/carousel-cover.webp", slides: 4 },
  D3: { cover: "/insights/five-second-homepage-test/carousel-cover.webp", slides: 5 },
  D4: { cover: "/insights/content-ideas-sent-folder/carousel-cover.webp", slides: 5 },
  D5: { cover: "/insights/campaign-topics-from-support-tickets/carousel-cover.webp", slides: 6 },
  D6: { cover: "/insights/write-the-case-study-first/carousel-cover.webp", slides: 5 },
  D7: { cover: "/insights/split-your-email-list/carousel-cover.webp", slides: 5 },
};

export function socialCover(post: InsightPost): SocialCover | undefined {
  return socialCovers[post.id];
}
