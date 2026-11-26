import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const STEP_NAMES = ["You're booked in", "Joining on Zoom"] as const;

interface WorkshopStepHeaderProps {
  /** 1 or 2. */
  step: number;
  heading: string;
  intro: string;
}

/** The heading block for each after-payment step, with a progress line of dots. */
export function WorkshopStepHeader({ step, heading, intro }: WorkshopStepHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <ol className="flex justify-center items-center gap-2 mb-6" aria-label={`Step ${step} of ${STEP_NAMES.length}`}>
        {STEP_NAMES.map((name, i) => (
          <li key={name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className={`h-px w-8 ${i < step ? "bg-mid-green" : "bg-dark-green/15"}`} />}
            <span
              aria-current={i + 1 === step ? "step" : undefined}
              className={`w-3 h-3 rounded-full ${i < step ? "bg-mid-green" : "bg-dark-green/15"}`}
            >
              <span className="sr-only">{name}</span>
            </span>
          </li>
        ))}
      </ol>
      <SectionLabel>
        Step {step} of {STEP_NAMES.length}: {STEP_NAMES[step - 1]}
      </SectionLabel>
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-dark-green mt-2 mb-5">{heading}</h1>
      <p className="text-muted text-lg md:text-xl leading-normal">{intro}</p>
    </div>
  );
}

/** The button on to the next step. */
export function WorkshopNextStep({ href, label }: { href: string; label: string }) {
  return (
    <div className="text-center mt-12">
      <Button href={href} variant="primary" className="text-base px-10 py-4 inline-flex items-center gap-2">
        {label}
        <ArrowRight aria-hidden="true" className="w-4 h-4" />
      </Button>
    </div>
  );
}
