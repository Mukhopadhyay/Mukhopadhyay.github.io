"use client";

import { motion } from "motion/react";
import { Command } from "lucide-react";
import { COMMAND_PALETTE_OPEN_EVENT } from "./CommandPalette";
import { PRESS_SCALE, spring } from "@/lib/motion";

export default function CommandPaletteTrigger() {
  return (
    <motion.button
      type="button"
      aria-label="Open command menu (⌘K)"
      title="Command menu  ⌘K"
      onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT))}
      whileTap={{ scale: PRESS_SCALE }}
      transition={spring.press}
      className="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
    >
      <Command className="size-4" />
    </motion.button>
  );
}
