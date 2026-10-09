"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MonoLabel from "./mono-label";
import { aiPortfolio } from "@/lib/data/portfolio";

const SHOWREEL_SRC = "/video/portfolio-showreel.mp4";

const tiles = aiPortfolio.filter((item) => item.teaserTile);

type Tab = "ai" | "marketing";

export default function PortfolioTeaser() {
  const [tab, setTab] = useState<Tab>("ai");
  const [videoMissing, setVideoMissing] = useState(false);

  const tabClass = (active: boolean) =>
    `px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
      active ? "bg-[#C77DFF] text-black" : "text-white/60 hover:text-white"
    }`;

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
        Mehr als 20 Jahre Kampagnenentwicklung sowie fünf Jahre Arbeit und kontinuierliche Weiterbildung im Bereich der KI. Hier ein Überblick auf mein kreativ technisches Portfolio.
      </p>
      <div
        role="tablist"
        aria-label="Portfolio-Bereich"
        className="inline-flex gap-1 rounded-xl border border-white/10 bg-[#0f0f0f] p-1 mb-6"
      >
        <button
          role="tab"
          id="portfolio-tab-ai"
          aria-selected={tab === "ai"}
          aria-controls="portfolio-panel"
          className={tabClass(tab === "ai")}
          onClick={() => setTab("ai")}
        >
          KI-Systeme im Einsatz
        </button>
        <button
          role="tab"
          id="portfolio-tab-marketing"
          aria-selected={tab === "marketing"}
          aria-controls="portfolio-panel"
          className={tabClass(tab === "marketing")}
          onClick={() => setTab("marketing")}
        >
          Werbung &amp; Marketing
        </button>
      </div>

      <div
        id="portfolio-panel"
        role="tabpanel"
        aria-labelledby={tab === "ai" ? "portfolio-tab-ai" : "portfolio-tab-marketing"}
      >
        {tab === "ai" ? (
          <>
            {/* DRAFT */}
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium max-w-3xl mb-6">
              KI sollte keine Menschen ersetzen. Im Gegenteil, sie sollte Menschen befähigen, beflügeln und ihnen mehr Zeit für andere Dinge geben. Oder kennen Sie eine Schreinerei, die ihre Bretter noch mit der Hand sägt?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tiles.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio#${item.id}`}
                  className="flex items-start gap-4 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-[#C77DFF]/30 transition-colors p-3"
                >
                  {/* DRAFT: replace with a real screenshot */}
                  {item.thumb ? (
                    <Image
                      src={item.thumb}
                      alt=""
                      width={72}
                      height={72}
                      className="shrink-0 h-[72px] w-[72px] rounded-lg object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="shrink-0 h-[72px] w-[72px] rounded-lg bg-gradient-to-br from-[#2a1840] to-[#12122c]"
                    />
                  )}
                  <div>
                    <div className="text-xs text-[#C77DFF] mb-1">{item.client}</div>
                    <div className="font-display uppercase text-lg leading-tight">{item.title}</div>
                    <p className="text-sm text-white/60 leading-snug mt-1">{item.teaser}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/portfolio"
              className="inline-block mt-5 text-sm font-bold text-[#C77DFF] hover:underline"
            >
              Alle Arbeiten ansehen →
            </Link>
          </>
        ) : videoMissing ? (
          <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 text-center text-white/60 text-sm">
            Das Video lässt sich gerade nicht laden.
          </div>
        ) : (
          <>
          {/* DRAFT */}
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium max-w-3xl mb-6">
            Kampagnen für Media Markt, CRM-Entwicklung für BMW und MINI, dazu Anzeigen, Employer Branding und Social Media. Eine Minute Schnelldurchlauf durch mein Werbeportfolio.
          </p>
          {/* The click on the tab counts as user gesture, so playback with sound is allowed. */}
          <video
            autoPlay
            controls
            playsInline
            preload="auto"
            className="w-full max-w-4xl rounded-2xl border border-white/10 bg-black aspect-video"
            onError={() => setVideoMissing(true)}
          >
            <source src={SHOWREEL_SRC} type="video/mp4" onError={() => setVideoMissing(true)} />
            Ihr Browser kann dieses Video nicht abspielen.
          </video>
          </>
        )}
      </div>
    </div>
  );
}
