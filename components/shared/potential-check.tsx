"use client";

import { useState, useRef, useEffect } from "react";
import MonoLabel from "./mono-label";

type Step = "form" | "email" | "thankyou";

const painOptions = [
  "Positionierung & Zielgruppe",
  "Mikro- und Makroanalysen",
  "Ideenfindung",
  "KI markenkonform einrichten",
  "Content-Produktion",
  "Newsletter & Social Media",
  "Reporting",
  "Lead-Bearbeitung",
  "Angebote",
  "Kundenservice",
];

const winOptions = [
  "Assistenz",
  "Copywriter",
  "Recherche",
  "Analyse",
  "Ideen-Sparring",
  "Proaktive Impulse",
  "Trendradar",
  "Content-Produktion",
  "Markenprüfung",
  "Kampagnenplanung",
  "Reporting",
];

const toolOptions = [
  "Adobe Creative Cloud",
  "Asana",
  "Brevo",
  "Canva",
  "ChatGPT",
  "Claude",
  "Figma",
  "Google Analytics",
  "HubSpot",
  "Mailchimp",
  "Make",
  "Meta Ads",
  "Microsoft 365",
  "Microsoft Copilot",
  "Microsoft Teams",
  "monday.com",
  "n8n",
  "Notion",
  "Salesforce",
  "Semrush",
  "Shopify",
  "Slack",
  "WordPress",
  "Wrike",
  "Zapier",
];

interface MultiSelectProps {
  label: React.ReactNode;
  step: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

const inputClass =
  "w-full bg-[#1c1c1c] border border-white/40 rounded-xl px-5 py-4 text-white text-base font-medium placeholder:text-white/60 outline-none focus:border-[#C77DFF] focus:ring-2 focus:ring-[#C77DFF]/40 transition-colors";

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
        className="w-full flex items-center justify-between bg-[#1c1c1c] border border-white/40 rounded-xl px-5 py-4 text-base font-medium text-left hover:border-[#C77DFF] focus-visible:border-[#C77DFF] focus-visible:ring-2 focus-visible:ring-[#C77DFF]/40 outline-none transition-colors cursor-pointer"
      >
        {selected.length === 0 ? (
          <span className="text-white/60">{placeholder}</span>
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
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [extraTool, setExtraTool] = useState("");
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState(false);

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

  const ergaenzung = [...selectedTools, extraTool].filter(Boolean).join(", ");

  function handleSubmit() {
    setStep("email");
  }

  async function handleEmailSubmit() {
    if (!email) return;
    setEmailSending(true);
    setEmailError(false);
    try {
      const response = await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          branche,
          pains: [...selectedPains, extraPain].filter(Boolean),
          wins: [...selectedWins, extraWin].filter(Boolean),
          ergaenzung,
        }),
      });
      if (!response.ok) throw new Error("Lead could not be delivered");
      setStep("thankyou");
    } catch (err) {
      console.error(err);
      setEmailError(true);
      setEmailSending(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <MonoLabel>
          <span className="block mb-4">Agentic-Marketing-Check</span>
        </MonoLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Welche Aufgaben kann KI in Ihrem Marketing morgen übernehmen?
        </h2>
        <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl font-medium">
          Ihre Branche, Ihre Pains, Ihre Wünsche, Ihre Tools – ich liefere drei konkrete Maßnahmen. Kostenlos.
        </p>
      </div>

      {step === "form" && (
        <div>
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
                label="Welche Aufgaben kosten Ihr Marketing zu viel Zeit?"
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
                label="Wie soll KI in Ihrem Team arbeiten?"
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

            {/* 04 — Tools (optional) */}
            <div className="space-y-3">
              <MultiSelect
                step="04"
                label={
                  <>
                    Welche Tools nutzen Sie im Marketing?{" "}
                    <span className="text-white/60 font-normal text-lg">Optional</span>
                  </>
                }
                options={toolOptions}
                selected={selectedTools}
                onChange={setSelectedTools}
                placeholder="Auswählen..."
              />
              <input
                type="text"
                value={extraTool}
                onChange={(e) => setExtraTool(e.target.value)}
                placeholder="Weiteres Tool..."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={!branche.trim()}
              className="w-full bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold text-lg rounded-xl py-5 px-8 transition-colors cursor-pointer mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              KI-Potential analysieren →
            </button>
            <p className="text-sm text-white/60 leading-relaxed font-medium">
              Im nächsten Schritt geben Sie Ihre E-Mail-Adresse an. Ich bearbeite Ihre Analyse persönlich und schicke sie Ihnen zu.
            </p>
          </form>
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
          {/* DRAFT */}
          <h3 className="text-2xl font-bold text-white mb-4">Ihre Angaben sind vollständig.</h3>
          <p className="text-base text-white/70 font-medium mb-3">So geht es weiter:</p>
          <ol className="text-left text-base text-white/60 leading-relaxed font-medium space-y-2 mb-6 list-decimal pl-5">
            <li>Eine KI entwirft aus Ihren Angaben drei Agentic-Marketing-Maßnahmen.</li>
            <li>Ich prüfe jede Maßnahme persönlich und ergänze, was ich bei Ihnen einrichten würde.</li>
            <li>Sie erhalten das Ergebnis in einer persönlichen E-Mail von mir.</li>
          </ol>
          <p className="text-base text-white/60 leading-relaxed mb-10 font-medium">
            Und weiter nichts, versprochen.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              placeholder="Ihre E-Mail-Adresse"
              className="w-full bg-[#1c1c1c] border border-white/40 rounded-xl px-5 py-4 text-white text-base placeholder:text-white/60 outline-none focus:border-[#C77DFF] focus:ring-2 focus:ring-[#C77DFF]/40 transition-colors"
              autoFocus
            />
            <button
              onClick={handleEmailSubmit}
              disabled={!email || emailSending}
              className="w-full bg-[#C77DFF] hover:bg-[#d490ff] disabled:opacity-40 text-black font-bold text-base rounded-xl py-4 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {emailSending ? "Wird gespeichert..." : "Ergebnis zusenden →"}
            </button>
            {emailError && (
              <p role="alert" className="text-sm text-white/80 font-medium">
                {/* DRAFT */}
                Das hat nicht geklappt. Senden Sie es bitte noch einmal oder schreiben Sie mir an sven@ai-boutique.de.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Thank you */}
      {step === "thankyou" && (
        <div className="py-12 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Vielen Dank.</h3>
          <p className="text-base text-white/60 leading-relaxed font-medium">
            Ich bearbeite Ihren KI-Potential-Check persönlich und schicke Ihnen die drei KI-Maßnahmen per E-Mail zu.
          </p>
        </div>
      )}
    </div>
  );
}
