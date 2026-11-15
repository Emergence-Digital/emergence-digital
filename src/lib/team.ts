/**
 * The leadership team. The home page's team section (LeadershipTeam.tsx) shows names, roles and photos; the About
 * page's team cards add the bios.
 * Photos are the cut-outs from the About hero (AboutTeamVisual.tsx): 1000×1232 transparent WebPs, shown on a dark
 * green panel by TeamPhoto.tsx.
 *
 * Jordan's and Nikki's copy is a placeholder until the owner confirms their details (surnames, bios).
 */
export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  /** Alt text for the photo. */
  alt: string;
  /** About page copy, one string per paragraph. */
  bio: string[];
}

export const founder: TeamMember = {
  name: "Shane Kennedy",
  role: "Founder",
  photo: "/about/shane-kennedy.webp",
  alt: "Shane Kennedy, founder of Emergence Digital",
  bio: [
    "Shane has spent the last 10 years in marketing, a significant part of it inside the SAP partner ecosystem — working alongside software, consulting and implementation partners to help them stand out in a crowded, technical market.",
  ],
};

export const leadership: TeamMember[] = [
  {
    name: "Jordan",
    role: "Delivery Lead",
    photo: "/about/jordan.webp",
    alt: "Jordan, Delivery Lead at Emergence Digital",
    bio: [
      "Jordan leads delivery at Emergence, turning the plan we agree on into work your buyers actually see. Campaigns go live when they're meant to, so the momentum you're building never stalls between the plan and the market.",
    ],
  },
  {
    name: "Nikki",
    role: "Head of Operations",
    photo: "/about/nikki.webp",
    alt: "Nikki, Head of Operations at Emergence Digital",
    bio: [
      "Nikki runs operations at Emergence, keeping everything behind the work organised and on track. Working with us stays simple from your first week, so your time goes into winning work and running your firm, not managing an agency.",
    ],
  },
];

export const team: TeamMember[] = [founder, ...leadership];
