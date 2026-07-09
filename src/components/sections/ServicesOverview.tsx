import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { categories } from "@/lib/services-data";

export default function ServicesOverview() {
  return (
    <section className="bg-dark-green py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel light>Our Services</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            What we do best.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/services/${category.slug}`}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-200"
            >
              <span className="text-xs font-semibold tracking-widest text-mid-green">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-3 mb-1">
                {category.label}
              </h3>
              <p className="text-mid-green text-sm font-medium mb-4">{category.tagline}</p>
              <p className="text-white/60 text-sm leading-relaxed">{category.description}</p>
              <span className="inline-block mt-6 text-xs text-white/40 group-hover:text-white/80 transition-colors duration-200 tracking-widest uppercase">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
