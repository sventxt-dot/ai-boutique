import { MetadataRoute } from "next"

// Impressum and Datenschutz are noindex, so they stay out of the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.ai-boutique.de",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.ai-boutique.de/kontakt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
