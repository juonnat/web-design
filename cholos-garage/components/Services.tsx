import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, CarFront, Disc, Wrench, Wind, Award, Truck } from "lucide-react";
import { SERVICES } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  inspections: ClipboardCheck,
  subaru: CarFront,
  brakes: Disc,
  "general-repair": Wrench,
  exhaust: Wind,
  classic: Award,
  "truck-trailer": Truck,
};

export function Services() {
  return (
    <section id="services" className="section py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="What We Do" title="Full-Service Auto Repair" />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.id];
            return (
              <div key={service.id} className="flex flex-col gap-3 bg-surface p-6">
                <Icon className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden />
                <h3 className="voice-heading text-xl text-ink">{service.name}</h3>
                <p className="text-sm leading-relaxed text-mute">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
