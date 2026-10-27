"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { Pause, Volume2 } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { VIMEO_ALLOW, vimeoSrc } from "@/components/ui/VimeoEmbed";
import { trackEvent } from "@/lib/analytics";
import { testimonials, type VideoTestimonial } from "@/lib/testimonials";

/**
 * "In their words": two client video testimonials under the logo wall. Each poster opens a pop-up with the
 * Vimeo video (same look as the client stories pop-up), and each card has a voice button that plays
 * the client's best line inline, one at a time.
 */
export default function VideoTestimonials() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const voiceSlug = useRef<string | null>(null);
  const [current, setCurrent] = useState(-1);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const t: VideoTestimonial | undefined = testimonials[current];

  const openVideo = (i: number) => {
    voiceRef.current?.pause();
    lastFocus.current = document.activeElement as HTMLElement;
    // Render the player now, so its autoplay still counts as part of the click (browsers only allow sound after one).
    flushSync(() => setCurrent(i));
    dialogRef.current?.showModal();
    trackEvent("testimonial_video_play", { testimonial: testimonials[i].slug });
  };

  const toggleVoice = (item: VideoTestimonial) => {
    let audio = voiceRef.current;
    if (!audio) {
      const el = new Audio();
      el.addEventListener("play", () => setSpeaking(voiceSlug.current));
      el.addEventListener("pause", () => setSpeaking(null));
      el.addEventListener("timeupdate", () => setProgress(el.duration ? el.currentTime / el.duration : 0));
      voiceRef.current = audio = el;
    }
    if (voiceSlug.current === item.slug && !audio.paused) {
      audio.pause();
      return;
    }
    voiceSlug.current = item.slug;
    audio.src = item.audio;
    setProgress(0);
    audio.play().catch(() => {});
    trackEvent("testimonial_voice_play", { testimonial: item.slug });
  };

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    // Clearing current unmounts the player, which stops it.
    const onClose = () => {
      setCurrent(-1);
      lastFocus.current?.focus();
    };
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("close", onClose);
      voiceRef.current?.pause();
    };
  }, []);

  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-14">
          <SectionLabel>In Their Words</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark-green">Hear it from our clients.</h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((item, i) => {
            const firstName = item.name.split(" ")[0];
            const on = speaking === item.slug;
            return (
              <li key={item.slug} className="flex flex-col bg-white border border-dark-green/10 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => openVideo(i)}
                  aria-label={`Play video: ${item.name}, ${item.company} (${item.duration})`}
                  className="group relative block aspect-video bg-dark-green overflow-hidden cursor-pointer focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-mid-green"
                >
                  <Image
                    src={item.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-dark-green/85 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-white">
                    {item.duration}
                  </span>
                </button>

                <figure className="flex flex-col gap-5 flex-1 px-6 pt-5 pb-6 md:px-7">
                  <blockquote className="font-serif text-xl md:text-[22px] leading-snug text-dark-green">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                    <div className="min-w-0">
                      <div className="font-semibold text-dark-green">{item.name}</div>
                      <div className="text-sm text-muted">{item.company}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleVoice(item)}
                      aria-pressed={on}
                      className="relative flex-none inline-flex items-center gap-2 overflow-hidden rounded-full border border-dark-green/15 bg-cream py-1.5 pl-1.5 pr-4 text-sm font-semibold text-dark-green transition-colors hover:border-mid-green/50 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-mid-green"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 bg-mid-green/20 transition-[width] duration-300 ease-linear"
                        style={{ width: on ? `${progress * 100}%` : 0 }}
                      />
                      <span aria-hidden="true" className="relative grid place-items-center w-7 h-7 rounded-full bg-mid-green text-white">
                        {on ? <Pause size={13} fill="currentColor" strokeWidth={0} /> : <Volume2 size={15} />}
                      </span>
                      <span className="relative">
                        Hear {firstName}
                        <span className="sr-only"> say it</span>
                      </span>
                    </button>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="testimonial-name"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto outline-none w-[min(960px,calc(100vw-32px),calc((100dvh-150px)*16/9))] max-w-none max-h-[calc(100dvh-24px)] md:max-h-[calc(100dvh-48px)] p-0 rounded-[20px] bg-[#FBF8F5] text-body shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] overflow-y-auto overscroll-contain backdrop:bg-[rgba(18,36,31,0.6)] backdrop:backdrop-blur-sm"
      >
        {t && (
          <>
            <div className="relative aspect-video bg-black">
              <iframe
                key={t.slug}
                src={vimeoSrc(t.vimeoId, { autoplay: true })}
                title={`${t.name}, ${t.company}`}
                allow={VIMEO_ALLOW}
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="flex justify-between items-center gap-4 px-5 py-4 md:px-8 md:py-5">
              <div>
                <h2 id="testimonial-name" className="font-serif text-2xl md:text-[28px] font-bold text-dark-green leading-tight">
                  {t.name}
                </h2>
                <div className="text-muted text-[15px] mt-0.5">{t.company}</div>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close video"
                className="flex-none w-10 h-10 rounded-full border border-dark-green/10 bg-white grid place-items-center text-lg hover:bg-cream cursor-pointer"
              >
                &#x2715;
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
