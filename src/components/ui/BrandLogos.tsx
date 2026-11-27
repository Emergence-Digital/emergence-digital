/**
 * Simple drawn versions of third-party app logos, for showing what you get (e.g. the workshop's Claude skills, Excel
 * templates, PowerPoint decks, PDF worksheet and replay). They use each brand's own colours rather than the site's
 * theme tokens, so they read as those apps at a glance.
 */

export type BrandLogoName = "claude" | "excel" | "powerpoint" | "pdf" | "youtube";

export const brandLogoLabel: Record<BrandLogoName, string> = {
  claude: "Claude",
  excel: "Excel",
  powerpoint: "PowerPoint",
  pdf: "PDF",
  youtube: "YouTube",
};

/** Claude's spark: uneven rays round a centre, in Claude's terracotta. */
const CLAUDE_RAYS: [angle: number, length: number][] = [
  [0, 44], [29, 37], [61, 45], [90, 35], [119, 42], [151, 39],
  [181, 45], [211, 36], [241, 43], [270, 38], [301, 45], [331, 35],
];

function Claude() {
  return (
    <g stroke="#D97757" strokeWidth="9" strokeLinecap="round">
      {CLAUDE_RAYS.map(([angle, length]) => {
        const radians = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(radians) * length;
        const y = 50 - Math.sin(radians) * length;
        return <line key={angle} x1="50" y1="50" x2={x.toFixed(1)} y2={y.toFixed(1)} />;
      })}
    </g>
  );
}

/** The Office-style tile: a coloured square with the app's letter, in front of a sheet. */
function OfficeTile({ fill, children }: { fill: string; children: React.ReactNode }) {
  return (
    <>
      <rect x="6" y="25" width="50" height="50" rx="6" fill={fill} />
      {children}
    </>
  );
}

function Excel() {
  return (
    <>
      <clipPath id="brand-excel-sheet">
        <rect x="28" y="8" width="66" height="84" rx="7" />
      </clipPath>
      <g clipPath="url(#brand-excel-sheet)">
        <rect x="28" y="8" width="66" height="28" fill="#33C481" />
        <rect x="28" y="36" width="66" height="28" fill="#21A366" />
        <rect x="28" y="64" width="66" height="28" fill="#185C37" />
        <path d="M61 8v84" stroke="#107C41" strokeWidth="2" opacity="0.5" />
      </g>
      <OfficeTile fill="#107C41">
        <path d="M20 38l22 24M42 38L20 62" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
      </OfficeTile>
    </>
  );
}

function PowerPoint() {
  return (
    <>
      <circle cx="58" cy="50" r="40" fill="#ED6C47" />
      <path d="M58 10a40 40 0 0 1 40 40H58z" fill="#FF8F6B" />
      <OfficeTile fill="#C43E1C">
        <path
          d="M23 63V37h11a8 8 0 0 1 0 16H23"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </OfficeTile>
    </>
  );
}

function Pdf() {
  return (
    <>
      <path d="M22 5h40l22 22v62a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V11a6 6 0 0 1 6-6z" fill="#FFFFFF" stroke="#C9CED6" strokeWidth="3" />
      <path d="M62 5v16a6 6 0 0 0 6 6h16" fill="#E8EAED" stroke="#C9CED6" strokeWidth="3" strokeLinejoin="round" />
      <rect x="8" y="50" width="64" height="28" rx="5" fill="#E5252A" />
      <text
        x="40"
        y="70.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="19"
        letterSpacing="1"
      >
        PDF
      </text>
    </>
  );
}

function YouTube() {
  return (
    <>
      <rect x="4" y="20" width="92" height="62" rx="17" fill="#FF0000" />
      <path d="M41 36l26 15-26 15z" fill="#FFFFFF" />
    </>
  );
}

const drawings: Record<BrandLogoName, () => React.ReactNode> = {
  claude: Claude,
  excel: Excel,
  powerpoint: PowerPoint,
  pdf: Pdf,
  youtube: YouTube,
};

interface BrandLogoProps {
  name: BrandLogoName;
  /** Read out by screen readers. Leave blank when the text beside it already says it. */
  label?: string;
  className?: string;
}

export default function BrandLogo({ name, label, className = "" }: BrandLogoProps) {
  const Drawing = drawings[name];
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <Drawing />
    </svg>
  );
}
