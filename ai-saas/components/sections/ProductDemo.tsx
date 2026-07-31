"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DashboardPreview } from "@/components/product/DashboardPreview";
import { ChatPreview } from "@/components/product/ChatPreview";
import { WorkflowGraph } from "@/components/product/WorkflowGraph";
import { EASE_MASS } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "dashboard", label: "Dashboard", render: () => <DashboardPreview /> },
  { id: "workflow", label: "Workflow builder", render: () => <WorkflowGraph /> },
  { id: "chat", label: "Ask the runtime", render: () => <ChatPreview /> },
] as const;

export function ProductDemo() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>(
    "dashboard"
  );
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section
      id="product"
      data-section="product"
      className="section flex flex-col justify-center gap-31 py-[136px]"
    >
      <SectionLabel index="04" title="Inside the runtime" />

      <h2 className="max-w-[18ch] text-[9vw] leading-[0.95] sm:text-heading">
        One surface, every step of the run.
      </h2>

      <div
        role="tablist"
        aria-label="Product preview"
        className="flex flex-wrap gap-8 border-b border-dashed border-border"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "voice-label relative px-18 py-14 text-label transition-colors duration-500",
              active === tab.id ? "text-cream" : "text-cream/50 hover:text-cream/80"
            )}
          >
            {tab.label}
            {active === tab.id && (
              <motion.span
                layoutId="demo-tab-indicator"
                className="absolute inset-x-0 -bottom-[1px] border-t border-dashed border-cream"
                transition={{ duration: 0.5, ease: EASE_MASS }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-bark/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE_MASS }}
          >
            {activeTab.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
