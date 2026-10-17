"use client";

import { motion } from "motion/react";
import { progressLabel, progressPercent, type BookProgress } from "@/lib/reading";
import { spring } from "@/lib/motion";

/** Thin bar in the ink colour (not the accent: it's a fill). Grows by scaleX. */
export default function Progress({ progress }: { progress?: BookProgress }) {
  const pct = progressPercent(progress);
  if (pct === null) return null;
  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={progressLabel(progress) ?? `${pct}%`}
        aria-label="Reading progress"
        className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-border"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ ...spring.soft, delay: 0.15 }}
          className="h-full origin-left rounded-full bg-foreground/80"
        />
      </div>
      <span className="shrink-0 font-mono text-meta tabular-nums text-subtle-foreground">
        {pct}%
      </span>
    </div>
  );
}
