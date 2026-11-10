"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import MonoLabel from "./mono-label";

interface HeroProps {
  eyebrow: string;
  headline: React.ReactNode;
  /** Intro paragraphs below the image */
  intro: React.ReactNode[];
  cta: { label: string; href: string };
  badges?: { src: string; alt: string }[];
  image: string;
}

export default function Hero({
  eyebrow,
  headline,
  intro,
  cta,
  badges,
  image,
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Background matches the wall in the image, so on narrow screens the image can sit at its own ratio below the text */}
      <section className="relative w-full md:min-h-[clamp(760px,70vw,1080px)] overflow-hidden bg-[#5B3878]">
        <div className="absolute inset-x-0 bottom-0 aspect-[1485/1055] md:aspect-auto md:top-0">
          <Image
            src={image}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-bottom md:object-[center_85%]"
          />
          {/* On narrow screens the image starts below the text; blend its top edge into the wall color */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-[#5B3878] to-[#5B3878]/0 md:hidden"
          />
        </div>
        {/* Lets the floor of the image run into the page ground */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[12%] md:h-[22%] bg-linear-to-b from-background/0 to-background"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-36 md:pt-44 pb-[28vw] md:pb-20 text-white"
        >
          <MonoLabel className="block mb-8 text-[#F3EDFB]">
            {eyebrow}
          </MonoLabel>

          <h1 className="font-normal text-left">{headline}</h1>
        </motion.div>
      </section>

      <section className="w-full pt-12 pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[30px] md:gap-8 mb-16">
            {intro.map((paragraph, i) => (
              <p key={i} className="text-lg leading-[1.7] font-medium text-[#34303A]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={cta.href}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 min-h-14 bg-accent-lila hover:bg-[#d490ff] text-black font-bold text-base rounded-full px-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila"
            >
              {cta.label} <span aria-hidden="true">→</span>
            </a>
            {/* Grouped so the badges wrap together, never one beside the button and one below */}
            {badges && badges.length > 0 && (
              <div className="flex items-center gap-6">
                {badges.map((badge) => (
                  <Image
                    key={badge.src}
                    src={badge.src}
                    alt={badge.alt}
                    width={96}
                    height={96}
                    className="h-24 w-24 [clip-path:circle(46.5%)]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
