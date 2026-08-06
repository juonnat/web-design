"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

const TO_EMAIL = "botanicachango6@gmail.com";

function QuantityStepper({
  id,
  quantity,
  onChange,
}: {
  id: string;
  quantity: number;
  onChange: (id: string, quantity: number) => void;
}) {
  return (
    <div className="flex items-center gap-10 border border-dashed border-line px-10 py-6">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(id, quantity - 1)}
        className="voice-label px-4 py-4 text-label text-ink/70 hover:text-ink"
      >
        −
      </button>
      <span className="voice-label w-[2ch] text-center text-label text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(id, quantity + 1)}
        className="voice-label px-4 py-4 text-label text-ink/70 hover:text-ink"
      >
        +
      </button>
    </div>
  );
}

/**
 * No payment processor is wired up yet — placing an order composes a
 * mailto: to Bosslady with the order details, the same stopgap pattern
 * ContactForm uses for the contact page. Swap handleSubmit for a real
 * Stripe or Clover checkout once one is chosen; the cart state, form
 * fields, and order summary below don't need to change.
 */
export default function CheckoutPage() {
  const { items, total, setQuantity, removeItem, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNote, setOrderNote] = useState<{ name: string; total: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const notes = String(form.get("notes") ?? "");

    const lines = items.map(
      (item) => `${item.quantity} x ${item.name} — $${(item.price * item.quantity).toFixed(2)}`
    );

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      "",
      "Order:",
      ...lines,
      "",
      `Total: $${total.toFixed(2)}`,
      "",
      "Pickup at 441 N 7th St, Allentown, PA — payment collected in person for now.",
      notes && "",
      notes && `Notes: ${notes}`,
    ].filter((line): line is string => Boolean(line) || line === "");

    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      `Order from the website — ${name}`
    )}&body=${encodeURIComponent(body.join("\n"))}`;

    setOrderNote({ name, total: total.toFixed(2) });
    setPlaced(true);
    clear();
  }

  if (placed && orderNote) {
    return (
      <main>
        <section className="section flex min-h-[100svh] flex-col items-start justify-center gap-18 py-68 pt-[140px]">
          <Reveal className="flex max-w-[54ch] flex-col gap-18">
            <span className="voice-label text-label text-mute">Order sent</span>
            <h1 className="voice-heading text-heading text-ink">
              Thanks, {orderNote.name.split(" ")[0] || "friend"}.
            </h1>
            <p className="voice-body text-[18px] text-ink/70">
              Your email app should have opened with a ${orderNote.total} order ready to send to
              Bosslady. Send it and she&rsquo;ll confirm pickup at 441 N 7th St, Allentown —
              payment is collected in person for now.
            </p>
            <Button href="/products" variant="outline" className="mt-8 self-start">
              Back to shop
            </Button>
          </Reveal>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main>
        <section className="section flex min-h-[100svh] flex-col items-start justify-center gap-18 py-68 pt-[140px]">
          <Reveal className="flex flex-col gap-18">
            <span className="voice-label text-label text-mute">Checkout</span>
            <h1 className="voice-heading text-heading text-ink">Your cart is empty.</h1>
            <Button href="/products" variant="filled" className="mt-8 self-start">
              Browse the shop
            </Button>
          </Reveal>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section flex flex-col gap-45 py-68 pt-[140px]">
        <Reveal className="flex flex-col gap-8">
          <span className="voice-label text-label text-mute">Checkout</span>
          <h1 className="voice-heading text-heading text-ink">Review &amp; reserve.</h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-45 lg:grid-cols-[1fr_420px]">
          <Reveal>
            <ul className="flex flex-col gap-18 border-t border-dashed border-line">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-18 border-b border-dashed border-line py-18"
                >
                  <div className="flex flex-col gap-8">
                    <span className="voice-label text-label text-ink">{item.name}</span>
                    <span className="voice-label text-label text-mute">
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>
                  <div className="flex items-center gap-24">
                    <QuantityStepper id={item.id} quantity={item.quantity} onChange={setQuantity} />
                    <span className="voice-label w-[6ch] text-right text-label text-ink">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="voice-label px-4 py-4 text-label text-mute hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-24">
              <span className="voice-label text-label text-mute">Subtotal</span>
              <span className="voice-heading text-heading-sm text-ink">${total.toFixed(2)}</span>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-24 border border-dashed border-line p-24"
            >
              <p className="voice-label text-label text-mute">Pickup details</p>
              <label className="flex flex-col gap-8">
                <span className="voice-label text-label text-mute">Name *</span>
                <input
                  required
                  name="name"
                  type="text"
                  className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
                />
              </label>

              <label className="flex flex-col gap-8">
                <span className="voice-label text-label text-mute">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
                />
              </label>

              <label className="flex flex-col gap-8">
                <span className="voice-label text-label text-mute">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  className="voice-body border-0 border-b border-dashed border-line bg-transparent py-10 text-[18px] text-ink outline-none focus-visible:border-accent"
                />
              </label>

              <label className="flex flex-col gap-8">
                <span className="voice-label text-label text-mute">Notes</span>
                <textarea
                  name="notes"
                  rows={3}
                  className="voice-body border border-dashed border-line bg-transparent p-14 text-[16px] text-ink outline-none focus-visible:border-accent"
                />
              </label>

              <div className="flex flex-col gap-8 border border-dashed border-line p-14">
                <span className="voice-label text-label text-ink">Payment</span>
                <p className="voice-body text-[15px] leading-[1.4] text-ink/70">
                  Pay in person at pickup — 441 N 7th St, Allentown. Online payment is coming
                  soon.
                </p>
              </div>

              <button
                type="submit"
                className="voice-label inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-accent px-24 py-14 text-label text-on-accent transition-[background-color,transform] duration-500 hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Place order — ${total.toFixed(2)}
              </button>

              <p className="voice-body text-[13px] leading-[1.4] text-ink/50">
                This opens your email app with the order filled in — nothing is charged
                automatically yet.
              </p>
            </form>
          </Reveal>
        </div>

        <Link href="/products" className="voice-label text-label text-mute hover:text-ink">
          ← Continue shopping
        </Link>
      </section>
    </main>
  );
}
