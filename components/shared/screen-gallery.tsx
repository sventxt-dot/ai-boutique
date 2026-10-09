import Image from "next/image";

export default function ScreenGallery({ screens }: { screens: { src: string; alt: string }[] }) {
  return (
    <ul
      className="mb-5 flex snap-x gap-3 overflow-x-auto pb-3"
      aria-label="Screenshots der App"
    >
      {screens.map((s) => (
        <li key={s.src} className="shrink-0 snap-start">
          <Image
            src={s.src}
            alt={s.alt}
            width={480}
            height={1043}
            sizes="200px"
            className="h-[360px] w-auto rounded-2xl border border-white/10"
          />
        </li>
      ))}
    </ul>
  );
}
