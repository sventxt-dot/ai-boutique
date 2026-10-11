"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import MonoLabel from "./mono-label";

interface HeroProps {
  eyebrow: string;
  headline: React.ReactNode;
  subline: React.ReactNode;
  cta: { label: string; href: string };
  badges?: { src: string; alt: string }[];
}

export default function Hero({
  eyebrow,
  headline,
  subline,
  cta,
  badges,
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full pt-32 pb-16 md:pt-32 md:pb-20">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20"
      >
        <MonoLabel className="mb-6 block text-left">{eyebrow}</MonoLabel>

        <h1 className="font-display uppercase text-left text-4xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-5xl mb-8 md:mb-10">
          {headline}
        </h1>

        <p className="text-base sm:text-xl font-medium text-white/80 leading-relaxed max-w-3xl mb-10 md:mb-12 text-left">
          {subline}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-6">
          <a
            href={cta.href}
            className="inline-block w-full sm:w-auto text-center bg-accent-lila hover:bg-[#d490ff] text-black font-bold text-base rounded-xl px-5 sm:px-8 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila"
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
