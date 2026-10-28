import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import LeadForm from "@/components/sections/LeadForm";
import { pageMetadata } from "@/lib/seo";

// Where every "Book a Strategy Call" button goes. The "book-call" form tags the
// contact web:book-call in GHL, then /book/time shows the calendar, prefilled.
export const metadata: Metadata = pageMetadata({
  title: "Book a Strategy Call",
  description:
    "Book a 30-minute strategy call. We'll map where your next clients are most likely to come from, and which campaign to run first and what it costs.",
  path: "/book",
});

const points = [
  "Where your next clients are most likely to come from",
  "Which campaign to run first, and what it should cost",
  "How digital events, content and outbound fit together for your firm",
];

export default function BookPage() {
  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>Strategy Call</SectionLabel>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6">
              Book a strategy call
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Tell us a little about your firm, then pick a time. On the call we&apos;ll work through:
            </p>
            <ul className="space-y-4">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-body">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
                    <path d="M5 13l4 4L19 7" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <LeadForm formId="book-call" />
        </div>
      </div>
    </section>
  );
}
