"use client";

import { useRef, useSyncExternalStore } from "react";
import { VIMEO_ALLOW, vimeoSrc } from "@/components/ui/VimeoEmbed";
import { useAutoplayInView } from "@/lib/vimeo-autoplay";

/** Tailwind's md breakpoint: the 16:9 cut from 768px up, the 4:5 cut below. */
const DESKTOP_QUERY = "(min-width: 768px)";

// resize as well as the query's change event, which some browsers skip when the viewport is emulated.
// Either one only re-renders when the answer flips.
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    query.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
};

interface ResponsiveVimeoEmbedProps {
  /** Vimeo ID of the 16:9 cut, for desktop and tablet. */
  desktopId: string;
  /** Vimeo ID of the 4:5 cut, for phones. */
  mobileId: string;
  /** Accessible name for the iframe. */
  title: string;
  /** Play muted while on screen, pause when scrolled away. */
  autoplay?: boolean;
  className?: string;
}

/**
 * Vimeo player with a 16:9 cut for desktop and a 4:5 cut for phones. Only the cut that fits the screen loads.
 * The frame's shape comes from CSS, so it's the right size before the player arrives.
 */
export default function ResponsiveVimeoEmbed({
  desktopId,
  mobileId,
  title,
  autoplay = false,
  className = "",
}: ResponsiveVimeoEmbedProps) {
  // null on the server and during hydration, so the server HTML never guesses the screen size.
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP_QUERY).matches, () => null);
  const id = isDesktop === null ? null : isDesktop ? desktopId : mobileId;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useAutoplayInView(iframeRef, autoplay, id);

  return (
    <div
      className={`relative aspect-[4/5] md:aspect-video w-full overflow-hidden rounded-2xl bg-dark-green/5 shadow-sm ${className}`}
    >
      {id && (
        <iframe
          key={id}
          ref={iframeRef}
          src={vimeoSrc(id, { muted: autoplay })}
          title={title}
          allow={VIMEO_ALLOW}
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
