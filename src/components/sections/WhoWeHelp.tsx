import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";

// Scenes are exported from the Illustrator card library (~/Adobe MCPs/centurion-cards).
const segments = [
  {
    title: "IT Services & MSPs",
    description:
      "You've got the technical depth and the client base to prove it, but the market still doesn't see you as the obvious first call. We build the recognition to match your capability.",
    image: "/who-we-help/it-services-msps.webp",
    alt: "A resolved service desk ticket, an uptime chart at 99.98% and a new managed services contract notification",
  },
  {
    title: "ERP Partners",
    description:
      "Partnership credentials only matter if the market knows about them. We turn your implementation expertise into content and events that put you top of mind before the RFP goes out.",
    image: "/who-we-help/erp-partners.webp",
    alt: "An ERP rollout card with live modules, a go-live plan and a phase 2 signed notification",
  },
  {
    title: "Software Developers",
    description:
      "Good software doesn't sell itself, and a feature list isn't a reason to buy. We turn the problems you've solved for clients into content and events that show buyers what you can build before they compare quotes.",
    image: "/who-we-help/software-developers.webp",
    alt: "A code editor, a passing build pipeline and an enterprise licence notification",
  },
  {
    title: "Cybersecurity & Cloud Providers",
    description:
      "Trust is the entire sale in your category, and trust is built in public. We help you demonstrate expertise consistently, so prospects arrive already convinced before the first conversation.",
    image: "/who-we-help/cybersecurity-cloud.webp",
    alt: "A security score of 94, healthy cloud services and a security review booked notification",
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
