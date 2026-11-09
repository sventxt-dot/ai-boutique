"use client";

import { useState } from "react";
import MonoLabel from "./mono-label";

const SHOWREEL_SRC = "/video/portfolio-showreel.mp4";
const SHOWREEL_POSTER = "/images/portfolio/showreel-poster.jpg";

export default function PortfolioTeaser() {
  const [videoMissing, setVideoMissing] = useState(false);

  return (
    <div className="mt-28">
      <MonoLabel className="block mb-4">Portfolio</MonoLabel>
      <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight mb-5">
        Native Creative
      </h2>

      {videoMissing ? (
        <div className="rounded-3xl border border-border bg-white p-8 text-center text-muted-foreground text-sm">
          Das Video lässt sich gerade nicht laden.
        </div>
      ) : (
        <>
          <p className="text-base md:text-lg text-[#34303A] leading-relaxed font-medium max-w-3xl mb-8">
            Texterschmiede, Werbeagenturen in Hamburg und München. Funk, Plakat, TV, Pitch, Branding, Social Media, New Business und große Kunden. 2008 Marketing Studium. Seit 2016 freier Creative Director. Jetzt zertifizierter KI-Experte mit Spezialisierung auf Agentic Marketing.
          </p>
          <video
            controls
            playsInline
            preload="metadata"
            poster={SHOWREEL_POSTER}
            className="w-full max-w-4xl rounded-3xl bg-[#E9E0F4] aspect-video"
            onError={() => setVideoMissing(true)}
          >
            <source src={SHOWREEL_SRC} type="video/mp4" onError={() => setVideoMissing(true)} />
            Ihr Browser kann dieses Video nicht abspielen.
          </video>
        </>
      )}
    </div>
  );
}
