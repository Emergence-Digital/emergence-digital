import type { Metadata } from "next";
import LeadMagnetLanding from "@/components/sections/LeadMagnetLanding";
import { leadMagnets } from "@/lib/lead-magnets";

// Hidden landing page for the ICP Generator lead magnet, where the skill zip is downloaded.
// It's linked only from the webinar sign-up follow-up, so it's kept out of the nav, footer
// and sitemap, and noindex. It uses the bare funnel header and footer (SiteChrome).
export const metadata: Metadata = {
  title: "Your ICP Generator — Emergence Digital",
  description: "Download the ICP Generator: a Claude skill and a copy-paste prompt for any AI tool.",
  robots: { index: false, follow: false },
};

export default function IcpGeneratorPage() {
  return <LeadMagnetLanding magnet={leadMagnets["icp-generator"]} />;
}
