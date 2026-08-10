import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

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
        <SectionLabel>Marketing for IT Firms</SectionLabel>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-dark-green leading-tight max-w-4xl mx-auto mb-6">
          Become the Obvious Choice in Your Market.
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          We help established IT, MSP and consulting firm owners turn deep
          expertise into market authority — then into a pipeline that finally
          matches their capability.
        </p>
        <Button href="/contact" variant="primary" className="text-base px-10 py-4">
          Book a Strategy Call
        </Button>
      </div>
    </section>
  );
}
