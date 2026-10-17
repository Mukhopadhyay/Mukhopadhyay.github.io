"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { spring } from "@/lib/motion";

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/reading", label: "Reading" },
] as const;

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex items-center sm:gap-1">
      {NAV_LINKS.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex min-h-10 items-center px-1.5 text-sm transition-colors sm:px-2 ${
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
            {active && (
              <motion.span
                layoutId="nav-indicator"
                transition={spring.snappy}
                aria-hidden
                className="absolute inset-x-1.5 bottom-1.5 h-[1.5px] rounded-full bg-accent sm:inset-x-2"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
