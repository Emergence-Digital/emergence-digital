import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import { getAllServiceRoutes, getService } from "@/lib/services-data";

interface PageParams {
  category: string;
  slug: string;
}

export function generateStaticParams() {
  return getAllServiceRoutes();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const result = getService(category, slug);
  if (!result) return {};

  return {
    title: `${result.service.label} — Emergence Digital`,
    description: result.service.metaDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { category, slug } = await params;
  const result = getService(category, slug);
  if (!result) notFound();

  const { category: serviceCategory, service } = result;

  return (
    <ServicePageLayout
      label={service.label}
      title={service.title}
      intro={service.intro}
      features={service.features}
      whoItsFor={service.whoItsFor}
      imageSrc={service.imageSrc}
      imageAlt={service.imageAlt}
      categoryLabel={serviceCategory.label}
      categoryHref={`/services/${serviceCategory.slug}`}
    />
  );
}
