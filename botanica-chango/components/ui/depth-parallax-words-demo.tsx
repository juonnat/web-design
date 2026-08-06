"use client";

import Component from "@/components/ui/depth-parallax-words";

/**
 * Demo adapted to the site's own tokens (ink/surface/mute/accent, dashed
 * hairlines, uppercase label/heading voices) instead of the generic
 * shadcn background/foreground/card/muted-foreground tokens the original
 * component catalog ships with — this project doesn't define those. See
 * /CLAUDE.md for the voice and hairline conventions.
 */
export default function DepthParallaxWordsDemo() {
  return (
    <div className="flex min-h-[700px] w-full items-center justify-center bg-surface p-6">
      <div className="w-full max-w-xl rounded-[var(--radius-card)] border border-dashed border-line p-12">
        <p className="voice-label text-label text-mute">
          Depth Parallax Words
        </p>

        <h2 className="voice-heading mt-18 text-heading-sm leading-[1.1] text-ink">
          <Component>Words arrive at different depths</Component>
        </h2>

        <p className="voice-body mt-14 text-subheading text-ink/80">
          <Component delay={220}>Each word comes forward from its own distance, never a flat line.</Component>
        </p>

        <dl className="mt-31 divide-y divide-dashed divide-line border-t border-dashed border-line">
          <div className="flex items-baseline justify-between gap-24 py-14">
            <dt className="voice-label text-label text-mute">duration</dt>
            <dd className="font-semibold text-heading-sm text-ink">
              <Component delay={440}>0.70s</Component>
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-24 py-14">
            <dt className="voice-label text-label text-mute">word stagger</dt>
            <dd className="font-semibold text-heading-sm text-ink">
              <Component delay={560}>70ms</Component>
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-24 py-14">
            <dt className="voice-label text-label text-mute">perspective</dt>
            <dd className="font-semibold text-heading-sm text-ink">
              <Component delay={680}>z depth</Component>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
