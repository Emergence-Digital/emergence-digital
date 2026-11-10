import { mangalProBold, sageShadow, THICKEN } from "@/lib/fonts";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ReviewsBadge from "@/components/ui/ReviewsBadge";
import ResponsiveVimeoEmbed from "@/components/ui/ResponsiveVimeoEmbed";

// Reviews eyebrow above the headline (reviewer icons, five stars, review count). Hidden until we have 50+
// five-star reviews: set to true to show it, and check the count in ReviewsBadge.tsx first.
const SHOW_REVIEWS_BADGE = false;

// The headline follows the videos' "text-front" overlay (edit-kit views/view_overlay.jsx): Mangal Pro Bold thickened
// with a stroke in its own colour behind the fill (0.05 of the size), and the payoff in dark green on a sage block
// tilted -2.5 degrees, 1.21 times line one's size. Line one differs from the video: dark green with a hard sage drop
// shadow instead of white with a dark-green edge (Shane, 11 Nov 2026).

export interface HeroVideo {
  /** Vimeo ID of the 16:9 cut, for desktop. */
  desktop: string;
  /** Vimeo ID of the 4:5 cut, for phones. */
  mobile: string;
  title: string;
  /** Play muted while on screen. */
  autoplay?: boolean;
}

/** W-01, the home page video. */
const HOME_VIDEO: HeroVideo = {
  desktop: "1240137930",
  mobile: "1240137929",
  title: "Emergence Digital home page video",
  autoplay: true,
};

interface HeroProps {
  /** The video under the button. Defaults to W-01. */
  video?: HeroVideo;
  ctaHref?: string;
}

export default function Hero({ video = HOME_VIDEO, ctaHref = "/book" }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cream pt-16">
      {/* Subtle decorative background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,124,89,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center py-32">
        {SHOW_REVIEWS_BADGE && <ReviewsBadge />}
        <div>
          <SectionLabel>Marketing for IT Firms</SectionLabel>
        </div>
        <h1
          className={`${mangalProBold.className} font-bold leading-none tracking-tight whitespace-nowrap text-[7.2vw] sm:text-5xl md:text-6xl lg:text-7xl mx-auto mt-3 mb-10`}
        >
          <span className={`inline-block text-dark-green ${THICKEN}`} style={sageShadow(0.06)}>
            Win bigger clients
          </span>{" "}
          <span className="block mt-[0.12em]">
            <span
              className={`inline-block bg-sage text-dark-green text-[1.21em] px-[0.33em] pt-[0.16em] pb-[0.1em] rounded-[0.13em] -rotate-[2.5deg] ${THICKEN}`}
            >
              and more of them.
            </span>
          </span>
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-normal">
          We help established IT businesses win enterprise and mid-market
          deals, with healthier margins, a pipeline you can plan around and a
          business that&apos;s worth more.
        </p>
        <Button href={ctaHref} variant="primary" className="text-base px-10 py-4">
          Book a Strategy Call
        </Button>
        <ResponsiveVimeoEmbed
          desktopId={video.desktop}
          mobileId={video.mobile}
          title={video.title}
          autoplay={video.autoplay}
          className="max-w-4xl mx-auto mt-16"
        />
      </div>
    </section>
  );
}
