"use client";

import { AnimatePresence, motion } from "motion/react";
import { PRESS_SCALE, spring } from "@/lib/motion";

/**
 * Toggle chip: outlined, mono, with a count. When switched on, an accent
 * dot pops in. aria-pressed carries the state for assistive tech.
 */
export function Chip({
  label,
  count,
  pressed,
  onToggle,
}: {
  label: string;
  count: number;
  pressed: boolean;
  onToggle: () => void;
}) {
  const empty = count === 0 && !pressed;
  return (
    <motion.button
      type="button"
      aria-pressed={pressed}
      disabled={empty}
      onClick={onToggle}
      whileTap={empty ? undefined : { scale: PRESS_SCALE }}
      transition={spring.press}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 font-mono text-meta transition-colors disabled:cursor-default disabled:opacity-40 ${
        pressed
          ? "border-foreground/50 text-foreground"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      <AnimatePresence initial={false}>
        {pressed && (
          <motion.span
            aria-hidden
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={spring.pop}
            className="size-1.5 rounded-full bg-accent"
          />
        )}
      </AnimatePresence>
      <span>{label}</span>
      <span className="tabular-nums text-subtle-foreground">
        <span className="sr-only">(</span>
        {count}
        <span className="sr-only"> {count === 1 ? "project" : "projects"})</span>
      </span>
    </motion.button>
  );
}
