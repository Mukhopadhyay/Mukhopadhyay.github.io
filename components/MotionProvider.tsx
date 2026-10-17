"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";

/**
 * Honours prefers-reduced-motion for every motion component (movement
 * off, opacity kept) and marks the first-load enter as done so it never
 * replays on client navigation.
 */
export default function MotionProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      document.documentElement.dataset.entered = "";
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
