import type { CSSProperties } from "react";
import type { Transition } from "motion/react";

/**
 * Spring presets. Everything that moves uses one of these, and only
 * animates transform or opacity.
 */
export const spring = {
  /** Indicators that slide between items (nav, sort). */
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 },
  /** Rows, cards and list reflow. */
  soft: { type: "spring", stiffness: 300, damping: 26 },
  /** Small things appearing: chip dot, theme icon. A little overshoot. */
  pop: { type: "spring", stiffness: 400, damping: 18 },
  /** Press-down and spring back. */
  press: { type: "spring", stiffness: 450, damping: 22 },
  /** Magnetic pull on social links. */
  magnet: { type: "spring", stiffness: 320, damping: 24, mass: 0.6 },
} satisfies Record<string, Transition>;

/** Scale for buttons and chips while pressed. */
export const PRESS_SCALE = 0.97;

/** Position in the first-load stagger: `<div className="enter" style={enterAt(1)}>`. */
export const enterAt = (i: number) => ({ "--i": i }) as CSSProperties;

/** Hover offsets, in px. */
export const nudge = {
  row: 3,
  arrow: 3,
} as const;
