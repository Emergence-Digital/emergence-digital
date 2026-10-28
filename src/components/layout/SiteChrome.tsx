"use client";

import { usePathname } from "next/navigation";

/**
 * Funnel pages: each path and everything under it. They get the bare header and footer, so nothing on the
 * page leads away from the booking.
 */
const FUNNEL_PATHS = ["/pipeline-scale-plan-call"];

const isFunnelPath = (pathname: string) =>
  FUNNEL_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

interface SiteChromeProps {
  /** The usual navbar or footer. */
  site: React.ReactNode;
  /** The bare version for funnel pages. */
  funnel: React.ReactNode;
}

/** Shows the site's navbar or footer, or the bare funnel version on funnel pages. */
export default function SiteChrome({ site, funnel }: SiteChromeProps) {
  return isFunnelPath(usePathname()) ? funnel : site;
}
