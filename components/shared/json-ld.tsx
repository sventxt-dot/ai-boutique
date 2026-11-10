const SITE = "https://www.ai-boutique.de"

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#organization`,
        "name": "AI-Boutique",
        "alternateName": "KI-Agentur AI-Boutique",
        "slogan": "Kreative Intelligenz.",
        // Fixed core sentence from the positioning; keep in sync with CLAUDE.md
        "description": "Die AI-Boutique erstellt Kommunikationskonzepte und implementiert KI-gestützte Prozesse für Marketingteams und Agenturen.",
        "url": SITE,
        "image": `${SITE}/images/OG_Titel.png`,
        "telephone": "+4917949706860",
        "email": "sven@ai-boutique.de",
        "founder": { "@id": `${SITE}/#sven-guenzel` },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bachstraße 17",
          "addressLocality": "Prien am Chiemsee",
          "postalCode": "83209",
          "addressCountry": "DE"
        },
        "areaServed": "DE",
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Marketingteams und Agenturen"
        },
        // Mirrors the service titles in lib/data/services.ts
        "serviceType": [
          "Agentic Marketing",
          "KI-Beratung",
          "AI Voice-Bots",
          "AI Chat-Bots",
          "AI Copywriting",
          "Corporate LLM",
          "CRM-Pipeline",
          "Workflows",
          "Mobile-Apps",
          "AI-Schulung"
        ],
        "knowsAbout": [
          "Agentic Marketing",
          "Künstliche Intelligenz für kleine Unternehmen",
          "KI-Beratung für den Mittelstand",
          "Kampagnenentwicklung",
          "Marketing-Automatisierung"
        ]
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#sven-guenzel`,
        "name": "Sven Günzel",
        "jobTitle": "KI-Berater & Creative Director",
        "image": `${SITE}/images/redesign/portrait-streifen.jpg`,
        "worksFor": { "@id": `${SITE}/#organization` },
        "sameAs": ["https://de.linkedin.com/in/sventxt"],
        "knowsAbout": ["Agentic Marketing", "Kampagnenentwicklung", "CRM", "Künstliche Intelligenz"],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "name": "Marketing-Fachkaufmann" },
          { "@type": "EducationalOccupationalCredential", "name": "Zertifizierter KI-Experte" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        "url": SITE,
        "name": "AI-Boutique",
        "publisher": { "@id": `${SITE}/#organization` },
        "inLanguage": "de-DE"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
