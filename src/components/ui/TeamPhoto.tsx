import Image from "next/image";
import type { TeamMember } from "@/lib/team";

interface TeamPhotoProps {
  member: TeamMember;
  /** Sizing for the panel, e.g. an aspect ratio. */
  className?: string;
  /** The `sizes` hint for the photo. */
  sizes: string;
}

/**
 * A team member's cut-out photo standing on a dark green panel with a soft mid-green glow, bottom-aligned and
 * centred. The panel's size comes from `className`; the photo fills 92% of its height and is cropped at the sides
 * when the panel is narrow.
 */
export default function TeamPhoto({ member, className = "", sizes }: TeamPhotoProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-dark-green ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(74,124,89,0.55) 0%, transparent 70%)" }}
      />
      <Image
        src={member.photo}
        alt={member.alt}
        width={1000}
        height={1232}
        sizes={sizes}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] w-auto max-w-none"
      />
    </div>
  );
}
