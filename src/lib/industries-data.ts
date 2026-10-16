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
    label: "ERP Partners",
    eyebrow: "For ERP Partners",
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
      "Marketing for ERP implementation partners — build the recognition and content that gets you shortlisted before the RFP goes out.",
  },
  {
    slug: "software-developers",
    label: "Software Developers",
    eyebrow: "For Software Developers",
    title: "Show buyers what you can build before they compare quotes.",
    subtitle:
      "Good software doesn't sell itself, and a feature list isn't a reason to buy. We turn the problems you've solved for clients into content and events that show buyers what you're capable of — long before the demo.",
    beforeParagraph:
      "Your product or your engineering team is genuinely better, but from the outside you look like every other vendor with a feature grid and a book-a-demo button. Prospects arrive with no context, so demos do all the heavy lifting, conversations drift to price, and the problems you're best at solving never make it onto your website.",
    beforeIndicators: [
      "Prospects compare you on features and price, not outcomes",
      "Demos carry the whole sale because buyers arrive with no context",
      "Your best client results live in release notes and support tickets",
      "New business still depends on the founder's network",
    ],
    afterParagraph:
      "Ninety days in, buyers have already seen the problem you solve — in a live walkthrough, a client story or a guide your team wrote — so the first call is about fit, not features. Your pipeline no longer relies on the founder's network, and sales cycles shorten because the education happens before the demo.",
    afterIndicators: [
      "Prospects book demos already understanding your use case",
      "Client stories show the outcome, not just the feature list",
      "Pipeline grows beyond the founder's personal network",
      "Sales cycles shorten because buyers are educated before the first call",
    ],
    relatedServices: [
      { categorySlug: "marketing", serviceSlug: "events" },
      { categorySlug: "content", serviceSlug: "video" },
      { categorySlug: "content", serviceSlug: "digital-guides" },
      { categorySlug: "sales", serviceSlug: "pipeline-generation" },
    ],
    metaDescription:
      "Marketing for software developers and product companies — turn what you've built into digital events, content and a pipeline of buyers who understand your value before the demo.",
  },
  {
    slug: "cybersecurity-cloud-providers",
    label: "Cybersecurity & Cloud Providers",
    eyebrow: "For Cybersecurity & Cloud Providers",
    title: "Be the provider they trust before they need one.",
    subtitle:
      "Trust is the entire sale in your category, and trust is built in public. We turn your team's expertise into content and events buyers see month after month — so they arrive already convinced before the first conversation.",
    beforeParagraph:
      "Your team knows the threat landscape and the cloud platforms better than most of the market, but from the outside you look like every other provider with the same certifications, the same 24/7 monitoring claims and the same zero-trust language. Buyers can't judge technical depth from a website, so they default to the biggest name they recognise — and your best work stays locked inside client environments where no prospect ever sees it.",
    beforeIndicators: [
      "Your website says the same things as every other provider in your category",
      "Buyers default to the biggest brand they recognise",
      "Your team's best work is hidden behind NDAs and client environments",
      "Prospects only reach out once something has already gone wrong",
    ],
    afterParagraph:
      "Ninety days in, your point of view on threats, compliance and cloud risk is out in the market every month — in a webinar, a briefing guide, a LinkedIn series from your own engineers — so prospects already trust your judgement before they book a call. Security reviews and procurement move faster because buyers have seen how you think, not just which badges you hold.",
    afterIndicators: [
      "Prospects arrive already familiar with your team's thinking",
      "Your engineers are recognised voices, not anonymous names on a contract",
      "You're top of mind before a breach or an audit forces the decision",
      "Expert content proves your credibility without breaking client confidentiality",
    ],
    relatedServices: [
      { categorySlug: "marketing", serviceSlug: "events" },
      { categorySlug: "content", serviceSlug: "digital-guides" },
      { categorySlug: "marketing", serviceSlug: "social-media" },
      { categorySlug: "sales", serviceSlug: "outreach-campaigns" },
    ],
    metaDescription:
      "Marketing for cybersecurity and cloud providers — build trust in public with digital events, expert content and a pipeline of buyers who arrive already convinced.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs() {
  return industries.map((i) => ({ slug: i.slug }));
}
