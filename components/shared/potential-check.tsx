"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import MonoLabel from "./mono-label";

type Step = "form" | "processing" | "email" | "thankyou";

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
  "w-full h-[54px] bg-white border-0 rounded-full px-6 text-foreground text-base font-medium placeholder:text-[#6B6573] outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 transition-shadow";

// Fixed head height keeps the fields of both columns on one line, even when a label wraps
const stepHeadClass = "md:min-h-24 flex flex-col justify-end mb-4";
const stepNumberClass = "font-display text-sm tracking-[0.12em] text-[#2E0F4D] mb-2";
const stepLabelClass = "text-xl leading-[1.3] font-bold text-foreground";

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
      <div className={stepHeadClass}>
        <div className={stepNumberClass}>{step}</div>
        <p className={stepLabelClass}>{label}</p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[54px] flex items-center justify-between bg-white rounded-full px-6 text-base font-medium text-left focus-visible:ring-2 focus-visible:ring-foreground/60 outline-none transition-shadow cursor-pointer"
      >
        {selected.length === 0 ? (
          <span className="text-[#6B6573]">{placeholder}</span>
        ) : (
          <span className="text-foreground">{selected.length} ausgewählt</span>
        )}
        <svg
          className={`w-4 h-4 text-foreground transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
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
              className="text-sm bg-white/85 text-foreground font-medium rounded-full px-3 py-1.5 flex items-center gap-1"
            >
              {s}
              <button
                type="button"
                onClick={() => toggle(s)}
                className="text-foreground/60 hover:text-foreground ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="max-h-72 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className="w-full flex items-center gap-3 px-6 py-3 text-foreground text-sm font-medium text-left hover:bg-[#F3ECFB] transition-colors border-b border-border last:border-0 cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "bg-[#C77DFF] border-[#C77DFF]"
                        : "border-foreground/30 bg-transparent"
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

  const rootRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const thanksRef = useRef<HTMLDivElement>(null);

  // The form is much taller than the next step; bring the check back into view instead of jumping.
  // Email and thank-you steps scroll to their own block so it sits below the fixed navbar.
  function showStep(next: Step) {
    setStep(next);
    const target = next === "email" ? emailRef : next === "thankyou" ? thanksRef : rootRef;
    requestAnimationFrame(() =>
      target.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    );
  }

  useEffect(() => {
    if (step !== "processing") return;
    const timer = setTimeout(() => showStep("email"), 5000);
    return () => clearTimeout(timer);
  }, [step]);

  function handleSubmit() {
    showStep("processing");
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
      showStep("thankyou");
    } catch (err) {
      console.error(err);
      setEmailError(true);
      setEmailSending(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className="scroll-mt-28 relative rounded-[28px] overflow-hidden bg-linear-to-b from-[#A35AD3] from-45% via-[#B47BE2] via-75% to-[#CBA6EE]"
    >
      {/* Header: laptop on the purple shelf, the lila runs on into the form */}
      <div className="relative">
        <div className="relative">
          <Image
            src="/images/redesign/check-laptop.jpg"
            alt=""
            width={1080}
            height={530}
            sizes="(min-width: 1440px) 1280px, 100vw"
            className="block w-full h-auto"
          />
          <div className="absolute left-[15.4%] right-[55.2%] top-[26.6%] bottom-[33.8%] bg-white flex items-center justify-center">
            <Image
              src="/images/portfolio/brotbot-thumb.png"
              alt="Brotbot, die Chatbot-Figur einer Bäckerei"
              width={256}
              height={256}
              className="h-[88%] w-auto"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[14%] bg-linear-to-b from-[#A35AD3]/0 to-[#A35AD3]"
          />
        </div>
        <div className="px-6 pt-8 md:absolute md:left-[52%] md:right-[5%] md:top-[11%] md:p-0">
          <MonoLabel dot="#FFF56E" className="mb-3.5 text-[#2A1F38]">Agentic-Marketing-Check</MonoLabel>
          <h2 className="text-2xl lg:text-[38px] font-bold leading-tight text-foreground mb-4">
            Welche Aufgaben kann KI in Ihrem Marketing morgen übernehmen?
          </h2>
          <p className="text-base lg:text-lg text-[#1E1726] leading-relaxed font-medium">
            Ihre Branche, Ihre Pains, Ihre Wünsche, Ihre Tools – ich liefere drei konkrete Maßnahmen. Kostenlos.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-[5%] pt-10 md:pt-14 pb-12 md:pb-16">

      {step === "form" && (
        <div>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-11 md:gap-x-[4.4445%]"
          >
            {/* 01 — Branche */}
            <div>
              <div className={stepHeadClass}>
                <div className={stepNumberClass}>01</div>
                <label htmlFor="pc-branche" className={stepLabelClass}>Ihre Branche</label>
              </div>
              <input
                id="pc-branche"
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
                    <span className="text-[#2E0F4D] font-medium text-base">Optional</span>
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

            <div className="md:pt-2">
              <button
                type="submit"
                disabled={!branche.trim()}
                className="w-full h-[60px] bg-foreground hover:bg-foreground/85 text-white font-bold text-[17px] rounded-full px-8 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                KI-Potential analysieren →
              </button>
            </div>
            <p className="md:pt-2 self-center text-sm text-[#1E1726] leading-relaxed font-medium">
              Im nächsten Schritt geben Sie Ihre E-Mail-Adresse an. Ich bearbeite Ihre Analyse persönlich und schicke sie Ihnen zu.
            </p>
          </form>
        </div>
      )}

      {/* Processing signal between form and email step */}
      {step === "processing" && (
        <div role="status" className="py-16 max-w-lg mx-auto flex flex-col items-center gap-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-white/30 animate-pulse" />
            <div className="absolute inset-5 rounded-full bg-white" />
          </div>
          <div className="text-center">
            {/* DRAFT */}
            <p className="text-foreground text-lg mb-1 font-medium">Ihre Angaben werden verarbeitet.</p>
            <p className="text-[#1E1726] text-base font-medium">Einen Moment bitte.</p>
          </div>
        </div>
      )}

      {/* Email capture */}
      {step === "email" && (
        <div ref={emailRef} className="py-16 max-w-lg mx-auto text-center scroll-mt-12">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-7 h-7 text-accent-lila-ink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* DRAFT */}
          <h3 className="text-2xl font-bold text-foreground mb-4">Ihre Angaben sind vollständig.</h3>
          <p className="text-base text-foreground font-medium mb-3">So geht es weiter:</p>
          <ol className="text-left text-base text-[#1E1726] leading-relaxed font-medium space-y-2 mb-6 list-decimal pl-5">
            <li>Eine KI entwirft aus Ihren Angaben drei Agentic-Marketing-Maßnahmen.</li>
            <li>Ich prüfe jede Maßnahme persönlich und ergänze, was ich bei Ihnen einrichten würde.</li>
            <li>Sie erhalten das Ergebnis in einer persönlichen E-Mail von mir.</li>
          </ol>
          <p className="text-base text-[#1E1726] leading-relaxed mb-10 font-medium">
            Und weiter nichts, versprochen.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              placeholder="Ihre E-Mail-Adresse"
              className={inputClass}
              autoFocus
            />
            <button
              onClick={handleEmailSubmit}
              disabled={!email || emailSending}
              className="w-full h-[56px] bg-foreground hover:bg-foreground/85 disabled:opacity-50 text-white font-bold text-base rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {emailSending ? "Wird gespeichert..." : "Ergebnis zusenden →"}
            </button>
            {emailError && (
              <p role="alert" className="text-sm text-foreground font-medium">
                {/* DRAFT */}
                Das hat nicht geklappt. Senden Sie es bitte noch einmal oder schreiben Sie mir an sven@ai-boutique.de.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Thank you */}
      {step === "thankyou" && (
        <div ref={thanksRef} className="py-12 text-center max-w-md mx-auto scroll-mt-28">
          <h3 className="text-2xl font-bold text-foreground mb-4">Vielen Dank.</h3>
          <p className="text-base text-[#1E1726] leading-relaxed font-medium">
            Ich bearbeite Ihren KI-Potential-Check persönlich und schicke Ihnen die drei KI-Maßnahmen per E-Mail zu.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
