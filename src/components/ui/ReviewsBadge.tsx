import Image from "next/image";

/**
 * Social-proof eyebrow for the top of the hero: overlapping brand icons of Fiverr clients who left a review,
 * five stars and the review count. Icons are each company's own mark on white (public/logos/reviewers/):
 * AutoCut's and CalGet's cut from their vector logos, Podify's and No Form AI's from their site icons, and
 * ISH's dot mark from its colour logo.
 */
// Hidden for now: shown only when SHOW_REVIEWS_BADGE in Hero.tsx is true. Update this before switching it on.
const REVIEW_COUNT = "50+ 5-star reviews";

const REVIEWERS = [
  { name: "AutoCut", src: "/logos/reviewers/autocut.png" },
  { name: "Podify", src: "/logos/reviewers/podify.png" },
  { name: "CalGet", src: "/logos/reviewers/calget.png" },
  { name: "ISH Technologies", src: "/logos/reviewers/ish-technologies.png" },
  { name: "No Form AI", src: "/logos/reviewers/no-form-ai.png" },
];

function Star() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function ReviewsBadge() {
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-3 mb-8">
      <span className="flex items-center" aria-label={`Reviewed by ${REVIEWERS.map((r) => r.name).join(", ")}`}>
        {REVIEWERS.map((r, i) => (
          <Image
            key={r.src}
            src={r.src}
            alt=""
            width={40}
            height={40}
            className={`w-10 h-10 rounded-full bg-white border border-dark-green/10 ring-[3px] ring-cream shadow-sm ${i > 0 ? "-ml-2" : ""}`}
            style={{ zIndex: REVIEWERS.length - i }}
          />
        ))}
      </span>
      <span className="flex items-center gap-2.5">
        <span className="flex gap-0.5 text-[#E9B949]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} />
          ))}
        </span>
        <span className="text-sm font-semibold text-dark-green">{REVIEW_COUNT}</span>
      </span>
    </div>
  );
}
