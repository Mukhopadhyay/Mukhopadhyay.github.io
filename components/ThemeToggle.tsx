"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { PRESS_SCALE, spring } from "@/lib/motion";

const iconButton =
  "relative inline-flex size-10 items-center justify-center overflow-hidden rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  // The inline script in layout.tsx has already applied the class; just read it.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 250);
    setIsDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage blocked: the toggle still works for this visit
    }
  };

  if (isDark === null) {
    return <span aria-hidden className="inline-block size-10" />;
  }

  const Icon = isDark ? Sun : Moon;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: PRESS_SCALE }}
      transition={spring.press}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={iconButton}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={spring.pop}
          className="inline-flex"
        >
          <Icon className="size-4" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
