"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Book } from "@/lib/reading";
import { formatShortDate } from "@/lib/format";
import { PRESS_SCALE, nudge, spring } from "@/lib/motion";
import BookCover from "./BookCover";
import Progress from "./Progress";

const arrow = { hover: { x: nudge.arrow } };

/** Compact "Now reading" card for the home hero. Links to /reading. */
export default function NowReadingCard({ book }: { book: Book }) {
  const reduce = useReducedMotion();
  const started = formatShortDate(book.started);

  return (
    <motion.div
      initial={false}
      whileHover={reduce ? undefined : "hover"}
      whileTap={reduce ? undefined : { scale: PRESS_SCALE }}
      transition={spring.press}
    >
      <Link
        href="/reading"
        className="group flex gap-4 rounded-md py-1"
      >
        <BookCover book={book} size="M" eager className="w-14" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Now reading
            <motion.span
              aria-hidden
              variants={arrow}
              transition={spring.soft}
              className="inline-block transition-colors group-hover:text-accent"
            >
              →
            </motion.span>
          </p>
          <p className="mt-1 line-clamp-3 text-[0.9375rem] font-medium leading-snug transition-colors group-hover:text-accent">
            {book.title}
          </p>
          <p className="truncate text-sm text-muted-foreground">{book.author}</p>
          <div className="mt-auto pt-2">
            <Progress progress={book.progress} />
            {started && (
              <p className="mt-1 font-mono text-meta text-subtle-foreground">
                started <time dateTime={book.started}>{started}</time>
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
