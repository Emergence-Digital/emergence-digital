import type { Metadata } from "next";

export const SITE_NAME = "Emergence Digital";
export const SITE_URL = "https://emergencedigital.com.au";
/** The company page's public URL. */
export const LINKEDIN_URL = "https://www.linkedin.com/company/emergencedigital/";

/** The home page's title and description, also the fallback for any page without its own. */
export const SITE_TITLE = "Marketing for IT Firms in Melbourne — Emergence Digital";
export const SITE_DESCRIPTION =
  "We help established IT firms, MSPs, ERP partners and software companies win the enterprise and mid-market clients that usually go to the big firms.";

interface PageMetadataOptions {
  /** The page's own title. " — Emergence Digital" is added unless `absolute` is set. */
  title: string;
  /** Up to about 155 characters, or search results cut it off. */
  description: string;
  /** The page's path, for its canonical URL, e.g. "/about". */
  path: string;
  absolute?: boolean;
  /** Funnel steps and landing pages that shouldn't show in search. */
  noindex?: boolean;
}

/**
 * Title, description, canonical URL and link-preview text for a page. Link previews need their own copy of the title
 * and description, because a page's openGraph replaces the root layout's rather than adding to it. The preview image
 * comes from the nearest opengraph-image.tsx.
 */
export function pageMetadata({ title, description, path, absolute = false, noindex = false }: PageMetadataOptions): Metadata {
  const fullTitle = absolute ? title : `${title} — ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
