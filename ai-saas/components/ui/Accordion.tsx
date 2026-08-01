"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_MASS } from "@/lib/motion";

export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col border-t border-dashed border-border">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="border-b border-dashed border-border">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
              className="voice-label flex w-full items-center justify-between gap-24 py-24 text-left text-[16px] sm:text-[18px]"
            >
              {item.question}
              <span aria-hidden className="text-driftwood">
                {open ? "–" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_MASS }}
                  className="overflow-hidden"
                >
                  <p className="voice-body max-w-[60ch] pb-24 text-[17px] leading-[1.4] text-cream/75">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
