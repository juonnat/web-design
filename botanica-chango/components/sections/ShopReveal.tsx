import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Real store photography hasn't arrived yet (see GalleryGrid) — the
 * frame holds the same labeled gradient placeholder rather than a stock
 * photo. Swap the placeholder div for a real interior shot once
 * Bosslady sends one.
 */
export function ShopReveal() {
  return (
    <section className="relative overflow-hidden bg-surface py-68">
      <div className="px-[var(--pad)]">
        <Reveal>
          <SectionLabel index="04" title="Step inside" />
        </Reveal>
      </div>

      <ContainerScroll
        titleComponent={
          <>
            <span className="voice-label text-label text-mute">
              Seventh Street
            </span>
            <h2 className="voice-heading mt-14 text-heading-sm text-ink md:text-heading">
              Every shelf has a story.
              <br />
              Come see it for yourself.
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
          <span className="voice-label text-label text-mute">
            Inside Botanica Chango
          </span>
        </div>
      </ContainerScroll>
    </section>
  );
}
