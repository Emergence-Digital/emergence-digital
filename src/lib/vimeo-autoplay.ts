"use client";

import { useEffect, type RefObject } from "react";

/**
 * Plays a muted Vimeo embed while at least half of it is on screen, and pauses it when it scrolls away, so a page
 * with several videos only plays the one in view. It resumes when scrolled back only if it was playing when it left,
 * so a video the viewer paused, or one that finished, stays put. The iframe must load with muted=1: browsers only
 * let a page start video without a click when it's muted.
 *
 * `videoId` re-runs it when the iframe is swapped for another video (ResponsiveVimeoEmbed).
 */
export function useAutoplayInView(iframeRef: RefObject<HTMLIFrameElement | null>, enabled: boolean, videoId: string | null) {
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!enabled || !iframe || !videoId) return;

    let cancelled = false;
    let cleanup = () => {};

    // Loaded here rather than at the top, so the player library stays out of the server render and the first bundle.
    import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled) return;
      const player = new Player(iframe);
      let inView = false;
      let started = false;
      let playing = false;
      let pausedByScroll = false;

      const onPlay = () => {
        started = true;
        playing = true;
      };
      const onPause = () => {
        playing = false;
      };
      player.on("play", onPlay);
      player.on("pause", onPause);
      player.on("ended", onPause);

      const observer = new IntersectionObserver(
        ([entry]) => {
          const nowInView = entry.intersectionRatio >= 0.5;
          if (nowInView === inView) return;
          inView = nowInView;
          if (inView && (!started || pausedByScroll)) {
            pausedByScroll = false;
            player.play().catch(() => {});
          } else if (!inView && playing) {
            pausedByScroll = true;
            player.pause().catch(() => {});
          }
        },
        { threshold: [0, 0.5] },
      );
      observer.observe(iframe);

      cleanup = () => {
        observer.disconnect();
        player.off("play", onPlay);
        player.off("pause", onPause);
        player.off("ended", onPause);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [iframeRef, enabled, videoId]);
}
