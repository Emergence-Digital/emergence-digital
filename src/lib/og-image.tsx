import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Link preview images (1200×630, what LinkedIn, Slack, iMessage and the rest show when someone shares a page).
 * Each route's opengraph-image.tsx calls this with its own eyebrow and headline. The right side is the About hero's
 * team panel: Jordan, Shane and Nikki above a dark green panel, with the "Your team to help you…" card.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const DARK_GREEN = "#1C3830";
const MID_GREEN = "#4A7C59";
const CREAM = "#F5F0EB";
const MUTED = "#6B7280";
const TILE = "#2F9E5E";
const SHADOW = "0 16px 22px rgba(28,56,48,0.16), 0 2px 4px rgba(28,56,48,0.08)";

const file = (path: string) => readFile(join(process.cwd(), path));
const dataUrl = async (path: string) => `data:image/png;base64,${(await file(path)).toString("base64")}`;

// The team panel, in the About hero's 560×520 design units scaled to fit
const SCALE = 0.86;
const s = (px: number) => Math.round(px * SCALE);
const PANEL = { left: 676, bottom: 518, width: s(560), height: s(210) };
const PEOPLE_HEIGHT = s(446);
const people = [
  { src: "src/lib/og/jordan.png", left: s(-18), width: s(292) },
  { src: "src/lib/og/nikki.png", left: s(560 + 16 - 292), width: s(292) },
  { src: "src/lib/og/shane-kennedy.png", left: s((560 - 306) / 2), width: s(306) },
];

interface OgImageOptions {
  /** Small uppercase line above the headline. */
  eyebrow: string;
  /** The page's headline, up to about 60 characters. */
  title: string;
  /** Finishes "Your team to help you", one of the About hero's twelve goals. */
  goal?: string;
}

export async function ogImage({ eyebrow, title, goal = "win bigger clients." }: OgImageOptions) {
  const [regular, bold, ...photos] = await Promise.all([
    file("src/app/fonts/MangalPro.ttf"),
    file("src/app/fonts/MangalProBold.ttf"),
    ...people.map((person) => dataUrl(person.src)),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: CREAM,
          backgroundImage: "linear-gradient(135deg, rgba(74,124,89,0.12) 0%, rgba(74,124,89,0) 45%)",
          fontFamily: "Mangal Pro",
        }}
      >
        {/* Words */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600, padding: "64px 0 60px 72px" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: DARK_GREEN, letterSpacing: -0.5 }}>Emergence Digital</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: MID_GREEN, letterSpacing: 3, textTransform: "uppercase", marginBottom: 18 }}>
              {eyebrow}
            </div>
            <div style={{ fontSize: 60, fontWeight: 700, color: DARK_GREEN, lineHeight: 1.06, letterSpacing: -1.2 }}>{title}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 400, color: MUTED }}>emergencedigital.com.au</div>
        </div>

        {/* Green panel */}
        <div
          style={{
            position: "absolute",
            left: PANEL.left,
            top: PANEL.bottom - PANEL.height,
            width: PANEL.width,
            height: PANEL.height,
            borderRadius: 26,
            backgroundColor: DARK_GREEN,
            backgroundImage: "radial-gradient(circle at 50% 30%, rgba(74,124,89,0.55) 0%, rgba(74,124,89,0) 65%)",
            boxShadow: SHADOW,
          }}
        />

        {/* People: free above the panel, clipped to its sides and rounded bottom corners */}
        <div
          style={{
            position: "absolute",
            left: PANEL.left,
            top: PANEL.bottom - PEOPLE_HEIGHT,
            width: PANEL.width,
            height: PEOPLE_HEIGHT,
            display: "flex",
            overflow: "hidden",
            borderBottomLeftRadius: 26,
            borderBottomRightRadius: 26,
          }}
        >
          {people.map((person, i) => (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img
              key={person.src}
              src={photos[i]}
              width={person.width}
              height={Math.round(person.width * 1.232)}
              style={{ position: "absolute", left: person.left, bottom: 0 }}
            />
          ))}
        </div>

        {/* "Your team to help you…" card */}
        <div
          style={{
            position: "absolute",
            left: PANEL.left + s(36),
            top: PANEL.bottom - PANEL.height + s(404 - 236),
            width: s(488),
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 20px",
            borderRadius: 16,
            backgroundColor: "white",
            boxShadow: SHADOW,
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: TILE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: DARK_GREEN }}>Your team to help you</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: MID_GREEN, marginTop: 2 }}>{goal}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Mangal Pro", data: regular, weight: 400, style: "normal" },
        { name: "Mangal Pro", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
