"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Workshop",
    price: "$0",
    unit: "/ up to 500 runs",
    description: "For testing a single process end to end.",
    features: ["1 workflow", "Community support", "7-day run history"],
    featured: false,
  },
  {
    name: "Foundry",
    price: "$480",
    unit: "/ month",
    description: "For teams running the process in production.",
    features: [
      "Unlimited workflows",
      "Tempering & backtests",
      "90-day run history",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Forge",
    price: "Custom",
    unit: "",
    description: "For orgs with compliance and scale requirements.",
    features: [
      "SSO & audit export",
      "Dedicated runtime region",
      "Unlimited history",
      "Solutions engineer",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      data-section="pricing"
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <SectionLabel index="08" title="Pricing" />

      <h2 className="max-w-[16ch] text-[9vw] leading-[0.95] sm:text-heading">
        Pay for what runs, not for seats.
      </h2>

      <div className="grid grid-cols-1 gap-24 lg:grid-cols-3">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          >
            <TiltCard
              className={cn(
                "flex h-full flex-col gap-24 rounded-[var(--radius-card)] border border-dashed p-31",
                tier.featured ? "border-cream" : "border-border"
              )}
            >
              <div className="flex flex-col gap-8">
                <span className="voice-label text-label text-driftwood">
                  {tier.name}
                </span>
                <div className="flex items-baseline gap-8">
                  <span className="text-[41px] leading-none">{tier.price}</span>
                  <span className="text-legal text-driftwood">{tier.unit}</span>
                </div>
                <p className="voice-body text-[16px] leading-[1.35] text-cream/75">
                  {tier.description}
                </p>
              </div>

              <ul className="flex flex-col gap-10 border-t border-dashed border-border pt-18">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="voice-label flex items-center gap-10 text-[12px] text-cream/80"
                  >
                    <span className="h-4 w-4 shrink-0 bg-cream/60" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href="#cta"
                variant={tier.featured ? "filled" : "outline"}
                className="mt-auto w-full"
              >
                {tier.name === "Forge" ? "Talk to us" : "Get started"}
              </Button>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
