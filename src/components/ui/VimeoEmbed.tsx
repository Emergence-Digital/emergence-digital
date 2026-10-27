/**
 * Responsive 16:9 Vimeo player. The batch-shoot videos are 1920×1080; Vimeo's
 * own embed code came out at 4:3 (75% padding), which letterboxes them.
 */
interface VimeoEmbedProps {
  /** Vimeo video ID, e.g. 1239802638 from player.vimeo.com/video/1239802638. */
  id: string;
  /** Accessible name for the iframe. */
  title: string;
  className?: string;
}

export default function VimeoEmbed({ id, title, className = "" }: VimeoEmbedProps) {
  // title/byline/portrait off: the Vimeo titles are working names ("Review v1").
  const src = `https://player.vimeo.com/video/${encodeURIComponent(id)}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-dark-green/5 shadow-sm ${className}`}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
