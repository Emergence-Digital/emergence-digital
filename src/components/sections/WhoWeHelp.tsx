import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";

// Scenes are exported from the Illustrator card library (~/Adobe MCPs/centurion-cards).
const segments = [
  {
    title: "MSPs & Cyber Security Firms",
    description:
      "Buyers can't judge technical depth from a website, so they default to the biggest name. We make you the provider they already trust when it's time to switch.",
    image: "/who-we-help/msps-cyber-security.webp",
    alt: "A security score of 94, a managed IT and security checklist and a new 60-seat contract notification",
  },
  {
    title: "ERP & Cloud Partners",
    description:
      "Every partner in your ecosystem has the same badge. We make you the one buyers already know before the RFP goes out.",
    image: "/who-we-help/erp-cloud-partners.webp",
    alt: "SAP, Oracle, Salesforce, Microsoft, ServiceNow, AWS, Google Cloud and TechnologyOne logos on a partner ecosystems card, with a phase 2 signed notification",
  },
  {
    title: "Consulting & Development Firms",
    description:
      "Every firm now claims it can build AI agents. We make you the one buyers trust to build theirs, so you're hired on expertise, not day rates.",
    image: "/who-we-help/consulting-development-firms.webp",
    alt: "A live invoice agent matching supplier invoices to purchase orders, an AI roadmap with the agent build in progress and an agent build signed notification",
  },
  {
    title: "SaaS & Software Companies",
    description:
      "Buyers who arrive with no context stall at the demo. We bring you buyers who already understand the problem you solve, so the first call is about fit, not features.",
    image: "/who-we-help/saas-software-companies.webp",
    alt: "A code editor, a passing build pipeline and an enterprise licence notification",
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
              <div className="relative aspect-[5/3] -mx-2 -mt-2 mb-6">
                <Image
                  src={seg.image}
                  alt={seg.alt}
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="object-contain"
                />
              </div>
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
