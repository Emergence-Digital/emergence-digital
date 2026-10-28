"use client";

import { useRef } from "react";
import { useAutoplayInView } from "@/lib/vimeo-autoplay";

/**
 * Responsive 16:9 Vimeo player. The batch-shoot videos are 1920×1080; Vimeo's
 * own embed code came out at 4:3 (75% padding), which letterboxes them.
 */
interface VimeoEmbedProps {
  /** Vimeo video ID, e.g. 1239802638 from player.vimeo.com/video/1239802638. */
  id: string;
  /** Accessible name for the iframe. */
  title: string;
  /** Play muted while on screen, pause when scrolled away. */
  autoplay?: boolean;
  className?: string;
}

export const VIMEO_ALLOW = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share";

// title/byline/portrait are off because the Vimeo titles are working names ("Review v1"). The control bar keeps
// play, volume, captions, settings and fullscreen; speed, transcript, picture-in-picture, chapters, AirPlay,
// Chromecast and the Vimeo logo are off. The like, watch later, share and embed buttons have no parameter:
// they're turned off in each video's embed settings on Vimeo.
const PLAYER_PARAMS =
  "badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0" +
  "&speed=0&transcript=0&pip=0&chapters=0&airplay=0&chromecast=0&vimeo_logo=0";

/** Player URL for a Vimeo ID. */
export function vimeoSrc(id: string, { autoplay = false, muted = false } = {}) {
  return `https://player.vimeo.com/video/${encodeURIComponent(id)}?${PLAYER_PARAMS}${autoplay ? "&autoplay=1" : ""}${muted ? "&muted=1" : ""}`;
}

export default function VimeoEmbed({ id, title, autoplay = false, className = "" }: VimeoEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useAutoplayInView(iframeRef, autoplay, id);

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-dark-green/5 shadow-sm ${className}`}>
      <iframe
        ref={iframeRef}
        src={vimeoSrc(id, { muted: autoplay })}
        title={title}
        allow={VIMEO_ALLOW}
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
