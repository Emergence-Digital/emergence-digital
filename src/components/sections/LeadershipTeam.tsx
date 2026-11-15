import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import TeamPhoto from "@/components/ui/TeamPhoto";
import { founder, leadership } from "@/lib/team";

/**
 * The team on the home page. From `lg` up the row splits 50 / 25 / 25: Shane's card takes the left half, with his
 * photo beside his bio, and Jordan and Nikki share the right half, with a link to the About page's team section
 * under them. Tablets stack Shane above the other two; phones stack all three. Copy lives in src/lib/team.ts.
 */
export default function LeadershipTeam() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight">
            The people you&apos;ll actually work with.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shane: half the row */}
          <article className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-3xl bg-cream p-4 sm:p-5">
            <TeamPhoto
              member={founder}
              className="aspect-[4/5] sm:aspect-auto sm:min-h-[340px]"
              sizes="(min-width: 640px) 360px, 100vw"
            />
            <div className="px-2 pb-3 sm:px-0 sm:py-3 sm:pr-3">
              <h3 className="font-serif text-2xl md:text-[1.7rem] font-bold text-dark-green leading-tight">
                {founder.name}
              </h3>
              <p className="text-mid-green text-sm font-medium mt-1">{founder.role}, Emergence Digital</p>
              <div className="mt-5 space-y-4 text-body leading-relaxed">
                {founder.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          {/* Jordan and Nikki: a quarter each, with the link to the About page under them */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {leadership.map((member) => (
                <article key={member.name} className="flex flex-col rounded-3xl bg-cream p-4 sm:p-5">
                  <TeamPhoto
                    member={member}
                    className="aspect-square sm:aspect-[4/5]"
                    sizes="(min-width: 640px) 280px, 100vw"
                  />
                  <div className="px-2 pt-5 pb-3 sm:px-1">
                    <h3 className="font-serif text-2xl font-bold text-dark-green leading-tight">{member.name}</h3>
                    <p className="text-mid-green text-sm font-medium mt-1">{member.role}</p>
                    <div className="mt-4 space-y-3 text-muted text-[15px] leading-relaxed">
                      {member.summary.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href="/about#team"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-dark-green/15 px-6 py-5 text-dark-green transition-colors duration-200 hover:border-mid-green hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mid-green"
            >
              <span className="font-serif text-xl font-bold">Meet our leadership team</span>
              <ArrowRight
                aria-hidden="true"
                size={20}
                className="shrink-0 text-mid-green transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
