import { ogContentType, ogImage, ogSize } from "@/lib/og-image";
import { getAllIndustrySlugs, getIndustry } from "@/lib/industries-data";

export const alt = "Emergence Digital: marketing for IT firms";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllIndustrySlugs();
}

// The industry's own headline, e.g. "Get on the shortlist before the RFP goes out."
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const industry = getIndustry((await params).slug);
  return ogImage({
    eyebrow: industry?.label ?? "Marketing for IT firms",
    title: industry?.title ?? "Win the bigger clients that usually go to the big firms.",
  });
}
