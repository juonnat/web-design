"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerChildren, fadeUp } from "@/lib/motion";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/components/cart/CartContext";
import { useTranslation } from "@/lib/i18n/useTranslation";

/**
 * Each card gets its own filled "Add to cart" button — a deliberate
 * exception to the house style's one-filled-surface-per-screen rule
 * (/CLAUDE.md #7), which is written for marketing pages, not a shop
 * grid where every item needs its own affordance.
 */
export function ShopGrid({ index }: { index: string }) {
  const { addItem } = useCart();
  const t = useTranslation();

  return (
    <section className="section flex flex-col justify-center gap-45 py-68">
      <Reveal className="flex flex-col gap-18">
        <SectionLabel index={index} title={t.products.shopGrid.label} />
        <h2 className="voice-heading max-w-[18ch] text-heading text-ink">
          {t.products.shopGrid.headline}
        </h2>
        <p className="voice-body max-w-[54ch] text-[18px] text-ink/70">{t.products.shopGrid.body}</p>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerChildren(0.08)}
        className="grid grid-cols-1 gap-1 border-t border-dashed border-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {PRODUCTS.map((product) => {
          const localized = t.products_catalog.items[product.id];
          const category = t.products_catalog.categories[product.category] ?? product.category;
          return (
            <motion.div key={product.id} variants={fadeUp}>
              <TiltCard className="flex h-full flex-col gap-14 border-b border-dashed border-line p-24 sm:border-r">
                <span className="voice-label text-label text-mute">{category}</span>
                <h3 className="voice-heading text-heading-sm text-ink">
                  {localized?.name ?? product.name}
                </h3>
                <p className="voice-body flex-1 text-[16px] leading-[1.4] text-ink/70">
                  {localized?.description ?? product.description}
                </p>
                <div className="flex items-center justify-between gap-14 pt-8">
                  <span className="voice-label text-label text-ink">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addItem(product)}
                    className="voice-label inline-flex items-center justify-center gap-10 rounded-[var(--radius-pill)] bg-accent px-24 py-12 text-label text-on-accent transition-[background-color,transform] duration-500 hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t.products.shopGrid.addToCart}
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
