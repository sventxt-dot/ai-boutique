// DRAFT copy: Sven finalizes all wording.
export interface PortfolioItem {
  id: string
  title: string
  area: string
  client: string
  teaser: string
  steps: string[]
  teaserTile?: boolean
  thumb?: string
  gallery?: { src: string; alt: string }[]
  link?: { href: string; label: string }
  compare?: { before: string; after: string; beforeAlt: string; afterAlt: string }
}

export const aiPortfolio: PortfolioItem[] = [
  {
    id: "venue-visualizer",
    title: "Location Designer",
    area: "Content-Automation",
    client: "Catering/Event",
    teaser: "User wählt leere Location und das gewünschte Mobiliar. Der Location Designer erstellt iterativ eine fertig eingerichtete Eventfläche inklusive Flug durch die Halle als Videoclip. Für Angebote, die schneller rausgehen und mehr verkaufen.",
    steps: [
      "Leere Location und gewünschtes Mobiliar wählen",
      "Fertig eingerichtete Eventfläche entsteht iterativ",
      "Dazu ein Flug durch die Halle als Videoclip",
    ],
    teaserTile: true,
    thumb: "/images/portfolio/venue-visualizer-thumb.jpg",
    compare: {
      before: "/images/portfolio/venue-visualizer-vorher.png",
      after: "/images/portfolio/venue-visualizer-nachher.png",
      beforeAlt: "Location Designer: Frontend mit dem Foto einer leeren Halle und der Möbelauswahl",
      afterAlt: "Location Designer: Ergebnis, die eingerichtete Halle mit Stehtischen für das Angebot",
    },
  },
  {
    id: "brotbot",
    title: "Brotbot",
    area: "Kundeninteraktion",
    client: "Bäckerei",
    teaser: "Chatbot auf RAG-Basis für genaue und wahrhaftige Aussagen zu Marke, Produkten, Menü und Filialen. Angestellte der Bäckerei können ihn über ein Frontend mit neuen Inhalten füttern. Spart viel Zeit im CRM und bindet Kunden.",
    steps: [
      "Die Bäckerei pflegt Inhalte im Frontend",
      "Die Wissensbasis nimmt sie auf",
      "Kunden fragen im Chat",
      "Antworten kommen aus dem aktuellen Stand",
    ],
    teaserTile: true,
    thumb: "/images/portfolio/brotbot-thumb.png",
    link: { href: "https://brotbot.bot-boutique.com/", label: "Brotbot ausprobieren" },
  },
  {
    id: "sport-app",
    title: "ayvio AI-Sport Coach",
    area: "Produkt",
    client: "Eigenes Produkt",
    teaser: "Die Sport-App entstand aus einem persönlichen Need: Wie kann ich mit meinem Equipment ein strukturiertes Training bekommen, das mich auf meinen Lieblingssport trainiert und meine Ziele verfolgt? ayvio ist der Enabler für mehr Möglichkeiten im Sport.",
    steps: [
      "Zeit, Ziel, Sportart, Equipment und Einschränkungen angeben",
      "Das Training wird erstellt",
      "Durchführung auf dem Trainingsscreen",
      "Spotify-Playlist und Sportrezepte dazu",
      "Training mit der Community teilen",
    ],
    teaserTile: true,
    thumb: "/images/portfolio/ayvio-logo.png",
    gallery: [
      { src: "/images/portfolio/ayvio/home.jpg", alt: "ayvio: Startseite mit Begrüßung und Zugang zu neuem Training, Workouts, Fortschritt, Einladungen und Kalender" },
      { src: "/images/portfolio/ayvio/equipment.jpg", alt: "ayvio: Auswahl des vorhandenen Equipments" },
      { src: "/images/portfolio/ayvio/ziele.jpg", alt: "ayvio: Trainingsziele und Einschränkungen angeben" },
      { src: "/images/portfolio/ayvio/trainingsplan.jpg", alt: "ayvio: Das erstellte Training mit Aufwärmen und Übungen" },
      { src: "/images/portfolio/ayvio/training.jpg", alt: "ayvio: Trainingsscreen mit Übung, Satz und Wiederholungen" },
      { src: "/images/portfolio/ayvio/meine-trainings.jpg", alt: "ayvio: Liste der gespeicherten Trainings" },
    ],
  },
  {
    id: "reel-pipeline",
    title: "Reel-Pipeline",
    area: "Content-Automation",
    client: "Eigenes System für die App",
    teaser: "Vom Thema über Script, Voiceover, Bilderstellung und Animation bis zum Posten und zur Analyse: Ein Reel entsteht vollautomatisch, gesteuert über Parameter und Hooks. Spart Zeit bei jedem Reel.",
    steps: ["Thema", "Script", "Voiceover", "Bilder", "Animation", "Posten", "Analyse"],
  },
  {
    id: "packlisten-agent",
    title: "Packlisten-Agent",
    area: "Workflow-Automation",
    client: "Cateringunternehmen",
    teaser: "KI-Agent auf Claude-Basis, der Veranstaltungsbriefings versteht und daraus regelbasiert eine fertige Packliste in Google Sheets befüllt, inklusive Mengen für Equipment, Getränke, Wäsche und Technik. Das Team des Caterers arbeitet über ein eigenes Frontend mit Login und Chat. Spart viel Zeit in der Planung und macht Packlisten verlässlich und einheitlich.",
    steps: [],
  },
  {
    id: "einkaufslisten-agent",
    title: "Einkaufslisten-Agent",
    area: "Workflow-Automation",
    client: "Cateringunternehmen",
    teaser: "KI-Agent für die Küche, der aus Menü und Gästezahl automatisch Einkaufslisten erstellt: nach Lieferant sortiert, mit hochgerechneten Mengen und unter Berücksichtigung aktueller Angebote. Das Küchenteam des Caterers lädt die Eventplanung im Frontend hoch und passt Menü und Mengen direkt im Chat an. Spart viel Zeit in der Kalkulation, senkt die Einkaufskosten und vermeidet Fehlkäufe.",
    steps: [],
  },
  {
    id: "leadfinder",
    title: "Leadfinder",
    area: "Workflow-Automation",
    client: "",
    teaser: "KI-Agent, der Unternehmen nach Branche und Region recherchiert und mit belegtem Engpass und passenden KI-Lösungen einen persönlichen Brief vorformuliert. Spart dem Vertrieb die Recherche und ersetzt Serienbriefe durch eine relevante und maßgeschneiderte Ansprache.",
    steps: [
      "Suchkriterien festlegen: Branche, Region",
      "Unternehmen recherchieren",
      "Engpass mit Beleg ermitteln",
      "Passende KI-Lösungen zuordnen",
      "Persönlichen Brief vorformulieren",
    ],
  },
  {
    id: "linkedin-content",
    title: "LinkedIn-Content-Maschine",
    area: "Content-Automation",
    client: "",
    teaser: "Findet jede Woche zehn aktuelle Themen mit echten Quellen, sortiert nach vorher festgelegten Content-Containern. Der Nutzer wählt aus, die Maschine schreibt: in der Stimme des Unternehmens, in vier Tonalitäten zur Auswahl. Dazu das passende Foto aus dem eigenen Fundus, Headline inklusive. Keine erfundenen Zahlen, keine KI-Bilder, keine Floskeln. Gepostet wird erst, wenn ein Mensch Ja sagt.",
    steps: [
      "Zehn aktuelle Themen mit echten Quellen, sortiert nach Content-Containern",
      "Der Nutzer wählt aus",
      "Vier Tonalitäten zur Auswahl, geschrieben in der Stimme des Unternehmens",
      "Passendes Foto aus dem eigenen Fundus, Headline inklusive",
      "Gepostet wird erst nach der Freigabe durch einen Menschen",
    ],
  },
  {
    id: "crm-email",
    title: "CRM-E-Mail-Pipeline",
    area: "Workflow-Automation",
    client: "",
    teaser: "Automatisierte Mail-Pipeline für Onboarding, News und Inspiration, ausgelöst durch das, was Kunden und Nutzer tatsächlich tun. Inhalte werden segmentiert und laufen DSGVO-konform mit Double-Opt-in über einen EU-Dienst. Holt inaktive Kunden zurück und bindet sie, ohne dass jemand Mails von Hand verschickt.",
    steps: [
      "Verhalten von Kunden und Nutzern löst die Mail aus",
      "Inhalte werden segmentiert",
      "Versand mit Double-Opt-in über einen EU-Dienst",
      "Onboarding, News und Inspiration laufen automatisch",
      "Inaktive Kunden werden zurückgeholt",
    ],
  },
  {
    id: "ideengeber",
    title: "Kreativ-Ideengeber",
    area: "Workflow-Automation",
    client: "",
    teaser: "KI-gestützter Ideengeber, der auf einen definierten Kontext prämierter Kampagnen zurückgreift und deren Mechaniken analysiert. Liefert daraus verwertbaren Input für neue Ideen: Headlines, Motivansätze und Kampagnenrichtungen, abgeleitet aus dem, was nachweislich funktioniert hat. Beschleunigt die Ideenfindung und gibt Kreativteams einen fundierten Startpunkt statt eines leeren Blatts.",
    steps: [
      "Kontext prämierter Kampagnen definieren",
      "Mechaniken analysieren",
      "Headlines, Motivansätze und Kampagnenrichtungen ableiten",
    ],
  },
  {
    id: "websites",
    title: "Websites",
    area: "Web",
    client: "",
    teaser: "Coding-Agent für die Website, der aus Beschreibungen im Chat fertige Seiten baut: mit Layout, Texten, Formularen und der Anbindung an Datenbank und Mailversand. Ich beschreibe, was die Seite können soll, prüfe die Vorschau und gebe die Änderung frei. Spart die Abstimmung mit Entwicklern und verkürzt den Weg von der Idee zur Live-Seite von einem Monat auf einen Tag. Diese Website ist so entstanden. In etwa 6 Tagen.",
    steps: [
      "Beschreiben, was die Seite können soll",
      "Vorschau prüfen",
      "Änderung freigeben",
    ],
  },
]
