// Shared motion constants: everything has mass — long durations, heavy
// cubic-beziers, nothing snaps. See /CLAUDE.md "Motion".

export const EASE_MASS = [0.16, 1, 0.3, 1] as const;
export const EASE_SETTLE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_MASS },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: EASE_MASS } },
};

export const staggerChildren = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const wordReveal = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 1, ease: EASE_MASS },
  },
};

export const viewportOnce = { once: true, margin: "-15% 0px -15% 0px" };
