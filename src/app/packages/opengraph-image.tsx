import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

export const alt = "Emergence Digital packages: campaign-led growth for IT firms";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Packages", title: "Campaign-led growth packages for IT firms.", goal: "grow your revenue." });
}
