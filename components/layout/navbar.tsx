"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
        scrolled || menuOpen
          ? "bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 py-3 md:py-4 flex items-center justify-between">
        {/* Logo — transparent PNG, no wrapper */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/AiB_Logo_Trans-Weiss.png"
            alt="Ai Boutique"
            width={300}
            height={100}
            priority
            className="h-14 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#leistungen"
            className="text-sm text-foreground hover:text-foreground/70 transition-colors underline-offset-4 hover:underline hover:decoration-accent-yellow"
          >
            Leistungen
          </Link>

          <Link
            href="/#potential-check"
            className="text-sm text-foreground hover:text-foreground/70 transition-colors underline-offset-4 hover:underline hover:decoration-accent-yellow"
          >
            Potential Check
          </Link>

          <Link href="/kontakt">
            <Button
              size="sm"
              className="bg-[#1a0a2e] text-white border-none hover:bg-[#1a0a2e]/85"
            >
              Kontakt
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex h-11 w-11 items-center justify-center text-foreground"
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
            className="flex min-h-12 items-center text-base text-foreground"
          >
            Leistungen
          </Link>
          <Link
            href="/#potential-check"
            onClick={closeMenu}
            className="flex min-h-12 items-center text-base text-foreground"
          >
            Potential Check
          </Link>
          <Link
            href="/kontakt"
            onClick={closeMenu}
            className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-[#C77DFF] font-bold text-black"
          >
            Kontakt
          </Link>
        </div>
      )}
    </nav>
  );
}
