"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { nudge, spring } from "@/lib/motion";

const row = { hover: { x: nudge.row } };
const arrow = { hover: { x: nudge.arrow, opacity: 1 } };

/**
 * One post as a row. `layout="columns"` puts the date in the left
 * metadata column (used on /blogs); "stacked" puts it above the title.
 */
const BlogCard = ({
  post,
  layout = "stacked",
}: {
  post: PostMeta;
  layout?: "stacked" | "columns";
}) => {
  const reduce = useReducedMotion();
  const date = formatDate(post.date);
  const dateEl = date && (
    <time dateTime={post.date} className="font-mono text-meta text-subtle-foreground">
      {date}
    </time>
  );

  return (
    <motion.article
      initial={false}
      whileHover="hover"
      className={`group ${
        layout === "columns"
          ? "grid gap-1 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
          : "flex flex-col gap-0.5"
      }`}
    >
      {layout === "columns" ? <div className="md:pt-px">{dateEl}</div> : dateEl}
      <motion.div variants={reduce ? undefined : row} transition={spring.soft}>
        <h3 className="font-medium transition-colors duration-150 group-hover:text-accent">
          <Link
            href={`/blogs/${post.slug}`}
            className="link-draw-host inline-flex items-baseline gap-1.5"
          >
            <span className="link-draw-target">{post.title}</span>
            <motion.span
              aria-hidden
              initial={{ opacity: 0.5 }}
              variants={reduce ? { hover: { opacity: 1 } } : arrow}
              transition={spring.soft}
              className="inline-block text-[0.85em]"
            >
              →
            </motion.span>
          </Link>
        </h3>
        {post.description && (
          <p className="mt-1 text-[0.9375rem] text-muted-foreground text-pretty">
            {post.description}
          </p>
        )}
      </motion.div>
    </motion.article>
  );
};

export default BlogCard;
