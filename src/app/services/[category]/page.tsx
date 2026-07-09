import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/sections/CTABanner";
import { getAllCategorySlugs, getCategory } from "@/lib/services-data";

interface PageParams {
  category: string;
}

export function generateStaticParams() {
  return getAllCategorySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  return {
    title: `${category.label} — Emergence Digital`,
    description: category.metaDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  return (
    <>
      {/* Page hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <SectionLabel>Services</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mb-6">
            {category.title}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {category.services.map((service, index) => (
            <Card key={service.slug} className="p-10 flex flex-col">
              <span className="text-xs font-semibold tracking-widest text-mid-green mb-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-3xl font-bold text-dark-green mb-4">
                {service.label}
              </h2>
              <p className="text-muted leading-relaxed flex-1 mb-8">
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
      </section>

      <CTABanner />
    </>
  );
}
