import type { Metadata } from "next";
import { Fragment } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Packages — Emergence Digital",
  description:
    "Campaign-led growth packages for IT and consulting firm owners ready to become the obvious choice in their market.",
};

interface Tier {
  name: string;
  headline: string;
  description: string;
  highlights: string[];
  mostPopular?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Tier 1",
    headline: "Your thought-leadership, your marketing strategy, built and delivered.",
    description:
      "Strategic and tangible marketing with digital events as the backbone.",
    highlights: [
      "Digital workshop build & facilitation",
      "Pre-event marketing to drive registrations",
      "CRM management & reporting",
    ],
  },
  {
    name: "Tier 2",
    headline:
      "Curation and publication of a full library of content built from your expertise.",
    description:
      "We drive registrations and attendance, then repurpose the recording into a full content suite.",
    highlights: [
      "Post-event social media content creation",
      "eDM nurture sequences for subscribers",
      "Fortnightly strategy check-ins",
    ],
    mostPopular: true,
  },
];

interface ComparisonRow {
  title: string;
  description: string;
  tier1: string;
  tier2: string;
}

interface ComparisonGroup {
  label: string;
  rows: ComparisonRow[];
}

const comparisonGroups: ComparisonGroup[] = [
  {
    label: "Core Offering",
    rows: [
      {
        title: "Strategy Session & Campaign Roadmap",
        description:
          "Extracts your expertise and direction, delivered via a monthly digital event",
        tier1: "check",
        tier2: "check",
      },
      {
        title: "Digital Workshop Build & Facilitation",
        description: "Content, structure and delivery for your monthly digital event",
        tier1: "check",
        tier2: "check",
      },
      {
        title: "Event Registration Page",
        description: "Landing page to capture sign-ups, and on-demand views post-event",
        tier1: "check",
        tier2: "check",
      },
      {
        title: "CRM Management",
        description: "Segmentation for advertising, automation of deal creation post-event",
        tier1: "check",
        tier2: "check",
      },
      {
        title: "Reporting & Analytics",
        description: "Monthly visibility into campaign performance and pipeline",
        tier1: "check",
        tier2: "check",
      },
      {
        title: "Progress Calls",
        description: "Check-ins to keep the campaign on track",
        tier1: "Monthly",
        tier2: "Fortnightly",
      },
    ],
  },
  {
    label: "Pre-Event Advertising",
    rows: [
      {
        title: "Pre-Webinar Social Media",
        description: "Posts on your brand & SME channels driving registrations",
        tier1: "Provided",
        tier2: "Published",
      },
      {
        title: "Pre-Webinar Email Marketing",
        description: "Teaser and announcement sequence to your list",
        tier1: "Provided",
        tier2: "Published",
      },
    ],
  },
  {
    label: "Content Repurposing",
    rows: [
      {
        title: "Post-event social sharing",
        description: "Clips and highlights shared after the session",
        tier1: "dash",
        tier2: "check",
      },
      {
        title: "Post-event Nurture eDM",
        description: "Nurture sequence to attendees and leads",
        tier1: "dash",
        tier2: "check",
      },
    ],
  },
];

function Check() {
  return (
    <div className="mx-auto flex-shrink-0 w-6 h-6 rounded-full bg-mid-green flex items-center justify-center">
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

function ComparisonCell({ value }: { value: string }) {
  if (value === "check") return <Check />;
  if (value === "dash") return <span className="text-muted">—</span>;
  return <span className="text-dark-green font-medium text-sm">{value}</span>;
}

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <SectionLabel>Packages</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mb-6">
            Campaign-Led Growth Packages
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Built for IT firm owners ready to become the obvious choice in
            their market — not just another name in the RFP.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream pb-16 md:pb-20">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <p className="text-body leading-relaxed">
            Emergence is built for IT and consulting firm owners who are
            capable of winning mid-market and enterprise clients, but whose
            brand hasn&apos;t caught up to the business they&apos;ve actually
            built. We design campaigns for the entire funnel, powered by your
            approach, thought leadership, and unique value proposition — so
            competitors are chasing you, not the other way around. The
            outcome: real brand equity as a recognised authority in your
            space, content that gets your audience talking, and the
            automations to turn that recognition into a pipeline of qualified
            leads.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className="relative flex flex-col">
              {tier.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mid-green text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-serif text-2xl font-bold text-dark-green mb-3 mt-2">
                {tier.name}
              </h3>
              <p className="text-dark-green font-medium leading-relaxed mb-3">
                {tier.headline}
              </p>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {tier.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 items-start">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-mid-green flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-body text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="secondary" className="w-full text-center">
                Book a Strategy Call
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
              How it comes together
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-dark-green/10">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-muted uppercase tracking-wide">
                    &nbsp;
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-dark-green">
                    Tier 1
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-dark-green">
                    Tier 2
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => (
                  <Fragment key={group.label}>
                    <tr className="bg-cream/60">
                      <td
                        colSpan={3}
                        className="py-3 px-4 text-xs font-semibold tracking-widest uppercase text-mid-green"
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.title} className="border-b border-dark-green/10">
                        <td className="py-4 pr-4">
                          <p className="text-dark-green font-medium">{row.title}</p>
                          <p className="text-muted text-sm leading-relaxed mt-1">
                            {row.description}
                          </p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <ComparisonCell value={row.tier1} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <ComparisonCell value={row.tier2} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
