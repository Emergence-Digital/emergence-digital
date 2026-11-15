import Image from "next/image";
import Link from "next/link";
import { BookOpen, Play } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { postAsset, publishedPosts, type InsightPost } from "@/lib/insights-data";
import { formatVideoTime } from "@/lib/insights-format";
import { socialCover } from "@/lib/insights-social";

/**
 * Insights on the home page: a strip that scrolls on its own, alternating each post's video poster (9:16) with its
 * social cover (4:5: the first slide of its LinkedIn carousel, or its single LinkedIn image), every tile linking to
 * the post. A post with no cover gets its 5:3 card image and title instead. It pauses on hover and keyboard focus.
 * With reduced motion it stands still and scrolls sideways by hand instead.
 *
 * The strip is the sequence twice over, the second copy hidden from screen readers and the keyboard, so sliding it
 * by half (the ticker-left keyframes) loops without a seam. Each tile carries its own right padding rather than the
 * row using gap, so the join between the copies is spaced like the rest.
 */

type Tile = { kind: "video" | "card"; post: InsightPost };

/**
 * Videos go in post order (newest first) and cards in the same order shifted by about half, so each post's two
 * tiles sit roughly half a loop apart and no two neighbours, the loop's join included, are the same post. The shift
 * can't be 0 (a video beside its own card) or 1 (a card beside the next video's post), so it's at least 2; with
 * fewer than three posts a repeat beside itself can't be avoided.
 */
function tileOrder(posts: InsightPost[]): Tile[] {
  const n = posts.length;
  const shift = n >= 3 ? Math.max(2, Math.floor(n / 2)) : 0;
  return posts.flatMap((post, i) => [
    { kind: "video" as const, post },
    { kind: "card" as const, post: posts[(i + shift) % n] },
  ]);
}

/** Seconds of scroll per post, so the speed stays the same as posts are added. */
const SECONDS_PER_POST = 16;

const HEIGHT = "h-[300px] md:h-[400px]";
const LINK =
  "group/tile block rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mid-green";
const SHADOW = "shadow-[0_14px_30px_-18px_rgba(28,56,48,0.45)]";
const ZOOM =
  "object-cover transition-transform duration-500 ease-out group-hover/tile:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/tile:scale-100";
/**
 * The white chip in a tile's bottom corner, e.g. "Watch · 0:53". Add CHIP_LEFT or CHIP_RIGHT. The inset is 12px on
 * phones and 16px from md up, so on a carousel's first slide the chip covers both the D series' swipe-arrow button
 * and the N series' "1 / 7" page count. At 12px the top of the arrow showed on the larger tiles; at 20px the bottom
 * of the page count did.
 */
const CHIP =
  "absolute bottom-3 md:bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold text-dark-green shadow-md transition-transform duration-200 group-hover/tile:scale-105 motion-reduce:transition-none";
const CHIP_LEFT = "left-3 md:left-4";
const CHIP_RIGHT = "right-3 md:right-4";
const CHIP_ICON = "grid size-6 place-items-center rounded-full bg-dark-green text-white";

function VideoTile({ post, hidden }: { post: InsightPost; hidden: boolean }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      aria-label={hidden ? undefined : `Watch the video: ${post.title}`}
      tabIndex={hidden ? -1 : undefined}
      className={LINK}
    >
      <div className={`relative ${HEIGHT} aspect-[9/16] overflow-hidden rounded-2xl bg-dark-green ${SHADOW}`}>
        <Image
          src={postAsset(post, post.video.poster)}
          alt=""
          fill
          sizes="(min-width: 768px) 225px, 170px"
          className={ZOOM}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-green/60 via-transparent to-transparent" />
        <span aria-hidden="true" className={`${CHIP} ${CHIP_LEFT}`}>
          <span className={CHIP_ICON}>
            <Play className="size-3 translate-x-px fill-current" strokeWidth={0} />
          </span>
          Watch · {formatVideoTime(post.video.durationSec)}
        </span>
      </div>
    </Link>
  );
}

