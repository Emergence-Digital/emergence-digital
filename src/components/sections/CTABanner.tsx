import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="bg-dark-green py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to become the obvious choice in your market?
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Book a 30-minute strategy call and we&apos;ll map your first campaign
          together.
        </p>
        <Button href="/contact" variant="outline-light" className="text-base px-10 py-4">
          Book a Strategy Call
        </Button>
      </div>
    </section>
  );
}
