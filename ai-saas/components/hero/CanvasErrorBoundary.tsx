"use client";

import { Component, type ReactNode } from "react";

/**
 * Guards the WebGL canvas: if creation throws (no WebGL, driver bug),
 * fall back to the static CSS ember glow instead of a blank hero.
 */
export class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
