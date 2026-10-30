import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries-data";
import { publishedPosts } from "@/lib/insights-data";

const BASE_URL = "https://emergencedigital.com.au";

// Regenerated every five minutes, like the Insights pages, so a post is listed once it goes live.
export const revalidate = 300;

// Services are one page (/services); each service is a #slug card on it, not its own route.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/packages", "/insights", "/about", "/contact", "/book"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    lastModified: new Date(),
  }));

  const insightRoutes = publishedPosts().map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.publishAt),
  }));

  return [...staticRoutes, ...industryRoutes, ...insightRoutes];
}
