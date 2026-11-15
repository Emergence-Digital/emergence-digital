import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import CTABanner from "@/components/sections/CTABanner";
import PostCard from "@/components/insights/PostCard";
import InsightsGrid from "@/components/insights/InsightsGrid";
import { publishedPosts } from "@/lib/insights-data";
import { LINKEDIN_URL, pageMetadata } from "@/lib/seo";

// Regenerates every five minutes, so a post shows here within five minutes of its publish time without a deploy.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Short takes for IT firms in Australia: the IT news worth knowing, with the numbers behind it, and marketing tips from Shane Kennedy.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = publishedPosts();
  // Series in the order their newest post appears, so the filter follows the grid.
  const series = [...new Set(posts.map((post) => post.series))];

  return (
    <>
      <section className="bg-cream pt-32 pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14 md:mb-16">
            <SectionLabel>Insights</SectionLabel>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green leading-[1.08] tracking-tight max-w-3xl mx-auto mb-5">
              Insights for IT firms
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
              Short takes for IT firms in Australia: the IT news worth knowing, with the numbers behind it, and marketing
              tips from Shane Kennedy.
            </p>
          </div>

          {posts.length > 0 ? (
            <InsightsGrid
              series={series}
              cards={posts.map((post) => ({ key: post.slug, series: post.series, card: <PostCard post={post} /> }))}
            />
          ) : (
            <p className="text-center text-body">
              The first post is on its way.{" "}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-mid-green hover:text-dark-green transition-colors duration-200"
              >
                Follow Emergence Digital on LinkedIn
              </a>{" "}
              to catch it.
            </p>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
