"use client";

import { motion } from "framer-motion";

const MESSAGES = [
  { from: "user", text: "Why did the refund for order #8842 get held?" },
  {
    from: "agent",
    text: "Order #8842 was flagged because the refund amount exceeds the 30-day threshold for that SKU. I've routed it to Priya for a manual review with the full order history attached.",
  },
  { from: "user", text: "Can you pull the last 3 similar cases?" },
  {
    from: "agent",
    text: "Found 3 — all approved within a day. Attaching them to the review so Priya has precedent on hand.",
  },
];

export function ChatPreview() {
  return (
    <div className="flex flex-col gap-18 p-24 sm:p-31">
      <div className="flex flex-col gap-14">
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className={
              "max-w-[80%] border border-dashed border-border p-14 " +
              (msg.from === "user" ? "self-end" : "self-start")
            }
          >
            <span className="text-legal text-driftwood block pb-6">
              {msg.from === "user" ? "You" : "Kiln agent"}
            </span>
            <p className="voice-body text-[15px] leading-[1.4] text-cream/85">
              {msg.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-14 border border-dashed border-border px-18 py-14">
        <span className="voice-label text-[12px] text-cream/40">
          Ask the runtime anything about a run…
        </span>
      </div>
    </div>
  );
}
