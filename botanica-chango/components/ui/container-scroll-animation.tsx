"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * House-style pass: no box-shadow (depth comes from the rotateX/scale
 * Z-axis transform only, per CLAUDE.md "No shadows. Anywhere."), the
 * frame is a dashed hairline instead of a solid grey border, and colours
 * come from the brand tokens (--color-surface/ink/line) so the frame
 * works in both context and void mode. Scroll-linked transforms are
 * dropped under prefers-reduced-motion, matching TiltCard.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="relative flex h-[60rem] items-center justify-center bg-surface px-[var(--pad)] md:h-[80rem]"
      ref={containerRef}
    >
      <div
        className="relative w-full py-45 md:py-204"
        style={{
          perspective: reducedMotion ? undefined : "1000px",
        }}
      >
        <Header
          translate={translate}
          titleComponent={titleComponent}
          reducedMotion={reducedMotion}
        />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          reducedMotion={reducedMotion}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
  reducedMotion,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  reducedMotion?: boolean;
}) => {
  return (
    <motion.div
      style={reducedMotion ? undefined : { translateY: translate }}
      className="mx-auto max-w-[900px] text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  reducedMotion,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  reducedMotion?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={reducedMotion ? undefined : { rotateX: rotate, scale }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-card border border-dashed border-line bg-surface p-2 md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-card bg-surface md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
