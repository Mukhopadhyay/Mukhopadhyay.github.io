"use client";

import { motion, useReducedMotion } from "motion/react";

const TAGS = { li: motion.li, div: motion.div, article: motion.article } as const;

/**
 * Sets the "hover" variant on hover so motion children (covers, arrows)
 * can react, from a server component. Off under reduced motion.
 */
export default function HoverGroup({
  as = "div",
  className,
  children,
}: React.PropsWithChildren<{ as?: keyof typeof TAGS; className?: string }>) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as];
  return (
    <Tag initial={false} whileHover={reduce ? undefined : "hover"} className={className}>
      {children}
    </Tag>
  );
}
