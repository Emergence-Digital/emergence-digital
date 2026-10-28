import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

// Also used by the funnel's /book and /thank-you steps
export const alt = "The Pipeline Scale Plan: win the bigger clients that usually go to the big firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    eyebrow: "The Pipeline Scale Plan",
    title: "Win the bigger clients that usually go to the big firms.",
    goal: "fill your project pipeline.",
  });
}
