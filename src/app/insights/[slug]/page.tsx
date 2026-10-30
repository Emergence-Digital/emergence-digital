import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import CTABanner from "@/components/sections/CTABanner";
import { SourceChip } from "@/components/insights/NewsCard";
import { JumpChip, PostVideoFrame, PostVideoProvider } from "@/components/insights/PostVideo";
import PostGraphic from "@/components/insights/PostGraphic";
import TakeLine from "@/components/insights/TakeLine";
import { SeriesCard } from "@/components/insights/PostCard";
import { getPost, isLive, postAsset, publishedPosts, seriesNeighbours, type InsightPost } from "@/lib/insights-data";
import { formatDate, formatDateTime, smartQuotes } from "@/lib/insights-format";
import { LINKEDIN_URL, pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

// Posts go live at their publishAt time without a deploy. Until then src/proxy.ts answers the post's URL with a 404;
// from then the page renders on its first request and regenerates every five minutes.
export const revalidate = 300;
export const dynamicParams = true;

interface PageParams {
  slug: string;
}

export function generateStaticParams() {
  return publishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  const base = pageMetadata({ title: post.metaTitle, description: post.description, path: `/insights/${post.slug}` });
  // The post's own preview image replaces the generated one, so a shared link looks like the LinkedIn post.
  const image = { url: postAsset(post, post.images.preview), width: 1200, height: 630, alt: post.images.alt };
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishAt,
      authors: [post.author],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: `${post.metaTitle} — ${SITE_NAME}`, description: post.description, images: [image] },
    // Drafts and future posts only render on preview deployments; keep them out of search there too.
    ...(!isLive(post) && { robots: { index: false, follow: false } }),
  };
}

function articleJsonLd(post: InsightPost) {
  const url = `${SITE_URL}/insights/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishAt,
    author: { "@type": "Person", name: post.author, url: `${SITE_URL}/about` },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
    image: `${SITE_URL}${postAsset(post, post.images.preview)}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  // Escape "<" so nothing in the copy can close the script tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-serif text-3xl md:text-4xl font-bold text-dark-green leading-tight tracking-tight">
      {children}
    </h2>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-5 space-y-5 text-lg leading-relaxed text-body">
      {items.map((text, i) => (
        <p key={i}>{smartQuotes(text)}</p>
      ))}
    </div>
  );
}

export default async function InsightPostPage({ params }: { params: Promise<PageParams> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { previous, next } = seriesNeighbours(post.slug);
  // Jump chips only show once the video is on Vimeo.
  const jump = (at?: number) => (post.video.vimeoId && at !== undefined ? <JumpChip at={at} /> : undefined);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(post) }} />

      <PostVideoProvider>
        {/* Desktop: the story on the left, the video in a sticky column on the right all the way down. Below lg, one
            column with the video after the short version (its place in the source order). overflow-x-clip stops
            cut-outs sliding in past the edge from leaving phones with a sideways scroll; unlike hidden, clip doesn't
            make a scroll container, so the video still sticks. */}
        <article className="bg-cream pt-32 pb-24 md:pb-32 overflow-x-clip">
          <div className="max-w-[1200px] mx-auto px-6 lg:grid lg:grid-cols-[minmax(0,680px)_320px] lg:justify-between lg:gap-x-16">
            <div className="lg:col-start-1 lg:row-start-1">
              {!isLive(post) && (
                <p className="mb-8 rounded-xl border border-dashed border-mid-green/60 bg-white px-4 py-3 text-sm text-dark-green">
                  <strong className="font-semibold">Preview.</strong>{" "}
                  {post.status === "draft"
                    ? "This post is a draft, so it isn't live yet."
                    : `This post goes live ${formatDateTime(post.publishAt)} (Melbourne).`}{" "}
                  Only preview deployments show it before then.
                </p>
              )}

              <header>
                <SectionLabel>{post.series}</SectionLabel>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.08] tracking-tight">
                  {smartQuotes(post.title)}
                </h1>
                <p className="mt-5 text-lg md:text-xl leading-relaxed text-body">{smartQuotes(post.dek)}</p>
                <SourceChip text={post.sourceChip} className="mt-6 border border-dark-green/10" />
                <p className="mt-4 text-sm text-muted">
                  {post.author} · <time dateTime={post.publishAt}>{formatDate(post.publishAt)}</time> · {post.readMinutes} min read
                </p>
              </header>

              <section aria-labelledby="short-version" className="mt-10 rounded-2xl border border-dark-green/10 bg-white p-6 md:p-8">
                <h2 id="short-version" className="font-serif text-2xl font-bold text-dark-green">
                  The short version
                </h2>
                <ul className="mt-4 space-y-3 text-body leading-relaxed">
                  {post.shortVersion.map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-mid-green" />
                      <span>{smartQuotes(line)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside
              aria-label="Watch the video"
              className="mt-12 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-28"
            >
              {/* Narrower on short screens, so the whole phone stays in view while it sticks. */}
              <div className="mx-auto w-full max-w-[360px] lg:w-[min(320px,calc((100vh-10rem)*9/16))]">
                <PostVideoFrame
                  vimeoId={post.video.vimeoId}
                  title={post.video.title}
                  poster={postAsset(post, post.video.poster)}
                />
              </div>
            </aside>

            <div className="lg:col-start-1 lg:row-start-2">
              {post.beats.map((beat) => (
                <section key={beat.id} id={beat.id} aria-labelledby={`${beat.id}-heading`} className="mt-16 md:mt-20 scroll-mt-28">
                  <SectionHeading id={`${beat.id}-heading`}>{smartQuotes(beat.heading)}</SectionHeading>
                  <Paragraphs items={beat.body} />
                  <div className="mt-12">
                    <PostGraphic post={post} graphic={beat.graphic} jump={jump(beat.videoAt)} />
                  </div>
                </section>
              ))}

              <section id="shanes-take" aria-labelledby="shanes-take-heading" className="mt-16 md:mt-20 scroll-mt-28">
                <SectionHeading id="shanes-take-heading">Shane&rsquo;s take</SectionHeading>
                <TakeLine line={smartQuotes(post.take.line)} keyWords={smartQuotes(post.take.key)} jump={jump(post.take.videoAt)} />
                <Paragraphs items={post.take.body} />
              </section>

              <section aria-labelledby="sources-heading" className="mt-16 md:mt-20 border-t border-dark-green/10 pt-10">
                <h2 id="sources-heading" className="font-serif text-2xl font-bold text-dark-green">
                  Sources and notes
                </h2>
                <ul className="mt-5 space-y-3 text-body leading-relaxed">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <span className="font-semibold text-dark-green">{source.outlet}</span>
                      {" · "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mid-green underline decoration-mid-green/40 underline-offset-2 hover:text-dark-green hover:decoration-dark-green"
                      >
                        {source.title}
                      </a>
                      {" · "}
                      <time dateTime={source.date} className="text-muted">
                        {formatDate(source.date)}
                      </time>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-mid-green/60">
                  {post.notes.map((note, i) => (
                    <li key={i}>{smartQuotes(note)}</li>
                  ))}
                </ul>
              </section>

              <nav aria-label={post.series} className="mt-14">
                {(previous || next) && (
                  <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    {previous && <SeriesCard post={previous} label="Previous" />}
                    {next && <SeriesCard post={next} label="Next" />}
                  </div>
                )}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-mid-green hover:text-dark-green transition-colors duration-200"
                >
                  Follow Emergence Digital on LinkedIn <span aria-hidden="true">&rarr;</span>
                </a>
              </nav>
            </div>
          </div>
        </article>
      </PostVideoProvider>

      <CTABanner />
    </>
  );
}
