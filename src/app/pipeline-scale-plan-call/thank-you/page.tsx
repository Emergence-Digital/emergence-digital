import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import VimeoEmbed from "@/components/ui/VimeoEmbed";
import ClientStories from "@/components/sections/ClientStories";

// Step 3 of the Pipeline Scale Plan call funnel. The GHL calendar's confirmation
// redirects here once someone books. The copy follows the F1-02 script, and the
// Centurion videos sit under it in order, so none of them asks for a booking.
export const metadata: Metadata = {
  title: "You're Booked In — Emergence Digital",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    title: "Accept the calendar invite",
    body: "Check your inbox for the invite and accept it, so the call is locked in your calendar and you get a reminder.",
  },
  {
    title: "Save our number",
    body: "We'll call you at the time you booked, on the number you gave us. Our number is in your confirmation email. Save it, so you know it's us when it rings.",
  },
  {
    title: "Think about two things",
    body: "Where your new work has come from over the last twelve months, and the type of client you'd like a lot more of. That's all the prep you need.",
  },
];

const centurionVideos = [
  {
    vimeoId: "1239802639",
    stage: "Attraction",
    body: "Buyers usually rank who they'd like to work with before they contact anyone. How your firm gets on that list.",
  },
  {
    vimeoId: "1239802637",
    stage: "Engagement",
    body: "The firm a buyer prefers before they talk to sales usually wins the deal. How attention turns into trust.",
  },
  {
    vimeoId: "1239802635",
    stage: "Conversion",
    body: "Interest only turns into signed work if someone stays in touch. How you make sure it's you.",
  },
];

export default function PipelineScalePlanCallThankYouPage() {
  return (
    <>
      <section className="bg-cream pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>You&apos;re Booked In</SectionLabel>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-dark-green mt-2 mb-5">Thank you.</h1>
            <p className="text-muted text-lg md:text-xl leading-normal">
              Three quick things, so we get the most out of our time together.
            </p>
          </div>

          <VimeoEmbed
            id="1239805007"
            title="You're booked in: three quick things before your call"
            autoplay
            className="max-w-4xl mx-auto"
          />

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mt-12">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="bg-white rounded-2xl shadow-sm p-6 md:p-7">
                <span className="w-9 h-9 rounded-full bg-mid-green text-white font-semibold grid place-items-center mb-4">
                  {i + 1}
                </span>
                <h2 className="font-serif text-xl font-bold text-dark-green mb-2">{step.title}</h2>
                <p className="text-muted leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="text-center text-muted mt-10">
            Need to move it? Use the link in your confirmation email.
          </p>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Before the Call</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight mb-5">
              How we approach growth, in three short videos.
            </h2>
            <p className="text-muted text-lg">Each one is under two minutes. They&apos;re best watched in order.</p>
          </div>

          <ol className="space-y-16 md:space-y-20">
            {centurionVideos.map((video, i) => (
              <li key={video.stage} className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-center">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-mid-green">
                    {i + 1} of {centurionVideos.length}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-dark-green mt-2 mb-4">{video.stage}</h3>
                  <p className="text-muted text-lg leading-relaxed">{video.body}</p>
                </div>
                <VimeoEmbed id={video.vimeoId} title={`Centurion Strategy ${i + 1} of 3: ${video.stage}`} autoplay />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClientStories />
    </>
  );
}
