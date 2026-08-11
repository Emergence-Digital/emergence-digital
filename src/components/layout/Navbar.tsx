"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/services-data";
import { industries } from "@/lib/industries-data";

type NavMenuKey = "services";

const navLinks = [
  { label: "Packages", href: "/packages" },
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

  const isServicesActive = pathname.startsWith("/services");

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
          {/* Industries links */}
          {industries.map((industry) => {
            const href = `/industries/${industry.slug}`;
            return (
              <Link
                key={industry.slug}
                href={href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === href ? "text-mid-green" : "text-dark-green hover:text-mid-green"
                }`}
              >
                {industry.label}
              </Link>
            );
          })}

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current.services = el;
              }}
              aria-haspopup="menu"
              aria-expanded={openMenu === "services"}
              aria-controls="nav-dropdown-services"
              onClick={() => setOpenMenu((prev) => (prev === "services" ? null : "services"))}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                isServicesActive ? "text-mid-green" : "text-dark-green hover:text-mid-green"
              }`}
            >
              Services
              <ChevronIcon open={openMenu === "services"} />
            </button>

            {openMenu === "services" && (
              <div
                id="nav-dropdown-services"
                role="menu"
                aria-label="Service categories"
                className="absolute top-full left-0 pt-3 w-60"
              >
                <div className="bg-white rounded-xl shadow-lg border border-dark-green/10 py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/services/${category.slug}`}
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-dark-green hover:bg-cream hover:text-mid-green transition-colors duration-200"
                    >
                      {category.label}
                    </Link>
                  ))}
                  <div className="border-t border-dark-green/10 mt-2 pt-2">
                    <Link
                      href="/services"
                      role="menuitem"
                      className="block px-4 py-2 text-xs font-semibold tracking-widest uppercase text-mid-green hover:text-dark-green transition-colors duration-200"
                    >
                      View all services →
                    </Link>
                  </div>
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

          {/* Industries links */}
          <div className="border-t border-dark-green/10 flex flex-col">
            {industries.map((industry) => {
              const href = `/industries/${industry.slug}`;
              return (
                <Link
                  key={industry.slug}
                  href={href}
                  className={`text-sm font-medium py-3 ${
                    pathname === href ? "text-mid-green" : "text-dark-green"
                  }`}
                >
                  {industry.label}
                </Link>
              );
            })}
          </div>

          {/* Services accordion */}
          <div className="border-t border-dark-green/10">
            <button
              type="button"
              onClick={() => setOpenMobileMenu((prev) => (prev === "services" ? null : "services"))}
              aria-expanded={openMobileMenu === "services"}
              className={`flex items-center justify-between w-full text-sm font-medium py-3 ${
                isServicesActive ? "text-mid-green" : "text-dark-green"
              }`}
            >
              Services
              <ChevronIcon open={openMobileMenu === "services"} />
            </button>

            {openMobileMenu === "services" && (
              <div className="pl-4 flex flex-col gap-3 pb-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/services/${category.slug}`}
                    className="text-sm text-dark-green/80"
                  >
                    {category.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="text-xs font-semibold tracking-widest uppercase text-mid-green"
                >
                  View all services →
                </Link>
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
          </div>
        </div>
      )}
    </header>
  );
}
