"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, type CategorySlug } from "@/lib/services-data";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<CategorySlug | null>(null);
  const [openMobileCategory, setOpenMobileCategory] = useState<CategorySlug | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<CategorySlug, HTMLButtonElement | null>>>({});

  // Close all menus on route change (adjusting state during render avoids an
  // extra effect-triggered re-render — see react.dev/learn/you-might-not-need-an-effect)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenCategory(null);
    setOpenMobileCategory(null);
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close desktop dropdown on Escape, returning focus to its trigger
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openCategory) {
        triggerRefs.current[openCategory]?.focus();
        setOpenCategory(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openCategory]);

  const isCategoryActive = (slug: CategorySlug) => pathname.startsWith(`/services/${slug}`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-cream"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-dark-green tracking-tight"
        >
          Emergence Digital
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-8">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="relative"
              onMouseEnter={() => setOpenCategory(category.slug)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current[category.slug] = el;
                }}
                aria-haspopup="menu"
                aria-expanded={openCategory === category.slug}
                aria-controls={`nav-dropdown-${category.slug}`}
                onClick={() =>
                  setOpenCategory((prev) => (prev === category.slug ? null : category.slug))
                }
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isCategoryActive(category.slug)
                    ? "text-mid-green"
                    : "text-dark-green hover:text-mid-green"
                }`}
              >
                {category.label}
                <ChevronIcon open={openCategory === category.slug} />
              </button>

              {openCategory === category.slug && (
                <div
                  id={`nav-dropdown-${category.slug}`}
                  role="menu"
                  aria-label={`${category.label} services`}
                  className="absolute top-full left-0 pt-3 w-60"
                >
                  <div className="bg-white rounded-xl shadow-lg border border-dark-green/10 py-2">
                    {category.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${category.slug}/${service.slug}`}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-dark-green hover:bg-cream hover:text-mid-green transition-colors duration-200"
                      >
                        {service.label}
                      </Link>
                    ))}
                    <div className="border-t border-dark-green/10 mt-2 pt-2">
                      <Link
                        href={`/services/${category.slug}`}
                        role="menuitem"
                        className="block px-4 py-2 text-xs font-semibold tracking-widest uppercase text-mid-green hover:text-dark-green transition-colors duration-200"
                      >
                        View all {category.label} services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === href
                  ? "text-mid-green"
                  : "text-dark-green hover:text-mid-green"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 text-dark-green"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-dark-green transition-all duration-200 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark-green transition-all duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark-green transition-all duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream border-t border-dark-green/10 px-6 py-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href="/"
            className={`text-sm font-medium py-2 ${pathname === "/" ? "text-mid-green" : "text-dark-green"}`}
          >
            Home
          </Link>

          {categories.map((category) => (
            <div key={category.slug} className="border-t border-dark-green/10 first:border-t-0">
              <button
                type="button"
                onClick={() =>
                  setOpenMobileCategory((prev) => (prev === category.slug ? null : category.slug))
                }
                aria-expanded={openMobileCategory === category.slug}
                className={`flex items-center justify-between w-full text-sm font-medium py-3 ${
                  isCategoryActive(category.slug) ? "text-mid-green" : "text-dark-green"
                }`}
              >
                {category.label}
                <ChevronIcon open={openMobileCategory === category.slug} />
              </button>

              {openMobileCategory === category.slug && (
                <div className="pl-4 flex flex-col gap-3 pb-4">
                  {category.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${category.slug}/${service.slug}`}
                      className="text-sm text-dark-green/80"
                    >
                      {service.label}
                    </Link>
                  ))}
                  <Link
                    href={`/services/${category.slug}`}
                    className="text-xs font-semibold tracking-widest uppercase text-mid-green"
                  >
                    View all {category.label} services →
                  </Link>
                </div>
              )}
            </div>
          ))}

          <div className="border-t border-dark-green/10 flex flex-col gap-1 pt-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium py-3 ${
                  pathname === href ? "text-mid-green" : "text-dark-green"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
