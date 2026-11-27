import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkshopLanding, { workshopLandingMetadata } from "@/components/workshop/WorkshopLanding";
import { DESIGNS, isDesign, workshopSplitTest } from "@/lib/experiments";

// The landing page's other versions, pre-rendered: ./v/<design>/<title>. Visitors
// never see these URLs: src/proxy.ts serves them at /workshop-2027-strategy.
// Opening one directly previews that version, e.g. ./v/b/default for the plain
// design. See src/lib/experiments.ts.
export const metadata: Metadata = workshopLandingMetadata;

export const dynamicParams = false;

export function generateStaticParams() {
  return DESIGNS.flatMap((design) => workshopSplitTest.titleKeys.map((title) => ({ design, title })));
}

export default async function WorkshopVersionPage({ params }: { params: Promise<{ design: string; title: string }> }) {
  const { design, title } = await params;
  if (!isDesign(design) || !workshopSplitTest.titleKeys.includes(title)) notFound();
  return <WorkshopLanding design={design} titleKey={title} />;
}
