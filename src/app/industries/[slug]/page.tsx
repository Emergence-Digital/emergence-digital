import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageLayout from "@/components/layout/IndustryPageLayout";
import { getAllIndustrySlugs, getIndustry } from "@/lib/industries-data";

interface PageParams {
  slug: string;
}

export function generateStaticParams() {
  return getAllIndustrySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: `${industry.label} — Emergence Digital`,
    description: industry.metaDescription,
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <IndustryPageLayout
      eyebrow={industry.eyebrow}
      title={industry.title}
      subtitle={industry.subtitle}
      beforeParagraph={industry.beforeParagraph}
      beforeIndicators={industry.beforeIndicators}
      afterParagraph={industry.afterParagraph}
      afterIndicators={industry.afterIndicators}
      relatedServices={industry.relatedServices}
    />
  );
}
