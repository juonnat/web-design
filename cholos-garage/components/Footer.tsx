import { Phone } from "lucide-react";
import { BUSINESS, FULL_ADDRESS } from "@/lib/business";

export function Footer() {
  return (
    <footer className="section border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="voice-heading text-2xl text-ink">
              Cholo&rsquo;s <span className="text-accent">Garage</span>
            </p>
            <p className="mt-1 text-sm text-mute">{FULL_ADDRESS}</p>
            <p className="text-sm text-mute">{BUSINESS.hoursShort} &middot; Sat–Sun Closed</p>
          </div>

          <a
            href={BUSINESS.phone.href}
            className="voice-label inline-flex items-center gap-3 rounded-sm bg-accent px-6 py-3.5 text-sm text-on-accent transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call {BUSINESS.phone.display}
          </a>
        </div>

        <p className="voice-label text-[11px] text-mute/60">
          &copy; {new Date().getFullYear()} {BUSINESS.name}. {BUSINESS.address.city}, {BUSINESS.address.state}.
        </p>
      </div>
    </footer>
  );
}
