// The services library on /services: one flat list of cards, filtered by the visitor's goal.
//
// Card copy (title + outcome) matches the `services` theme on the card library board
// (~/Adobe MCPs/centurion-cards/board, items svc-<slug>). Each card's scene is
// public/services/<slug>.webp: a 5:3 export on the yellowy cream plate, the same slug the
// board uses for scenes/service-<slug>.png.
//
// Card copy states the client outcome only, never the tactic or deliverable. The pop-up
// (intro, features, who it's for) is where the detail lives.

export const goals = [
  { slug: "win-bigger-accounts", label: "Win bigger accounts" },
  { slug: "more-website-leads", label: "Get more leads from our website" },
  { slug: "stand-out", label: "Stand out from the big firms" },
  { slug: "close-more", label: "Close more of what we already have" },
] as const;

export type GoalSlug = (typeof goals)[number]["slug"];

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  outcome: string;
  goals: GoalSlug[];
  intro: string;
  features: ServiceFeature[];
  whoItsFor: string;
}

export const services: Service[] = [
  {
    slug: "icp-profiling",
    title: "Account planning & ICP profiling",
    outcome: "Your team knows which accounts to chase, and who signs inside them.",
    goals: ["win-bigger-accounts"],
    intro:
      "Bigger clients are won by picking the right ones early. We work out which mid-market and enterprise accounts fit what you do best, then map the people inside each one who influence, approve and sign, so your team spends its time on deals it can actually win.",
    features: [
      {
        title: "Ideal client profile",
        description:
          "A clear picture of the accounts you win and keep, built from your best existing clients rather than guesswork.",
      },
      {
        title: "Target account list",
        description: "A ranked list of named accounts that match your profile, ready for sales and marketing to work.",
      },
      {
        title: "Buying committee maps",
        description:
          "The decision-makers, budget holders and champions inside each priority account, and what each of them cares about.",
      },
      {
        title: "Account plans",
        description: "A short plan for each top account covering the way in, the first conversation and the proof that will land.",
      },
    ],
    whoItsFor:
      "Suited to IT, MSP, ERP and software firm owners who want bigger clients but are still chasing whoever comes along, or whose sales team works a list nobody has prioritised.",
  },
  {
    slug: "crm-admin",
    title: "CRM administration",
    outcome: "Every lead and deal lives in one place, and nothing slips.",
    goals: ["close-more"],
    intro:
      "A misconfigured CRM undermines everything built on top of it. We set up, clean and administer platforms like HubSpot and Salesforce so every lead, conversation and deal lands in one system your team trusts, instead of scattered spreadsheets nobody quite believes.",
    features: [
      {
        title: "Platform setup & migration",
        description:
          "Clean implementation or migration onto HubSpot or Salesforce, configured around how your leads actually arrive and move.",
      },
      {
        title: "Pipelines & automation",
        description: "Pipeline stages, fields and automation built around your sales process, not generic defaults.",
      },
      {
        title: "Data cleansing & deduplication",
        description: "Ongoing hygiene so duplicates and stale records don't undermine trust in your reporting.",
      },
      {
        title: "User training & adoption",
        description: "Practical training that gets your team using the CRM to follow up, not just to store contacts.",
      },
    ],
    whoItsFor:
      "Ideal for firm owners whose CRM has become unreliable, and for anyone setting one up for the first time who wants it built around how they actually sell.",
  },
  {
    slug: "sales-navigator",
    title: "LinkedIn Sales Navigator strategy",
    outcome: "Your sales time goes on the accounts most likely to buy.",
    goals: ["win-bigger-accounts"],
    intro:
      "Sales Navigator can find almost anyone, which is the problem. We set it up around your target accounts and buying committees, so your team sees the right decision-makers, hears when something changes inside an account, and reaches out when it matters.",
    features: [
      {
        title: "Account & lead lists",
        description: "Saved lists of your target accounts and the decision-makers inside them, built from your ideal client profile.",
      },
      {
        title: "Alerts that matter",
        description:
          "Job changes, new hires and company news on the accounts you care about, filtered so the signal isn't buried.",
      },
      {
        title: "Profile & connection plan",
        description: "Your team's LinkedIn profiles tightened up, and a steady plan for connecting with the people on your lists.",
      },
      {
        title: "Weekly working rhythm",
        description: "A simple routine your team can keep, so Sales Navigator gets used every week rather than paid for and forgotten.",
      },
    ],
    whoItsFor:
      "Built for firms that already pay for Sales Navigator but don't get much from it, and for founders who do the selling themselves and need that time to count.",
  },
  {
    slug: "email-cadences",
    title: "Email cadences",
    outcome: "Cold accounts turn into first meetings.",
    goals: ["win-bigger-accounts"],
    intro:
      "Getting a first meeting with a bigger account takes more than one email. We write and run multi-touch cadences across email, LinkedIn and phone, timed and personalised around each account, so cold prospects become conversations instead of an unanswered inbox.",
    features: [
      {
        title: "Cadence design",
        description: "Sequences of emails, LinkedIn touches and call prompts, spaced so you stay visible without wearing out your welcome.",
      },
      {
        title: "Account-level personalisation",
        description: "Messages that speak to each account's situation and industry, written in your voice rather than a template's.",
      },
      {
        title: "List segmentation",
        description:
          "Warm contacts and new prospects are messaged differently, so every send feels relevant to the person receiving it.",
      },
      {
        title: "Deliverability & reply handling",
        description: "Technical setup that keeps your sends out of spam, and every reply triaged and handed to you warm.",
      },
    ],
    whoItsFor:
      "Ideal for firm owners who know which accounts they want but can't get the first meeting, or who don't have time to personally chase every prospect.",
  },
  {
    slug: "social-media",
    title: "Social media management",
    outcome: "Buyers know your name before you reach out.",
    goals: ["win-bigger-accounts"],
    intro:
      "Posting isn't a strategy, but a plan is. We plan and publish content across your company page and your own profile, so the decision-makers you want to win see your thinking week after week and recognise your name when you get in touch.",
    features: [
      {
        title: "Content plan",
        description: "A monthly calendar built around the topics your buyers care about and the accounts you're targeting.",
      },
      {
        title: "Brand & founder channels",
        description:
          "Posting managed across both your company page and your own profile, so your personal authority builds alongside your brand's.",
      },
      {
        title: "Clips & highlights",
        description:
          "Short clips, quotes and graphics drawn from your events, videos and guides, so good material gets seen more than once.",
      },
      {
        title: "Performance reporting",
        description: "Reach, engagement and profile view reporting tied back to enquiries and pipeline, not just likes.",
      },
    ],
    whoItsFor:
      "Great for firm owners who know social matters for their reputation but don't have the internal capacity to plan and publish consistently.",
  },
  {
    slug: "website-design",
    title: "Website design",
    outcome: "Your site looks as big as the clients you want to win.",
    goals: ["more-website-leads", "stand-out"],
    intro:
      "Bigger buyers check your website before they take your call. We design and build sites around your actual positioning, fast and on-brand, with pages built to turn visitors into enquiries rather than just look good.",
    features: [
      {
        title: "Bespoke site design",
        description: "Your website designed and built around your positioning, not a template that looks like everyone else's.",
      },
      {
        title: "Pages built to convert",
        description: "Service, landing and enquiry pages that make the next step obvious for the buyer reading them.",
      },
      {
        title: "Speed & search foundations",
        description: "Fast, mobile-friendly pages with the technical groundwork search engines expect.",
      },
      {
        title: "CMS integration",
        description: "Content management set up so your team can update pages without touching code.",
      },
    ],
    whoItsFor:
      "Perfect for firm owners whose current site doesn't reflect the calibre of client they're trying to attract.",
  },
  {
    slug: "lead-magnets",
    title: "Lead magnets",
    outcome: "Website visitors become named leads you can follow up.",
    goals: ["more-website-leads"],
    intro:
      "Most people who visit your site leave without saying who they are. We create practical resources worth swapping an email address for, so anonymous visitors become named leads your team can follow up.",
    features: [
      {
        title: "Offer strategy",
        description: "A resource your buyers would actually want, tied to the problem they're trying to solve when they find you.",
      },
      {
        title: "Checklists, templates & assessments",
        description: "Written and designed to be useful in their own right, not a disguised sales pitch.",
      },
      {
        title: "Download pages & forms",
        description: "Landing pages and short forms that make the swap easy and send every lead straight into your CRM.",
      },
      {
        title: "Instant follow-up",
        description: "An automatic follow-up that delivers the resource and starts the conversation while interest is fresh.",
      },
    ],
    whoItsFor:
      "Suited to firms getting steady website traffic but few enquiries, and to anyone who wants a low-pressure first step for buyers who aren't ready to talk yet.",
  },
  {
    slug: "funnel-automation",
    title: "Funnel automation",
    outcome: "Every enquiry gets a fast reply and a clear next step.",
    goals: ["more-website-leads"],
    intro:
      "A good enquiry shouldn't sit in an inbox waiting for someone to notice it. We map and automate the steps between a form being filled in and a call being booked, connecting your website, CRM and calendar, so every lead hears back fast and nobody on your team is chasing admin.",
    features: [
      {
        title: "Process mapping & audit",
        description:
          "We map how a lead moves from enquiry to booked call today, and find where manual steps cost time or lose people.",
      },
      {
        title: "Instant replies & booking",
        description: "Automatic responses, reminders and calendar booking, so buyers get an answer in minutes instead of days.",
      },
      {
        title: "No-code & custom automation",
        description: "From Zapier and Make to fully custom flows, connecting your website, CRM and email tools.",
      },
      {
        title: "Monitoring & maintenance",
        description: "Ongoing checks so your automation keeps running reliably as tools and volumes change.",
      },
    ],
    whoItsFor:
      "Best suited to firm owners who lose leads to slow follow-up, or whose team spends hours each week on admin a system could handle.",
  },
  {
    slug: "digital-guides",
    title: "Digital guides",
    outcome: "Buyers trust your thinking before the first call.",
    goals: ["more-website-leads", "stand-out"],
    intro:
      "Bigger buyers do their homework before they talk to anyone. We turn your expertise into an in-depth guide, researched, written and designed to show how you think, so prospects arrive already trusting your approach and have a reason to hand over their details.",
    features: [
      {
        title: "Expertise-to-guide development",
        description:
          "Your knowledge drawn out in a working session and turned into a structured, in-depth guide, not a generic template with your name on it.",
      },
      {
        title: "Supporting research",
        description: "Independent data and research that backs up your point of view and strengthens your credibility.",
      },
      {
        title: "Design & layout",
        description:
          "Professionally designed, on-brand layouts that feel like a premium resource worth downloading, not a Word document.",
      },
      {
        title: "Gated distribution",
        description: "Landing pages and lead-capture forms built so every download becomes a tracked lead.",
      },
    ],
    whoItsFor:
      "Suited to firm owners who want a lasting asset that keeps proving their expertise long after it's published.",
  },
  {
    slug: "graphic-design",
    title: "Graphic design",
    outcome: "Everything you send looks like it came from a firm twice your size.",
    goals: ["stand-out"],
    intro:
      "Buyers judge a firm by what lands in their inbox. We give your brand a consistent look and apply it to everything you put in front of prospects, so a small team looks every bit as established as the big names.",
    features: [
      {
        title: "Brand kit",
        description:
          "Colours, type, logo lock-ups and layout rules pulled together, so everything you make looks like it comes from the same firm.",
      },
      {
        title: "Sales collateral",
        description: "Capability statements, one-pagers and proposal covers designed to hold up next to anything the big firms send.",
      },
      {
        title: "Social & campaign graphics",
        description: "Graphics for posts, events and ads that look considered rather than thrown together.",
      },
      {
        title: "Templates your team can use",
        description: "Editable templates so your team can produce on-brand material without waiting on a designer.",
      },
    ],
    whoItsFor:
      "Ideal for firms whose work is better than their materials suggest, and for teams producing their own documents with no designer to keep them consistent.",
  },
  {
    slug: "video-production",
    title: "Video production",
    outcome: "Buyers hear from your experts without booking a meeting.",
    goals: ["stand-out"],
    intro:
      "Video lets buyers see how your people think before they ever meet them. We plan, record and edit videos with your experts, from explainers and customer stories to clips from your events, so prospects get to know your team on their own time.",
    features: [
      {
        title: "Planning & scripting",
        description: "Topics and outlines built around the questions your buyers ask, so every video earns its place.",
      },
      {
        title: "Recording & capture",
        description: "Remote or in-person recording captured to a standard worth sharing, not an archived Zoom call.",
      },
      {
        title: "Highlight & clip editing",
        description: "The best moments cut into short, shareable clips built to stop the scroll.",
      },
      {
        title: "Platform-specific cutdowns",
        description: "Videos edited and formatted for LinkedIn, YouTube and your website, not one video resized to fit everywhere.",
      },
    ],
    whoItsFor:
      "Ideal for firm owners who know video builds credibility but don't have the in-house capability to shoot and edit it consistently.",
  },
  {
    slug: "online-workshops",
    title: "Online workshops",
    outcome: "Prospects get a taste of working with you before they sign.",
    goals: ["stand-out"],
    intro:
      "A workshop shows prospects what it's like to work with you, not just what you know. We design and run hands-on online sessions around a real problem your buyers face, so attendees leave with something useful and a clear sense of how your team works.",
    features: [
      {
        title: "Workshop design",
        description: "A practical session built around one problem your buyers want solved, with exercises they can apply straight away.",
      },
      {
        title: "Build & facilitation",
        description: "We structure and run the session with you. You bring the expertise, we handle everything else.",
      },
      {
        title: "Worksheets & materials",
        description: "Worksheets and slides that keep attendees working along and give them something to take back to their team.",
      },
      {
        title: "Registration & follow-up",
        description: "A sign-up page, reminders and follow-up for attendees and no-shows, so every seat can become a conversation.",
      },
    ],
    whoItsFor:
      "Suited to firm owners whose expertise is easier to show than explain, and who want prospects to experience their approach before committing.",
  },
  {
    slug: "webinars",
    title: "Webinars",
    outcome: "Your experts get in front of a room full of decision-makers.",
    goals: ["win-bigger-accounts"],
    intro:
      "One well-run webinar does more for your reputation than a dozen scattered posts. We build and run webinars end to end, from topic and speakers to promotion and the recording, so your experts speak to the decision-makers you want to win without adding to your workload.",
    features: [
      {
        title: "Topic & speaker plan",
        description: "A topic your target accounts care about, with your experts and, where it helps, a client or partner on the panel.",
      },
      {
        title: "Event build & facilitation",
        description: "We write, structure and run the webinar. You bring the expertise, we handle everything else.",
      },
      {
        title: "Registration page & promotion",
        description: "A landing page to capture sign-ups, plus email and social promotion aimed at your target accounts.",
      },
      {
        title: "On-demand hosting",
        description: "The recording hosted after the event, so it keeps generating registrations and leads.",
      },
    ],
    whoItsFor:
      "Suited to IT, MSP, ERP-partner and software firm owners who have expertise to share but no time or internal capability to turn it into a consistent event.",
  },
  {
    slug: "case-studies",
    title: "Case studies & testimonials",
    outcome: "Your best client results do the selling for you.",
    goals: ["stand-out", "close-more"],
    intro:
      "Nothing reassures a bigger buyer like a client who looks like them saying it worked. We interview your clients, write up the results and collect testimonials, then shape them for your website, proposals and sales conversations, so proof is ready whenever a prospect needs it.",
    features: [
      {
        title: "Client interviews",
        description: "Short, relaxed conversations with your clients that draw out the problem, the work and the result in their words.",
      },
      {
        title: "Written case studies",
        description: "Clear, readable stories built around real results, approved by the client before anything goes live.",
      },
      {
        title: "Testimonial collection",
        description: "A simple process for asking happy clients for reviews and quotes at the right moment.",
      },
      {
        title: "Formats for every stage",
        description:
          "Website pages, one-page PDFs, slides and social posts cut from the same story, so sales always has the right proof to hand.",
      },
    ],
    whoItsFor: "Great for firms with happy clients and strong results that nobody outside the business has heard about.",
  },
  {
    slug: "nurture",
    title: "Nurture sequences",
    outcome: "Leads who aren't ready yet think of you when they are.",
    goals: ["close-more"],
    intro:
      "Most leads aren't ready to buy the day they find you. We write and send email sequences that keep your expertise in front of them over months, not days, so your contact list becomes a source of pipeline rather than a list that goes quiet.",
    features: [
      {
        title: "Long-term nurture tracks",
        description:
          "Emails that share useful thinking, proof and invitations over several months, timed so you stay visible without being pushy.",
      },
      {
        title: "Post-event follow-up",
        description: "Follow-up to attendees and no-shows alike, sharing the recording and keeping your expertise front of mind.",
      },
      {
        title: "Segments that fit",
        description: "Leads grouped by industry, interest and stage, so each one reads something relevant to them.",
      },
      {
        title: "Deliverability & reporting",
        description: "Technical setup and open and click reporting that keeps your sends out of spam and improving over time.",
      },
    ],
    whoItsFor:
      "Ideal for firm owners with a contact list that isn't being used, or whose leads go cold between the first enquiry and the moment they're ready to buy.",
  },
  {
    slug: "buying-signals",
    title: "Buying signal mapping",
    outcome: "Your team knows who's warming up, and calls at the right time.",
    goals: ["close-more"],
    intro:
      "Buyers leave clues long before they ask for a quote. We pull those clues together, from pricing page visits and proposal opens to downloads and event attendance, and turn them into alerts, so your team calls while interest is high.",
    features: [
      {
        title: "Signal plan",
        description: "We agree which actions show real buying intent for your firm, and how much each one should count.",
      },
      {
        title: "Tracking setup",
        description: "Website, email and content tracking connected to your CRM, so activity is tied to real people and accounts.",
      },
      {
        title: "Lead scoring",
        description: "Activity scored automatically, so your team knows exactly who to prioritise first.",
      },
      {
        title: "Sales alerts",
        description: "A prompt to the right person when an account heats up, with the context they need for the call.",
      },
    ],
    whoItsFor:
      "Built for firms with plenty of contacts and not enough time to call them all, who want to know which ones are worth calling this week.",
  },
  {
    slug: "pipeline-modelling",
    title: "Pipeline modelling",
    outcome: "You know how many meetings it takes to hit your revenue target.",
    goals: ["close-more"],
    intro:
      "Revenue targets are easier to hit when you can see the numbers behind them. We work back from your target through win rates, deal sizes and sales cycles to the proposals and meetings you need each month, so you know whether you're on track long before the quarter ends.",
    features: [
      {
        title: "Revenue model",
        description: "A simple model that works back from your target to the meetings, proposals and wins you need.",
      },
      {
        title: "Your real conversion rates",
        description: "Win rates, deal sizes and cycle lengths pulled from your CRM history rather than guessed.",
      },
      {
        title: "Target vs actual tracking",
        description: "A monthly view of where you are against the model, so gaps show up early.",
      },
      {
        title: "Scenario planning",
        description: "What-if views for bigger deals, a new hire or a higher win rate, so you can see which lever moves revenue most.",
      },
    ],
    whoItsFor:
      "Suited to firm owners setting growth targets who aren't sure what activity it will take to hit them, or whose forecast is closer to a hope than a plan.",
  },
  {
    slug: "pipeline-dashboards",
    title: "Pipeline dashboards",
    outcome: "You see next quarter's revenue at a glance.",
    goals: ["close-more"],
    intro:
      "Most firm owners find out how the quarter went after it ends. We build live dashboards from your CRM that show deals by stage, forecast revenue and where opportunities are getting stuck, so you make decisions with numbers you trust.",
    features: [
      {
        title: "Pipeline by stage",
        description: "Every open deal by stage and value, so you can see the quarter's total without asking for a spreadsheet.",
      },
      {
        title: "Forecast views",
        description: "Weighted forecasts by month and quarter, built on your real conversion rates.",
      },
      {
        title: "Weekly pipeline report",
        description: "A summary sent to you automatically every week, instead of pulled together before every meeting.",
      },
      {
        title: "Metrics built for decisions",
        description: "Win rates, deal age and where deals stall, rather than vanity metrics.",
      },
    ],
    whoItsFor: "Ideal for firm owners who want a clear view of what's coming without chasing their team for updates.",
  },
  {
    slug: "pitch-decks",
    title: "Pitch & proposal decks",
    outcome: "Your proposal holds its own against the big firms.",
    goals: ["close-more"],
    intro:
      "When a bigger buyer is comparing you with the big names, your deck is in the room when you aren't. We build pitch and proposal decks around a clear story that argues your case, designed to look considered and written to sound like you, not a generic template.",
    features: [
      {
        title: "Narrative & structure",
        description: "A clear story arc that argues your case, instead of just listing slides.",
      },
      {
        title: "Custom slide design",
        description: "On-brand, professionally designed slides that match the calibre of client you're trying to win.",
      },
      {
        title: "Proposal templates",
        description: "Reusable proposal and pricing templates your team can adapt for each opportunity, so every bid starts strong.",
      },
      {
        title: "Speaker notes",
        description: "Notes written so presenting feels natural, even if pitching isn't something you do every day.",
      },
    ],
    whoItsFor:
      "Ideal for firm owners who have the expertise but not the time to build a strong deck from scratch for every opportunity.",
  },
  {
    slug: "blogs",
    title: "Blogs",
    outcome: "Buyers researching the problem find your take on it.",
    goals: ["more-website-leads"],
    intro:
      "Before buyers talk to anyone, they search. We write articles that answer the questions your buyers are asking, in your voice and from your experience, so when they're researching the problem, it's your thinking they find.",
    features: [
      {
        title: "Topic plan",
        description: "Articles planned around the questions your ideal clients actually search for, not just topics that sound good.",
      },
      {
        title: "Expert interviews",
        description: "Short conversations with you or your team, so every article carries real experience rather than recycled advice.",
      },
      {
        title: "On-brand editing",
        description: "Every article edited to match your voice and standards before it goes anywhere near 'publish'.",
      },
      {
        title: "Publishing & tracking",
        description: "Articles published on a steady cadence, with traffic and enquiry tracking to guide what to write next.",
      },
    ],
    whoItsFor:
      "Suited to firm owners who know content compounds but don't have the bandwidth to write and publish consistently.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getGoal(slug: string) {
  return goals.find((g) => g.slug === slug);
}

export function serviceImage(slug: string) {
  return `/services/${slug}.webp`;
}
