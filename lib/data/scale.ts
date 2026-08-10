export interface Service {
  name: string
  description: string
}

export interface Pillar {
  letter: string
  name: string
  tagline: string
  description: string
  services: Service[]
}

export const pillars: Pillar[] = [
  {
    letter: "S",
    name: "SCAN",
    tagline: "Audit",
    description: "Am Anfang stehen die richtigen Fragen. Nicht aus dem Handbuch sondern aus 25 Jahren Markenerfahrung. Wo liegt das Potenzial?",
    services: []
  },
  {
    letter: "C",
    name: "CONSULT",
    tagline: "Beratung",
    description: "Aus den Antworten entsteht ein konkreter Plan. Empfohlen wird nur, was wirklich zu Ihrer Marke, Ihrem Team und Ihren Zielen passt.",
    services: []
  },
  {
    letter: "A",
    name: "ACT",
    tagline: "Implementierung",
    description: "Der Plan wird gebaut. Kampagnen, Systeme und Tools, die zur Markenstimme passen. Technisch sauber. Kommunikativ stimmig.",
    services: []
  },
  {
    letter: "L",
    name: "LEARN",
    tagline: "Schulung",
    description: "Die Technologie steht. Jetzt lernt Ihr Team, wie KI so eingesetzt wird, dass sie selbst und die Marke dabei gewinnt.",
    services: []
  },
  {
    letter: "E",
    name: "EXPAND",
    tagline: "Skalierung",
    description: "Was funktioniert, wird auf den nächsten Bereich übertragen. Das ist S.C.A.L.E.",
    services: []
  }
]
