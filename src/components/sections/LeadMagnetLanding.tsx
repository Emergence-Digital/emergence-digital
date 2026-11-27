import { readFileSync } from "node:fs";
import path from "node:path";
import { ArrowRight, Download, MessagesSquare, Settings2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import SectionLabel from "@/components/ui/SectionLabel";
import type { LeadMagnet } from "@/lib/lead-magnets";

const downloadClasses =
  "inline-flex items-center justify-center gap-2 shrink-0 bg-dark-green text-white border border-dark-green px-7 py-3 text-sm font-medium tracking-wide hover:bg-mid-green hover:border-mid-green transition-colors duration-200";

interface StepCardProps {
  step: number;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

/** One white card per step, laid out like the workshop thank-you page's worksheet card. */
function StepCard({ step, icon: Icon, title, children, action }: StepCardProps) {
  return (
    <li className="bg-white rounded-2xl shadow-sm p-7 md:p-10 flex flex-col md:flex-row gap-6 md:items-center">
      <span className="w-14 h-14 shrink-0 rounded-xl bg-mid-green/10 text-mid-green grid place-items-center">
        <Icon aria-hidden="true" className="w-7 h-7" />
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold tracking-widest uppercase text-mid-green mb-1">Step {step}</p>
        <h2 className="font-serif text-2xl font-bold text-dark-green mb-2">{title}</h2>
        <p className="text-muted leading-relaxed">{children}</p>
      </div>
      {action}
    </li>
  );
}

/**
 * A lead magnet's landing page (see src/lib/lead-magnets.ts), styled after the workshop
 * thank-you page: a centred heading, then a white card for each step from download to
 * first run, the copy-paste prompt for anyone not using Claude, and one button on to
 * the next step.
 */
export default function LeadMagnetLanding({ magnet }: { magnet: LeadMagnet }) {
  // Read at build time so the copy button holds the exact text of the downloadable prompt.
  const prompt = readFileSync(path.join(process.cwd(), "public", magnet.files.prompt), "utf8");

  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel>{magnet.label}</SectionLabel>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-dark-green mt-2 mb-5">{magnet.heading}</h1>
          <p className="text-muted text-lg md:text-xl leading-normal">{magnet.intro}</p>
        </div>

        <ol className="max-w-3xl mx-auto space-y-5">
          <StepCard
            step={1}
            icon={Download}
            title={`Download the ${magnet.name}`}
            action={
              <a href={magnet.files.skillZip} download className={downloadClasses}>
                <Download aria-hidden="true" className="w-4 h-4" />
                Download
              </a>
            }
          >
            {/* claudeExtra opens with "The full version.", which only reads right next to the prompt version. */}
            {magnet.claudeExtra.replace(/^The full version\.\s*/, "")} Keep the .zip file as it is.
          </StepCard>

          <StepCard step={2} icon={Settings2} title="Add it to Claude">
            In Claude, open Settings, then Capabilities, and turn on code execution. Then open Skills, choose
            Upload a skill and pick the .zip file. It works on every Claude plan, including Free.
          </StepCard>

          <StepCard step={3} icon={Sparkles} title="Run it">
            {magnet.webSearch
              ? "Start a new chat, check web search is on (in the + or tools menu), and type "
              : "Start a new chat and type "}
            <span className="whitespace-nowrap font-medium text-dark-green">&ldquo;{magnet.claudeStarter}&rdquo;</span>.
          </StepCard>
        </ol>

        <div className="max-w-3xl mx-auto mt-5 rounded-2xl border border-dark-green/10 p-7 md:p-10 flex flex-col md:flex-row gap-6 md:items-center">
          <span className="w-14 h-14 shrink-0 rounded-xl bg-white text-mid-green grid place-items-center">
            <MessagesSquare aria-hidden="true" className="w-7 h-7" />
          </span>
          <div className="flex-1">
            <h2 className="font-serif text-2xl font-bold text-dark-green mb-2">Not using Claude?</h2>
            <p className="text-muted leading-relaxed">
              Copy the prompt into a new chat in ChatGPT, Gemini or Microsoft Copilot. Nothing to install. Or{" "}
              <a href={magnet.files.prompt} download className="text-mid-green underline underline-offset-2">
                download it as a text file
              </a>
              .
            </p>
          </div>
          <CopyButton text={prompt} label="Copy the prompt" className="shrink-0" />
        </div>

        <div className="text-center mt-12">
          <Button
            href="/pipeline-scale-plan-call"
            variant="primary"
            className="text-base px-10 py-4 inline-flex items-center gap-2"
          >
            Next: book a Pipeline Scale Plan call
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
