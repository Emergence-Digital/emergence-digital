import Image from "next/image";
import { BadgeCheck, CalendarRange, Check, Sparkles, Target, type LucideIcon } from "lucide-react";
import ClientLogoWall from "@/components/sections/ClientLogoWall";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import LeadForm from "@/components/sections/LeadForm";
import ResponsiveVimeoEmbed from "@/components/ui/ResponsiveVimeoEmbed";
import { ShanePortrait } from "@/components/sections/AboutShane";
import type { Workshop } from "@/lib/workshops";

const REGISTER_ID = "register";

/** One icon per "What you'll learn" point, in order (a plain icon grid instead of the clean page's tiles). */
const LEARN_ICONS: LucideIcon[] = [Target, BadgeCheck, CalendarRange, Sparkles];

const heading = "font-sans font-black uppercase tracking-tight leading-[1.05]";
const highlight = "text-mid-green underline decoration-[0.08em] underline-offset-[0.12em]";

/** The same chunky button after every section, as on the reference page. */
function SeatButton({ pulse = false, light = false }: { pulse?: boolean; light?: boolean }) {
  const colours = light
    ? "bg-white text-dark-green border-dark-green hover:bg-cream"
    : "bg-mid-green text-white border-dark-green hover:bg-dark-green";
  return (
    <a
      href={`#${REGISTER_ID}`}
      className={`inline-block rounded-full border-2 px-8 py-4 text-base md:text-lg font-bold transition-colors duration-200 ${colours} ${
        pulse ? "motion-safe:animate-cta-pulse" : ""
      }`}
    >
      Reserve Your Workshop Seat Here
    </a>
  );
}

/** Renders the **bold** runs in a line of copy from workshops.ts. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

interface WorkshopPlainPageProps {
  workshop: Workshop;
  titleKey: string;
}

/**
 * Design b of the landing page split test: the same page and copy as design a, built plain and loud, after the
 * reference page Cormac uses (theagencymentor.com.au/build-your-workshop-funnel-workshop). His view (Office Hours,
 * 25 Nov 2026): "ugly pages convert". Shouty capitals, crude green bands, a heavy-shadowed video, the same button after
 * every section, and the form at the bottom.
 */
