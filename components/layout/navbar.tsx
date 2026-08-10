"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo — transparent PNG, no wrapper */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/smart intelligenz_trans_weiss.png"
            alt="Ai Boutique"
            width={240}
            height={80}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">
          <Link
            href="/leistungen"
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
      </div>
    </nav>
  );
}
