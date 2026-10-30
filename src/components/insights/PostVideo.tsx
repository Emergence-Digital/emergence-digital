"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { VIMEO_ALLOW, vimeoSrc } from "@/components/ui/VimeoEmbed";
import { useAutoplayInView } from "@/lib/vimeo-autoplay";
import { formatVideoTime } from "@/lib/insights-format";

interface PostVideoContext {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  jumpTo: (seconds: number) => void;
}

const VideoContext = createContext<PostVideoContext | null>(null);

/** Tailwind's lg breakpoint: from here the video sits in its sticky column beside the story. */
const SIDE_BY_SIDE = "(min-width: 1024px)";

/**
 * One video per post, shared by the video column and every jump chip. @vimeo/player keeps one Player per iframe, so
 * the chips get the same player the autoplay hook made.
 */
export function PostVideoProvider({ children }: { children: ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const jumpTo = useCallback((seconds: number) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    // Below lg the video is up the page after the short version, so bring it on screen first.
    if (!window.matchMedia(SIDE_BY_SIDE).matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      iframe.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
    import("@vimeo/player").then(async ({ default: Player }) => {
      const player = new Player(iframe);
      await player.setCurrentTime(seconds);
      await player.play();
    }).catch(() => {});
  }, []);

  return <VideoContext.Provider value={{ iframeRef, jumpTo }}>{children}</VideoContext.Provider>;
}

function usePostVideo() {
  const context = useContext(VideoContext);
  if (!context) throw new Error("PostVideo components need a PostVideoProvider");
  return context;
}

interface PostVideoFrameProps {
  vimeoId: string | null;
  title: string;
  /** Shown in the frame until the video has a Vimeo ID. */
  poster: string;
}

/**
 * The post's 9:16 video in a phone frame. It starts muted when it first comes into view and plays once; Vimeo's own
 * controls turn the sound on. Until the video has a Vimeo ID, the frame shows its poster.
 */
export function PostVideoFrame({ vimeoId, title, poster }: PostVideoFrameProps) {
  const { iframeRef } = usePostVideo();
  useAutoplayInView(iframeRef, true, vimeoId);

  return (
    <div className="rounded-[28px] bg-[#101c18] p-2 shadow-[0_30px_60px_-30px_rgba(28,56,48,0.6),0_8px_20px_-12px_rgba(28,56,48,0.3)]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[21px] bg-dark-green">
        {vimeoId ? (
          <iframe
            ref={iframeRef}
            src={vimeoSrc(vimeoId, { muted: true })}
            title={title}
            allow={VIMEO_ALLOW}
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <Image src={poster} alt="" fill sizes="360px" className="object-cover" />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dark-green/85 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              Video coming soon
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/** "▶ 0:18 in the video": plays the post's video from the moment a section matches. */
export function JumpChip({ at }: { at: number }) {
  const { jumpTo } = usePostVideo();
  const time = formatVideoTime(at);

  return (
    <button
      type="button"
      onClick={() => jumpTo(at)}
      aria-label={`Play the video from ${time}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-dark-green/10 bg-white px-3 py-1.5 text-xs font-semibold text-dark-green shadow-[0_6px_16px_-8px_rgba(28,56,48,0.4)] transition-colors duration-200 hover:bg-mid-green hover:border-mid-green hover:text-white cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-mid-green"
    >
      <Play aria-hidden="true" className="h-3 w-3 fill-current" strokeWidth={0} />
      {time} in the video
    </button>
  );
}
