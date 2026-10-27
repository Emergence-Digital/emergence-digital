// Client video testimonials for the home page "In their words" section. Media lives in public/testimonials/
// and comes from the web package in Adobe MCPs/client-testimonials/deliverables/web/ (see its README).
// No job titles on the site: name and company only. The quotes are the clients' own words, so keep them verbatim.

export type VideoTestimonial = {
  slug: string;
  name: string;
  company: string;
  /** The line the voice button plays, word for word. */
  quote: string;
  /** Length of the full video, for labels. */
  duration: string;
  video: { hd: string; sd: string };
  /** 16:9, with the play button, name and logo already on it. */
  poster: string;
  captions: string;
  audio: string;
};

const media = (slug: string) => ({
  video: { hd: `/testimonials/${slug}-1080p.mp4`, sd: `/testimonials/${slug}-720p.mp4` },
  poster: `/testimonials/${slug}-poster.webp`,
  captions: `/testimonials/${slug}.vtt`,
  audio: `/testimonials/${slug}-quote.m4a`,
});

export const testimonials: VideoTestimonial[] = [
  {
    slug: "michael-freeman-rev-trac",
    name: "Michael Freeman",
    company: "Rev-Trac",
    quote: "You've been invaluable to us, and I would highly recommend Emergence Digital.",
    duration: "0:30",
    ...media("michael-freeman-rev-trac"),
  },
  {
    slug: "arul-arogyanathan-bcs",
    name: "Arul Arogyanathan",
    company: "BCS (Business Core Solutions)",
    quote: "Emergence takes care of our marketing needs and go-to-market strategy through sales outreach.",
    duration: "0:46",
    ...media("arul-arogyanathan-bcs"),
  },
];
