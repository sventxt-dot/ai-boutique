import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Anton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AI-Boutique.de",
    default: "AI-Boutique.de — Kreative Intelligenz. Skaliert."
  },
  description: "Markenwissen aus Jahren in Werbung und Copywriting, vervielfacht durch AI-Systeme. Text, Ton, Workflow.",
  authors: [{ name: "AI-Boutique.de" }],
  openGraph: {
    title: "AI-Boutique.de",
    description: "Kreative Intelligenz lässt sich nicht ersetzen. Sie lässt sich skalieren.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={cn("dark h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", montserrat.variable, anton.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
