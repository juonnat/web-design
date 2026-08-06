import styles from "./SmokeWisp.module.css";

/**
 * A small cluster of blurred, softly pulsing blobs flanking the floating
 * logo — reads as a wisp of smoke on either side. Pure CSS animation (no
 * JS per-frame cost) since it just needs to loop forever. Plain radial
 * gradients rather than a blend mode, since a screen/lighten blend would
 * vanish against the site's light "context mode" sections.
 */
export function SmokeWisp({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "right-full" : "left-full"
      }`}
    >
      <div className={`${styles.blob} ${styles.blob1} h-[48px] w-[48px] -translate-y-2`} />
      <div className={`${styles.blob} ${styles.blob2} h-[38px] w-[38px] translate-x-3 translate-y-4`} />
      <div className={`${styles.blob} ${styles.blob3} h-[32px] w-[32px] -translate-x-2 translate-y-9`} />
    </div>
  );
}
