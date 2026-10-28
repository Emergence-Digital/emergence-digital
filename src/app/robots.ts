import type { MetadataRoute } from "next";

const BASE_URL = "https://emergencedigital.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The lead form's endpoint, not a page
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
