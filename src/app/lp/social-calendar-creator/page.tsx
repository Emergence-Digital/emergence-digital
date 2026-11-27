import type { Metadata } from "next";
import LeadMagnetDownload from "@/components/sections/LeadMagnetDownload";
import { leadMagnets } from "@/lib/lead-magnets";

// Hidden download page for the Social Calendar Creator lead magnet. It's linked only from the
// webinar sign-up follow-up, so it's kept out of the nav, footer and sitemap, and noindex.
export const metadata: Metadata = {
  title: "Your Social Calendar Creator — Emergence Digital",
  description: "Download the Social Calendar Creator: a Claude skill and a copy-paste prompt for any AI tool.",
  robots: { index: false, follow: false },
};

export default function SocialCalendarCreatorPage() {
  return <LeadMagnetDownload magnet={leadMagnets["social-calendar-creator"]} />;
}
