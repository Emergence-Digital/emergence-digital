import localFont from "next/font/local";

// Mangal Pro Bold, the real bold file, for the hero headline (and the logo). Other headings use the regular file from
// the root layout, made bold by the browser. Pages fetch it only when something on them uses it.
export const mangalProBold = localFont({ src: "../app/fonts/MangalProBold.ttf", weight: "700", display: "swap" });

/** Thickens letters with a stroke in their own colour drawn behind the fill, as the videos' kinetic type does. */
export const THICKEN = "[-webkit-text-stroke:0.05em_currentColor] [paint-order:stroke_fill]";

/** A hard sage drop shadow, offset down and right by `em` of the text size. */
export const sageShadow = (em: number) => ({ textShadow: `${em}em ${em}em 0 var(--color-sage)` });
