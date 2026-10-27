import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * About Shane: the founder, beside his cut-out photo on a dark green panel. The photo is DSC00243 with the
 * background removed and a light warm grade in Photoshop, exported as a transparent WebP.
 * The copy follows the About page's founder bio and story.
 */
export default function AboutShane() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] max-w-md w-full mx-auto lg:max-w-none rounded-3xl overflow-hidden bg-dark-green">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(74,124,89,0.55) 0%, transparent 70%)" }}
          />
          <Image
            src="/about/shane-kennedy.webp"
            alt="Shane Kennedy, founder of Emergence Digital"
            width={1000}
            height={1232}
            sizes="(min-width: 1024px) 460px, (min-width: 448px) 448px, 100vw"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] w-auto max-w-none"
          />
        </div>

        <div>
          <SectionLabel>About Shane</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight mb-6">
            The person you&apos;ll actually work with.
          </h2>
          <div className="space-y-4 text-body text-lg leading-relaxed">
            <p>
              Shane Kennedy founded Emergence Digital. He&apos;s spent the last 10 years in marketing, a
              significant part of it inside the SAP partner ecosystem, working alongside software, consulting and
              implementation partners to help them stand out in a crowded, technical market.
            </p>
            <p>
              Emergence started the same way most of our clients do, with more expertise than exposure. Closing
              that gap between capability and recognition is what Shane now does for IT firms.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-dark-green/10">
            <p className="font-serif text-xl font-bold text-dark-green">Shane Kennedy</p>
            <p className="text-mid-green text-sm font-medium mt-1">Founder, Emergence Digital</p>
          </div>
        </div>
      </div>
    </section>
  );
}
