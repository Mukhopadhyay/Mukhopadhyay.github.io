"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { Project } from "@/types/types";
import { linkLabel } from "@/lib/format";
import { STATUS_LABEL, TYPE_LABEL } from "@/lib/projects";
import { nudge, spring } from "@/lib/motion";

/** Row shifts right on hover; the title arrow follows a little further. */
export const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
  hover: { x: nudge.row },
};
const arrowVariants = {
  hover: { x: nudge.arrow, y: -nudge.arrow },
};

type Props = { project: Project } & Omit<HTMLMotionProps<"article">, "children">;

/** One project as a row: title + status, description, outcomes, then stack and links. */
const ProjectCard = forwardRef<HTMLElement, Props>(function ProjectCard(
  { project, className = "", ...motionProps },
  ref,
) {
  const reduce = useReducedMotion();
  const primary = project.links?.[0];
  const year = project.year ?? project.date?.slice(0, 4);
  const metrics = (project.metrics ?? []).filter((m) => m.value.trim());
  const stack = project.tags ?? project.tech_stack ?? [];

  return (
    <motion.article
      ref={ref}
      whileHover={reduce ? undefined : "hover"}
      transition={spring.soft}
      className={`group py-6 first:pt-0 last:pb-0 ${className}`}
      {...motionProps}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h3 className="font-medium transition-colors duration-150 group-hover:text-accent">
          {primary ? (
            <a
              href={primary.url}
              target="_blank"
              rel="noreferrer"
              className="link-draw-host inline-flex items-baseline gap-1"
            >
              <span className="link-draw-target">{project.name}</span>
              <motion.span
                aria-hidden
                variants={arrowVariants}
                transition={spring.soft}
                className="inline-block text-[0.8em] text-subtle-foreground transition-colors group-hover:text-accent"
              >
                ↗
              </motion.span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="flex items-center gap-x-2 font-mono text-meta text-subtle-foreground">
          {project.status && (
            <span className="inline-flex items-center gap-1.5">
              {project.status === "active" && (
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              )}
              {STATUS_LABEL[project.status]}
            </span>
          )}
          {project.status && (project.type || year) && <span aria-hidden>·</span>}
          {project.type && <span>{TYPE_LABEL[project.type]}</span>}
          {project.type && year && <span aria-hidden>·</span>}
          {year && <span>{year}</span>}
        </p>
      </div>

      {project.description && (
        <p className="mt-1 text-muted-foreground text-pretty">{project.description}</p>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1 text-[0.9375rem]">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="relative pl-4 before:absolute before:left-0 before:text-subtle-foreground before:content-['–']"
            >
              {h}
            </li>
          ))}
        </ul>
      )}

      {metrics.length > 0 && (
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-meta">
          {metrics.map((m) => (
            <div key={m.label} className="flex gap-1.5">
              <dt className="text-subtle-foreground">{m.label}</dt>
              <dd className="text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-meta">
        {stack.length > 0 && (
          <p className="text-subtle-foreground">
            <span className="sr-only">Stack: </span>
            {stack.join(" · ")}
          </p>
        )}
        {project.links && project.links.length > 0 && (
          <ul className="flex flex-wrap gap-x-4">
            {project.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw-host group/link inline-flex min-h-8 items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="link-draw-target">
                    {linkLabel(link.type)}
                  </span>
                  <span
                    aria-hidden
                    className="ml-0.5 inline-block transition-transform duration-500 ease-spring group-hover/link:-translate-y-px group-hover/link:translate-x-px motion-reduce:transition-none motion-reduce:transform-none"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
});

export default ProjectCard;
