import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

export const alt = "The Emergence Digital team: Jordan, Shane and Nikki";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "About us", title: "The Melbourne team behind Emergence Digital.", goal: "grow without hiring." });
}
