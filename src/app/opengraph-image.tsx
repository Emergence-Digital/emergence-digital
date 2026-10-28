import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

// The default link preview, for the home page and any page without its own
export const alt = "Emergence Digital: win the bigger clients that usually go to the big firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Marketing for IT firms", title: "Win the bigger clients that usually go to the big firms." });
}
