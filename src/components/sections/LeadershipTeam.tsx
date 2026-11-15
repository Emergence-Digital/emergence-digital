import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import TeamPhoto from "@/components/ui/TeamPhoto";
import { founder, leadership, type TeamMember } from "@/lib/team";

/**
 * The team on the home page. From `lg` up the row splits 50 / 25 / 25: Shane's photo takes the left half, Jordan and
 * Nikki share the right half, and under them a line on the team and its values, with a link to the About page's team
 * section, where the bios are. Tablets stack Shane above the others; Jordan and Nikki stay side by side down to
 * phones. Names and roles live in src/lib/team.ts; the values match the About page's.
 */

const values = ["Craft", "Creativity", "Curiosity"];

function NameAndRole({ member }: { member: TeamMember }) {
  return (
    <div className="px-1 pt-4 pb-1 sm:px-2">
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark-green leading-tight">{member.name}</h3>
      <p className="text-mid-green text-sm font-medium mt-1">{member.role}</p>
    </div>
  );
}

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Shane: half the row */}
          <article className="flex flex-col rounded-3xl bg-cream p-3 sm:p-4">
            <TeamPhoto
              member={founder}
              className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:flex-1 lg:min-h-[420px]"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
            <NameAndRole member={founder} />
          </article>

          {/* Jordan and Nikki: a quarter each, with the team line under them */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {leadership.map((member) => (
                <article key={member.name} className="flex flex-col rounded-3xl bg-cream p-3 sm:p-4">
                  <TeamPhoto member={member} className="aspect-[4/5]" sizes="(min-width: 1024px) 280px, 50vw" />
                  <NameAndRole member={member} />
                </article>
              ))}
            </div>

            <div className="flex-1 flex flex-col justify-center rounded-3xl border border-dark-green/10 p-6 sm:p-8">
              <ul className="flex flex-wrap gap-2 mb-5" aria-label="Our values">
                {values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full bg-mid-green/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-mid-green"
                  >
                    {value}
                  </li>
                ))}
              </ul>
              <p className="text-body text-lg leading-relaxed">
                Craft, creativity and curiosity are how all three of us work. We sweat the details, skip the safe
                idea and keep learning, so your firm is the one buyers notice, remember and choose.
              </p>
              <div className="mt-6">
                <Button href="/about#team">Meet the team</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
