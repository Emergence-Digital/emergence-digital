import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

export const alt = "Emergence Digital services: everything it takes to win bigger clients";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "Everything it takes to win bigger clients.", goal: "fill your project pipeline." });
}
