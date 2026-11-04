"use client";

import { useState } from "react";
import Image from "next/image";

export default function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  subtle = false,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  // Thin white line with a small handle, for use inside tiles
  subtle?: boolean;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className={`relative mx-auto w-full max-w-3xl aspect-[818/507] select-none ${subtle ? "" : "mb-5"}`}>
      <Image src={before} alt={beforeAlt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-contain" />
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-contain"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />
      {subtle ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[4%] bottom-[10%] w-px -translate-x-1/2 bg-white/80"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent-lila-ink shadow-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-[#FFF56E]"
          style={{ left: `${pos}%` }}
        />
      )}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Vergleich zwischen Vorher und Nachher verschieben"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
