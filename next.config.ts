import type { NextConfig } from "next";

// Old service URLs → their card on the /services library (Oct 2026). null means the service was
// retired, so the URL goes to the library itself. Covers the 4 category pages, the 19 service pages
// under them and the flat URLs left over from the Wix site.
const oldServiceUrls: Record<string, string | null> = {
  // Category landing pages
  sales: null,
  marketing: null,
  digital: null,
  content: null,
  // Sales
  "sales/outreach-campaigns": null,
  "sales/pipeline-generation": null,
  "sales/deal-closure": null,
  "sales/sales-ops": null,
  // Marketing
  "marketing/lead-generation": null,
  "marketing/social-media": "social-media",
  "marketing/events": "webinars",
  "marketing/edms": "nurture",
  "marketing/seo": null,
  // Digital
  "digital/web-design": "website-design",
  "digital/app-development": null,
  "digital/crm-administration": "crm-admin",
  "digital/agentic-ai": null,
  "digital/automation": "funnel-automation",
  // Content
  "content/video": "video-production",
  "content/digital-guides": "digital-guides",
  "content/slide-decks": "pitch-decks",
  "content/podcasts": null,
  "content/blogs": "blogs",
  // Flat URLs from the old site
  "web-design": "website-design",
  "app-development": null,
  "workflow-automation": "funnel-automation",
  "system-integration": null,
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...Object.entries(oldServiceUrls).map(([path, slug]) => ({
        source: `/services/${path}`,
        destination: slug ? `/services#${slug}` : "/services",
        permanent: true,
      })),
      {
        source: "/industries/consulting-advisory-firms",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
