"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MonoLabel from "./mono-label";

interface VideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  eyebrow: string;
  headline: React.ReactNode;
  subline: React.ReactNode;
  cta: { label: string; href: string };
  badges?: { src: string; alt: string }[];
}

export default function VideoHero({
  videoSrc,
  posterSrc,
  eyebrow,
  headline,
  subline,
  cta,
  badges,
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
    <section className="relative w-full min-h-svh pt-28 pb-16 md:py-28 flex items-center overflow-hidden">
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

      {/* Mobile darkening over poster */}
      <div className="absolute inset-0 bg-background/45 pointer-events-none md:hidden" />

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
        className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 text-foreground"
      >
        {/* Eyebrow */}
        <MonoLabel className="text-foreground/70 mb-4 md:mb-6 block text-left">
          {eyebrow}
        </MonoLabel>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display uppercase leading-tight mb-6 md:mb-8 tracking-[0px] text-left">
          {headline}
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-xl md:text-2xl font-sans font-medium text-white/90 leading-relaxed max-w-2xl mb-8 md:mb-10 text-left">
          {subline}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-6">
          <a
            href={cta.href}
            className="inline-block w-full sm:w-auto text-center bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold text-base rounded-xl px-5 sm:px-8 py-4 transition-colors"
          >
            {cta.label}
          </a>
          {badges?.map((badge) => (
            <Image
              key={badge.src}
              src={badge.src}
              alt={badge.alt}
              width={106}
              height={106}
              className="h-20 w-20 md:h-[106px] md:w-[106px] [clip-path:circle(46.5%)]"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
