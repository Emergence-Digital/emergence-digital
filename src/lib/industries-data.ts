import type { ShiftIcon } from "./shift-icons";

/** One row of the "from this, to this" section: a pain the firm has today, paired with where it is ninety days in. */
export interface Shift {
  from: string;
  fromIcon: ShiftIcon;
  to: string;
  toIcon: ShiftIcon;
}

export interface Industry {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  beforeParagraph: string;
  shifts: Shift[];
  afterParagraph: string;
  relatedServices: string[]; // slugs from services-data.ts, shown as scene cards that open the service pop-up
  metaDescription: string;
}

// Order and names follow the audience line in the video scripts (Oct 2026): MSPs and cyber security firms,
// ERP and cloud partners, IT consultancies, software developers and SaaS companies. Old slugs 301 here via
// oldIndustrySlugs in next.config.ts.
export const industries: Industry[] = [
  {
    slug: "msps-cyber-security",
    label: "MSPs & Cyber Security Firms",
    eyebrow: "For MSPs & Cyber Security Firms",
    title: "Be the provider they trust before they need one.",
    subtitle:
      "Buyers can't judge technical depth from a website, so they default to the biggest name they recognise. We make you the provider they already trust, so you're the first call, not the backup quote.",
    beforeParagraph:
      "Your team knows the threat landscape and runs client environments better than most of the market, but from the outside you look like every other provider with the same certifications, the same 24/7 monitoring claims and the same zero-trust language. Most new business still comes from referrals and RFPs where you're competing on price, and your best work stays locked inside client environments where no prospect ever sees it.",
    shifts: [
      {
        from: "Prospects only reach out once something has already gone wrong",
        fromIcon: "siren",
        to: "You're top of mind before a breach or an audit forces the decision",
        toIcon: "shield-check",
      },
      {
        from: "Your website says the same things as every other provider in your category",
        fromIcon: "copy",
        to: "Prospects arrive already familiar with your team's thinking",
        toIcon: "lightbulb",
      },
      {
        from: "Buyers default to the biggest brand they recognise",
        fromIcon: "building",
        to: "Your pipeline includes mid-market buyers who already know your name",
        toIcon: "handshake",
      },
      {
        from: "Referrals are your main source of new business",
        fromIcon: "messages",
        to: "You're choosing the clients you want, not waiting on the next referral",
        toIcon: "user-check",
      },
    ],
    afterParagraph:
      "Ninety days in, prospects already know how your team thinks about threats, compliance and uptime before they book a call. You're invited in for mid-market and enterprise work instead of being squeezed into a shortlist, and security reviews move faster because buyers trust your judgement, not just your badges.",
    relatedServices: [
      "webinars",
      "digital-guides",
      "social-media",
      "lead-magnets",
    ],
    metaDescription:
      "Marketing for MSPs and cyber security firms that want to be the provider buyers already trust, and win mid-market and enterprise contracts on reputation, not price.",
  },
  {
    slug: "erp-cloud-partners",
    label: "ERP & Cloud Partners",
    eyebrow: "For ERP & Cloud Partners",
    title: "Get on the shortlist before the RFP goes out.",
    subtitle:
      "Partnership credentials only matter if the market knows about them. We make you the partner buyers already know before the tender process even starts.",
    beforeParagraph:
      "Whether you implement SAP, Oracle, Microsoft or Salesforce, or move clients onto AWS, Azure or Google Cloud, you've earned the partner tier, the certifications and the case studies. So has every other partner in your ecosystem. Without a visible point of view, you're just another logo on a partner page, competing on the same generic pitch as everyone else with the same badge.",
    shifts: [
      {
        from: "Partnership status alone isn't winning you more deals",
        fromIcon: "award",
        to: "You're being shortlisted on reputation, not just partner tier",
        toIcon: "list-checks",
      },
      {
        from: "Prospects can't tell you apart from other partners with the same badge",
        fromIcon: "layers",
        to: "Your team is recognised as category experts, not just certified installers",
        toIcon: "graduation-cap",
      },
      {
        from: "Your implementation expertise never makes it further than a case study PDF",
        fromIcon: "file",
        to: "Prospects reference your content before the first sales call",
        toIcon: "book-check",
      },
      {
        from: "New opportunities depend on the platform vendor's referral list, not your own reputation",
        fromIcon: "inbox",
        to: "You're generating pipeline independent of vendor referrals",
        toIcon: "trending-up",
      },
    ],
    afterParagraph:
      "Ninety days in, you're the partner prospects already know before procurement gets involved. Your point of view on implementation, migration or optimisation is out in the market, so conversations start with \"we've seen your work,\" not a cold intro from the vendor.",
    relatedServices: [
      "webinars",
      "blogs",
      "digital-guides",
      "email-cadences",
    ],
    metaDescription:
      "Marketing for ERP, CRM and cloud partners: build the recognition that gets you shortlisted before the RFP goes out.",
  },
  {
    slug: "consulting-development-firms",
    label: "Consulting & Development Firms",
    eyebrow: "For Consulting & Development Firms",
    title: "Be the firm they trust to build their AI.",
    subtitle:
      "Every consultancy and development shop now claims it can build AI agents, and buyers can't tell who has actually shipped one. We make you the firm they trust to build theirs, so you're hired on expertise, not day rates.",
    beforeParagraph:
      "You've put AI agents, data platforms and custom software into production for clients, but that proof stays inside client projects and NDAs. Business development competes with billable work for your time, so from the outside you look like every other firm with an AI page on its website, and buyers end up comparing you on day rates and headcount.",
    shifts: [
      {
        from: "Every competitor's website now says the same things about AI",
        fromIcon: "bot",
        to: "Prospects arrive convinced you can deliver AI that works in production",
        toIcon: "rocket",
      },
      {
        from: "Your best work is hidden behind NDAs and client environments",
        fromIcon: "lock",
        to: "Your team is recognised for what it has built, not just what it says",
        toIcon: "trophy",
      },
      {
        from: "Buyers compare you on day rates, not on what you've delivered",
        fromIcon: "calculator",
        to: "First calls are about scope, not day rates",
        toIcon: "pencil-ruler",
      },
      {
        from: "Business development only happens when someone finds spare time",
        fromIcon: "hourglass",
        to: "Pipeline keeps growing beyond your own network, even in your busiest months",
        toIcon: "network",
      },
    ],
    afterParagraph:
      "Ninety days in, buyers know your point of view on AI before they meet you, and they've seen what your team has put into production. First calls start with \"how would you build ours\" instead of \"what do you charge\", and new work comes from beyond the people who already know you.",
    relatedServices: [
      "online-workshops",
      "case-studies",
      "webinars",
      "blogs",
    ],
    metaDescription:
      "Marketing for IT, data and AI consultancies and software development firms: become the firm buyers trust to build their AI, and win work on expertise, not day rates.",
  },
  {
    slug: "saas-software-companies",
    label: "SaaS & Software Companies",
    eyebrow: "For SaaS & Software Companies",
    title: "Win the deal before the demo.",
    subtitle:
      "Good software doesn't sell itself, and a feature list isn't a reason to buy. We bring you buyers who already understand the problem you solve, so the first call is about fit, not features.",
    beforeParagraph:
      "Your product is genuinely better, but from the outside you look like every other vendor with a feature grid and a book-a-demo button. Prospects arrive with no context, so demos do all the heavy lifting, conversations drift to price, and the problems you're best at solving never make it onto your website.",
    shifts: [
      {
        from: "Demos carry the whole sale because buyers arrive with no context",
        fromIcon: "presentation",
        to: "Prospects book demos already understanding your use case",
        toIcon: "calendar-check",
      },
      {
        from: "Prospects compare you on features and price, not outcomes",
        fromIcon: "tags",
        to: "Buyers compare you on outcomes, and sales cycles shorten",
        toIcon: "target",
      },
      {
        from: "Your best customer results live in release notes and support tickets",
        fromIcon: "ticket",
        to: "Customer stories show the outcome, not just the feature list",
        toIcon: "quote",
      },
      {
        from: "New business still depends on the founder's network",
        fromIcon: "user",
        to: "Pipeline grows beyond the founder's personal network",
        toIcon: "users",
      },
    ],
    afterParagraph:
      "Ninety days in, buyers have already seen the problem you solve before they book, so the first call is about fit, not features. Your pipeline no longer relies on the founder's network, and sales cycles shorten because the education happens before the demo.",
    relatedServices: [
      "webinars",
      "video-production",
      "digital-guides",
      "buying-signals",
    ],
    metaDescription:
      "Marketing for SaaS and software companies: a pipeline of buyers who understand your product's value before the demo.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs() {
  return industries.map((i) => ({ slug: i.slug }));
}
