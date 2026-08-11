"use client";

import { useEffect, useState } from "react";
import { pillars, type Pillar } from "@/lib/data/scale";

function ScaleCard({ pillar, flipped }: { pillar: Pillar; flipped: boolean }) {
  return (
    <div
      className="w-[calc(50%-8px)] sm:flex-1 sm:w-auto h-56 md:h-64 lg:h-72"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(.4, 0, .2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front: large letter */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-foreground/5 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span
            className="font-display uppercase text-[#C77DFF] leading-none select-none"
            style={{ fontSize: "clamp(140px, 16vw, 220px)", lineHeight: 1 }}
          >
            {pillar.letter}
          </span>
        </div>

        {/* Back: name + tagline + description */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 bg-foreground/5 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="font-sans font-bold text-2xl uppercase text-[#C77DFF] leading-none">
              {pillar.name}
            </span>
            <span className="font-display text-xs uppercase tracking-wide text-foreground/70">
              {pillar.tagline}
            </span>
            <p className="text-base text-foreground/80 leading-relaxed mt-2 font-medium">
              {pillar.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ScaleLetters() {
  const [flipped, setFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div
      className="flex flex-wrap sm:flex-nowrap w-full gap-4 md:gap-6 cursor-pointer"
      onMouseEnter={() => { if (!isTouch) setFlipped(true); }}
      onMouseLeave={() => { if (!isTouch) setFlipped(false); }}
      onClick={() => { if (isTouch) setFlipped(f => !f); }}
    >
      {pillars.map((pillar) => (
        <ScaleCard key={pillar.letter} pillar={pillar} flipped={flipped} />
      ))}
    </div>
  );
}
