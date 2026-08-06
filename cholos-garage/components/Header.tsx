import { Phone, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="section flex items-center justify-between gap-4 py-3">
        <a href="#top" className="voice-heading shrink-0 text-xl leading-none text-ink sm:text-2xl">
          Cholo&rsquo;s <span className="text-accent">Garage</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="voice-label text-xs text-mute transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="voice-label hidden items-center gap-1.5 text-[11px] text-mute lg:flex">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {BUSINESS.hoursShort}
          </span>
          <a
            href={BUSINESS.phone.href}
            className="voice-label inline-flex items-center gap-2 rounded-sm bg-accent px-3 py-2.5 text-xs text-on-accent transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-4"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">{BUSINESS.phone.display}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  );
}
