"use client";

import { useState, useRef, useEffect } from "react";
import MonoLabel from "./mono-label";

type Step = "form" | "loading" | "email" | "thankyou";

interface UseCase {
  titel: string;
  beschreibung: string;
  machbarkeit: "Hoch" | "Mittel";
  umsetzung: string;
  einsparung: string;
  naechster_schritt: string;
}

const painOptions = [
  "Zu viel manuelle Arbeit",
  "Kundenservice frisst Zeit",
  "Content-Produktion dauert zu lang",
  "Angebote schreiben ist aufwändig",
  "Wissen geht beim Ausscheiden verloren",
  "Fachkräftemangel",
  "Reporting & Auswertungen kosten Zeit",
  "Onboarding neuer Mitarbeiter dauert",
  "Keine einheitliche Markenstimme",
  "Leads werden zu langsam bearbeitet",
  "Übersetzungen & Lokalisierung",
  "Zu wenig Kapazität für Social Media",
  "Rechnungen & Buchhaltung manuell",
  "Produktdaten pflegen ist mühsam",
];

const winOptions = [
  "Zeit sparen",
  "Kosten senken",
  "24/7 erreichbar sein",
  "Schneller skalieren",
  "Markenstimme wahren",
  "Mitarbeiter entlasten",
  "Mehr Umsatz generieren",
  "Neues Serviceangebot aufbauen",
  "Daten besser nutzen",
  "Wettbewerbsvorsprung sichern",
];

