"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TO_EMAIL = "botanicachango6@gmail.com";

/**
 * No form backend is wired up yet — submitting composes a mailto: to
 * botanicachango6@gmail.com, which works with zero configuration. Swap
 * this handler for Formspree/Web3Forms/etc. once a service is chosen so
 * visitors don't need their own mail client open.
 */
export function ContactForm() {
  const t = useTranslation();
  const TOPICS = t.contactForm.topics;
  const [topicIndex, setTopicIndex] = useState(0);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const topic = TOPICS[topicIndex];
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const message = String(form.get("message") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      `Looking for: ${topic}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      `Website inquiry: ${topic}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="section flex min-h-[80svh] flex-col justify-center gap-31 py-68">
      <Reveal className="w-full max-w-[560px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-24">
          <label className="flex flex-col gap-8">
            <span className="voice-label text-label text-mute">{t.contactForm.name}</span>
            <input
              required
              name="name"
              type="text"
              className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <label className="flex flex-col gap-8">
            <span className="voice-label text-label text-mute">{t.contactForm.email}</span>
            <input
              required
              name="email"
              type="email"
              className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <label className="flex flex-col gap-8">
            <span className="voice-label text-label text-mute">{t.contactForm.phone}</span>
            <input
              name="phone"
              type="tel"
              className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <label className="flex flex-col gap-8">
            <span className="voice-label text-label text-mute">{t.contactForm.lookingFor}</span>
            <select
              value={topicIndex}
              onChange={(e) => setTopicIndex(Number(e.target.value))}
              className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
            >
              {TOPICS.map((topicLabel, i) => (
                <option key={i} value={i}>
                  {topicLabel}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-8">
            <span className="voice-label text-label text-mute">{t.contactForm.message}</span>
            <textarea
              name="message"
              rows={4}
              className="voice-body border border-dashed border-line bg-transparent p-14 text-[18px] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <Button type="submit" variant="filled" className="self-start">
            {t.contactForm.send}
          </Button>

          {sent && <p className="voice-body text-[15px] text-ink/60">{t.contactForm.sent}</p>}
        </form>
      </Reveal>
    </section>
  );
}
