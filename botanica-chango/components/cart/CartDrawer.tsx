"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { EASE_MASS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTranslation } from "@/lib/i18n/useTranslation";

function QuantityStepper({ id, quantity }: { id: string; quantity: number }) {
  const { setQuantity } = useCart();
  const t = useTranslation();
  return (
    <div className="flex items-center gap-10 border border-dashed border-line px-10 py-6">
      <button
        type="button"
        aria-label={t.cart.decreaseAria}
        onClick={() => setQuantity(id, quantity - 1)}
        className="voice-label px-4 py-4 text-label text-ink/70 hover:text-ink"
      >
        −
      </button>
      <span className="voice-label w-[2ch] text-center text-label text-ink">{quantity}</span>
      <button
        type="button"
        aria-label={t.cart.increaseAria}
        onClick={() => setQuantity(id, quantity + 1)}
        className="voice-label px-4 py-4 text-label text-ink/70 hover:text-ink"
      >
        +
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { items, total, isOpen, close } = useCart();
  const reducedMotion = useReducedMotion();
  const t = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/40"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label="Cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE_MASS }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[420px] flex-col border-l border-dashed border-line bg-surface"
          >
            <div className="flex items-center justify-between border-b border-dashed border-line px-24 py-18">
              <h2 className="voice-heading text-heading-sm text-ink">{t.cart.title}</h2>
              <button
                type="button"
                onClick={close}
                aria-label={t.cart.close}
                className="voice-label -m-8 p-8 text-label text-ink/70 hover:text-ink"
              >
                {t.cart.close}
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-18 px-24">
                <p className="voice-body text-[17px] text-ink/70">{t.cart.empty}</p>
                <button
                  type="button"
                  onClick={close}
                  className="voice-label rounded-[var(--radius-outline)] border border-dashed border-line px-24 py-12 text-label text-ink hover:border-ink"
                >
                  {t.cart.keepBrowsing}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-24 py-18">
                  <ul className="flex flex-col gap-18">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-14 border-b border-dashed border-line pb-18"
                      >
                        <div className="flex flex-col gap-8">
                          <span className="voice-label text-label text-ink">
                            {t.products_catalog.items[item.id]?.name ?? item.name}
                          </span>
                          <span className="voice-label text-label text-mute">
                            ${item.price.toFixed(2)} {t.cart.each}
                          </span>
                          <QuantityStepper id={item.id} quantity={item.quantity} />
                        </div>
                        <div className="flex flex-col items-end gap-8">
                          <span className="voice-label text-label text-ink">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <CartRemoveButton id={item.id} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-18 border-t border-dashed border-line px-24 py-24">
                  <div className="flex items-center justify-between">
                    <span className="voice-label text-label text-mute">{t.cart.subtotal}</span>
                    <span className="voice-label text-label text-ink">${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="voice-label inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-accent px-24 py-14 text-label text-on-accent transition-[background-color,transform] duration-500 hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t.cart.checkout}
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartRemoveButton({ id }: { id: string }) {
  const { removeItem } = useCart();
  const t = useTranslation();
  return (
    <button
      type="button"
      onClick={() => removeItem(id)}
      className="voice-label px-4 py-4 text-label text-mute hover:text-ink"
    >
      {t.cart.remove}
    </button>
  );
}
