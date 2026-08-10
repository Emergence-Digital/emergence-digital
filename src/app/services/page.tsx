import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/sections/CTABanner";
import { categories } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Our Services — Emergence Digital",
  description:
    "Sales, marketing, digital and content services for Melbourne businesses — from outbound campaigns and CRM administration to web design and agentic AI.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <SectionLabel>What We Do</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mb-6">
            Our Services
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Sales, marketing, content and digital services — all built around
            the digital events that make your expertise impossible to ignore.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, categoryIndex) => (
        <section
          key={category.slug}
          className={categoryIndex % 2 === 0 ? "bg-cream py-16 md:py-24" : "bg-white py-16 md:py-24"}
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <SectionLabel>{category.label}</SectionLabel>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-green mt-2 max-w-xl">
                  {category.description}
                </h2>
              </div>
              <Link
                href={`/services/${category.slug}`}
                className="text-sm font-medium text-dark-green border-b border-dark-green/30 hover:border-mid-green hover:text-mid-green transition-colors duration-200 self-start md:self-auto whitespace-nowrap"
              >
                View all {category.label} services →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => (
                <Card key={service.slug} className="flex flex-col">
                  <h3 className="font-serif text-xl font-bold text-dark-green mb-3">
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
      ))}

      <CTABanner />
    </>
  );
}
