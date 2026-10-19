"use client";

import type { KeyboardEvent, RefObject } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { getGoal, serviceImage, type Service } from "@/lib/services-data";

interface ServiceDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  service: Service | undefined;
  /** Where the service sits in the list being browsed, for the "3 of 20" counter. */
  index: number;
  total: number;
  onStep: (delta: number) => void;
}

/**
 * The service pop-up, shared by the services library and the industry pages: the scene on the left and
 * everything about the service on the right, with previous/next to browse a list. The parent opens it
 * with showModal() and listens for "close". On desktop the text column scrolls on its own, so short
 * screens can still reach the bottom; on phones the whole pop-up scrolls.
 */
export default function ServiceDialog({ dialogRef, service, index, total, onStep }: ServiceDialogProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") onStep(1);
    if (e.key === "ArrowLeft") onStep(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="service-title"
      onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      onKeyDown={onKeyDown}
      className="m-auto outline-none w-[min(960px,calc(100vw-32px))] max-w-none max-h-[calc(100dvh-24px)] md:max-h-[calc(100dvh-48px)] p-0 rounded-[20px] bg-[#FBF8F5] text-body shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] overflow-y-auto overscroll-contain md:overflow-hidden backdrop:bg-[rgba(18,36,31,0.6)] backdrop:backdrop-blur-sm"
    >
      {service && (
        <div className="md:grid md:grid-cols-[5fr_7fr]">
          {/* The scene is 5:3 and the panel is tall, so show it whole over a blurred copy of itself. */}
          <div className="relative bg-[#F1E4C0] aspect-[5/3] md:aspect-auto overflow-hidden">
            <Image src={serviceImage(service.slug)} alt="" fill sizes="400px" className="object-cover scale-125 blur-2xl opacity-70" aria-hidden="true" />
            <Image
              src={serviceImage(service.slug)}
              alt=""
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-contain p-4 md:p-6"
            />
          </div>
          <div className="flex flex-col gap-[18px] px-5 pt-6 pb-5 md:px-10 md:pt-9 md:pb-7 md:max-h-[calc(100dvh-48px)] md:overflow-y-auto md:overscroll-contain">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-mid-green">
                  {service.goals.map((g) => getGoal(g)?.label).join(" · ")}
                </div>
                <h2 id="service-title" className="font-serif text-3xl md:text-[34px] font-bold text-dark-green leading-tight mt-1.5">
                  {service.title}
                </h2>
                <p className="text-muted text-[17px] leading-snug mt-1.5">{service.outcome}</p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close service"
                className="flex-none w-10 h-10 rounded-full border border-dark-green/10 bg-white grid place-items-center text-lg hover:bg-cream cursor-pointer"
              >
                &#x2715;
              </button>
            </div>

            <p className="leading-relaxed">{service.intro}</p>

            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-muted mb-2.5">What you get</div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li key={f.title} className="bg-white border border-dark-green/10 rounded-xl px-4 py-3">
                    <div className="text-[15px] font-semibold text-dark-green">{f.title}</div>
                    <p className="text-sm text-muted leading-snug mt-1">{f.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-green text-[#F0F4F1] rounded-2xl px-6 py-5">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#7EB893] mb-2">Who it&rsquo;s for</div>
              <p className="text-[15px] leading-relaxed">{service.whoItsFor}</p>
            </div>

            <div>
              <Button href="/contact" variant="primary">
                Book a Strategy Call
              </Button>
            </div>

            <nav aria-label="Browse services" className="mt-auto pt-3 border-t border-dark-green/10 flex justify-between items-center text-sm text-muted">
              <button type="button" onClick={() => onStep(-1)} className="font-semibold text-dark-green hover:text-mid-green px-1 py-2 cursor-pointer">
                &larr; Previous
              </button>
              <span>
                {index + 1} of {total}
              </span>
              <button type="button" onClick={() => onStep(1)} className="font-semibold text-dark-green hover:text-mid-green px-1 py-2 cursor-pointer">
                Next &rarr;
              </button>
            </nav>
          </div>
        </div>
      )}
    </dialog>
  );
}
