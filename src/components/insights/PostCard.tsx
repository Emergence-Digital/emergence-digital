import Image from "next/image";
import Link from "next/link";
import { postAsset, type InsightPost } from "@/lib/insights-data";
import { formatDate } from "@/lib/insights-format";

/**
 * A post in the Insights library. The card image is two layers of the same size: the base, and the cut-out on top,
 * which lifts 6px with a deeper shadow on hover and focus (not with reduced motion).
 */
export default function PostCard({ post }: { post: InsightPost }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex flex-col rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-mid-green"
    >
      <div className="relative aspect-[5/3] overflow-hidden rounded-2xl shadow-[0_14px_30px_-18px_rgba(28,56,48,0.4)]">
        <Image src={postAsset(post, post.images.cardBase)} alt="" fill sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        <Image
          src={postAsset(post, post.images.cardCutout)}
          alt=""
          fill
          sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-[translate,filter] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:drop-shadow-[0_12px_14px_rgba(28,56,48,0.28)] group-focus-visible:-translate-y-1.5 group-focus-visible:drop-shadow-[0_12px_14px_rgba(28,56,48,0.28)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:drop-shadow-none motion-reduce:group-focus-visible:translate-y-0 motion-reduce:group-focus-visible:drop-shadow-none"
        />
      </div>
      <p className="mt-5 text-xs font-semibold tracking-wider uppercase text-mid-green">{post.sourceChip}</p>
      <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-dark-green transition-colors duration-200 group-hover:text-mid-green">
        {post.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{post.readMinutes} min read</p>
    </Link>
  );
}

/** Previous or next post at the foot of a post: the flattened card image, title and date. */
export function SeriesCard({ post, label }: { post: InsightPost; label: string }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-dark-green/10 bg-white p-3 pr-5 transition duration-200 hover:shadow-[0_14px_30px_-18px_rgba(28,56,48,0.4)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mid-green"
    >
      <div className="relative aspect-[5/3] w-28 flex-none overflow-hidden rounded-xl">
        <Image src={postAsset(post, post.images.card)} alt="" fill sizes="112px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wider uppercase text-mid-green">{label}</p>
        <p className="mt-1 font-serif text-lg font-bold leading-snug text-dark-green group-hover:text-mid-green">{post.title}</p>
        <p className="mt-1 text-xs text-muted">{formatDate(post.publishAt)}</p>
      </div>
    </Link>
  );
}
