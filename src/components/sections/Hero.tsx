import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ReviewsBadge from "@/components/ui/ReviewsBadge";

// Reviews eyebrow above the headline (reviewer icons, five stars, review count). Hidden until we have 50+
// five-star reviews: set to true to show it, and check the count in ReviewsBadge.tsx first.
const SHOW_REVIEWS_BADGE = false;

export default function Hero() {
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
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-dark-green leading-[1.08] tracking-tight max-w-4xl mx-auto mb-5">
          Win the bigger clients that usually go to the big firms.
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-normal">
          We help established IT businesses win enterprise and mid-market
          deals, with healthier margins, a pipeline you can plan around and a
          business that&apos;s worth more.
        </p>
        <Button href="/book" variant="primary" className="text-base px-10 py-4">
          Book a Strategy Call
        </Button>
      </div>
    </section>
  );
}
