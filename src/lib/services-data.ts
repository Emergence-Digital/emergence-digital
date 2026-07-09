export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  label: string;
  title: string;
  shortDescription: string;
  intro: string;
  features: ServiceFeature[];
  whoItsFor: string;
  metaDescription: string;
  imageSrc: string;
  imageAlt: string;
}

export type CategorySlug = "sales" | "marketing" | "digital" | "content";

export interface Category {
  slug: CategorySlug;
  label: string;
  title: string;
  tagline: string;
  description: string;
  metaDescription: string;
  services: Service[];
}

export const categories: Category[] = [
  {
    slug: "sales",
    label: "Sales",
    title: "Sales",
    tagline: "Pipeline, built and closed.",
    description:
      "From the first cold email to the signed contract, we build the outreach, pipeline, and operational backbone that turns prospects into revenue — so you get a sales engine, not just a sales team.",
    metaDescription:
      "Outreach campaigns, pipeline generation, deal closure and SalesOps for Melbourne businesses that want a repeatable sales engine.",
    services: [
      {
        slug: "outreach-campaigns",
        label: "Outreach Campaigns",
        title: "Outreach that starts real conversations.",
        shortDescription:
          "Multi-channel outbound campaigns that get your offer in front of the right people — and get replies.",
        intro:
          "Cold outreach doesn't have to feel cold. We design and run email, LinkedIn, and call campaigns built on precise targeting and messaging that sounds like a person, not a template — so your outbound earns opens, replies, and booked meetings.",
        features: [
          {
            title: "Ideal Customer Profiling & List Building",
            description:
              "We define exactly who you should be talking to, then build verified, targeted contact lists — no spray and pray.",
          },
          {
            title: "Multi-Channel Sequence Design",
            description:
              "Email, LinkedIn, and phone cadences that work together, timed and personalised so prospects hear from you at the right moment, not all at once.",
          },
          {
            title: "Copywriting & A/B Testing",
            description:
              "We write and continuously test subject lines, opening messages, and calls to action, using real reply data to refine what works.",
          },
          {
            title: "Reply Handling & Handover",
            description:
              "Every response is triaged and handed to your team warm, with full context, so no lead goes cold waiting on a follow-up.",
          },
        ],
        whoItsFor:
          "Ideal for B2B businesses that need a consistent flow of new conversations without building an internal SDR team from scratch, and for sales leaders who want outbound running alongside inbound, not instead of it.",
        metaDescription:
          "Multi-channel outbound campaigns — email, LinkedIn and call sequences — that generate real replies and booked meetings for Melbourne B2B businesses.",
        imageSrc:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        imageAlt: "Outreach campaigns — team planning an outbound sequence",
      },
      {
        slug: "pipeline-generation",
        label: "Pipeline Generation",
        title: "A pipeline that never runs dry.",
        shortDescription:
          "Consistent, qualified opportunity flow — so your sales team spends time selling, not searching for who to call.",
        intro:
          "Most sales teams don't have a closing problem, they have a pipeline problem. We build the systems — targeting, qualification, and nurture — that keep a steady stream of sales-ready opportunities landing in your calendar every week.",
        features: [
          {
            title: "Lead Scoring & Qualification",
            description:
              "We define what a genuinely sales-ready lead looks like for your business, then filter and rank inbound and outbound activity against it.",
          },
          {
            title: "CRM Pipeline Architecture",
            description:
              "Clear, well-structured pipeline stages that reflect how your deals actually move, so forecasting and reporting are accurate, not guesswork.",
          },
          {
            title: "Nurture Sequencing",
            description:
              "Automated nurture tracks that keep warm-but-not-ready leads engaged until they're genuinely ready to talk.",
          },
          {
            title: "Weekly Pipeline Reviews",
            description:
              "Regular reporting on volume, velocity, and conversion at each stage, so you always know exactly where deals are getting stuck.",
          },
        ],
        whoItsFor:
          "Built for growing sales teams who need predictable opportunity flow, and for founders currently doing all their own prospecting who need it systemised before it can scale.",
        metaDescription:
          "Pipeline generation systems — lead scoring, CRM architecture and nurture sequencing — that keep qualified opportunities flowing for growing sales teams.",
        imageSrc:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        imageAlt: "Pipeline generation — sales team reviewing opportunity pipeline",
      },
      {
        slug: "deal-closure",
        label: "Deal Closure",
        title: "Get more deals over the line.",
        shortDescription:
          "Sales process, collateral, and negotiation support that turns qualified opportunities into signed business.",
        intro:
          "A full pipeline means nothing if deals stall at the finish line. We sharpen the back half of your sales process — proposals, objection handling, and follow-up cadence — so more of the opportunities you've already earned actually close.",
        features: [
          {
            title: "Proposal & Pricing Frameworks",
            description:
              "Clear, persuasive proposal templates and pricing structures that make it easy for buyers to say yes.",
          },
          {
            title: "Objection Handling Playbooks",
            description:
              "Documented responses to your most common stalls and objections, built from real deal history, not generic sales theory.",
          },
          {
            title: "Follow-Up Cadence Design",
            description:
              "Structured, non-pushy follow-up sequences that keep deals moving without letting them go cold.",
          },
          {
            title: "Negotiation Support",
            description:
              "Hands-on support and coaching through complex or high-value negotiations, from scoping through to contract sign-off.",
          },
        ],
        whoItsFor:
          "Suited to teams with a healthy pipeline but an inconsistent close rate, and to founders closing deals themselves who want a repeatable process instead of relying on instinct.",
        metaDescription:
          "Proposal frameworks, objection handling and negotiation support that help Melbourne sales teams close more of the pipeline they've already earned.",
        imageSrc:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
        imageAlt: "Deal closure — handshake following a signed agreement",
      },
      {
        slug: "sales-ops",
        label: "SalesOps",
        title: "The operational backbone behind every deal.",
        shortDescription:
          "CRM hygiene, reporting, and process design that keeps your entire sales motion running on clean data.",
        intro:
          "Behind every high-performing sales team is unglamorous, essential infrastructure. We set up and maintain the CRM configuration, reporting, and process discipline that stop deals from slipping through the cracks.",
        features: [
          {
            title: "CRM Setup & Hygiene",
            description:
              "Clean, correctly configured CRM data and workflows so every rep is working from the same accurate source of truth.",
          },
          {
            title: "Sales Reporting & Dashboards",
            description:
              "Live dashboards on pipeline, conversion, and rep performance, built for the metrics that actually drive decisions.",
          },
          {
            title: "Territory & Quota Planning",
            description:
              "Fair, data-backed territory and quota structures that keep the team aligned and motivated.",
          },
          {
            title: "Tooling & Tech Stack Management",
            description:
              "We manage the sales tech stack — CRM, dialer, enrichment tools — so it works together instead of against your team.",
          },
        ],
        whoItsFor:
          "Ideal for scaling sales teams outgrowing spreadsheets and ad-hoc processes, and for leadership that needs trustworthy sales data to make decisions on.",
        metaDescription:
          "SalesOps support — CRM hygiene, reporting dashboards and quota planning — for scaling sales teams that need trustworthy data.",
        imageSrc:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        imageAlt: "SalesOps — dashboard reporting on sales pipeline performance",
      },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    title: "Marketing",
    tagline: "Demand, created and converted.",
    description:
      "From first impression to inbox to search results, we build the marketing engine that keeps your brand in front of the right people, consistently — across every channel that matters.",
    metaDescription:
      "Lead generation, social media, events, eDMs and SEO for Melbourne businesses that want marketing to actually generate demand.",
    services: [
      {
        slug: "lead-generation",
        label: "Lead Generation",
        title: "Demand, generated on purpose.",
        shortDescription:
          "Paid, organic, and content-driven campaigns engineered to fill the top of your funnel with the right people.",
        intro:
          "Lead generation isn't luck, it's a system. We design and run campaigns across paid, organic, and content channels that consistently attract prospects who actually fit your business — not just anyone who'll click an ad.",
        features: [
          {
            title: "Paid Media Campaigns",
            description:
              "Google, Meta, and LinkedIn campaigns targeted, tested, and optimised against real cost-per-lead and pipeline outcomes, not vanity clicks.",
          },
          {
            title: "Landing Page & Funnel Design",
            description:
              "High-converting landing pages and funnels built to turn traffic into genuine enquiries, not just page views.",
          },
          {
            title: "Lead Magnet Strategy",
            description:
              "Guides, tools, and offers designed specifically to attract your ideal customer at the exact moment they're evaluating options.",
          },
          {
            title: "Conversion Rate Optimisation",
            description:
              "Ongoing testing of copy, layout, and offer to squeeze more qualified leads out of the traffic you're already getting.",
          },
        ],
        whoItsFor:
          "Ideal for businesses with a good product or service that isn't getting in front of enough of the right people yet, and for teams tired of marketing spend that doesn't translate into pipeline.",
        metaDescription:
          "Paid, organic and content-driven lead generation campaigns built to fill your funnel with genuinely qualified prospects.",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Lead generation — campaign analytics dashboard",
      },
      {
        slug: "social-media",
        label: "Social Media",
        title: "A social presence that earns attention.",
        shortDescription:
          "Strategy, content, and community management that turns social channels into a genuine growth channel.",
        intro:
          "Posting isn't a strategy. We build social media programs — content, cadence, and community management — designed around what your audience actually engages with, so your channels build brand and pipeline, not just impressions.",
        features: [
          {
            title: "Content Strategy & Calendars",
            description:
              "A clear content plan mapped to your brand voice and business goals, so every post has a purpose.",
          },
          {
            title: "Organic Content Production",
            description:
              "Design, copywriting, and short-form video produced for the platforms your audience actually spends time on.",
          },
          {
            title: "Paid Social Amplification",
            description:
              "Boosting and paid campaigns that extend the reach of your best-performing organic content.",
          },
          {
            title: "Community Management",
            description:
              "Timely, on-brand responses to comments and DMs that build genuine relationships instead of leaving your audience on read.",
          },
        ],
        whoItsFor:
          "Great for brands that know social matters but don't have the internal capacity to plan, produce, and manage it consistently well.",
        metaDescription:
          "Social media strategy, content production and community management for Melbourne brands that want channels people actually engage with.",
        imageSrc:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
        imageAlt: "Social media — content planning across platforms",
      },
      {
        slug: "events",
        label: "Events",
        title: "Events people actually show up for.",
        shortDescription:
          "End-to-end planning and promotion for webinars, launches, and in-person events that build pipeline, not just attendance.",
        intro:
          "A great event is only as good as the strategy behind it. We plan, promote, and run webinars, launches, and in-person experiences designed to attract the right audience and convert attendance into genuine business outcomes.",
        features: [
          {
            title: "Event Strategy & Planning",
            description:
              "Format, audience, and goals defined upfront, so every event is built around a clear commercial outcome.",
          },
          {
            title: "Promotion & Registration Campaigns",
            description:
              "Multi-channel campaigns that drive genuine registrations, not just RSVPs that never show up.",
          },
          {
            title: "On-The-Day Production & Run Sheets",
            description:
              "Detailed run sheets and on-the-day coordination so events go smoothly, whether virtual or in person.",
          },
          {
            title: "Post-Event Follow-Up & Reporting",
            description:
              "Structured follow-up sequences and attendance reporting that turn event leads into pipeline.",
          },
        ],
        whoItsFor:
          "Suited to businesses running webinars, product launches, or in-person networking and client events who want them to drive real pipeline, not just brand awareness.",
        metaDescription:
          "Event strategy, promotion and production for webinars, launches and in-person events that build genuine pipeline.",
        imageSrc:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        imageAlt: "Events — audience at a business conference",
      },
      {
        slug: "edms",
        label: "eDMs",
        title: "Email that gets opened, read, and clicked.",
        shortDescription:
          "Newsletter and campaign eDMs, designed and written to earn a place in the inbox, not the spam folder.",
        intro:
          "Email remains one of the highest-return channels available — when it's done properly. We design, write, and send eDM campaigns and newsletters that get opened, read, and acted on, backed by list health and deliverability best practice.",
        features: [
          {
            title: "eDM Design & Copywriting",
            description:
              "On-brand templates and copy written to be read, not skimmed past, with clear calls to action.",
          },
          {
            title: "List Segmentation & Targeting",
            description:
              "Audiences segmented by behaviour and lifecycle stage, so every send feels relevant to the person receiving it.",
          },
          {
            title: "Deliverability & List Health",
            description:
              "Technical setup — authentication, list hygiene, and sending practices — that keeps you out of spam folders.",
          },
          {
            title: "Performance Reporting",
            description:
              "Open, click, and conversion reporting on every send, used to continuously refine subject lines and content.",
          },
        ],
        whoItsFor:
          "Ideal for businesses with an existing customer or subscriber list that isn't being nurtured properly, and for teams wanting a genuinely engaged newsletter audience.",
        metaDescription:
          "eDM and newsletter campaigns — design, copywriting and deliverability — built to get opened, read and clicked.",
        imageSrc:
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
        imageAlt: "eDMs — email newsletter campaign on a laptop screen",
      },
      {
        slug: "seo",
        label: "SEO",
        title: "Found first, for the searches that matter.",
        shortDescription:
          "Technical, content, and authority-building SEO that compounds your organic visibility over time.",
        intro:
          "SEO is a long game, played correctly. We combine technical fixes, content strategy, and authority building so your business ranks for the searches your customers are actually making — and keeps ranking as competitors come and go.",
        features: [
          {
            title: "Technical SEO Audits",
            description:
              "Site speed, crawlability, and structure fixes that remove the invisible barriers stopping you from ranking.",
          },
          {
            title: "Keyword & Content Strategy",
            description:
              "Research-backed content plans targeting the terms your ideal customers are genuinely searching for.",
          },
          {
            title: "On-Page Optimisation",
            description:
              "Titles, structure, and internal linking optimised page by page for both search engines and real readers.",
          },
          {
            title: "Authority & Link Building",
            description:
              "Ethical, sustainable link building and digital PR that builds genuine domain authority over time.",
          },
        ],
        whoItsFor:
          "Built for businesses that want organic search to be a genuine, compounding growth channel rather than an occasional afterthought.",
        metaDescription:
          "Technical, content and authority-building SEO services that grow organic search visibility for Melbourne businesses.",
        imageSrc:
          "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80",
        imageAlt: "SEO — search analytics and ranking data on screen",
      },
    ],
  },
  {
    slug: "digital",
    label: "Digital",
    title: "Digital",
    tagline: "Built, integrated, intelligent.",
    description:
      "The technical backbone of your business — sites and apps that convert, systems that talk to each other, and AI and automation that actually get work done.",
    metaDescription:
      "Web design, app development, CRM administration, agentic AI and automation for Melbourne businesses building serious digital infrastructure.",
    services: [
      {
        slug: "web-design",
        label: "Web Design",
        title: "Websites that work as hard as you do.",
        shortDescription:
          "Bespoke, purpose-built websites — no templates, just design and development aligned to your business goals.",
        intro:
          "Every project is tailored to your business goals, ensuring a unique, strategic solution that aligns with your vision — no off-the-shelf templates, just innovative, purpose-driven development.",
        features: [
          {
            title: "Bespoke UI/UX Design",
            description:
              "Every pixel is considered. We design interfaces that are visually compelling, easy to use, and aligned with your brand identity.",
          },
          {
            title: "Next.js & Modern Development",
            description:
              "Fast, SEO-friendly websites built on Next.js and modern web standards — optimised for performance, accessibility, and search.",
          },
          {
            title: "Responsive Across All Devices",
            description:
              "Your site looks and works beautifully on every screen size, from mobile phones to large desktop displays.",
          },
          {
            title: "CMS Integration",
            description:
              "Need to update content yourself? We integrate headless CMS platforms so your team can manage content without touching code.",
          },
        ],
        whoItsFor:
          "Perfect for growing businesses that have outgrown a template site, service-based professionals who want to make a strong first impression, and brands that understand design is a competitive advantage.",
        metaDescription:
          "Bespoke web design and development in Melbourne. Purpose-driven websites that look brilliant and convert.",
        imageSrc:
          "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        imageAlt: "Web design — clean modern interface on a screen",
      },
      {
        slug: "app-development",
        label: "App Development",
        title: "Apps built to perform, built to scale.",
        shortDescription:
          "Custom mobile and web applications, from first concept through to launch and ongoing iteration.",
        intro:
          "From concept to launch, we design and develop mobile and web applications that solve real problems for real users. Whether you need a customer-facing product or an internal tool, we bring the technical depth and product thinking to make it exceptional.",
        features: [
          {
            title: "Custom Mobile Apps (iOS & Android)",
            description:
              "Native and cross-platform mobile development using React Native, Swift, or Kotlin — whatever best fits your product requirements.",
          },
          {
            title: "Web Application Development",
            description:
              "Full-stack web apps built on modern frameworks like Next.js, with robust back-ends that scale as your user base grows.",
          },
          {
            title: "API Design & Development",
            description:
              "Clean, well-documented REST or GraphQL APIs that power your front-end and integrate seamlessly with third-party services.",
          },
          {
            title: "Ongoing Support & Iteration",
            description:
              "We don't disappear at launch. We provide ongoing support, monitor performance, and continue improving your product over time.",
          },
        ],
        whoItsFor:
          "This service is ideal for startups building their first product, established businesses replacing legacy systems, and organisations that need a custom internal tool. If you have a problem that no off-the-shelf software solves cleanly, we can build the right solution.",
        metaDescription:
          "Custom mobile and web app development in Melbourne. We build scalable, performant applications tailored to your business.",
        imageSrc:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
        imageAlt: "App development — abstract code and technology",
      },
      {
        slug: "crm-administration",
        label: "CRM Administration",
        title: "A CRM your team actually trusts.",
        shortDescription:
          "Setup, configuration, and ongoing administration that turns your CRM into a genuine source of truth.",
        intro:
          "A misconfigured CRM is worse than no CRM at all — nobody trusts the data, so nobody uses it properly. We set up, clean, and administer platforms like HubSpot and Salesforce so your team has one system they can actually rely on.",
        features: [
          {
            title: "Platform Setup & Migration",
            description:
              "Clean implementation or migration onto platforms like HubSpot or Salesforce, configured around how your business actually sells.",
          },
          {
            title: "Custom Fields, Pipelines & Automation",
            description:
              "Pipeline stages, custom properties, and workflow automation built around your real sales and service processes, not generic defaults.",
          },
          {
            title: "Data Cleansing & Deduplication",
            description:
              "Ongoing data hygiene so duplicate records, dead leads, and stale fields stop undermining trust in the system.",
          },
          {
            title: "User Training & Adoption",
            description:
              "Practical training and documentation that gets your team actually using the CRM properly, not just tolerating it.",
          },
        ],
        whoItsFor:
          "Ideal for businesses whose CRM has become a mess nobody trusts, and for teams implementing a CRM for the first time who want it configured properly from day one.",
        metaDescription:
          "HubSpot and Salesforce setup, data cleansing and CRM administration for Melbourne businesses that want a system their team trusts.",
        imageSrc:
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80",
        imageAlt: "CRM administration — sales dashboard on a laptop screen",
      },
      {
        slug: "agentic-ai",
        label: "Agentic AI",
        title: "AI that does the work, not just the demo.",
        shortDescription:
          "Custom AI agents that handle real business tasks — research, support, data entry — reliably and safely.",
        intro:
          "Most 'AI projects' never leave the demo stage. We build agentic AI systems designed for production — agents that handle real tasks like research, customer support triage, and data processing, wired safely into your existing tools and workflows.",
        features: [
          {
            title: "Agent Strategy & Use Case Scoping",
            description:
              "We identify the tasks in your business where an AI agent will genuinely save time and money, not just generate a demo.",
          },
          {
            title: "Custom Agent Development",
            description:
              "Purpose-built agents connected to your data, tools, and APIs, built to operate reliably within clear boundaries.",
          },
          {
            title: "Human-in-the-Loop Safeguards",
            description:
              "Approval steps, monitoring, and escalation paths so agents are trusted with real work without unchecked risk.",
          },
          {
            title: "Integration & Deployment",
            description:
              "Agents wired directly into the tools your team already uses, so adoption doesn't require a new workflow to learn.",
          },
        ],
        whoItsFor:
          "Suited to operationally-minded businesses ready to move past AI experimentation and put agentic systems to work on genuine, repeatable tasks.",
        metaDescription:
          "Custom agentic AI systems built for production — agents that handle real business tasks reliably, not just AI demos.",
        imageSrc:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        imageAlt: "Agentic AI — abstract technology and automation visualisation",
      },
      {
        slug: "automation",
        label: "Automation",
        title: "Less manual work. More meaningful work.",
        shortDescription:
          "No-code and custom automation that eliminates repetitive admin so your team can focus on what matters.",
        intro:
          "Yes, we have favourites and can make recommendations, but if you use a certain software or have a dream technology stack, we'll adapt to deliver the automation solution you need.",
        features: [
          {
            title: "Process Mapping & Audit",
            description:
              "We start by understanding how your business actually operates, identifying bottlenecks and automation opportunities before writing a single line.",
          },
          {
            title: "No-Code & Custom Automation",
            description:
              "From Zapier and Make to fully custom-coded automation pipelines — we choose the right tool for your scale and complexity.",
          },
          {
            title: "Document & Approval Workflows",
            description:
              "Automate contracts, approvals, notifications, and reporting so your team spends less time on admin.",
          },
          {
            title: "Monitoring & Maintenance",
            description:
              "Automated systems need oversight. We set up monitoring, alerts, and provide ongoing maintenance to keep everything running smoothly.",
          },
        ],
        whoItsFor:
          "Best suited to service businesses drowning in admin, operations teams doing repetitive manual tasks, and any organisation that wants to scale without proportionally scaling their headcount.",
        metaDescription:
          "Automate repetitive processes and free up your team. Custom workflow automation for Melbourne businesses.",
        imageSrc:
          "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
        imageAlt: "Automation — gears and process visualisation",
      },
    ],
  },
  {
    slug: "content",
    label: "Content",
    title: "Content",
    tagline: "Made once, working everywhere.",
    description:
      "Video, guides, decks, podcasts and blogs — produced properly, so your content builds authority and pipeline instead of sitting unused in a drive folder.",
    metaDescription:
      "Video, digital guides, slide decks, podcasts and blog content production for Melbourne businesses building genuine authority.",
    services: [
      {
        slug: "video",
        label: "Video",
        title: "Video that gets watched to the end.",
        shortDescription:
          "Brand, product, and social video — scripted, shot, and edited to hold attention and drive action.",
        intro:
          "Video is the highest-effort, highest-return content format available when it's done properly. We script, shoot, and edit brand, product, and social video built to hold attention — and to actually move people toward a decision.",
        features: [
          {
            title: "Concept & Scriptwriting",
            description:
              "Clear concepts and scripts built around a single message, so every video earns its watch time.",
          },
          {
            title: "Production & Filming",
            description:
              "Professional filming, whether on location or in-studio, covering brand films, product demos, and social content.",
          },
          {
            title: "Editing & Post-Production",
            description:
              "Pacing, sound, motion graphics, and colour grading that make every video feel genuinely professional.",
          },
          {
            title: "Platform-Specific Cutdowns",
            description:
              "Every shoot repurposed into cuts optimised for YouTube, LinkedIn, Instagram, and paid ad placements.",
          },
        ],
        whoItsFor:
          "Ideal for brands that know video converts but don't have in-house production capability, and for teams wanting to repurpose one shoot across every channel.",
        metaDescription:
          "Brand, product and social video production — scripting, filming and editing — built to hold attention and drive action.",
        imageSrc:
          "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
        imageAlt: "Video production — camera set up for a shoot",
      },
      {
        slug: "digital-guides",
        label: "Digital Guides",
        title: "Guides that build authority, not just PDFs.",
        shortDescription:
          "In-depth guides and ebooks, written and designed to demonstrate genuine expertise and generate leads.",
        intro:
          "A good guide does two jobs at once: it proves you know what you're talking about, and it gives you something worth trading an email address for. We research, write, and design digital guides that do both properly.",
        features: [
          {
            title: "Topic Research & Outlining",
            description:
              "Genuinely useful angles identified through real audience and keyword research, not guesswork.",
          },
          {
            title: "Long-Form Writing",
            description:
              "In-depth, well-structured writing that reads like genuine expertise, not padded filler.",
          },
          {
            title: "Design & Layout",
            description:
              "Professionally designed, on-brand layouts that make guides feel like a premium resource, not a Word document.",
          },
          {
            title: "Gated Distribution Setup",
            description:
              "Landing pages and lead-capture forms set up to turn guide downloads into genuine pipeline.",
          },
        ],
        whoItsFor:
          "Suited to businesses that want to establish category authority and generate leads through genuinely useful, in-depth content.",
        metaDescription:
          "Research, writing and design for in-depth digital guides and ebooks that build authority and generate leads.",
        imageSrc:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
        imageAlt: "Digital guides — designed ebook layout on a screen",
      },
      {
        slug: "slide-decks",
        label: "Slide Decks",
        title: "Decks that win the room.",
        shortDescription:
          "Pitch decks, sales decks, and presentations designed to persuade, not just inform.",
        intro:
          "Most decks lose the room in the first three slides. We design pitch decks, sales decks, and internal presentations built around a clear narrative and genuinely persuasive visual design — so the room stays with you until the ask.",
        features: [
          {
            title: "Narrative & Structure Design",
            description:
              "A clear story arc built before a single slide is designed, so the deck argues its point instead of just listing facts.",
          },
          {
            title: "Custom Slide Design",
            description:
              "On-brand, professionally designed slides that look considered rather than templated.",
          },
          {
            title: "Data Visualisation",
            description:
              "Complex data and figures turned into visuals that communicate the point instantly.",
          },
          {
            title: "Presenter Coaching",
            description:
              "Guidance on delivery and pacing so the person presenting the deck lands it as well as the deck itself.",
          },
        ],
        whoItsFor:
          "Ideal for founders pitching investors, sales teams presenting to enterprise buyers, and leadership teams delivering high-stakes internal presentations.",
        metaDescription:
          "Pitch decks, sales decks and presentation design built around a clear narrative that persuades, not just informs.",
        imageSrc:
          "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
        imageAlt: "Slide decks — presentation design displayed on a laptop",
      },
      {
        slug: "podcasts",
        label: "Podcasts",
        title: "A podcast people actually subscribe to.",
        shortDescription:
          "Strategy, production, and editing for branded podcasts that build genuine audience and authority.",
        intro:
          "A podcast is a long-term authority play, not a marketing stunt. We handle strategy, recording, and editing for branded podcasts — built around a format and guest strategy that keeps people coming back episode after episode.",
        features: [
          {
            title: "Format & Guest Strategy",
            description:
              "A clear show concept and guest pipeline designed around topics your audience genuinely wants to hear.",
          },
          {
            title: "Recording & Audio Production",
            description:
              "Professional recording setup, whether remote or in-studio, with clean, broadcast-quality audio.",
          },
          {
            title: "Editing & Show Notes",
            description:
              "Polished episode editing plus show notes and clips written to support discovery and sharing.",
          },
          {
            title: "Distribution & Promotion",
            description:
              "Episodes published and promoted across every major platform, with clips repurposed for social.",
          },
        ],
        whoItsFor:
          "Great for founders and subject-matter experts who want to build genuine authority and relationships through long-form conversation.",
        metaDescription:
          "Podcast strategy, recording, editing and distribution for brands building genuine authority through audio.",
        imageSrc:
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
        imageAlt: "Podcasts — microphone set up for recording",
      },
      {
        slug: "blogs",
        label: "Blogs",
        title: "Blog content that actually ranks.",
        shortDescription:
          "SEO-informed blog writing that builds organic traffic and demonstrates real expertise, consistently.",
        intro:
          "Most blogs are written, published, and immediately forgotten. We write and manage blog content built around real keyword research and a genuine publishing cadence, so it compounds into organic traffic instead of disappearing into the archive.",
        features: [
          {
            title: "Content Calendar & Keyword Mapping",
            description:
              "A structured publishing calendar mapped to the keywords your customers are actually searching.",
          },
          {
            title: "SEO-Informed Writing",
            description:
              "Well-researched, genuinely useful articles written to satisfy both readers and search engines.",
          },
          {
            title: "On-Brand Editing & Style",
            description:
              "Every article edited to match your brand voice and editorial standards before it goes anywhere near 'publish'.",
          },
          {
            title: "Publishing & Performance Tracking",
            description:
              "Articles published on schedule, with ongoing tracking of traffic and rankings to guide what gets written next.",
          },
        ],
        whoItsFor:
          "Suited to businesses that know content marketing works but don't have the internal bandwidth to research, write, and publish consistently.",
        metaDescription:
          "SEO-informed blog writing and content calendars that build organic traffic and demonstrate genuine expertise.",
        imageSrc:
          "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
        imageAlt: "Blogs — writing content on a laptop",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getService(
  categorySlug: string,
  serviceSlug: string
): { category: Category; service: Service } | undefined {
  const category = getCategory(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  return category && service ? { category, service } : undefined;
}

export function getAllServiceRoutes() {
  return categories.flatMap((c) =>
    c.services.map((s) => ({ category: c.slug, slug: s.slug }))
  );
}

export function getAllCategorySlugs() {
  return categories.map((c) => ({ category: c.slug }));
}
