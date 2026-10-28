import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageLayout from "@/components/layout/IndustryPageLayout";
import { getAllIndustrySlugs, getIndustry } from "@/lib/industries-data";
import { pageMetadata } from "@/lib/seo";

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

  return pageMetadata({
    title: `Marketing for ${industry.label}`,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
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
      slug={industry.slug}
      eyebrow={industry.eyebrow}
      title={industry.title}
      subtitle={industry.subtitle}
      beforeParagraph={industry.beforeParagraph}
      shifts={industry.shifts}
      afterParagraph={industry.afterParagraph}
      relatedServices={industry.relatedServices}
    />
  );
}
