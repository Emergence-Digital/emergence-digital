import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/sections/CTABanner";
import { getService } from "@/lib/services-data";
import type { RelatedService } from "@/lib/industries-data";

interface IndustryPageLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  beforeParagraph: string;
  beforeIndicators: string[];
  afterParagraph: string;
  afterIndicators: string[];
  relatedServices: RelatedService[];
}

function Dot() {
  return (
    <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-dark-green/30" />
  );
}

function Check() {
  return (
    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-mid-green flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2 6l3 3 5-5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function IndustryPageLayout({
  eyebrow,
  title,
  subtitle,
  beforeParagraph,
  beforeIndicators,
  afterParagraph,
  afterIndicators,
  relatedServices,
}: IndustryPageLayoutProps) {
  const services = relatedServices
    .map((rs) => getService(rs.categorySlug, rs.serviceSlug))
    .filter((result): result is NonNullable<typeof result> => Boolean(result));

  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6 max-w-3xl">
            {title}
          </h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed mb-10">
            {subtitle}
          </p>
          <Button href="/contact" variant="primary">
            Book a Strategy Call
          </Button>
        </div>
      </section>

      {/* The gap you're standing in */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>The Gap You&apos;re Standing In</SectionLabel>
            <p className="text-body text-lg leading-relaxed mt-2">
              {beforeParagraph}
            </p>
          </div>
          <ul className="space-y-4">
            {beforeIndicators.map((indicator) => (
              <li key={indicator} className="flex gap-3">
                <Dot />
                <span className="text-muted leading-relaxed">{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where this gets you */}
      <section className="bg-dark-green py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel light>Where This Gets You</SectionLabel>
            <p className="text-white/70 text-lg leading-relaxed mt-2">
              {afterParagraph}
            </p>
          </div>
          <ul className="space-y-4">
            {afterIndicators.map((indicator) => (
              <li key={indicator} className="flex gap-3">
                <Check />
                <span className="text-white/90 leading-relaxed">{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Built around what you actually do */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Built Around What You Actually Do</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
              The services behind the campaign.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ category, service }) => (
              <Card key={service.slug} className="flex flex-col">
                <h3 className="font-serif text-lg font-bold text-dark-green mb-3">
                  {service.label}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${category.slug}/${service.slug}`}
                  className="text-sm font-medium text-dark-green border-b border-dark-green/30 hover:border-mid-green hover:text-mid-green transition-colors duration-200 self-start"
                >
                  Learn more →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
