"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { industries } from "@/lib/industries-data";
import Button from "@/components/ui/Button";

type NavMenuKey = "industries";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
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
  const [openMenu, setOpenMenu] = useState<NavMenuKey | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<NavMenuKey | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<NavMenuKey, HTMLButtonElement | null>>>({});

  // Close all menus on route change (adjusting state during render avoids an
  // extra effect-triggered re-render — see react.dev/learn/you-might-not-need-an-effect)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setOpenMobileMenu(null);
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
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close desktop dropdown on Escape, returning focus to its trigger
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openMenu) {
        triggerRefs.current[openMenu]?.focus();
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openMenu]);

  const isIndustriesActive = pathname.startsWith("/industries");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6">
      <header
        className={`max-w-[1200px] mx-auto rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-dark-green/10 shadow-lg"
            : "bg-white/90 backdrop-blur-md border-dark-green/5 shadow-sm"
        }`}
      >
        <div className="px-5 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-lg font-bold text-dark-green tracking-tight"
          >
            Emergence Digital
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-7">
            {/* Who We Help dropdown (the industry pages) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("industries")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current.industries = el;
                }}
                aria-haspopup="menu"
                aria-expanded={openMenu === "industries"}
                aria-controls="nav-dropdown-industries"
                onClick={() => setOpenMenu((prev) => (prev === "industries" ? null : "industries"))}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isIndustriesActive ? "text-mid-green" : "text-dark-green hover:text-mid-green"
                }`}
              >
                Who We Help
                <ChevronIcon open={openMenu === "industries"} />
              </button>

              {openMenu === "industries" && (
                <div
                  id="nav-dropdown-industries"
                  role="menu"
                  aria-label="Who We Help"
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-dark-green/10 py-2">
                    {industries.map((industry) => (
                      <Link
                        key={industry.slug}
                        href={`/industries/${industry.slug}`}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-dark-green hover:bg-cream hover:text-mid-green transition-colors duration-200"
                      >
                        {industry.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

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

            <Button href="/contact" variant="primary" className="text-sm px-5 py-2.5 rounded-full">
              Contact
            </Button>
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
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 max-w-[1200px] mx-auto bg-white rounded-3xl border border-dark-green/10 shadow-lg px-6 py-4 flex flex-col gap-1 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <Link
            href="/"
            className={`text-sm font-medium py-2 ${pathname === "/" ? "text-mid-green" : "text-dark-green"}`}
          >
            Home
          </Link>

          {/* Who We Help accordion (the industry pages) */}
          <div className="border-t border-dark-green/10">
            <button
              type="button"
              onClick={() => setOpenMobileMenu((prev) => (prev === "industries" ? null : "industries"))}
              aria-expanded={openMobileMenu === "industries"}
              className={`flex items-center justify-between w-full text-sm font-medium py-3 ${
                isIndustriesActive ? "text-mid-green" : "text-dark-green"
              }`}
            >
              Who We Help
              <ChevronIcon open={openMobileMenu === "industries"} />
            </button>

            {openMobileMenu === "industries" && (
              <div className="pl-4 flex flex-col gap-3 pb-4">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="text-sm text-dark-green/80"
                  >
                    {industry.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
            <Link
              href="/contact"
              className={`text-sm font-medium py-3 ${
                pathname === "/contact" ? "text-mid-green" : "text-dark-green"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/** Header for funnel pages: the same bar with only the logo, which isn't a link. */
export function FunnelHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6">
      <header className="max-w-[1200px] mx-auto rounded-full border bg-white/90 backdrop-blur-md border-dark-green/5 shadow-sm">
        <div className="px-5 sm:px-6 flex items-center h-16">
          <span className="font-serif text-lg font-bold text-dark-green tracking-tight">Emergence Digital</span>
        </div>
      </header>
    </div>
  );
}
