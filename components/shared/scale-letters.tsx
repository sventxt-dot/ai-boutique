import { pillars } from "@/lib/data/scale";

export default function ScaleLetters() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {pillars.map((pillar) => (
        <li key={pillar.letter} className="flex flex-col gap-3 rounded-[20px] bg-white px-6 pt-7 pb-8">
          <span
            aria-hidden="true"
            className="font-display uppercase text-accent-lila text-8xl leading-none select-none"
          >
            {pillar.letter}
          </span>
          <h3 className="mt-2 text-lg font-bold tracking-wide text-accent-lila-ink">{pillar.name}</h3>
          <p className="text-[15px] leading-relaxed font-medium text-[#3E3A44]">{pillar.description}</p>
        </li>
      ))}
    </ol>
  );
}
