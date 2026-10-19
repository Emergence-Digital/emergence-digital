"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { clientStories, type ClientStory } from "@/lib/client-stories";

/**
 * Client stories: eight cards (two rows of four on desktop). Each opens a pop-up with the full story, what we
 * delivered and the client's review where there is one, with previous/next to browse. Same design as the
 * client stories gallery on the GHL landing page.
 */
export default function ClientStories() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState(-1);
  const story: ClientStory | undefined = clientStories[current];

  const open = useCallback((i: number) => {
    const n = clientStories.length;
    setCurrent(((i % n) + n) % n);
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) {
      lastFocus.current = document.activeElement as HTMLElement;
      dlg.showModal();
    }
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setCurrent(-1);
      lastFocus.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % clientStories.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + clientStories.length) % clientStories.length);
    };
    dlg.addEventListener("close", onClose);
    document.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>Client Stories</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-green leading-[1.1] tracking-tight">
            What we&rsquo;ve built for our clients.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clientStories.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => open(i)}
              aria-label={`Open story: ${s.name}`}
              className="group flex flex-col text-left bg-white border border-dark-green/10 rounded-2xl overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(28,56,48,0.35)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mid-green cursor-pointer"
            >
              <div className="relative aspect-[16/10] bg-dark-green overflow-hidden">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1 px-5 pt-4 pb-5">
                <span className="text-xs font-semibold tracking-wider uppercase text-mid-green">{s.category}</span>
                <h3 className="font-serif text-xl font-bold text-dark-green leading-tight">{s.name}</h3>
                <p className="text-sm text-muted line-clamp-2">{s.oneLiner}</p>
                <div className="mt-auto pt-2 flex flex-wrap items-center gap-1.5">
                  {s.services.slice(0, 2).map((t) => (
                    <span key={t} className="text-xs bg-cream text-dark-green rounded-full px-2.5 py-0.5">
                      {t}
                    </span>
                  ))}
                  {s.quote && <span className="ml-auto text-xs font-semibold text-mid-green">&#9733; Review</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="story-name"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto outline-none w-[min(960px,calc(100vw-32px))] max-w-none max-h-[calc(100dvh-24px)] md:max-h-[calc(100dvh-48px)] p-0 rounded-[20px] bg-[#FBF8F5] text-body shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] overflow-y-auto overscroll-contain md:overflow-hidden backdrop:bg-[rgba(18,36,31,0.6)] backdrop:backdrop-blur-sm"
      >
        {story && (
          <div className="md:grid md:grid-cols-[5fr_7fr]">
            {/* The thumbnail is 16:10 and the panel is tall, so show it whole over a blurred copy of itself. */}
            <div className="relative bg-dark-green aspect-[16/10] md:aspect-auto overflow-hidden">
              <Image src={story.image} alt="" fill sizes="400px" className="object-cover scale-125 blur-2xl opacity-70" aria-hidden="true" />
              <Image src={story.image} alt="" fill sizes="(min-width: 768px) 400px, 100vw" className="object-contain" />
            </div>
            <div className="flex flex-col gap-[18px] px-5 pt-6 pb-5 md:px-10 md:pt-9 md:pb-7 md:max-h-[calc(100dvh-48px)] md:overflow-y-auto md:overscroll-contain">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-mid-green">{story.category}</div>
                  <h2 id="story-name" className="font-serif text-3xl md:text-[34px] font-bold text-dark-green leading-tight mt-1.5">
                    {story.name}
                  </h2>
                  <div className="text-muted text-[15px] mt-1.5">{story.sector}</div>
                </div>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  aria-label="Close story"
                  className="flex-none w-10 h-10 rounded-full border border-dark-green/10 bg-white grid place-items-center text-lg hover:bg-cream cursor-pointer"
                >
                  &#x2715;
                </button>
              </div>

              <p className="leading-relaxed">{story.story}</p>

              {story.services.length > 0 && (
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-muted mb-2">What we delivered</div>
                  <div className="flex flex-wrap gap-2">
                    {story.services.map((t) => (
                      <span key={t} className="text-[13px] bg-white border border-dark-green/10 text-dark-green rounded-full px-3 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {story.quote && (
                <blockquote className="relative bg-dark-green text-[#F0F4F1] rounded-2xl px-6 pt-6 pb-5">
                  <span aria-hidden="true" className="absolute -top-1.5 left-4 font-serif text-[76px] leading-none text-mid-green">
                    &ldquo;
                  </span>
                  <p className="mt-2.5 mb-3.5 text-[17px] leading-normal">{story.quote}</p>
                  <footer className="flex justify-between gap-3 flex-wrap text-sm text-[#B9CBBF]">
                    <span>{story.attribution}</span>
                    <span className="text-[#E9C46A] tracking-[2px]" aria-label="Five stars">
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </span>
                  </footer>
                </blockquote>
              )}

              <nav aria-label="Browse stories" className="mt-auto pt-3 border-t border-dark-green/10 flex justify-between items-center text-sm text-muted">
                <button type="button" onClick={() => open(current - 1)} className="font-semibold text-dark-green hover:text-mid-green px-1 py-2 cursor-pointer">
                  &larr; Previous
                </button>
                <span>
                  {current + 1} of {clientStories.length}
                </span>
                <button type="button" onClick={() => open(current + 1)} className="font-semibold text-dark-green hover:text-mid-green px-1 py-2 cursor-pointer">
                  Next &rarr;
                </button>
              </nav>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
