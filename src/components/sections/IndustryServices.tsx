"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceDialog from "@/components/sections/ServiceDialog";
import { getService, serviceImage, type Service } from "@/lib/services-data";

/**
 * The services behind an industry's campaign: scene cards (the same scenes as the services library)
 * that open the service pop-up in place, browsing just these services, then a way through to the rest.
 * Each card is also a /services#<slug> link, so a modified click opens the library in a new tab.
 */
export default function IndustryServices({ slugs }: { slugs: string[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const slugRef = useRef<string | null>(null);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  const list = slugs.map((slug) => getService(slug)).filter((s): s is Service => Boolean(s));
  const current = list.find((s) => s.slug === currentSlug);
  const index = current ? list.indexOf(current) : -1;

  const show = (slug: string) => {
    slugRef.current = slug;
    setCurrentSlug(slug);
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) dlg.showModal();
  };

  const go = (delta: number) => {
    if (index < 0) return;
    show(list[(index + delta + list.length) % list.length].slug);
  };

  const onCardClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    show(slug);
  };

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      const slug = slugRef.current;
      slugRef.current = null;
      setCurrentSlug(null);
      // Return focus to the card last shown.
      if (slug) document.getElementById(`service-${slug}`)?.focus();
    };
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, []);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-14">
          <SectionLabel>Built Around What You Actually Do</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green">The services behind the campaign.</h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {list.map((s) => (
            <li key={s.slug}>
              <a
                id={`service-${s.slug}`}
                href={`/services#${s.slug}`}
                onClick={(e) => onCardClick(e, s.slug)}
                className="group h-full flex flex-col bg-white border border-dark-green/10 rounded-2xl overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(28,56,48,0.35)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mid-green"
              >
                <div className="relative aspect-[5/3] bg-[#F1E4C0]">
                  <Image
                    src={serviceImage(s.slug)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 px-5 pt-5 pb-6">
                  <h3 className="font-serif text-xl font-bold text-dark-green leading-tight">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mt-2 flex-1">{s.outcome}</p>
                  <span className="mt-5 text-sm font-semibold text-mid-green group-hover:text-dark-green transition-colors duration-200">
                    Full details <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Button href="/services" variant="secondary">
            See all services
          </Button>
        </div>
      </div>

      <ServiceDialog dialogRef={dialogRef} service={current} index={index} total={list.length} onStep={go} />
    </section>
  );
}
