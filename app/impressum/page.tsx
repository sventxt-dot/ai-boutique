import type { Metadata } from "next";
import MonoLabel from "@/components/shared/mono-label";

export const metadata: Metadata = {
  title: "Impressum — ai-boutique.de",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <MonoLabel>Rechtliches</MonoLabel>
        <h1 className="text-4xl font-bold text-white mt-4 mb-12">Impressum</h1>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Sven Günzel<br />
            Bachstraße 17<br />
            83209 Prien am Chiemsee<br />
            Deutschland
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Kontakt
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Telefon:{" "}
            <a href="tel:+4917949706860" className="hover:text-[#C77DFF] transition-colors">
              +49 179 49 70 686
            </a>
            <br />
            E-Mail:{" "}
            <a href="mailto:sven@ai-boutique.de" className="hover:text-[#C77DFF] transition-colors">
              sven@ai-boutique.de
            </a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Umsatzsteuer
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE246252795
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Steuernummer
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            156/223/51940
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Berufsbezeichnung
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Unternehmensberater / KI-Berater<br />
            Tätigkeitsort: Deutschland
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Sven Günzel<br />
            Bachstraße 17<br />
            83209 Prien am Chiemsee
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Haftung für Inhalte
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Haftung für Links
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
            keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
            der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
            Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
            verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
            zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
            entfernen.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#C77DFF] mb-4">
            Urheberrecht
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
            und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
            dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
            die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
            werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>
      </div>
    </main>
  );
}