interface MultiSelectProps {
  label: string;
  step: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

const inputClass =
  "w-full bg-[#141414] border border-white/10 rounded-xl px-5 py-4 text-white text-base font-medium placeholder:text-white/25 outline-none focus:border-[#C77DFF]/60 focus:ring-1 focus:ring-[#C77DFF]/20 transition-colors";

function MultiSelect({ label, step, options, selected, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div ref={ref} className="relative">
      <div className="font-display text-xs text-[#C77DFF] uppercase tracking-widest mb-2">{step}</div>
      <p className="text-2xl font-bold text-white mb-4">{label}</p>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-[#141414] border border-white/10 rounded-xl px-5 py-4 text-base font-medium text-left hover:border-[#C77DFF]/40 transition-colors cursor-pointer"
      >
        {selected.length === 0 ? (
          <span className="text-white/30">{placeholder}</span>
        ) : (
          <span className="text-white">{selected.length} ausgewählt</span>
        )}
        <svg
          className={`w-4 h-4 text-white/60 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map((s) => (
            <span
              key={s}
              className="text-sm bg-[#1a0a2e] border border-[#C77DFF] text-white font-medium rounded-full px-3 py-1.5 flex items-center gap-1"
            >
              {s}
              <button
                type="button"
                onClick={() => toggle(s)}
                className="text-white/70 hover:text-white ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="max-h-72 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-white text-sm font-medium text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "bg-[#C77DFF] border-[#C77DFF]"
                        : "border-white/20 bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PotentialCheck() {
  const [step, setStep] = useState<Step>("form");
  const [branche, setBranche] = useState("");
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [extraPain, setExtraPain] = useState("");
  const [selectedWins, setSelectedWins] = useState<string[]>([]);
  const [extraWin, setExtraWin] = useState("");
  const [ergaenzung, setErgaenzung] = useState("");
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [usecases, setUsecases] = useState<UseCase[]>([]);

  const branches = [
    "Bäckerei",
    "Versicherung",
    "Werbeagentur",
    "Zahnarztpraxis",
    "Maschinenbau",
    "Immobilienmakler",
    "Online-Shop",
    "Steuerberatung",
    "Hotel & Gastronomie",
    "Rechtsanwaltskanzlei",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const [brancheIndex, setBrancheIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (branche) return;

    const current = branches[brancheIndex];

    if (charIndex === current.length) {
      const pause = setTimeout(() => {
        setPlaceholder("");
        setCharIndex(0);
        setBrancheIndex((i) => (i + 1) % branches.length);
      }, 1500);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(() => {
      setPlaceholder(current.slice(0, charIndex + 1));
      setCharIndex((i) => i + 1);
    }, 80);

    return () => clearTimeout(timeout);
  }, [charIndex, brancheIndex, branche]);

  async function handleSubmit() {
    setStep("loading");
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 2500));
    try {
      const [response] = await Promise.all([
        fetch("/api/potential-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branche,
            pains: [...selectedPains, extraPain].filter(Boolean),
            wins: [...selectedWins, extraWin].filter(Boolean),
            ergaenzung,
          }),
        }),
        minDelay,
      ]);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setUsecases(data.usecases);
      setStep("email");
    } catch (err) {
      console.error(err);
      setStep("form");
    }
  }

  async function handleEmailSubmit() {
    if (!email) return;
    setEmailSending(true);
    try {
      await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          branche,
          pains: [...selectedPains, extraPain].filter(Boolean),
          wins: [...selectedWins, extraWin].filter(Boolean),
          ergaenzung,
          usecases,
        }),
      });
      setStep("thankyou");
    } catch (err) {
      console.error(err);
      setEmailSending(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <MonoLabel>
          <span className="block mb-4">KI-Potential Check</span>
        </MonoLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Neugierig, wie KI ihre Prozesse optimiert?
        </h2>
        <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl font-medium">
          Ihre Branche, Ihre Engpässe, Ihre Wünsche – mit dem
          KI-Potential-Check erhalten Sie drei maßgeschneiderte
          KI-Anwendungen. Kostet nichts und demonstriert, was KI
          für Sie tun kann. Neugierig? Dann gehen Sie jetzt den
          ersten Schritt und probieren es aus.
        </p>
      </div>

      {/* Form — visible in 'form' and 'loading' steps, grayed out during loading */}
      {(step === "form" || step === "loading") && (
        <div className={step === "loading" ? "opacity-40 pointer-events-none select-none" : ""}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            className="space-y-10 max-w-3xl"
          >
            {/* 01 — Branche */}
            <div>
              <div className="font-display text-xs text-[#C77DFF] uppercase tracking-widest mb-2">01</div>
              <p className="text-2xl font-bold text-white mb-4">Ihre Branche</p>
              <input
                type="text"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
                placeholder={branche ? "" : placeholder || "Ihre Branche..."}
                className={inputClass}
              />
            </div>

            {/* 02 — Pain Points */}
            <div className="space-y-3">
              <MultiSelect
                step="02"
                label="Was kostet Sie am meisten Zeit oder Geld?"
                options={painOptions}
                selected={selectedPains}
                onChange={setSelectedPains}
                placeholder="Auswählen..."
              />
              <input
                type="text"
                value={extraPain}
                onChange={(e) => setExtraPain(e.target.value)}
                placeholder="Weiterer Pain Point..."
                className={inputClass}
              />
            </div>

            {/* 03 — KI-Wins */}
            <div className="space-y-3">
              <MultiSelect
                step="03"
                label="Was soll KI für Sie erreichen?"
                options={winOptions}
                selected={selectedWins}
                onChange={setSelectedWins}
                placeholder="Auswählen..."
              />
              <input
                type="text"
                value={extraWin}
                onChange={(e) => setExtraWin(e.target.value)}
                placeholder="Weiterer Wunsch..."
                className={inputClass}
              />
            </div>

            {/* 04 — Ergänzung (optional) */}
            <div>
              <div className="font-display text-xs text-[#C77DFF] uppercase tracking-widest mb-2">04</div>
              <p className="text-2xl font-bold text-white mb-4">
                Noch etwas?{" "}
                <span className="text-white/60 font-normal text-lg">Optional</span>
              </p>
              <textarea
                value={ergaenzung}
                onChange={(e) => setErgaenzung(e.target.value)}
                placeholder="Was bewegt Sie sonst noch?"
                className={`${inputClass} min-h-[80px] resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={!branche.trim()}
              className="w-full bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold text-lg rounded-xl py-5 px-8 transition-colors cursor-pointer mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              KI-Potential analysieren →
            </button>
          </form>
        </div>
      )}

      {/* Loading animation — shown below grayed-out form */}
      {step === "loading" && (
        <div className="max-w-3xl flex flex-col items-center justify-center py-16 gap-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-[#C77DFF]/25 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-[#C77DFF]/15 animate-pulse" />
            <div className="absolute inset-5 rounded-full bg-[#C77DFF]/60" />
          </div>
          <div className="text-center">
            <p className="text-white/70 text-lg mb-1 font-medium">KI analysiert Ihr Potenzial...</p>
            <p className="text-white/60 text-base font-medium">Das dauert einen Moment.</p>
          </div>
        </div>
      )}

      {/* Email capture */}
      {step === "email" && (
        <div className="py-16 max-w-lg mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-[#C77DFF]/20 border border-[#C77DFF]/40 flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-7 h-7 text-[#C77DFF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Ihre Anfrage wird bearbeitet.</h3>
          <p className="text-base text-white/60 leading-relaxed mb-10 font-medium">
            Wir schicken Ihnen das Ergebnis umgehend mit einer
            personalisierten E-Mail zu. Und weiter nichts, versprochen.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              placeholder="Ihre E-Mail-Adresse"
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder:text-white/30 outline-none focus:border-[#C77DFF]/60 transition-colors"
              autoFocus
            />
            <button
              onClick={handleEmailSubmit}
              disabled={!email || emailSending}
              className="w-full bg-[#C77DFF] hover:bg-[#d490ff] disabled:opacity-40 text-black font-bold text-base rounded-xl py-4 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {emailSending ? "Wird gespeichert..." : "Ergebnis zusenden →"}
            </button>
          </div>
        </div>
      )}

      {/* Thank you */}
      {step === "thankyou" && (
        <div className="py-12 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Vielen Dank.</h3>
          <p className="text-base text-white/60 leading-relaxed font-medium">
            Ihre AI-Potential Analyse wird persönlich bearbeitet und Ihnen asap zugeschickt.
          </p>
        </div>
      )}
    </div>
  );
}
