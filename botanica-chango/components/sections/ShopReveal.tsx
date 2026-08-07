import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";
import { useTranslation } from "@/lib/i18n/useTranslation";

/**
 * Real store photography hasn't arrived yet (see GalleryGrid) — the
 * frame holds the same labeled gradient placeholder rather than a stock
 * photo. Swap the placeholder div for a real interior shot once
 * Bosslady sends one.
 */
export function ShopReveal() {
  const t = useTranslation();

  return (
    <section className="relative overflow-hidden bg-surface py-68">
      <div className="px-[var(--pad)]">
        <Reveal>
          <SectionLabel index="04" title={t.home.shopReveal.stepInside} />
        </Reveal>
      </div>

      <ContainerScroll
        titleComponent={
          <>
            <span className="voice-label text-label text-mute">{t.home.shopReveal.kicker}</span>
            <h2 className="voice-heading mt-14 text-heading-sm text-ink md:text-heading">
              {t.home.shopReveal.headline[0]}
              <br />
              {t.home.shopReveal.headline[1]}
            </h2>
          </>
        }
      >
        <div
          className="relative flex h-full items-end p-24"
          style={{
            background:
              "linear-gradient(155deg, color-mix(in srgb, var(--c-accent) 14%, transparent), transparent 70%)",
          }}
        >
          <span className="voice-label text-label text-mute">{t.home.shopReveal.inside}</span>
        </div>
      </ContainerScroll>
    </section>
  );
}
