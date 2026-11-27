import type { Metadata } from "next";
import ExperimentView from "@/components/workshop/ExperimentView";
import WorkshopCleanPage from "@/components/workshop/WorkshopCleanPage";
import WorkshopPlainPage from "@/components/workshop/WorkshopPlainPage";
import type { Design } from "@/lib/experiments";
import { pageMetadata } from "@/lib/seo";
import { workshop2027Strategy as workshop } from "@/lib/workshops";

/** Every version shares the landing page's metadata, canonical URL and noindex. */
export const workshopLandingMetadata: Metadata = pageMetadata({
  title: workshop.name,
  description: `A ${workshop.durationMinutes}-minute live workshop for IT business owners on ${workshop.dateLabel}, ${workshop.timeLabel}.`,
  path: `/${workshop.slug}`,
  noindex: true,
});

/**
 * One version of the 2027 strategy workshop landing page: design a (clean) or b (plain), with the headline for a
 * ?title= key. src/proxy.ts decides which version a visitor gets; see src/lib/experiments.ts.
 */
export default function WorkshopLanding({ design, titleKey }: { design: Design; titleKey: string }) {
  return (
    <>
      <ExperimentView experiment={workshop.slug} design={design} title={titleKey} />
      {design === "b" ? (
        <WorkshopPlainPage workshop={workshop} titleKey={titleKey} />
      ) : (
        <WorkshopCleanPage workshop={workshop} titleKey={titleKey} />
      )}
    </>
  );
}
