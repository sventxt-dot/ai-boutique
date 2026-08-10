import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex mb-6">
              <div
                className="relative overflow-hidden rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)",
                  padding: "8px 16px",
                }}
              >
                <Image
                  src="/images/logo-source.png"
                  alt="Ai Boutique"
                  width={140}
                  height={48}
                  className="object-contain h-10 w-auto"
                />
              </div>
            </Link>
            <p className="text-sm text-foreground/60">
              Kreative Intelligenz. Skaliert.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase">
              Leistungen
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/leistungen"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Alle Services
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen#copywriting"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Copywriting
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen#content"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Content
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase">
              Unternehmen
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Separator className="bg-foreground/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} AI-Boutique. Alle Rechte vorbehalten.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
