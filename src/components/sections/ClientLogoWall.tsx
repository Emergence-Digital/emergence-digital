import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { clientLogos } from "@/lib/client-logos";

/** Logo wall of our best clients: three rows of five on desktop. */
const CLIENTS = [
  "rinnai",
  "business-core-solutions-bcs",
  "rev-trac",
  "turnkey-consulting",
  "hicron",
  "cto-labs",
  "la-trobe-student-union",
  "proxyn-ai",
  "novofit",
  "hitec-security",
  "autocut",
  "podify",
  "wisery",
  "calget",
  "ish-technologies",
];

// Each logo gets a similar visual area (not the same height), capped so very wide wordmarks still fit a cell.
const AREA = 5000;
const MAX_WIDTH = 170;
const MAX_HEIGHT = 60;
// Logos with a lot of empty space inside their shape (a tagline, an open mark) read small at the same area.
const OPTICAL: Record<string, number> = { "rev-trac": 1.15, autocut: 1.2 };
// Two-line lockups read small at the standard width cap, so they may run a little wider (still fits a cell).
const WIDE: Record<string, number> = { "la-trobe-student-union": 190 };

function size(slug: string, width: number, height: number) {
  const aspect = width / height;
  let h = Math.min(MAX_HEIGHT, Math.sqrt(AREA / aspect) * (OPTICAL[slug] ?? 1));
  const maxWidth = WIDE[slug] ?? MAX_WIDTH;
  if (h * aspect > maxWidth) h = maxWidth / aspect;
  return { width: Math.round(h * aspect), height: Math.round(h) };
}

export default function ClientLogoWall() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-14">
          <SectionLabel>Our Clients</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-green">
            Some of the teams we&rsquo;ve worked with.
          </h2>
        </div>

        <ul className="grid grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14 items-center">
          {CLIENTS.map((slug) => {
            const logo = clientLogos[slug];
            const { width, height } = size(slug, logo.width, logo.height);
            return (
              <li key={slug} className="flex items-center justify-center h-16">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={width}
                  height={height}
                  className="max-w-full h-auto opacity-75 hover:opacity-100 transition-opacity"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
