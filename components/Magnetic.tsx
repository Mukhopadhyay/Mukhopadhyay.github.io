"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { spring } from "@/lib/motion";

/** Max travel in px. Kept small on purpose. */
const PULL = 4;

/**
 * Pulls its child a few px toward the cursor and springs back on leave.
 * Pointer (mouse/pen) only; nothing on touch or under reduced motion.
 */
export default function Magnetic({ children }: React.PropsWithChildren) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, spring.magnet);
  const y = useSpring(0, spring.magnet);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * PULL);
    y.set(Math.max(-1, Math.min(1, dy)) * PULL * 0.6);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}