export default function WorkshopPlainPage({ workshop, titleKey }: WorkshopPlainPageProps) {
  const title = workshop.titles[titleKey] ?? workshop.titles.default;

  return (
    <div className="bg-white text-body">
      {/* Above the fold: who it's for, the event line, the headline, the VSL and the button. */}
      <section className="bg-linear-to-b from-mid-green from-0% to-white to-[32%] pt-24 pb-14 md:pt-28">
        <div className="max-w-[1000px] mx-auto px-5 text-center">
          <p className="font-bold text-white text-sm md:text-base mb-2">{workshop.audience}</p>
          <p className={`${heading} text-dark-green text-base md:text-xl mb-3`}>
            Live workshop | {workshop.shortDateLabel}, {workshop.startTimeLabel}
          </p>
          <h1 className={`${heading} text-dark-green text-[7.4vw] sm:text-4xl md:text-5xl mb-3`}>
            {title.headline[0]} <span className={highlight}>{title.headline[1]}</span>
          </h1>
          <p className="font-semibold text-base md:text-lg mb-5">{title.hook}</p>
          <div className="mx-auto max-w-[min(56rem,calc((100svh-28rem)*16/9))] rounded-2xl shadow-[0_6px_22px_rgba(0,0,0,0.5)]">
            <ResponsiveVimeoEmbed
              desktopId={workshop.heroVideo.desktop}
              mobileId={workshop.heroVideo.mobile}
              title={workshop.heroVideo.title}
              autoplay={workshop.heroVideo.autoplay}
            />
          </div>
          <div className="mt-7">
            <SeatButton pulse />
          </div>
          <p className="mt-4 text-sm font-semibold">
            Live on Zoom · {workshop.durationMinutes} minutes · {workshop.priceLabel} · {workshop.seatLimit} seats
          </p>
        </div>
      </section>

      <section className="bg-linear-to-t from-mid-green from-0% to-white to-[28%] pt-10 pb-16">
        <div className="max-w-[1100px] mx-auto px-5 text-center">
          <h2 className={`${heading} text-dark-green text-3xl md:text-5xl mb-10`}>
            Here&apos;s exactly what you&apos;ll learn inside <span className={highlight}>&lsquo;{workshop.name}&rsquo;</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {workshop.learn.map((item, i) => {
              const Icon = LEARN_ICONS[i] ?? Check;
              return (
                <li key={item.title}>
                  <Icon aria-hidden="true" strokeWidth={2.4} className="w-14 h-14 mx-auto mb-3 text-mid-green" />
                  <h3 className="font-extrabold italic text-dark-green text-lg leading-snug mb-2">{item.title}</h3>
                  <p className="text-[15px] leading-snug">{item.body}</p>
                </li>
              );
            })}
          </ul>
          <SeatButton light />
        </div>
      </section>

      <section className="bg-mid-green pt-14 pb-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className={`${heading} text-white text-center text-3xl md:text-5xl mb-10`}>
            Here&apos;s everything you get inside the workshop&hellip;
          </h2>
          <div className="bg-white rounded-3xl p-4 md:p-8 space-y-5">
            {workshop.included.map((item) => (
              <div
                key={item.title}
                className="border border-dark-green/25 grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-5 items-center p-4 md:p-6"
              >
                <div className="relative aspect-[5/3]">
                  <Image src={item.image} alt="" fill sizes="(min-width: 640px) 360px, 100vw" className="object-contain" />
                </div>
                <div>
                  <h3 className={`${heading} text-dark-green text-2xl md:text-3xl mb-2`}>{item.title}</h3>
                  <p className="leading-snug">{item.body}</p>
                  {item.features && item.features.length > 0 && (
                    <ul aria-label="Includes" className="mt-3 space-y-1">
                      {item.features.map((feature, i) => (
                        <li key={`${feature}-${i}`} className="flex items-center gap-2 font-semibold text-dark-green">
                          <Check aria-hidden="true" strokeWidth={3} className="w-4 h-4 text-mid-green shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <SeatButton />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-t from-dark-green from-0% to-white to-[30%] pt-16 pb-20">
        <div className="max-w-[1000px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 items-center">
          <div>
            <p className="mb-1">Introducing&hellip;</p>
            <h2 className={`${heading} text-dark-green text-3xl md:text-4xl mb-5`}>{workshop.introducing.name}</h2>
            <div className="space-y-4 leading-relaxed">
              {workshop.introducing.paragraphs.map((paragraph) => (
                <p key={paragraph}>{withBold(paragraph)}</p>
              ))}
            </div>
          </div>
          <ShanePortrait />
          <div className="md:col-span-2 text-center">
            <SeatButton light />
          </div>
        </div>
      </section>

      <VideoTestimonials />
      <ClientLogoWall />

      <section id={REGISTER_ID} className="scroll-mt-20 py-16 md:py-20">
        <div className="max-w-[760px] mx-auto px-5 text-center">
          <h2 className={`${heading} text-dark-green text-3xl md:text-4xl mb-3`}>
            Enter your details to join the <span className={highlight}>&ldquo;{workshop.name}&rdquo;</span> live workshop
          </h2>
          <p className="italic mb-8">
            {workshop.dateLabel}, {workshop.timeLabel}. <strong>{workshop.priceLabel}</strong>, and seats are limited to{" "}
            <strong>{workshop.seatLimit}</strong>. Pay securely with Stripe on the next page.
          </p>
          <LeadForm
            formId="workshop-2027-strategy"
            experiments={{ design: "b", title: titleKey }}
            className="border border-dark-green/25 text-left"
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[760px] mx-auto px-5">
          <h2 className={`${heading} text-dark-green text-center text-3xl md:text-4xl mb-8`}>Frequently asked questions</h2>
          <dl className="space-y-6">
            {workshop.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-extrabold text-dark-green text-lg mb-1">{item.question}</dt>
                <dd className="leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="text-center mt-10">
            <SeatButton />
          </div>
        </div>
      </section>
    </div>
  );
}
