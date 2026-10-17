"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { coverUrl, type Book } from "@/lib/reading";
import { spring } from "@/lib/motion";

/** Tilts and lifts when an ancestor with whileHover="hover" is hovered. */
const tilt = {
  hover: { rotate: -3, y: -4, scale: 1.02 },
};
const lift = {
  hover: { opacity: 1 },
};

/**
 * Book cover at 2:3. Falls back to a neutral placeholder (title + author
 * set in type) when there's no cover or it fails to load.
 */
export default function BookCover({
  book,
  size = "M",
  className = "",
  eager = false,
}: {
  book: Book;
  size?: "S" | "M" | "L";
  className?: string;
  /** Load immediately (above the fold). */
  eager?: boolean;
}) {
  const reduce = useReducedMotion();
  const src = coverUrl(book, size);
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  // An error that happened before hydration never reaches onError.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <motion.div
      variants={reduce ? undefined : tilt}
      transition={spring.soft}
      className={`relative aspect-[2/3] shrink-0 ${className}`}
    >
      {/* Soft shadow only while lifted; fades by opacity, not box-shadow. */}
      <motion.span
        aria-hidden
        variants={lift}
        initial={{ opacity: 0 }}
        transition={spring.soft}
        className="absolute inset-0 rounded-[3px] shadow-[0_10px_24px_-8px_rgb(0_0_0/0.35)] dark:shadow-[0_10px_24px_-8px_rgb(0_0_0/0.7)]"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-surface ring-1 ring-inset ring-foreground/10">
        {/* Typeset placeholder sits underneath, so a slow or missing cover never leaves an empty box. */}
        <div aria-hidden className="flex h-full flex-col justify-between p-[10%] text-left [container-type:inline-size]">
          <span className="line-clamp-4 text-[clamp(0.5rem,11cqw,0.875rem)] font-medium leading-tight text-foreground/80">
            {book.title}
          </span>
          <span className="line-clamp-2 font-mono text-[0.5625rem] leading-tight text-subtle-foreground">
            {book.author}
          </span>
        </div>
        {showImage && (
          // eslint-disable-next-line @next/next/no-img-element -- static export, remote cover, tiny image
          <img
            ref={imgRef}
            src={src}
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </motion.div>
  );
}
