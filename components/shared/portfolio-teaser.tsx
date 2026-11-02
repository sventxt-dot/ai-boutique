"use client";

import { useState } from "react";
import Link from "next/link";
import MonoLabel from "./mono-label";

const SHOWREEL_SRC = "/video/portfolio-showreel.mp4";
const SHOWREEL_POSTER = "/images/portfolio/showreel-poster.jpg";

export default function PortfolioTeaser() {
  const [videoMissing, setVideoMissing] = useState(false);

  const tabClass = "px-5 py-2.5 rounded-lg text-sm font-bold transition-colors";

  return (
    <div className="mt-10">
      <MonoLabel>
        <span className="block mb-4">Portfolio</span>
      </MonoLabel>
      {/* DRAFT */}
      <h2 className="text-2xl md:text-3xl font-bold font-sans text-white leading-snug mb-6">
        Was ich bisher kreiert habe.
      </h2>
      {/* DRAFT */}
      <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium max-w-3xl mb-6">
        Mehr als 20 Jahre Kampagnenentwicklung sowie 4 Jahre Arbeit und kontinuierliche Weiterbildung im Bereich der KI. Hier ein Überblick auf mein kreativ technisches Portfolio.
      </p>
      <nav
        aria-label="Portfolio-Bereich"
        className="inline-flex gap-1 rounded-xl border border-white/10 bg-[#0f0f0f] p-1 mb-6"
      >
        <span aria-current="true" className={`${tabClass} bg-[#C77DFF] text-black`}>
          Werbung &amp; Marketing
        </span>
        <Link href="/portfolio" className={`${tabClass} text-white/60 hover:text-white`}>
          KI-Systeme im Einsatz
        </Link>
      </nav>

      {videoMissing ? (
        <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 text-center text-white/60 text-sm">
          Das Video lässt sich gerade nicht laden.
        </div>
      ) : (
        <>
          {/* DRAFT */}
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium max-w-3xl mb-6">
            Texterschmiede, Werbeagenturen in Hamburg und München. Funk, Plakat, TV, Pitch, New Business und große Kunden. Marketing Studium. Seit 2016 freier Creative Director. Jetzt zertifizierter KI-Experte, um meinen Output zu skalieren. Hier ein kleiner Ausschnitt in mein klassisches Werbeportfolio.
          </p>
          <video
            controls
            playsInline
            preload="metadata"
            poster={SHOWREEL_POSTER}
            className="w-full max-w-4xl rounded-2xl border border-white/10 bg-black aspect-video"
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
