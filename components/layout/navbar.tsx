"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  // On the homepage the navbar stays on the purple wall of the hero image; elsewhere it sits on the light ground
  const onDark = usePathname() === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        !(scrolled || menuOpen)
          ? "bg-transparent"
          : onDark
            ? "bg-[#5B3878] bg-[url(/images/redesign/hero-sofa-lila.jpg)] bg-cover bg-top"
            : "bg-background/90 backdrop-blur-sm border-b border-border"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 py-3 md:py-4 flex items-center justify-between">
        {/* Logo — transparent PNG, no wrapper */}
        {/* The logo PNG has about 8% transparent margin on the left; pull it back onto the content edge. */}
        <Link href="/" className="flex items-center shrink-0 -ml-[9px] md:-ml-[13px]">
          <Image
            src="/images/AiB_Logo_Trans-Weiss.png"
            alt="Ai Boutique"
            width={300}
            height={100}
            preload
            className={cn(
              "h-14 md:h-20 w-auto object-contain transition-[filter] duration-300",
              !onDark && "invert"
            )}
          />
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#leistungen"
            className={cn(
              "text-sm font-medium transition-colors underline-offset-4 hover:underline hover:decoration-accent-yellow",
              onDark ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/70"
            )}
          >
            Leistungen
          </Link>

          <Link
            href="/#potential-check"
            className={cn(
              "text-sm font-medium transition-colors underline-offset-4 hover:underline hover:decoration-accent-yellow",
              onDark ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/70"
            )}
          >
            Potential Check
          </Link>

          <Link
            href="/kontakt"
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold transition-colors",
              onDark ? "bg-white text-foreground hover:bg-white/85" : "bg-foreground text-white hover:bg-foreground/85"
            )}
          >
            Kontakt
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={cn(
            "md:hidden flex h-11 w-11 items-center justify-center",
            onDark ? "text-white" : "text-foreground"
          )}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-8 pb-6 pt-2 flex flex-col gap-1"
        >
          <Link
            href="/#leistungen"
            onClick={closeMenu}
            className={cn("flex min-h-12 items-center text-base", onDark ? "text-white" : "text-foreground")}
          >
            Leistungen
          </Link>
          <Link
            href="/#potential-check"
            onClick={closeMenu}
            className={cn("flex min-h-12 items-center text-base", onDark ? "text-white" : "text-foreground")}
          >
            Potential Check
          </Link>
          <Link
            href="/kontakt"
            onClick={closeMenu}
            className={cn(
              "mt-2 flex min-h-12 items-center justify-center rounded-full font-bold",
              onDark ? "bg-white text-foreground" : "bg-foreground text-white"
            )}
          >
            Kontakt
          </Link>
        </div>
      )}
    </nav>
  );
}
