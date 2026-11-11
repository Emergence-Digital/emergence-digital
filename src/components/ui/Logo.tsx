import { mangalProBold, sageShadow, THICKEN } from "@/lib/fonts";

interface LogoProps {
  /** White letters, for the dark-green footer. Dark green otherwise. */
  onDark?: boolean;
  /** Size and spacing, e.g. "text-[22px]". */
  className?: string;
}

/**
 * The Emergence Digital wordmark: Mangal Pro Bold, thickened, with a hard sage drop shadow (Shane, 11 Nov 2026).
 * On dark green the shadow is deep sage, as in the brand guidelines and the logo pack.
 */
export default function Logo({ onDark = false, className = "" }: LogoProps) {
  return (
    <span
      className={`${mangalProBold.className} inline-block font-bold tracking-tight whitespace-nowrap ${THICKEN} ${
        onDark ? "text-white" : "text-dark-green"
      } ${className}`}
      style={onDark ? sageShadow(0.07, "var(--color-deep-sage)") : sageShadow(0.08)}
    >
      Emergence Digital
    </span>
  );
}
