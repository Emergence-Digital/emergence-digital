import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

export const alt = "Contact Emergence Digital: book a strategy call to map your first campaign";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Get in touch", title: "Book a strategy call to map your first campaign." });
}
