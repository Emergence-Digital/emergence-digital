import { CategorySlug } from "@/lib/services-data";

export interface RelatedService {
  categorySlug: CategorySlug;
  serviceSlug: string;
}

export interface Industry {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  beforeParagraph: string;
  beforeIndicators: string[];
  afterParagraph: string;
  afterIndicators: string[];
  relatedServices: RelatedService[];
  metaDescription: string;
}

export const industries: Industry[] = [
  {
    slug: "it-services-msps",
    label: "IT Services & MSPs",
    eyebrow: "For IT Services & MSPs",
    title: "Become the first call, not the backup quote.",
    subtitle:
      "You've got the technical depth and the client base to prove it — but the market still treats you like a commodity provider. We build the recognition to match your capability.",
    beforeParagraph:
      "Most of your new business still comes from referrals and RFPs where you're competing on price against firms with a fraction of your capability. Your website and socials don't reflect the quality of work you actually deliver, and larger, more strategic clients overlook you before you get a chance to pitch.",
    beforeIndicators: [
      "Referrals are your main source of new business",
      "Winning larger clients feels harder than it should",
      "It's difficult to explain what makes you different from every other MSP",
      "Your technical capability is stronger than your market reputation",
    ],
    afterParagraph:
      "Ninety days in, prospects already understand your expertise before they call — because they've seen your event, read your guide, or watched a client story. You're being invited to the table for mid-market and enterprise work, not just squeezed into a shortlist.",
    afterIndicators: [
      "You're generating qualified meetings from every campaign",
      "Your pipeline includes genuine mid-market opportunities",
      "Inbound enquiries start arriving without a referral behind them",
      "You're choosing the clients you want, not accepting every job that comes in",
    ],
    relatedServices: [
      { categorySlug: "marketing", serviceSlug: "events" },
      { categorySlug: "content", serviceSlug: "digital-guides" },
      { categorySlug: "marketing", serviceSlug: "lead-generation" },
      { categorySlug: "digital", serviceSlug: "crm-administration" },
    ],
    metaDescription:
      "Marketing for IT services firms and MSPs ready to become the obvious choice in their market — digital events, content and pipeline built around your expertise.",
  },
  {
    slug: "erp-software-partners",
    label: "ERP & Software Partners",
    eyebrow: "For ERP & Software Partners",
    title: "Get on the shortlist before the RFP goes out.",
    subtitle:
      "Partnership credentials only matter if the market knows about them. We turn your implementation expertise into content and events that put you top of mind before the tender process even starts.",
    beforeParagraph:
      "You've earned the partner tier, the certifications, and the case studies — but so has every other partner in your category. Without a visible point of view, you're just another logo on a partner page, competing on the same generic pitch as everyone else with the same badge.",
    beforeIndicators: [
      "Partnership status alone isn't winning you more deals",
      "Prospects can't tell you apart from other partners with the same badge",
      "Your implementation expertise never makes it further than a case study PDF",
      "New opportunities depend on the platform vendor's referral list, not your own reputation",
    ],
    afterParagraph:
      "Ninety days in, you're the partner prospects already know before procurement gets involved. Your point of view on implementation, migration or optimisation is out in the market — in a guide, a webinar, a LinkedIn series — so conversations start with \"we've seen your content,\" not a cold intro from the vendor.",
    afterIndicators: [
      "Prospects reference your content before the first sales call",
      "You're generating pipeline independent of vendor referrals",
      "Your team is recognised as category experts, not just certified installers",
      "You're being shortlisted on reputation, not just partner tier",
    ],
    relatedServices: [
      { categorySlug: "marketing", serviceSlug: "events" },
      { categorySlug: "marketing", serviceSlug: "seo" },
      { categorySlug: "content", serviceSlug: "digital-guides" },
      { categorySlug: "sales", serviceSlug: "outreach-campaigns" },
    ],
    metaDescription:
      "Marketing for ERP and software implementation partners — build the recognition and content that gets you shortlisted before the RFP goes out.",
  },
  {
    slug: "consulting-advisory-firms",
    label: "Consulting & Advisory Firms",
    eyebrow: "For Consulting & Advisory Firms",
    title: "Turn what's in your head into what the market sees.",
    subtitle:
      "You've built genuine points of view through years of client work — but they're stuck in your head and your team's inboxes. We package that expertise into campaigns that build your reputation as the go-to authority.",
    beforeParagraph:
      "You know more about your category than almost anyone in it, but that expertise only ever reaches the clients already in front of you. Business development competes with billable work for your time, so the thought leadership that would actually grow the firm never gets written, recorded, or published.",
    beforeIndicators: [
      "Your expertise never leaves the room it was shared in",
      "Business development only happens when someone finds spare time",
      "You're known within your client base, but not beyond it",
      "New work depends on who already knows you, not who should",
    ],
    afterParagraph:
      "Ninety days in, your point of view is out in the market on a consistent monthly rhythm — a webinar, a podcast, a guide — and prospects arrive at the first meeting already familiar with how you think. Referrals still come in, but now they're backed by a reputation that reaches further than your existing network.",
    afterIndicators: [
      "Industry peers begin recognising your firm as a thought leader",
      "Your content consistently attracts the right audience, not just your existing network",
      "Prospects reference your point of view before the first conversation",
      "You're building a pipeline beyond who already knows you personally",
    ],
    relatedServices: [
      { categorySlug: "marketing", serviceSlug: "events" },
      { categorySlug: "content", serviceSlug: "blogs" },
      { categorySlug: "content", serviceSlug: "podcasts" },
      { categorySlug: "sales", serviceSlug: "pipeline-generation" },
    ],
    metaDescription:
      "Marketing for consulting and advisory firms — turn your point of view into digital events, content and a pipeline of qualified opportunities.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs() {
  return industries.map((i) => ({ slug: i.slug }));
}
