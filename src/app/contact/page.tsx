import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Emergence Digital",
  description:
    "Get in touch with Emergence Digital. We'd love to hear about your project.",
};

const LinkedInIcon = () => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function ContactPage() {
  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading + contact details */}
          <div>
            <SectionLabel>Contact Us</SectionLabel>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-4">
              Get in Touch
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-12">
              Book a strategy call to map your first campaign.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-1">
                  Email
                </p>
                <a
                  href="mailto:contact@emergencedigital.com.au"
                  className="text-dark-green font-medium hover:text-mid-green transition-colors duration-200"
                >
                  contact@emergencedigital.com.au
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-1">
                  Location
                </p>
                <p className="text-dark-green font-medium">
                  Suite 4, 184 Main Street
                  <br />
                  Lilydale, VIC Australia
                </p>
                <div className="mt-4 rounded-xl overflow-hidden border border-dark-green/10">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      "Suite 4, 184 Main Street, Lilydale, VIC, Australia"
                    )}&output=embed`}
                    className="w-full h-48"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Emergence Digital location map"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-green hover:text-mid-green transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-green hover:text-mid-green transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-green hover:text-mid-green transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — contact form (client component) */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
