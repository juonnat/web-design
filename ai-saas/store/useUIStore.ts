import { create } from "zustand";

export type SectionId =
  | "hero"
  | "problem"
  | "solution"
  | "features"
  | "product"
  | "workflow"
  | "benefits"
  | "testimonials"
  | "pricing"
  | "faq"
  | "cta";

interface UIState {
  activeSection: SectionId;
  navOpen: boolean;
  setActiveSection: (id: SectionId) => void;
  setNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: "hero",
  navOpen: false,
  setActiveSection: (id) => set({ activeSection: id }),
  setNavOpen: (open) => set({ navOpen: open }),
}));
