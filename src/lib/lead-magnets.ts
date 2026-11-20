/**
 * Lead magnet download pages: single source of truth.
 *
 * Each entry drives one hidden page at /lp/<slug>, linked only from the
 * webinar sign-up follow-up (not in the nav, footer or sitemap, and noindex).
 * The files live in public/downloads/<slug>/ and are built outside this repo,
 * in the lead-magnets project (tools/package.sh). Replace a file there and
 * copy it in; no code change is needed unless a file name changes.
 */

export interface LeadMagnet {
  slug: string;
  /** Product name, e.g. "ICP Generator". */
  name: string;
  /** Short line above the heading. */
  label: string;
  heading: string;
  /** What the person gets, about two sentences. */
  intro: string;
  /** What to type in Claude to start the skill. */
  claudeStarter: string;
  /** The skill looks things up online, so Claude needs web search on. */
  webSearch: boolean;
  /** What the Claude version does that the copy-paste version can't. */
  claudeExtra: string;
  files: {
    skillZip: string;
    prompt: string;
  };
  cta: {
    heading: string;
    body: string;
  };
}

export const leadMagnets = {
  "icp-generator": {
    slug: "icp-generator",
    name: "ICP Generator",
    label: "Your free ICP Generator",
    heading: "Find the clients worth chasing.",
    intro:
      "Answer about 12 quick questions and get a clear picture of who your business should be selling to, when they're ready to buy and what to say to them. It takes under 10 minutes.",
    claudeStarter: "Build my ICP",
    webSearch: true,
    claudeExtra:
      "The full version. It reads your website, looks up the clients you name, and fills in the scoring spreadsheet for you.",
    files: {
      skillZip: "/downloads/icp-generator/icp-generator-skill.zip",
      prompt: "/downloads/icp-generator/icp-generator-prompt.txt",
    },
    cta: {
      heading: "Want help reaching them?",
      body: "Your ICP tells you who to target. If you'd like those companies turning into qualified conversations every month, let's map out how on a Pipeline Scale Plan call.",
    },
  },
  "outbound-sequence-builder": {
    slug: "outbound-sequence-builder",
    name: "Outbound Sequence Builder",
    label: "Your free Outbound Sequence Builder",
    heading: "Cold emails worth replying to.",
    intro:
      "Answer a few quick questions and get a 7-email cold outreach sequence that's ready to send, plus replies for when people respond. It takes under 10 minutes.",
    claudeStarter: "Build an outbound sequence",
    webSearch: true,
    claudeExtra:
      "The full version. It reads your website, looks up the companies you want to email, and writes an opening line for each one.",
    files: {
      skillZip: "/downloads/outbound-sequence-builder/outbound-sequence-builder-skill.zip",
      prompt: "/downloads/outbound-sequence-builder/outbound-sequence-prompt.txt",
    },
    cta: {
      heading: "Want more meetings from outbound?",
      body: "Your sequence gets the first emails out the door. If you'd like outbound bringing in qualified meetings every month, let's map out how on a Pipeline Scale Plan call.",
    },
  },
  "case-study-generator": {
    slug: "case-study-generator",
    name: "Case Study Generator",
    label: "Your free Case Study Generator",
    heading: "Turn your best work into proof.",
    intro:
      "Answer a few quick questions, or paste in your project notes, and get a case study you can publish, plus versions for LinkedIn, emails and proposals. It takes under 10 minutes.",
    claudeStarter: "Write a case study",
    webSearch: false,
    claudeExtra:
      "The full version. It pulls the story out of your project notes and fills in the Case Study Library spreadsheet for you.",
    files: {
      skillZip: "/downloads/case-study-generator/case-study-generator-skill.zip",
      prompt: "/downloads/case-study-generator/case-study-prompt.txt",
    },
    cta: {
      heading: "Want your proof working harder?",
      body: "A case study shows buyers what you can do. If you'd like it bringing in conversations with more clients like that one, let's map out how on a Pipeline Scale Plan call.",
    },
  },
  "social-calendar-creator": {
    slug: "social-calendar-creator",
    name: "Social Calendar Creator",
    label: "Your free Social Calendar Creator",
    heading: "A posting plan you can keep up with.",
    intro:
      "Answer 12 quick questions and get a 4-week posting calendar, with what to post, where and when, sized to the time you actually have. Week 1 is written for you.",
    claudeStarter: "Build me a social media calendar",
    webSearch: false,
    claudeExtra:
      "The full version. It fills in the calendar spreadsheet for you and gives you a file of posting reminders for Google Calendar or Outlook.",
    files: {
      skillZip: "/downloads/social-calendar-creator/social-calendar-creator-skill.zip",
      prompt: "/downloads/social-calendar-creator/social-calendar-prompt.txt",
    },
    cta: {
      heading: "Want social to start conversations?",
      body: "Posting keeps you in front of buyers. If you'd like those posts turning into qualified conversations every month, let's map out how on a Pipeline Scale Plan call.",
    },
  },
} satisfies Record<string, LeadMagnet>;

export type LeadMagnetSlug = keyof typeof leadMagnets;
