import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

// Also used by /book/time
export const alt = "Book a 30-minute strategy call with Emergence Digital";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Strategy call", title: "30 minutes to map your first campaign.", goal: "fill your project pipeline." });
}
