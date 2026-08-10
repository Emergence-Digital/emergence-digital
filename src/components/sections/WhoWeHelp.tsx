import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";

const segments = [
  {
    title: "IT Services & MSPs",
    description:
      "You've got the technical depth and the client base to prove it, but the market still doesn't see you as the obvious first call. We build the recognition to match your capability.",
  },
  {
    title: "ERP & Software Partners",
    description:
      "Partnership credentials only matter if the market knows about them. We turn your implementation expertise into content and events that put you top of mind before the RFP goes out.",
  },
  {
    title: "Consulting & Advisory Firms",
    description:
      "You've built genuine points of view through client work, but they're stuck in your head and your team's inboxes. We package that expertise into campaigns that build your reputation as the go-to authority.",
  },
  {
    title: "Cybersecurity & Cloud Providers",
    description:
      "Trust is the entire sale in your category, and trust is built in public. We help you demonstrate expertise consistently, so prospects arrive already convinced before the first conversation.",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>Who We Help</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">
            Built for businesses that have outgrown their reputation.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((seg) => (
            <Card key={seg.title}>
              <h3 className="font-serif text-2xl font-semibold text-dark-green mb-3">
                {seg.title}
              </h3>
              <p className="text-muted leading-relaxed">{seg.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
