import { ChevronDown } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

interface FaqProps {
  items: { question: string; answer: string }[];
  label?: string;
  heading?: string;
}

/** Frequently asked questions as native <details> disclosures: keyboard and screen-reader friendly, no script. */
export default function Faq({ items, label = "FAQ", heading = "Questions, answered" }: FaqProps) {
  return (
    <section className="bg-cream py-24 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">{heading}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <details key={item.question} className="group bg-white rounded-2xl shadow-sm">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none px-6 py-5 md:px-7 [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-lg md:text-xl font-bold text-dark-green">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="w-5 h-5 shrink-0 text-mid-green transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="px-6 pb-6 md:px-7 -mt-1 text-muted leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
