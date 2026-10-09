"use client";

import { useState } from "react";
import Image from "next/image";

export default function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative mx-auto mb-5 max-w-3xl aspect-[818/507] select-none">
      <Image src={before} alt={beforeAlt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-contain" />
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-contain"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-[#FFF56E]"
        style={{ left: `${pos}%` }}
      />
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
