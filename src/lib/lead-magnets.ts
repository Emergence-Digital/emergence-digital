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
  /** What the Claude version does that the copy-paste version can't. */
  claudeExtra: string;
  files: {
    skillZip: string;
    prompt: string;
    spreadsheet: string;
  };
  spreadsheet: {
    name: string;
    body: string;
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
    claudeExtra:
      "The full version. It reads your website, looks up the clients you name, and fills in the scoring spreadsheet for you.",
    files: {
      skillZip: "/downloads/icp-generator/icp-generator-skill.zip",
      prompt: "/downloads/icp-generator/icp-generator-prompt.txt",
      spreadsheet: "/downloads/icp-generator/ICP-Scoring-Matrix.xlsx",
    },
    spreadsheet: {
      name: "ICP Scoring Matrix",
      body: "Score any company against your ideal client profile and see who to contact first. Start by scoring your three best clients: they should come out on top.",
    },
    cta: {
      heading: "Want help reaching them?",
      body: "Your ICP tells you who to target. If you'd like those companies turning into qualified conversations every month, let's map out how on a Pipeline Scale Plan call.",
    },
  },
} satisfies Record<string, LeadMagnet>;

export type LeadMagnetSlug = keyof typeof leadMagnets;
