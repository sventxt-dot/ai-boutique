"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import MonoLabel from "./mono-label";

interface VideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  eyebrow: string;
  headline: React.ReactNode;
  subline: React.ReactNode;
  cta: { label: string; href: string };
}

export default function VideoHero({
  videoSrc,
  posterSrc,
  eyebrow,
  headline,
  subline,
  cta,
}: VideoHeroProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Check if desktop
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop && !mediaQuery.matches) {
      setShowVideo(true);
    }

    // Listen for resize
    const handleResize = () => {
      const isDesktopNow = window.matchMedia("(min-width: 768px)").matches;
      setShowVideo(isDesktopNow && !mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background: Video or Poster */}
      <div className="absolute inset-0 w-full h-full">
        {showVideo && !prefersReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full object-cover bg-cover bg-center"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
        )}
      </div>

      {/* Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />

      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, oklch(0.153 0.006 107.1))",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center text-foreground"
      >
        {/* Eyebrow */}
        <MonoLabel className="text-foreground/70 mb-6 inline-block">
          {eyebrow}
        </MonoLabel>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display uppercase leading-tight mb-8 tracking-[0px]">
          {headline}
        </h1>

        {/* Subline */}
        <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-10 font-semibold">
          {subline}
        </p>

        {/* CTA */}
        <a
          href={cta.href}
          className="inline-block bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold text-base rounded-xl px-8 py-4 transition-colors"
        >
          {cta.label}
        </a>
      </motion.div>
    </section>
  );
}
