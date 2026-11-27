import type { Metadata } from "next";
import WorkshopLanding, { workshopLandingMetadata } from "@/components/workshop/WorkshopLanding";

// 2027 strategy workshop funnel, step 1: the landing page. It's split tested
// (src/lib/experiments.ts): src/proxy.ts serves each visitor the clean design (a)
// or the plain one (b), with the headline for the ad's ?title=. This route is
// design a with the default title; the other versions live under ./v.
// The form tags web:workshop-2027-strategy (plus the version's ab: tags), then
// sends them to Stripe with their email prefilled. After paying, Stripe redirects
// to ./thank-you. Members get the CENTURION discount through ?code=CENTURION on
// this page's URL, and always see design a. Copy and event details are in
// src/lib/workshops.ts.
export const metadata: Metadata = workshopLandingMetadata;

export default function Workshop2027StrategyPage() {
  return <WorkshopLanding design="a" titleKey="default" />;
}
