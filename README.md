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

The contact form uses [EmailJS](https://www.emailjs.com/) (no backend).
Create `.env.local` in the project root with:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout — fonts, global nav/footer, metadataBase
│   ├── page.tsx                       # Home page
│   ├── sitemap.ts                     # Generated from services-data.ts + industries-data.ts
│   ├── robots.ts
│   ├── about/
│   ├── contact/
│   ├── packages/                      # Tier 1 / Tier 2 growth packages (no pricing shown)
│   ├── industries/[slug]/             # Vertical landing pages (IT/MSP, ERP partners, consulting)
│   └── services/
│       ├── page.tsx                   # Hub page — all services grouped by category
│       └── [category]/
│           ├── page.tsx               # Category landing page
│           └── [slug]/page.tsx        # Individual service page
├── components/
│   ├── layout/     # Navbar, Footer, ServicePageLayout, IndustryPageLayout
│   ├── sections/   # Page-level sections (Hero, WhoWeHelp, Testimonials, CTABanner, etc.)
│   └── ui/         # Reusable primitives (Button, Card, SectionLabel)
└── lib/
    ├── services-data.ts    # Source of truth for the 4 service categories / 19 services
    └── industries-data.ts  # Source of truth for the 3 industry landing pages
```

### Services

Services are organised into 4 categories — **Sales, Marketing, Digital,
Content** — defined in `src/lib/services-data.ts`. Routes are dynamic:

- `/services` — hub page, all categories
- `/services/[category]` — category landing page (e.g. `/services/digital`)
- `/services/[category]/[slug]` — individual service page

To add or edit a service, only touch `services-data.ts` — the Navbar
dropdown, Footer columns, homepage services overview, the `/services` hub,
and `sitemap.ts` all read from it.

### Industries

Vertical landing pages live at `/industries/[slug]`, sourced from
`src/lib/industries-data.ts` (currently IT Services & MSPs, ERP & Software
Partners, Consulting & Advisory Firms). Each page follows a shared
before/after transformation template (`IndustryPageLayout`) and links out to
a handful of relevant services.

### Navigation

The navbar is intentionally consolidated rather than listing all 19 services:
**Services** (dropdown of the 4 categories only) → **Industries** (dropdown
of the 3 vertical pages) → **Packages** → About → Contact. Same structure
repeats in the mobile accordion.

## Design system

- **Background:** `#F5F0EB` (warm off-white/cream)
- **Dark green:** `#1C3830` (headings, nav, footer bg, dark sections)
- **Mid green:** `#4A7C59` (accents, CTAs, pill labels)
- **Body text:** `#2D2D2D` | **Muted:** `#6B7280`
- **Headings font:** Playfair Display | **Body/UI font:** Inter
