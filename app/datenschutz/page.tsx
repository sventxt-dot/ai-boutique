import type { Metadata } from "next";
import MonoLabel from "@/components/shared/mono-label";

export const metadata: Metadata = {
  title: "Datenschutz — ai-boutique.de",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <MonoLabel>Rechtliches</MonoLabel>
        <h1 className="text-4xl font-bold text-white mt-4 mb-12">
          Datenschutzerklärung
        </h1>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            1. Verantwortlicher
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Sven Günzel<br />
            Bachstraße 17<br />
            83209 Prien am Chiemsee<br />
            Deutschland<br /><br />
            E-Mail:{" "}
            <a href="mailto:sven@ai-boutique.de" className="hover:text-[#C77DFF] transition-colors">
              sven@ai-boutique.de
            </a>
            <br />
            Telefon:{" "}
            <a href="tel:+4917949706860" className="hover:text-[#C77DFF] transition-colors">
              +49 179 49 70 686
            </a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            2. Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen.
            Im Rahmen des KI-Potential Checks haben Sie die Möglichkeit, Ihre E-Mail-Adresse
            anzugeben, damit wir Ihnen die Analyseergebnisse zusenden können. Die Angabe ist
            freiwillig. Ohne E-Mail-Adresse ist eine Zusendung der Ergebnisse nicht möglich.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            3. Zweck der Datenverarbeitung
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Ihre E-Mail-Adresse wird ausschließlich verwendet, um Ihnen die Ergebnisse Ihres
            KI-Potential Checks zuzusenden. Eine Weitergabe an Dritte, eine Nutzung für
            Werbezwecke oder die Aufnahme in einen Newsletter erfolgt nicht.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            4. Rechtsgrundlage
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Die Verarbeitung Ihrer E-Mail-Adresse erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen,
            indem Sie uns eine E-Mail an sven@ai-boutique.de senden. Die Rechtmäßigkeit der
            bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            5. Speicherung und Löschung
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Ihre Daten werden in einer gesicherten Datenbank gespeichert (Supabase,
            Server-Standort: EU/Paris). Sie werden gelöscht, sobald der Zweck der Speicherung
            entfällt oder Sie die Löschung verlangen. Zur Löschung Ihrer Daten genügt eine
            formlose E-Mail an sven@ai-boutique.de.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            6. Einsatz von KI-Diensten
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Zur Erstellung der KI-Analyse werden die von Ihnen eingegebenen Informationen
            (Branche, Herausforderungen, Wünsche) an die Anthropic API übermittelt. Es werden
            dabei keine personenbezogenen Daten übermittelt — ausschließlich die sachlichen
            Angaben zu Ihrem Unternehmen. Anthropic verarbeitet diese Daten gemäß ihrer eigenen
            Datenschutzrichtlinie (anthropic.com/privacy).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            7. Hosting
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Diese Website wird auf Servern der Hetzner Online GmbH (Industriestr. 25, 91710
            Gunzenhausen, Deutschland) gehostet. Hetzner ist ein nach DSGVO zertifizierter
            europäischer Anbieter. Bei jedem Seitenaufruf werden Server-Logfiles erfasst
            (IP-Adresse, Zeitstempel, aufgerufene Seite). Diese Daten dienen ausschließlich
            der technischen Bereitstellung und werden nicht personenbezogen ausgewertet.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            8. Cookies
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Diese Website verwendet keine Tracking-Cookies und kein Web-Analytics. Es werden
            ausschließlich technisch notwendige Session-Daten verarbeitet, die für den Betrieb
            der Website erforderlich sind.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            9. Ihre Rechte
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Sie haben das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten
            (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung Ihrer
            Daten (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie
            Datenübertragbarkeit (Art. 20 DSGVO). Zur Ausübung Ihrer Rechte wenden Sie sich
            an: sven@ai-boutique.de.<br /><br />
            Sie haben außerdem das Recht, sich bei der zuständigen
            Datenschutz-Aufsichtsbehörde zu beschweren.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-display uppercase tracking-widest text-[#C77DFF] mb-4">
            10. Aktualität
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2026.
          </p>
        </section>
      </div>
    </main>
  );
}
