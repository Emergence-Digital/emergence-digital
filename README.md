# Emergence Digital

Marketing site for Emergence Digital, a Melbourne marketing company built for
IT services firms, MSPs, ERP/software partners and consulting firms — helping
established firm owners turn deep expertise into market authority through a
monthly digital event, repurposed content, and a tracked sales pipeline.

Built with Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript,
deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint      # ESLint check
npm run start     # serve the production build
```

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. The contact form uses
[EmailJS](https://www.emailjs.com/) (no backend). Funnel lead forms post to
`/api/lead`, which pushes contacts into GoHighLevel: see [SETUP.md](SETUP.md).

## Project structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout — fonts, global nav/footer, metadataBase
│   ├── page.tsx                       # Home page
│   ├── sitemap.ts                     # Static routes + industries-data.ts
│   ├── robots.ts
│   ├── about/
│   ├── contact/
│   ├── packages/                      # Tier 1 / Tier 2 growth packages (no pricing shown)
│   ├── industries/[slug]/             # Vertical landing pages (IT/MSP, ERP partners, consulting)
│   ├── lp/                            # Funnel pages (noindex), e.g. lp/example-lead + its /book step
│   ├── api/lead/route.ts              # Lead form submissions → GoHighLevel (see SETUP.md)
│   └── services/page.tsx              # Services library — one page, goal filters, list + pop-ups
├── components/
│   ├── layout/     # Navbar, Footer, IndustryPageLayout, AttributionCapture
│   ├── sections/   # Page-level sections (Hero, WhoWeHelp, ClientStories, ServicesLibrary, CTABanner, LeadForm, etc.)
│   └── ui/         # Reusable primitives (Button, Card, SectionLabel)
└── lib/
    ├── services-data.ts    # Source of truth for the 20 services and the 4 visitor goals
    ├── industries-data.ts  # Source of truth for the 3 industry landing pages
    ├── lead-forms.ts       # Source of truth for funnel forms: fields, GHL tags, field IDs, success step
    ├── lead-validation.ts  # Shared form validation + AU-default E.164 phone normalising
    ├── attribution.ts      # First-touch UTM / click ID / referrer cookie
    └── ghl.ts              # Server-only GHL API v2 client (upsert, tags, notes)
scripts/                    # ghl-custom-fields.mjs, test-lead.mjs (see SETUP.md)
```

### Services

`/services` is a single page: a library of 20 services defined as one
flat list in `src/lib/services-data.ts`. There are no per-service routes.

- **Filters:** chips for All plus 4 visitor goals (Win bigger accounts · Get
  more leads from our website · Stand out from the big firms · Close more of
  what we already have). A service can sit under several goals. The active
  goal is mirrored in `?goal=<slug>`, which the Footer links use.
- **List:** each service is a row with its title, one-line outcome, the
  "what you get" headings and who it's for. The outcome line states the client
  outcome only, never the tactic or deliverable. On desktop the list sits
  beside one sticky scene that follows the row in view; below that width each
  row shows its own scene.
- **Pop-up:** clicking a row opens a dialog with everything (intro, feature
  descriptions, who it's for), the same pattern as the client stories section.
  Each row is a `/services#<slug>` deep link, and industry pages link to
  services that way.
- **Images:** `public/services/<slug>.webp`, exported from the Illustrator card
  library (board theme `services`; the slug matches the board's
  `svc-<slug>` item and the `exports/Service-<Slug>.png` file, saved as a
  1200×720 webp).

To add or edit a service, only touch `services-data.ts`. The old category and
service URLs 301 to `/services` (or `/services#<slug>` where the service
survives) via the map in `next.config.ts`.

### Industries

Vertical landing pages live at `/industries/[slug]`, sourced from
`src/lib/industries-data.ts` (currently IT Services & MSPs, ERP & Software
Partners, Consulting & Advisory Firms). Each page follows a shared
before/after transformation template (`IndustryPageLayout`) and links out to
a handful of relevant services.

### Navigation

**Industries** (dropdown of the vertical pages) → **Services** (plain link to
the library) → **Packages** → About → Contact. Same structure repeats in the
mobile menu.

## Design system

- **Background:** `#F5F0EB` (warm off-white/cream)
- **Dark green:** `#1C3830` (headings, nav, footer bg, dark sections)
- **Mid green:** `#4A7C59` (accents, CTAs, pill labels)
- **Body text:** `#2D2D2D` | **Muted:** `#6B7280`
- **Headings font:** Playfair Display | **Body/UI font:** Inter
