"use client";

import { useEffect } from "react";
import { useUIStore, type SectionId } from "@/store/useUIStore";

/**
 * Watches every [data-section] element and keeps the nav's active
 * indicator in sync with whichever one occupies the most of the
 * viewport. Mounted once at the page root.
 */
export function useSectionObserver() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute(
            "data-section"
          ) as SectionId;
          setActiveSection(id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-10% 0px -10% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);
}
