import { readFileSync } from "node:fs";
import path from "node:path";
import { Download, FileSpreadsheet, MessagesSquare, Sparkles } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import type { LeadMagnet } from "@/lib/lead-magnets";

const downloadClasses =
  "inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium tracking-wide transition-all duration-200 bg-dark-green text-white border border-dark-green hover:bg-mid-green hover:border-mid-green";

/**
 * The download page for one lead magnet (see src/lib/lead-magnets.ts): the Claude
 * skill, the copy-paste prompt for any AI tool, and the spreadsheet.
 */
export default function LeadMagnetDownload({ magnet }: { magnet: LeadMagnet }) {
  // Read at build time so the copy button holds the exact text of the downloadable prompt.
  const prompt = readFileSync(path.join(process.cwd(), "public", magnet.files.prompt), "utf8");

  const claudeSteps = [
    "Download the skill below. Keep it as a .zip file.",
    "In Claude, open Settings, then Capabilities, and turn on code execution.",
    "Under Skills, upload the .zip file.",
    `Start a new chat and type "${magnet.claudeStarter}".`,
  ];

  const promptSteps = [
    "Copy the prompt.",
    "Paste it into a new chat in ChatGPT, Gemini, Microsoft Copilot or Claude.",
    "Answer the questions. It works best when you're signed in.",
  ];

  return (
    <>
      <section className="bg-cream pt-32 pb-20 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>{magnet.label}</SectionLabel>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-dark-green mt-2 mb-5 leading-[1.1]">
              {magnet.heading}
            </h1>
            <p className="text-muted text-lg md:text-xl leading-relaxed">{magnet.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Two Ways to Run It</SectionLabel>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight">
              Pick the one that suits you.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="bg-cream rounded-2xl p-7 md:p-9 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-mid-green text-white grid place-items-center shrink-0">
                  <Sparkles size={20} aria-hidden="true" />
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark-green">In Claude</h3>
              </div>
              <p className="text-body leading-relaxed mb-6">{magnet.claudeExtra}</p>
              <ol className="space-y-3 mb-8">
                {claudeSteps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-body">
                    <span className="w-6 h-6 rounded-full bg-white text-mid-green text-sm font-semibold grid place-items-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto">
                <a href={magnet.files.skillZip} download className={`${downloadClasses} w-full sm:w-auto`}>
                  <Download size={16} aria-hidden="true" />
                  Download the Claude skill
                </a>
                <p className="text-muted text-sm mt-4">
                  Don&apos;t see Skills in your Claude settings? Use the copy-paste version instead.
                </p>
              </div>
            </article>

            <article className="bg-cream rounded-2xl p-7 md:p-9 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-mid-green text-white grid place-items-center shrink-0">
                  <MessagesSquare size={20} aria-hidden="true" />
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark-green">In any AI tool</h3>
              </div>
              <p className="text-body leading-relaxed mb-6">
                Nothing to install. The same interview as one prompt you paste into the AI tool you already use.
              </p>
              <ol className="space-y-3 mb-8">
                {promptSteps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-body">
                    <span className="w-6 h-6 rounded-full bg-white text-mid-green text-sm font-semibold grid place-items-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-auto">
                <CopyButton text={prompt} label="Copy the prompt" className="w-full sm:w-auto" />
                <p className="text-muted text-sm mt-4">
                  Or{" "}
                  <a href={magnet.files.prompt} download className="text-mid-green underline underline-offset-2">
                    download it as a text file
                  </a>
                  .
                </p>
              </div>
            </article>
          </div>

          <article className="mt-6 border border-[#D9D4CE] rounded-2xl p-7 md:p-9 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-cream text-mid-green grid place-items-center shrink-0">
                <FileSpreadsheet size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-dark-green mb-2">{magnet.spreadsheet.name}</h3>
                <p className="text-body leading-relaxed">{magnet.spreadsheet.body}</p>
              </div>
            </div>
            <a href={magnet.files.spreadsheet} download className={`${downloadClasses} w-full md:w-auto`}>
              <Download size={16} aria-hidden="true" />
              Download the spreadsheet
            </a>
          </article>
        </div>
      </section>

      <section className="bg-dark-green py-24 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <SectionLabel light>Next Step</SectionLabel>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
              {magnet.cta.heading}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">{magnet.cta.body}</p>
            <Button href="/pipeline-scale-plan-call" variant="outline-light">
              Book a Pipeline Scale Plan call
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
