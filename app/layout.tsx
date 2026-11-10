import type { Metadata } from "next";
import { Geist, Montserrat, Anton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { JsonLd } from "@/components/shared/json-ld";

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ai-boutique.de"),
  title: {
    default: "KI-Agentur für Agentic Marketing | AI-Boutique",
    template: "%s | AI-Boutique"
  },
  description: "Die AI-Boutique erstellt Kommunikationskonzepte und implementiert KI-gestützte Prozesse für Marketingteams und Agenturen. Mehr als 20 Jahre Kampagnenerfahrung.",
  keywords: [
    "KI Beratung Mittelstand",
    "Künstliche Intelligenz kleine Unternehmen",
    "Agentic Marketing",
    "KI Implementierung KMU",
    "AI Agentur Deutschland",
    "KI Beratung",
    "AI Voice Bots",
    "Corporate LLM",
    "RAG Systeme"
  ],
  authors: [{ name: "Sven Günzel" }],
  creator: "Sven Günzel",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.ai-boutique.de",
    siteName: "AI-Boutique",
    title: "Agentic Marketing mit Kreativer Intelligenz",
    description: "Die AI-Boutique erstellt Kommunikationskonzepte und implementiert KI-gestützte Prozesse für Marketingteams und Agenturen. Mehr als 20 Jahre Kampagnenerfahrung.",
    images: [
      {
        url: "/images/OG_Titel.png",
        width: 1200,
        height: 630,
        alt: "Logo der AI-Boutique"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Marketing mit Kreativer Intelligenz",
    description: "Die AI-Boutique erstellt Kommunikationskonzepte und implementiert KI-gestützte Prozesse für Marketingteams und Agenturen. Mehr als 20 Jahre Kampagnenerfahrung.",
    images: ["/images/OG_Titel.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  alternates: {
    canonical: "https://www.ai-boutique.de"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={cn("h-full", "antialiased", geistSans.variable, "font-sans", montserrat.variable, anton.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
