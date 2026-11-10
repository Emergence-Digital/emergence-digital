import { mangalProBold, sageShadow, THICKEN } from "@/lib/fonts";

interface LogoProps {
  /** White letters, for the dark-green footer. Dark green otherwise. */
  onDark?: boolean;
  /** Size and spacing, e.g. "text-[22px]". */
  className?: string;
}

/** The Emergence Digital wordmark: Mangal Pro Bold, thickened, with a hard sage drop shadow (Shane, 11 Nov 2026). */
export default function Logo({ onDark = false, className = "" }: LogoProps) {
  return (
    <span
      className={`${mangalProBold.className} font-bold tracking-tight whitespace-nowrap ${THICKEN} ${
        onDark ? "text-white" : "text-dark-green"
      } ${className}`}
      style={sageShadow(onDark ? 0.07 : 0.08)}
    >
      Emergence Digital
    </span>
  );
}
