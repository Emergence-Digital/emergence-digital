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
    tagline: "From attendee to signed deal.",
    description:
      "We turn the leads your digital events generate into tracked, qualified opportunities — segmenting your CRM, following up 1:1, and running the outreach and deal support that stop warm interest from going cold before it becomes revenue.",
    metaDescription:
      "Sales outreach, pipeline generation and CRM support for Melbourne IT and consulting firms turning event leads into a tracked, qualified sales pipeline.",
    services: [
      {
        slug: "outreach-campaigns",
        label: "Outreach Campaigns",
        title: "Follow-up that turns leads into meetings.",
        shortDescription:
          "Post-event 1:1 outreach — calls, emails and LinkedIn messages — that chase down every lead before it goes cold.",
        intro:
          "A great digital event generates interest — but interest fades fast without follow-up. We reach out directly to every attendee and lead with personal calls, emails and LinkedIn messages, so the momentum from your campaign turns into booked conversations, not a list that goes quiet.",
        features: [
          {
            title: "Post-Event Lead Follow-Up",
            description:
              "Every attendee and registrant is contacted directly within days of your event, while your expertise is still front of mind.",
          },
          {
            title: "Multi-Channel Outreach Sequences",
            description:
              "Calls, emails and LinkedIn messages timed and personalised around what someone actually engaged with during your campaign.",
          },
          {
            title: "Warm & Cold List Segmentation",
            description:
              "Existing contacts and newly identified prospects are worked differently, so messaging always matches how well someone already knows you.",
          },
          {
            title: "Reply Handling & Handover",
            description:
              "Every response is triaged and handed to you warm, with full context on what they attended and showed interest in.",
          },
        ],
        whoItsFor:
          "Ideal for IT and consulting firm owners whose events generate genuine interest that then goes quiet, and for founders who don't have the time to personally chase every lead their campaign produces.",
        metaDescription:
          "Post-event outreach campaigns — calls, emails and LinkedIn follow-up — that turn digital event attendees into booked sales conversations.",
        imageSrc:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        imageAlt: "Outreach campaigns — team planning an outbound sequence",
      },
      {
        slug: "pipeline-generation",
        label: "Pipeline Generation",
        title: "A pipeline that starts with every event.",
        shortDescription:
          "CRM segmentation and lead scoring that turns event registrations and attendance into a genuinely qualified pipeline.",
        intro:
          "Not every registrant is a real opportunity, and not every opportunity looks the same. We build the scoring and segmentation that separates genuine mid-market and enterprise interest from casual sign-ups, so your pipeline reflects real, sales-ready demand — not just attendance numbers.",
        features: [
          {
            title: "Event-Based Lead Scoring",
            description:
              "Attendance, engagement and follow-up questions are scored automatically, so your team knows exactly who to prioritise first.",
          },
          {
            title: "CRM Pipeline Architecture",
            description:
              "Clear pipeline stages built around how a lead actually moves from event attendee to opportunity, not a generic template.",
          },
          {
            title: "Nurture Sequencing",
            description:
              "Automated tracks that keep warm-but-not-ready leads engaged until your next campaign gives them a reason to act.",
          },
          {
            title: "Pipeline Reporting",
            description:
              "Monthly visibility into exactly how many qualified opportunities each campaign is generating, and where they're getting stuck.",
          },
        ],
        whoItsFor:
          "Built for firm owners who are generating attention through their events but aren't sure which leads are genuinely worth their sales team's time.",
        metaDescription:
          "Event-driven pipeline generation — lead scoring, CRM architecture and nurture sequencing — for firms turning campaign attendance into qualified opportunities.",
        imageSrc:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        imageAlt: "Pipeline generation — sales team reviewing opportunity pipeline",
      },
      {
        slug: "deal-closure",
        label: "Deal Closure",
        title: "Get more of your pipeline over the line.",
        shortDescription:
          "Proposal frameworks and follow-up support that convert qualified, event-sourced opportunities into signed business.",
        intro:
          "A full pipeline means nothing if deals stall at the finish line. We sharpen the back half of your sales process — proposals, objection handling and follow-up cadence — so more of the opportunities your campaigns generate actually convert into signed clients.",
        features: [
          {
            title: "Proposal & Pricing Frameworks",
            description:
              "Clear, persuasive proposal templates that reference the exact content and event a prospect engaged with, making the next step obvious.",
          },
          {
            title: "Objection Handling Playbooks",
            description:
              "Documented responses to the stalls and questions that come up most often once mid-market and enterprise prospects reach the table.",
          },
          {
            title: "Follow-Up Cadence Design",
            description:
              "Structured, non-pushy sequences that keep deals moving without letting campaign-sourced interest go cold.",
          },
          {
            title: "Negotiation Support",
            description:
              "Hands-on support through larger or more complex negotiations, from scoping through to signature.",
          },
        ],
        whoItsFor:
          "Suited to firm owners whose campaigns are generating real opportunities, but whose close rate on those opportunities is inconsistent.",
        metaDescription:
          "Proposal frameworks, objection handling and negotiation support that help IT and consulting firms close the pipeline their campaigns generate.",
        imageSrc:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
        imageAlt: "Deal closure — handshake following a signed agreement",
      },
      {
        slug: "sales-ops",
        label: "SalesOps",
        title: "The CRM backbone behind every campaign.",
        shortDescription:
          "CRM setup and reporting that keeps event registrations, leads and deals on one clean, trustworthy system.",
        intro:
          "Every campaign only works if the data behind it is trustworthy. We set up and maintain the CRM configuration, segmentation and reporting that connect your digital events straight through to pipeline — so nothing gets lost between registration and revenue.",
        features: [
          {
            title: "CRM Setup & Hygiene",
            description:
              "Clean, correctly configured CRM data and workflows, so every registration and lead lands in the right place automatically.",
          },
          {
            title: "Campaign Reporting & Dashboards",
            description:
              "Live dashboards showing registrations, attendance, pipeline and conversion for every campaign, built for decisions, not vanity metrics.",
          },
          {
            title: "Automation & Deal Creation",
            description:
              "Workflow automation that turns qualified leads into tracked deals without manual data entry after every event.",
          },
          {
            title: "Tooling & Tech Stack Management",
            description:
              "We manage the CRM, email and enrichment tools behind your campaigns, so they work together instead of creating extra admin.",
          },
        ],
        whoItsFor:
          "Ideal for firm owners running (or about to run) regular campaigns who need the CRM and reporting infrastructure to actually keep up with the leads they generate.",
        metaDescription:
          "CRM setup, campaign reporting and deal automation for IT and consulting firms running regular digital-event-led marketing campaigns.",
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
    tagline: "Your expertise, turned into demand.",
    description:
      "We build the monthly digital event — webinar, podcast, workshop, or customer interview — that puts your expertise in front of the right audience, then promote it, repurpose it, and keep it compounding across search and social long after the event ends.",
    metaDescription:
      "Digital event marketing, social promotion, email and SEO for IT and consulting firms building recognised authority in their category.",
    services: [
      {
        slug: "lead-generation",
        label: "Lead Generation",
        title: "Demand, built around your expertise.",
        shortDescription:
          "Campaigns engineered around your monthly digital event to fill your funnel with genuinely qualified prospects.",
        intro:
          "Lead generation works best when it's built around something worth paying attention to. We design campaigns — paid, organic and content-driven — around your digital events, so the people arriving in your funnel already understand your expertise before they ever speak with you.",
        features: [
          {
            title: "Campaign Strategy & Targeting",
            description:
              "Every campaign is built around a specific digital event and audience, not a generic always-on ad account.",
          },
          {
            title: "Landing Page & Registration Design",
            description:
              "High-converting registration pages built to turn interest in your event into a genuine, qualified sign-up.",
          },
          {
            title: "Paid Amplification",
            description:
              "Social and Google ads that extend the reach of your event and repurposed content to net-new prospects (ad spend billed separately).",
          },
          {
            title: "Conversion Rate Optimisation",
            description:
              "Ongoing testing of registration pages and offers to get more qualified leads from the same campaign investment.",
          },
        ],
        whoItsFor:
          "Ideal for firm owners with genuine expertise who aren't yet getting it in front of enough of the right mid-market and enterprise prospects.",
        metaDescription:
          "Digital-event-led lead generation campaigns — paid, organic and landing pages — built to fill your funnel with qualified prospects.",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Lead generation — campaign analytics dashboard",
      },
      {
        slug: "social-media",
        label: "Social Media",
        title: "Social proof that builds before you post.",
        shortDescription:
          "Pre and post-event social content that builds anticipation, drives registrations, and extends every campaign's reach.",
        intro:
          "Posting isn't a strategy, but a campaign calendar is. We plan and publish the social content around every digital event — announcements, teasers, and post-event highlights — so your channels build genuine authority instead of just filling a content calendar.",
        features: [
          {
            title: "Pre-Event Promotion",
            description:
              "Announcement and teaser posts across your brand and personal channels that build real anticipation before registrations open.",
          },
          {
            title: "Event Highlight Clips",
            description:
              "Short-form clips and quotes pulled from your event recording, published in the days after to extend its reach.",
          },
          {
            title: "Brand & SME Channel Management",
            description:
              "Posting managed across both your company page and your own profile, so your personal authority builds alongside your brand's.",
          },
          {
            title: "Performance Reporting",
            description:
              "Reach, engagement and click-through reporting on every post, tied back to registrations and pipeline, not just likes.",
          },
        ],
        whoItsFor:
          "Great for firm owners who know social matters for their reputation but don't have the internal capacity to plan and publish consistently around every campaign.",
        metaDescription:
          "Pre and post-event social media management that builds anticipation, drives registrations and extends every campaign's reach.",
        imageSrc:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
        imageAlt: "Social media — content planning across platforms",
      },
      {
        slug: "events",
        label: "Events",
        title: "Your monthly digital event, built and run for you.",
        shortDescription:
          "Webinars, podcasts, workshops or customer interviews — built around your expertise and delivered every month, without adding to your workload.",
        intro:
          "One consistent, well-run digital event does more for your reputation than a dozen scattered posts. We build and run your monthly webinar, podcast, workshop, or customer interview end-to-end — content, structure and delivery — in whichever format suits how you actually communicate best.",
        features: [
          {
            title: "Monthly Strategy & Campaign Roadmap",
            description:
              "A single working session each month extracts your expertise and direction, and ties every other asset back to it.",
          },
          {
            title: "Event Build & Facilitation",
            description:
              "We write, structure and run your event each month — you bring the expertise, we handle everything else.",
          },
          {
            title: "Your Choice of Format",
            description:
              "Webinar, podcast, workshop, customer interview or video series — whichever format suits your audience and how you present best.",
          },
          {
            title: "Registration Page & On-Demand Hosting",
            description:
              "A landing page to capture sign-ups, plus on-demand viewing after the event so it keeps generating leads.",
          },
        ],
        whoItsFor:
          "Suited to IT, MSP, ERP-partner and consulting firm owners who have genuine expertise to share but no time or internal capability to turn it into a consistent event, month after month.",
        metaDescription:
          "Monthly digital events — webinars, podcasts, workshops and customer interviews — built and run end-to-end for IT and consulting firm owners.",
        imageSrc:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        imageAlt: "Events — audience at a business conference",
      },
      {
        slug: "edms",
        label: "eDMs",
        title: "Email that fills the room before it starts.",
        shortDescription:
          "Registration and nurture email sequences that drive attendance to your events and keep leads warm afterwards.",
        intro:
          "An event is only as good as the turnout. We write and send the email sequences that build awareness before your event, drive registrations as it approaches, and nurture attendees and leads afterwards — so your list becomes a genuine growth channel, not just an announcement list.",
        features: [
          {
            title: "Registration & Teaser Sequences",
            description:
              "Announcement and reminder emails that build anticipation and drive sign-ups in the lead-up to every event.",
          },
          {
            title: "Post-Event Nurture",
            description:
              "Follow-up sequences to attendees and no-shows alike, sharing the recording and keeping your expertise front of mind.",
          },
          {
            title: "List Segmentation",
            description:
              "Warm contacts and newly sourced prospects are messaged differently, so every send feels relevant to the person receiving it.",
          },
          {
            title: "Deliverability & Performance Reporting",
            description:
              "Technical setup and open/click reporting that keeps your sends out of spam and continuously improving.",
          },
        ],
        whoItsFor:
          "Ideal for firm owners with an existing contact list that isn't being used to drive event attendance or nurture leads between campaigns.",
        metaDescription:
          "Registration and nurture email campaigns that drive attendance to your digital events and keep leads warm between campaigns.",
        imageSrc:
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
        imageAlt: "eDMs — email newsletter campaign on a laptop screen",
      },
      {
        slug: "seo",
        label: "SEO",
        title: "Found first, long after the event ends.",
        shortDescription:
          "On-page and content SEO that turns your repurposed event content into compounding organic visibility.",
        intro:
          "A digital event creates a burst of attention — good SEO makes sure that attention keeps paying off. We optimise the guides, articles and pages built from every campaign so they keep ranking for the searches your ideal clients are actually making, long after the event itself is over.",
        features: [
          {
            title: "Technical & On-Page Optimisation",
            description:
              "Every piece of repurposed campaign content — guides, blogs, landing pages — is structured and optimised to rank, not just publish.",
          },
          {
            title: "Keyword & Topic Mapping",
            description:
              "Campaign themes are mapped against real search terms your ideal clients use, so content compounds instead of competing with itself.",
          },
          {
            title: "Content Compounding Strategy",
            description:
              "Each campaign's content is linked and structured to build on the last, so your organic footprint grows with every event.",
          },
          {
            title: "Authority & Link Building",
            description:
              "Ethical link building and digital PR that builds genuine domain authority around the categories you want to be known for.",
          },
        ],
        whoItsFor:
          "Built for firm owners who want their digital events and repurposed content to keep generating traffic and leads well after the live date.",
        metaDescription:
          "SEO for digital-event-led content — on-page optimisation and authority building that keeps campaign content ranking long-term.",
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
    tagline: "The infrastructure behind every campaign.",
    description:
      "The technical backbone behind your campaigns — registration pages that convert, CRM systems that talk to your marketing, and the automation and AI that turn a monthly event into a repeatable, low-effort growth engine.",
    metaDescription:
      "Web design, CRM administration, automation and AI infrastructure that powers digital-event-led marketing campaigns for IT and consulting firms.",
    services: [
      {
        slug: "web-design",
        label: "Web Design",
        title: "Pages built to convert, not just exist.",
        shortDescription:
          "Registration pages, on-demand hosting and guide pages purpose-built to turn campaign traffic into genuine sign-ups.",
        intro:
          "Every campaign lives or dies on its pages. We design and build the registration pages, on-demand hosting and digital guide pages that turn your event's traffic into sign-ups and leads — fast, on-brand, and built to convert rather than just look good.",
        features: [
          {
            title: "Event Registration Pages",
            description:
              "Purpose-built landing pages that make signing up to your event fast, clear and genuinely appealing.",
          },
          {
            title: "On-Demand & Guide Hosting",
            description:
              "Post-event recording pages and digital guide pages that keep generating registrations and leads long after the live date.",
          },
          {
            title: "Bespoke Site Design",
            description:
              "Your core website designed and built around your actual positioning, not a template that looks like everyone else's.",
          },
          {
            title: "CMS Integration",
            description:
              "Content management set up so your team can update campaign pages and content without touching code.",
          },
        ],
        whoItsFor:
          "Perfect for firm owners whose current site doesn't reflect the calibre of client they're trying to attract through their campaigns.",
        metaDescription:
          "Registration pages, on-demand hosting and bespoke web design built to convert campaign traffic into genuine leads.",
        imageSrc:
          "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        imageAlt: "Web design — clean modern interface on a screen",
      },
      {
        slug: "app-development",
        label: "App Development",
        title: "A lead-in offer worth signing up for.",
        shortDescription:
          "Simple, custom-built tools and mini-assessments that give prospects a reason to engage before they're ready to buy.",
        intro:
          "The best campaigns pair a great event with something practical prospects can act on immediately. We design and build low-cost, low-effort lead-in tools — assessments, calculators, and mini-apps — that give your audience genuine value while capturing exactly the leads your event and content are attracting.",
        features: [
          {
            title: "Lead-In Tool Strategy",
            description:
              "We identify a simple, valuable tool your audience would genuinely want, tied directly to your campaign theme.",
          },
          {
            title: "Custom Assessment & Calculator Builds",
            description:
              "Mini-assessments, calculators and interactive tools built to be easy to complete and genuinely useful, not a disguised form.",
          },
          {
            title: "Web & Mobile App Development",
            description:
              "For bigger product ideas beyond a single campaign, we build the full custom web or mobile application behind them.",
          },
          {
            title: "Ongoing Support & Iteration",
            description:
              "We don't disappear after launch — tools are maintained and improved as your campaigns and audience evolve.",
          },
        ],
        whoItsFor:
          "Suited to firm owners who want a practical, low-cost entry point alongside their content, and to businesses with a bigger custom product idea to build properly.",
        metaDescription:
          "Custom lead-in tools, assessments and app development that give campaign prospects a reason to engage before they buy.",
        imageSrc:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
        imageAlt: "App development — abstract code and technology",
      },
      {
        slug: "crm-administration",
        label: "CRM Administration",
        title: "A CRM that keeps up with your campaigns.",
        shortDescription:
          "Setup and administration that connects event registrations, leads and deals into one system your team trusts.",
        intro:
          "A misconfigured CRM undermines every campaign built on top of it. We set up, clean and administer platforms like HubSpot and Salesforce so registrations, attendance and follow-up all land in one trustworthy system — instead of scattered spreadsheets nobody quite trusts.",
        features: [
          {
            title: "Platform Setup & Migration",
            description:
              "Clean implementation or migration onto HubSpot or Salesforce, configured specifically around how your campaigns generate and move leads.",
          },
          {
            title: "Custom Fields, Pipelines & Automation",
            description:
              "Pipeline stages and automation built around event registration, attendance and follow-up, not generic sales defaults.",
          },
          {
            title: "Data Cleansing & Deduplication",
            description:
              "Ongoing hygiene so duplicate registrants and stale leads don't undermine trust in your campaign reporting.",
          },
          {
            title: "User Training & Adoption",
            description:
              "Practical training that gets your team actually using the CRM to follow up on campaign leads, not just storing them.",
          },
        ],
        whoItsFor:
          "Ideal for firm owners whose CRM has become unreliable, and for anyone setting one up for the first time who wants it built around how their campaigns actually work.",
        metaDescription:
          "HubSpot and Salesforce setup and administration built around digital-event-led campaigns, so registrations and leads land in one trusted system.",
        imageSrc:
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80",
        imageAlt: "CRM administration — sales dashboard on a laptop screen",
      },
      {
        slug: "agentic-ai",
        label: "Agentic AI",
        title: "AI that keeps your campaign engine running.",
        shortDescription:
          "Custom AI agents that handle the repetitive work behind every campaign — research, lead scoring, and follow-up drafting.",
        intro:
          "Running a monthly campaign generates a lot of repetitive work behind the scenes. We build agentic AI systems that handle real tasks — research for your next event, scoring incoming leads, and drafting first-pass follow-ups — wired safely into the tools your campaign already runs on.",
        features: [
          {
            title: "Agent Strategy & Use Case Scoping",
            description:
              "We identify where an agent will genuinely save time in your campaign workflow, not just produce a demo.",
          },
          {
            title: "Custom Agent Development",
            description:
              "Purpose-built agents connected to your CRM, content and research tools, built to operate reliably within clear limits.",
          },
          {
            title: "Human-in-the-Loop Safeguards",
            description:
              "Approval steps and monitoring so agents support your campaign team without unchecked risk to client-facing work.",
          },
          {
            title: "Integration & Deployment",
            description:
              "Agents wired directly into the CRM and content tools your campaigns already use, so there's no new workflow to learn.",
          },
        ],
        whoItsFor:
          "Suited to firm owners running (or scaling) regular campaigns who want the repetitive research, scoring and drafting work handled without adding headcount.",
        metaDescription:
          "Agentic AI systems that handle research, lead scoring and follow-up drafting behind digital-event-led marketing campaigns.",
        imageSrc:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        imageAlt: "Agentic AI — abstract technology and automation visualisation",
      },
      {
        slug: "automation",
        label: "Automation",
        title: "Less admin, more campaigns that run themselves.",
        shortDescription:
          "Workflow automation that connects registration, follow-up, and reporting so your campaign engine runs without manual admin.",
        intro:
          "A great campaign shouldn't need a spreadsheet and three manual steps behind it. We map and automate the workflows connecting registration, CRM updates, follow-up sequences and reporting, so your monthly campaign runs consistently without you or your team chasing admin.",
        features: [
          {
            title: "Process Mapping & Audit",
            description:
              "We map exactly how a lead moves from registration to opportunity today, and find where manual steps are costing time.",
          },
          {
            title: "No-Code & Custom Automation",
            description:
              "From Zapier and Make to fully custom pipelines, connecting your registration pages, CRM and email tools automatically.",
          },
          {
            title: "Reporting Automation",
            description:
              "Campaign performance reporting generated automatically each month, instead of manually pulled together before every check-in call.",
          },
          {
            title: "Monitoring & Maintenance",
            description:
              "Ongoing monitoring and maintenance so your campaign automation keeps running reliably as tools and volume change.",
          },
        ],
        whoItsFor:
          "Best suited to firm owners scaling their campaign cadence who want the operational backbone to keep up without proportionally more admin.",
        metaDescription:
          "Workflow automation connecting registration, CRM and reporting so digital-event-led marketing campaigns run without manual admin.",
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
    tagline: "One event, repurposed everywhere.",
    description:
      "Every digital event becomes a full library of content — a cornerstone guide, an article series, social clips, and a slide deck — so one conversation with you turns into weeks of proof that you know your category.",
    metaDescription:
      "Digital guides, blogs, video and podcast content repurposed from your monthly digital event, for IT and consulting firms building authority.",
    services: [
      {
        slug: "video",
        label: "Video",
        title: "One recording, a month of content.",
        shortDescription:
          "Your event recording, cut into highlights and clips built to hold attention across every social channel.",
        intro:
          "Every digital event is also a video shoot. We take the recording from your webinar, workshop or customer interview and edit it into highlight clips and platform-specific cutdowns — so one session becomes weeks of content across LinkedIn, YouTube and social.",
        features: [
          {
            title: "Event Recording & Capture",
            description:
              "Your webinar, workshop or interview recorded and captured to a standard worth repurposing, not just an archived Zoom call.",
          },
          {
            title: "Highlight & Clip Editing",
            description:
              "The best moments from every event cut into short, sharable clips built to stop the scroll.",
          },
          {
            title: "Platform-Specific Cutdowns",
            description:
              "Clips edited and formatted for LinkedIn, YouTube and social specifically, not one video resized to fit everywhere.",
          },
          {
            title: "On-Demand Full Recording",
            description:
              "The full session edited and hosted for on-demand viewing, so late registrants still get the full value.",
          },
        ],
        whoItsFor:
          "Ideal for firm owners who know video builds credibility but don't have the in-house capability to shoot and edit it consistently.",
        metaDescription:
          "Event recording, highlight editing and platform-specific video cutdowns built from your monthly digital event.",
        imageSrc:
          "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
        imageAlt: "Video production — camera set up for a shoot",
      },
      {
        slug: "digital-guides",
        label: "Digital Guides",
        title: "The cornerstone guide every campaign is built on.",
        shortDescription:
          "A practical, in-depth guide built from your event content — proof of expertise, and a genuine lead magnet.",
        intro:
          "Every campaign needs one piece of content everything else points back to. We turn your digital event into a cornerstone guide — researched, written and designed to prove genuine expertise and give prospects a reason to hand over their details.",
        features: [
          {
            title: "Event-to-Guide Development",
            description:
              "Your event recording and discussion turned into a structured, in-depth guide, not a generic template filled in around your name.",
          },
          {
            title: "Supporting Research",
            description:
              "Independent data and research added to back up your point of view and strengthen your credibility further.",
          },
          {
            title: "Design & Layout",
            description:
              "Professionally designed, on-brand layouts that feel like a premium resource worth downloading, not a Word document.",
          },
          {
            title: "Gated Distribution Setup",
            description:
              "Landing pages and lead-capture forms built so every guide download becomes a tracked, genuine lead.",
          },
        ],
        whoItsFor:
          "Suited to firm owners who want a lasting, high-value asset from every event, not just a recording that gets watched once and forgotten.",
        metaDescription:
          "Cornerstone guides built from your digital event content — genuine proof of expertise and a real lead magnet.",
        imageSrc:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
        imageAlt: "Digital guides — designed ebook layout on a screen",
      },
      {
        slug: "slide-decks",
        label: "Slide Decks",
        title: "The deck behind every event, built to persuade.",
        shortDescription:
          "Presentation decks and speaker notes for your digital event, built around a clear narrative from your strategy call.",
        intro:
          "Every digital event needs a deck that carries the room, whether it's a live audience or a webinar screen. We design the presentation and write the speaker notes for your event, built directly from your monthly strategy call so it sounds like your point of view, not a generic template.",
        features: [
          {
            title: "Narrative & Structure Design",
            description:
              "A clear story arc built from your strategy call, so the deck argues your point instead of just listing slides.",
          },
          {
            title: "Custom Slide Design",
            description:
              "On-brand, professionally designed slides that look considered and match the calibre of client you're trying to attract.",
          },
          {
            title: "Speaker Notes",
            description:
              "Full speaker notes written so delivering the event feels natural, even if presenting isn't something you do every day.",
          },
          {
            title: "Reuse Across Formats",
            description:
              "The same deck restructured to support whichever event format you choose — webinar, workshop or in-person session.",
          },
        ],
        whoItsFor:
          "Ideal for firm owners who have the expertise but not the time or inclination to build a presentation from scratch every month.",
        metaDescription:
          "Presentation decks and speaker notes built from your monthly strategy call, designed to carry your digital event.",
        imageSrc:
          "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
        imageAlt: "Slide decks — presentation design displayed on a laptop",
      },
      {
        slug: "podcasts",
        label: "Podcasts",
        title: "A podcast format that builds real authority.",
        shortDescription:
          "One of the formats your monthly digital event can take — recorded, edited and distributed as a genuine authority play.",
        intro:
          "Some expertise comes across better in conversation than on a slide. When podcast is the right format for your monthly event, we handle strategy, recording and editing — built around a guest and topic approach that keeps your audience coming back episode after episode.",
        features: [
          {
            title: "Format & Guest Strategy",
            description:
              "A show concept and guest pipeline designed around the topics your ideal clients genuinely want to hear discussed.",
          },
          {
            title: "Recording & Audio Production",
            description:
              "Professional recording, remote or in-studio, with clean, broadcast-quality audio for every episode.",
          },
          {
            title: "Editing & Show Notes",
            description:
              "Polished editing plus show notes and clips written to support discovery and sharing after release.",
          },
          {
            title: "Distribution & Repurposing",
            description:
              "Episodes published across major platforms, with clips and quotes feeding back into your social and content plan.",
          },
        ],
        whoItsFor:
          "Great for firm owners and subject-matter experts who communicate best in long-form conversation rather than a scripted presentation.",
        metaDescription:
          "Podcast strategy, recording and editing as a digital event format, for firms building authority through long-form conversation.",
        imageSrc:
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
        imageAlt: "Podcasts — microphone set up for recording",
      },
      {
        slug: "blogs",
        label: "Blogs",
        title: "The article series every event leaves behind.",
        shortDescription:
          "A run of blog articles drawn from your event recording, published to build organic reach long after the event.",
        intro:
          "One good conversation contains more than one article's worth of insight. We draw a full series of blog articles out of every event recording, written to satisfy both readers and search engines, so your organic reach keeps compounding between campaigns.",
        features: [
          {
            title: "Event-to-Article Extraction",
            description:
              "Your event recording mined for distinct angles and insights, each developed into its own standalone article.",
          },
          {
            title: "SEO-Informed Writing",
            description:
              "Articles written around the keywords your ideal clients are actually searching, not just topics that sound good.",
          },
          {
            title: "On-Brand Editing & Style",
            description:
              "Every article edited to match your voice and standards before it goes anywhere near 'publish'.",
          },
          {
            title: "Publishing & Performance Tracking",
            description:
              "Articles published on a steady cadence, with tracking on traffic and rankings to inform your next campaign topic.",
          },
        ],
        whoItsFor:
          "Suited to firm owners who know content marketing compounds but don't have the internal bandwidth to write and publish consistently between events.",
        metaDescription:
          "Blog article series drawn from your digital event recordings, written to build organic reach between campaigns.",
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
