export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.ai-boutique.de",
        "name": "ai-boutique",
        "description": "Strategische KI-Implementierung und Agentic Marketing für KMU und Mittelstand",
        "url": "https://www.ai-boutique.de",
        "telephone": "+4917949706860",
        "email": "sven@ai-boutique.de",
        "founder": {
          "@type": "Person",
          "name": "Sven Günzel",
          "jobTitle": "KI-Berater & Creative Director"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bachstraße 17",
          "addressLocality": "Prien am Chiemsee",
          "postalCode": "83209",
          "addressCountry": "DE"
        },
        "areaServed": "DE",
        "serviceType": [
          "KI Beratung",
          "Agentic Marketing",
          "AI Voice Bots",
          "Corporate LLM",
          "RAG Systeme",
          "KI Schulung",
          "Workflows & Automatisierung"
        ],
        "knowsAbout": [
          "Künstliche Intelligenz",
          "KI Implementierung",
          "Agentic Marketing",
          "Large Language Models",
          "RAG Systeme",
          "Marketing Automatisierung"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ai-boutique.de/#website",
        "url": "https://www.ai-boutique.de",
        "name": "ai-boutique",
        "description": "KI Beratung für KMU und Mittelstand",
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
