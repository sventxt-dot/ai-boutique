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
    description: "Ich höre zu, verstehe Ihre Marketingabläufe und analysiere Kanäle und Status quo. Daraus entsteht ein Gesamtbild.",
    services: []
  },
  {
    letter: "C",
    name: "CONSULT",
    tagline: "Beratung",
    description: "Gemeinsam entwickeln wir einen konkreten KI-Plan, ausgerichtet an Ihrer Marke, Ihrem Team und Ihren Zielen.",
    services: []
  },
  {
    letter: "A",
    name: "ACT",
    tagline: "Implementierung",
    description: "Ich setze den Plan um, richte die Tools ein, binde sie an Ihre Abläufe an und schule das Team.",
    services: []
  },
  {
    letter: "L",
    name: "LEARN",
    tagline: "Schulung",
    description: "Ihr Team arbeitet nach der Schulung selbständig: mit guten Prompts, nach den Regeln des EU AI Act und mit ersten eigenen Automationen.",
    services: []
  },
  {
    letter: "E",
    name: "EXPAND",
    tagline: "Skalierung",
    description: "Was funktioniert, wird auf den nächsten Bereich übertragen. So wächst Ihre KI mit: S.C.A.L.E.",
    services: []
  }
]
