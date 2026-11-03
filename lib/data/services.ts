export interface Service {
  title: string
  copy: string
  image: string
  wide?: boolean
}

export const services: Service[] = [
  {
    title: "AI Voice-Bots",
    copy: "Ein Telefon, das abnimmt, qualifiziert, informiert und bucht. In Ihrem Ton, rund um die Uhr.",
    image: "/AI-Boutique_Images/icons/voice-bots.png"
  },
  {
    title: "AI Chat-Bots",
    copy: "Auf Website und Mobile beantworten Chat-Bots Fragen, statt welche aufzuwerfen.",
    image: "/AI-Boutique_Images/icons/chat-bots.png"
  },
  {
    title: "AI Copywriting",
    copy: "Ihre Tonalität, Ihr Fachwissen, Ihre Freigabe. Agenten, die schreiben wie das Texterteam, das Sie sich schon immer gewünscht haben.",
    image: "/AI-Boutique_Images/icons/copywriting.png"
  },
  {
    title: "Corporate LLM",
    copy: "Sensible Daten gehören nicht in die Cloud eines US-Konzerns. Ich baue Ihr Firmenmodell auf Ihrer Infrastruktur.",
    image: "/AI-Boutique_Images/icons/corporate-llm.png"
  },
  {
    title: "CRM-Pipeline",
    copy: "Agenten betreuen Ihre Kunden zum richtigen Zeitpunkt, auf Wunsch auch proaktiv. Persönlich im Ton, automatisch im Ablauf.",
    image: "/AI-Boutique_Images/icons/rag-systeme.png"
  },
  {
    title: "Workflows",
    copy: "Angebote, Reportings, Freigaben: Hier steckt das meiste KI-Potenzial. Standardaufgaben laufen, Ihr Team macht das Marketing.",
    image: "/AI-Boutique_Images/icons/workflows.png"
  },
  {
    title: "Mobile-Apps",
    copy: "Kundenbindung auf dem Smartphone. Ihre Marke bietet Features, die Ihre Kunden wirklich nutzen.",
    image: "/AI-Boutique_Images/icons/ai-apps.png"
  },
  {
    title: "AI-Schulung",
    copy: "Ich mache Ihr Team fit: gutes Prompten, nach den Regeln des EU AI Act, die richtigen Tools, erste Automationen.",
    image: "/AI-Boutique_Images/icons/ai-schulung.png"
  }
]
