"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE_MASS } from "@/lib/motion";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hey — I can help you find what you're looking for on the site: products, services, hours, or how to book a reading. What do you need?",
};

export function AssistantChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Couldn't reach the assistant — try calling (610) 704-4022 instead." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[59] bg-ink/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Botanica Chango shop assistant"
        className="fixed inset-x-18 bottom-18 z-[60] mx-auto flex max-h-[70svh] w-auto max-w-[420px] flex-col rounded-[var(--radius-card)] border border-dashed border-line bg-surface text-ink sm:inset-x-auto sm:right-24 sm:bottom-24 sm:w-[380px]"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE_MASS }}
      >
        <div className="flex items-center justify-between gap-14 border-b border-dashed border-line px-18 py-14">
          <div className="flex items-center gap-10">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover object-top"
            />
            <div className="flex flex-col">
              <span className="voice-label text-label text-ink">Shop assistant</span>
              <span className="text-legal text-mute">Botanica Chango</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="voice-label text-label text-mute transition-colors duration-500 hover:text-ink"
          >
            Close
          </button>
        </div>

        <div ref={listRef} className="flex flex-1 flex-col gap-10 overflow-y-auto px-18 py-18">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                "max-w-[85%] rounded-[var(--radius-card)] border border-dashed border-line px-14 py-10 " +
                (msg.role === "user" ? "self-end bg-ink/[0.04]" : "self-start")
              }
            >
              <p className="voice-body text-[15px] leading-[1.4] text-ink">{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="self-start rounded-[var(--radius-card)] border border-dashed border-line px-14 py-10">
              <p className="voice-label text-label text-mute">...</p>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-10 border-t border-dashed border-line px-18 py-14"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products, services, hours…"
            className="voice-body min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-mute focus:outline-none"
          />
          <Button type="submit" variant="filled" className="shrink-0">
            Send
          </Button>
        </form>
      </motion.div>
    </>
  );
}

export function AssistantChatOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>{open && <AssistantChat onClose={onClose} />}</AnimatePresence>
  );
}
