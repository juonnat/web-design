"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import InteractiveFlow from "@/components/ui/InteractiveFlow";

const COLUMNS = [
  {
    heading: "Platform",
    links: ["Runtime", "Workflow builder", "Integrations", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API reference", "Status", "Security"],
  },
];

const MotionLink = motion.create(Link);

export function Footer() {
  const reducedMotion = useReducedMotion();
  const hoverTap = reducedMotion
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { duration: 0.2 } };

  return (
    <footer className="relative isolate min-h-[100vh] overflow-hidden border-t border-dashed border-border">
      <InteractiveFlow />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_SETTLE }}
        className="pointer-events-none before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_100%,rgba(220,80,0,0.15),transparent_70%)] relative flex min-h-[100vh] flex-col justify-between gap-68 bg-gradient-to-t from-shadow via-transparent to-shadow/40 px-[var(--pad)] pb-45 pt-68"
      >
        <div className="relative flex flex-col gap-45 md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-18">
            <span className="voice-label text-label">Kiln</span>
            <p className="voice-body max-w-[32ch] text-[18px] leading-[1.35] text-cream/70">
              The runtime for autonomous AI agents. Design the process once —
              the agents finish it every time after.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-24 gap-y-45 md:contents">
            {COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-14">
                <span className="voice-label text-label text-driftwood">
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-10">
                  {col.links.map((link) => (
                    <li key={link}>
                      <MotionLink
                        href="#"
                        className="voice-label pointer-events-auto inline-block text-label text-cream/80 transition-colors duration-500 hover:text-cream"
                        {...hoverTap}
                      >
                        {link}
                      </MotionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col-reverse items-start justify-between gap-18 border-t border-dashed border-border pt-24 md:flex-row md:items-center">
          <span className="text-legal text-driftwood">
            © {new Date().getFullYear()} Kiln Systems, Inc. All rights reserved.
          </span>
          <span className="text-legal text-driftwood">
            Built by a design system, not a template.
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
