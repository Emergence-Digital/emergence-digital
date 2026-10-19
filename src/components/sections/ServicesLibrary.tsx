"use client";

import { Suspense, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ServiceDialog from "@/components/sections/ServiceDialog";
import { getGoal, getService, goals, serviceImage, services, type GoalSlug, type Service } from "@/lib/services-data";

type Filter = GoalSlug | "all";

const filters = [{ slug: "all", label: "All" } as const, ...goals];

const isGoal = (value: string | null): value is GoalSlug => goals.some((g) => g.slug === value);

/**
 * Keeps the goal filter in step with ?goal= (footer links, back/forward). It sits in its own Suspense
 * boundary so reading the query string doesn't stop the list from prerendering.
 */
function GoalFromUrl({ onChange }: { onChange: (filter: Filter) => void }) {
  const goal = useSearchParams().get("goal");
  useEffect(() => {
    onChange(isGoal(goal) ? goal : "all");
  }, [goal, onChange]);
  return null;
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={`flex-none ${className}`}>
      <circle cx="7" cy="7" r="7" className="fill-mid-green" />
      <path d="M4 7.2l2 2 4-4.2" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhoItsFor({ service }: { service: Service }) {
  return (
    <p className="text-sm text-muted leading-relaxed">
      <span className="font-semibold text-dark-green">Who it&rsquo;s for: </span>
      {service.whoItsFor}
    </p>
  );
}

/**
 * The services library: goal filter chips over a list of services. On desktop the list sits beside one
 * sticky scene that follows the row in view; below that width each row carries its own scene. Each row
 * is a #slug deep link that opens a pop-up with everything (same dialog pattern as the client stories
 * section), with previous/next to browse the services currently shown.
 */
export default function ServicesLibrary() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const slugRef = useRef<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [spotSlug, setSpotSlug] = useState<string | null>(null);

  const visible = filter === "all" ? services : services.filter((s) => s.goals.includes(filter));
  const current = currentSlug ? getService(currentSlug) : undefined;
  // Browse the filtered services, or all of them if a deep link opened one outside the filter.
  const browse = current && visible.includes(current) ? visible : services;
  const index = current ? browse.indexOf(current) : -1;
  // The service whose scene the sticky desktop panel shows: the row in view or under the pointer.
  const spot = visible.find((s) => s.slug === spotSlug) ?? visible[0];

  const show = useCallback((slug: string) => {
    slugRef.current = slug;
    setCurrentSlug(slug);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${slug}`);
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) dlg.showModal();
  }, []);

  const go = (delta: number) => {
    if (index < 0) return;
    show(browse[(index + delta + browse.length) % browse.length].slug);
  };

  const pick = (next: Filter) => {
    setFilter(next);
    window.history.replaceState(null, "", next === "all" ? window.location.pathname : `${window.location.pathname}?goal=${next}`);
  };

  const onCardClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    // Let modified clicks open the deep link in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    show(slug);
  };

  // Open the service named in the hash on arrival, and whenever the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (getService(slug)) show(slug);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [show]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      const slug = slugRef.current;
      slugRef.current = null;
      setCurrentSlug(null);
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      // Return focus to the service last shown.
      if (slug) document.getElementById(slug)?.focus();
    };
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, []);

  // Desktop: the row crossing the upper middle of the screen becomes the one whose scene is shown.
  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>("[data-spot]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSpotSlug((entry.target as HTMLElement).dataset.spot ?? null);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section className="bg-cream pb-24 md:pb-32">
      <Suspense fallback={null}>
        <GoalFromUrl onChange={setFilter} />
      </Suspense>

      <div className="max-w-[1200px] mx-auto px-6">
        <div role="group" aria-label="Filter services by goal" className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
          {filters.map((f) => {
            const active = filter === f.slug;
            return (
              <button
                key={f.slug}
                type="button"
                aria-pressed={active}
                onClick={() => pick(f.slug)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-mid-green ${
                  active
                    ? "bg-dark-green border-dark-green text-white"
                    : "bg-white border-dark-green/15 text-dark-green hover:border-mid-green hover:text-mid-green"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {services.length} services
        </p>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-10">
          <ul className="flex flex-col gap-3">
            {visible.map((s) => {
              const on = s.slug === spot?.slug;
              return (
                <li key={s.slug} data-spot={s.slug}>
                  <a
                    id={s.slug}
                    href={`#${s.slug}`}
                    onClick={(e) => onCardClick(e, s.slug)}
                    onMouseEnter={() => setSpotSlug(s.slug)}
                    onFocus={() => setSpotSlug(s.slug)}
                    className={`group block sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 sm:items-start lg:block rounded-2xl border border-dark-green/10 bg-white px-6 py-6 md:px-7 scroll-mt-28 transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mid-green ${
                      on ? "lg:shadow-[0_14px_30px_-18px_rgba(28,56,48,0.4)]" : "lg:bg-transparent lg:hover:bg-white/60"
                    }`}
                  >
                    {/* Below desktop there's no sticky panel, so each row carries its own scene: on top on
                        phones, beside the text on tablets. */}
                    <div className="lg:hidden relative aspect-[5/3] -mx-3 -mt-3 mb-5 sm:m-0">
                      <Image src={serviceImage(s.slug)} alt="" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-dark-green leading-tight">{s.title}</h3>
                          <p className="text-muted mt-1.5 leading-snug">{s.outcome}</p>
                        </div>
                        <span
                          aria-hidden="true"
                          className={`hidden lg:grid flex-none mt-0.5 w-9 h-9 rounded-full place-items-center border transition-colors duration-200 ${
                            on ? "lg:bg-dark-green lg:border-dark-green lg:text-white" : ""
                          } border-dark-green/15 text-dark-green group-hover:bg-dark-green group-hover:border-dark-green group-hover:text-white`}
                        >
                          &rarr;
                        </span>
                      </div>
                      <ul aria-label="What you get" className="mt-4 flex flex-wrap gap-2">
                        {s.features.map((f) => (
                          <li
                            key={f.title}
                            className="inline-flex items-center gap-1.5 rounded-full bg-cream border border-dark-green/10 px-3 py-1 text-[13px] text-dark-green"
                          >
                            <Tick />
                            {f.title}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <WhoItsFor service={s} />
                      </div>
                      <span className="lg:hidden inline-block mt-4 text-sm font-semibold text-mid-green">
                        Full details <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop: one scene at a time, for the service in view. */}
          <div className="hidden lg:block self-start sticky top-28">
            <div className="bg-white border border-dark-green/10 rounded-2xl p-3 shadow-[0_14px_30px_-18px_rgba(28,56,48,0.35)]">
              <div className="relative aspect-[5/3]">
                {visible.map((s) => (
                  <Image
                    key={s.slug}
                    src={serviceImage(s.slug)}
                    alt=""
                    fill
                    sizes="420px"
                    className={`object-contain transition-opacity duration-500 ${s.slug === spot?.slug ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              </div>
            </div>
            {spot && (
              <div className="mt-4 px-1 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-wider uppercase text-mid-green">
                    {spot.goals.map((g) => getGoal(g)?.label).join(" · ")}
                  </div>
                  <div className="font-serif text-lg font-bold text-dark-green leading-tight mt-1">{spot.title}</div>
                </div>
                <button
                  type="button"
                  onClick={() => show(spot.slug)}
                  className="flex-none text-sm font-semibold text-mid-green hover:text-dark-green cursor-pointer"
                >
                  Full details &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ServiceDialog dialogRef={dialogRef} service={current} index={index} total={browse.length} onStep={go} />
    </section>
  );
}
