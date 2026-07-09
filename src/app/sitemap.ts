import type { MetadataRoute } from "next";
import { categories } from "@/lib/services-data";

const BASE_URL = "https://emergencedigital.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/about", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${BASE_URL}/services/${category.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = categories.flatMap((category) =>
    category.services.map((service) => ({
      url: `${BASE_URL}/services/${category.slug}/${service.slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes];
}
