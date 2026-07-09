import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";

interface Feature {
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  label: string;
  title: string;
  intro: string;
  features: Feature[];
  whoItsFor: string;
  imageAlt: string;
  imageSrc: string;
  categoryLabel?: string;
  categoryHref?: string;
}

export default function ServicePageLayout({
  label,
  title,
  intro,
  features,
  whoItsFor,
  imageAlt,
  imageSrc,
  categoryLabel,
  categoryHref,
}: ServicePageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {categoryLabel && categoryHref && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-muted">
                <li>
                  <Link href={categoryHref} className="hover:text-mid-green transition-colors duration-200">
                    {categoryLabel}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-dark-green font-medium">{label}</li>
              </ol>
            </nav>
          )}
          <SectionLabel>{label}</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6 max-w-3xl">
            {title}
          </h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed mb-10">{intro}</p>
          <Button href="/contact" variant="primary">
            Start a Conversation
          </Button>
        </div>
      </section>

      {/* Image + features */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Stock image */}
          <div className="rounded-2xl overflow-hidden aspect-video lg:aspect-square bg-dark-green/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Features list */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-dark-green mb-8">
              What&apos;s included
            </h2>
            <ul className="space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-mid-green flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-dark-green mb-1">{f.title}</p>
                    <p className="text-muted text-sm leading-relaxed">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-cream py-20">
        <div className="max-w-[1200px] mx-auto px-6 max-w-2xl">
          <SectionLabel>Who It&apos;s For</SectionLabel>
          <p className="text-body text-lg leading-relaxed mt-2">{whoItsFor}</p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
