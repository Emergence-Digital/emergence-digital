import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries-data";

const BASE_URL = "https://emergencedigital.com.au";

// Services are one page (/services); each service is a #slug card on it, not its own route.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/packages", "/about", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...industryRoutes];
}