/**
 * The post's social cover, portrait like the video tiles. The slide carries its own headline, so no title. A
 * carousel's first slide has only its page count bottom-left, which the chip covers. A single image has its closing
 * line there, running up to about two-thirds across, so its chip goes bottom-right and says just "Read" to stay
 * clear of it on phones.
 */
function CardTile({ post, hidden }: { post: InsightPost; hidden: boolean }) {
  const social = socialCover(post);
  if (!social) return <FallbackCardTile post={post} hidden={hidden} />;
  const carousel = social.slides > 1;
  return (
    <Link
      href={`/insights/${post.slug}`}
      aria-label={hidden ? undefined : `Read the article: ${post.title}`}
      tabIndex={hidden ? -1 : undefined}
      className={LINK}
    >
      <div className={`relative ${HEIGHT} aspect-[4/5] overflow-hidden rounded-2xl bg-cream ${SHADOW}`}>
        <Image src={social.cover} alt="" fill sizes="(min-width: 768px) 320px, 240px" className={ZOOM} />
        <span aria-hidden="true" className={`${CHIP} ${carousel ? CHIP_LEFT : CHIP_RIGHT}`}>
          <span className={CHIP_ICON}>
            <BookOpen className="size-3.5" strokeWidth={2.25} />
          </span>
          {carousel ? `Read · ${social.slides} slides` : "Read"}
        </span>
      </div>
    </Link>
  );
}

/** A post with no social cover: its 5:3 card image, with the title and read time under it. */
function FallbackCardTile({ post, hidden }: { post: InsightPost; hidden: boolean }) {
  return (
    <Link href={`/insights/${post.slug}`} tabIndex={hidden ? -1 : undefined} className={LINK}>
      <div className={`flex flex-col ${HEIGHT} w-[340px] md:w-[480px] overflow-hidden rounded-2xl bg-cream ${SHADOW}`}>
        <div className="relative aspect-[5/3] w-full overflow-hidden">
          <Image
            src={postAsset(post, post.images.card)}
            alt=""
            fill
            sizes="(min-width: 768px) 480px, 340px"
            className={ZOOM}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-2 md:px-5">
          <p className="font-serif text-sm md:text-[17px] font-bold leading-snug text-dark-green line-clamp-3 transition-colors duration-200 group-hover/tile:text-mid-green">
            {post.title}
          </p>
          <p className="mt-1 text-xs text-muted">
            {post.readMinutes} min read · {post.audience}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function InsightsCarousel() {
  const posts = publishedPosts();
  if (posts.length === 0) return null;
  const tiles = tileOrder(posts);

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <SectionLabel>Insights</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight mb-4">
            The IT news worth knowing.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Short takes on the research shaping IT firms in Australia, so you know what it means for your firm
            before your buyers ask.
          </p>
        </div>
        <Button href="/insights" variant="secondary" className="self-start md:self-auto shrink-0">
          See all insights
        </Button>
      </div>

      <div className="group/strip relative motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
        <ul
          aria-label="Latest insights"
          className="flex w-max items-center py-4 animate-ticker-left group-hover/strip:[animation-play-state:paused] group-focus-within/strip:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:px-6"
          style={{ animationDuration: `${posts.length * SECONDS_PER_POST}s` }}
        >
          {[false, true].map((hidden) =>
            tiles.map(({ kind, post }) => (
              <li
                key={`${hidden ? "copy" : "main"}-${kind}-${post.slug}`}
                aria-hidden={hidden || undefined}
                className={`shrink-0 pr-4 md:pr-6 ${hidden ? "motion-reduce:hidden" : ""}`}
              >
                {kind === "video" ? <VideoTile post={post} hidden={hidden} /> : <CardTile post={post} hidden={hidden} />}
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
