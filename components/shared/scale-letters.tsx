"use client";

import { useEffect, useState } from "react";
import { pillars, type Pillar } from "@/lib/data/scale";

function ScaleCard({ pillar, flipped }: { pillar: Pillar; flipped: boolean }) {
  return (
    <div className="flex-1 h-72" style={{ perspective: "1000px" }}>
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
          className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-white overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span
            className="font-display uppercase text-accent-lila leading-none select-none"
            style={{ fontSize: "clamp(140px, 14vw, 200px)", lineHeight: 1 }}
          >
            {pillar.letter}
          </span>
        </div>

        {/* Back: name + description */}
        <div
          className="absolute inset-0 flex flex-col gap-3 rounded-[20px] bg-white px-6 pt-7 pb-8 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-lg font-bold tracking-wide text-accent-lila-ink">{pillar.name}</h3>
          <p className="text-[15px] leading-relaxed font-medium text-[#3E3A44]">{pillar.description}</p>
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
    <>
      {/* Below lg: static cards, no tapping needed */}
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
        {pillars.map((pillar) => (
          <li key={pillar.letter} className="flex flex-col gap-3 rounded-[20px] bg-white px-6 pt-7 pb-8">
            {/* One word with the lila initial, so the letter and the name read as one */}
            <h3 className="font-display uppercase text-5xl leading-none tracking-wide text-foreground">
              <span className="text-accent-lila">{pillar.name.charAt(0)}</span>
              {pillar.name.slice(1)}
            </h3>
            <p className="text-[15px] leading-relaxed font-medium text-[#3E3A44]">{pillar.description}</p>
          </li>
        ))}
      </ol>

      {/* Desktop: all cards flip together on hover, or on tap for touch screens */}
      <div
        className="hidden lg:flex flex-nowrap w-full gap-5 cursor-pointer"
        onMouseEnter={() => { if (!isTouch) setFlipped(true); }}
        onMouseLeave={() => { if (!isTouch) setFlipped(false); }}
        onClick={() => { if (isTouch) setFlipped(f => !f); }}
      >
        {pillars.map((pillar) => (
          <ScaleCard key={pillar.letter} pillar={pillar} flipped={flipped} />
        ))}
      </div>
    </>
  );
}
