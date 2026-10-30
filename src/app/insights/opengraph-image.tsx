import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

export const alt = "Emergence Digital Insights: the IT news worth knowing";
export const size = ogSize;
export const contentType = ogContentType;

// The index's link preview. Each post sets its own preview image (preview-1200x630.jpg) in its metadata.
export default function Image() {
  return ogImage({ eyebrow: "Insights", title: "The IT news worth knowing" });
}
