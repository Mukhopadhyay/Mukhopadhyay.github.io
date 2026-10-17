"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import type { Project } from "@/types/types";
import ProjectCard, { rowVariants } from "./ProjectCard";
import { Chip } from "./ui/chip";
import {
  GROUPS,
  SORTS,
  buildOptions,
  facetCounts,
  hasFilters,
  matches,
  parseFilters,
  serializeFilters,
  sortBy,
  type FilterGroup,
  type FilterState,
} from "@/lib/projects";
import { PRESS_SCALE, enterAt, spring } from "@/lib/motion";

/** Reads filter state from the URL. Needs a Suspense boundary (static export). */
export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  return <ProjectsView projects={projects} query={searchParams.toString()} />;
}

/**
 * Filters, sort and search for /projects. State lives in the URL query,
 * so every filtered view is a shareable link. With an empty `query` this
 * is also the prerendered fallback, so the page doesn't jump on hydrate.
 */
export function ProjectsView({ projects, query }: { projects: Project[]; query: string }) {
  const pathname = usePathname();
  const state = useMemo(() => parseFilters(new URLSearchParams(query)), [query]);

  // replaceState keeps filter tweaks out of the back-button history and
  // still syncs useSearchParams (Next.js integrates the native History API).
  const update = useCallback(
    (next: Partial<FilterState>) => {
      const qs = serializeFilters({ ...state, ...next });
      window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, state],
  );

  const toggle = (group: FilterGroup, value: string) => {
    const cur = state[group];
    update({
      [group]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
    });
  };

  const clear = () => update({ type: [], status: [], stack: [], q: "" });

  const options = useMemo(() => buildOptions(projects), [projects]);
  const counts = useMemo(() => facetCounts(projects, state), [projects, state]);
  const list = useMemo(
    () => sortBy(projects.filter((p) => matches(p, state)), state.sort),
    [projects, state],
  );
  const filtered = hasFilters(state);

  return (
    <>
      <section
        aria-label="Filter and sort projects"
        className="enter flex flex-col gap-4"
        style={enterAt(1)}
      >
        <div className="flex items-center justify-between gap-4">
          <SearchField value={state.q} onChange={(q) => update({ q })} />
          <SortControl value={state.sort} onChange={(sort) => update({ sort })} />
        </div>

        <div className="flex flex-col gap-3">
          {GROUPS.map(({ key, label }) =>
            options[key].length === 0 ? null : (
              <div
                key={key}
                role="group"
                aria-labelledby={`filter-${key}`}
                className="grid gap-2 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4"
              >
                <span
                  id={`filter-${key}`}
                  className="font-mono text-meta text-subtle-foreground sm:pt-1.5"
                >
                  {label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {options[key].map((o) => (
                    <Chip
                      key={o.value}
                      label={o.label}
                      count={counts[key][o.value] ?? 0}
                      pressed={state[key].includes(o.value)}
                      onToggle={() => toggle(key, o.value)}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>

        <div className="flex min-h-8 items-center justify-between gap-4 border-b border-border pb-3 font-mono text-meta text-subtle-foreground">
          <p role="status" aria-live="polite">
            {list.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
          <AnimatePresence initial={false}>
            {filtered && (
              <motion.button
                type="button"
                onClick={clear}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                whileTap={{ scale: PRESS_SCALE }}
                transition={spring.soft}
                className="link-draw-host inline-flex min-h-8 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X aria-hidden className="size-3.5" />
                <span className="link-draw-target">Clear</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="enter relative" style={enterAt(2)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              layout="position"
              variants={rowVariants}
              initial="hidden"
              animate="shown"
              exit="exit"
              className="border-t border-border first:border-t-0"
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {list.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={spring.soft}
              className="py-10"
            >
              <p className="font-medium">Nothing matches that combination.</p>
              <p className="mt-1 text-muted-foreground">
                Try removing a filter, or{" "}
                <button
                  type="button"
                  onClick={clear}
                  className="link-draw link-inline text-foreground"
                >
                  clear them all
                </button>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/** Mono segmented control; an accent underline slides to the active option. */
function SortControl({
  value,
  onChange,
}: {
  value: FilterState["sort"];
  onChange: (v: FilterState["sort"]) => void;
}) {
  return (
    <div role="group" aria-label="Sort" className="flex items-center gap-1 font-mono text-meta">
      <span className="mr-1 hidden text-subtle-foreground sm:inline">Sort</span>
      {SORTS.map((s) => {
        const active = value === s.value;
        return (
          <motion.button
            key={s.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(s.value)}
            whileTap={{ scale: PRESS_SCALE }}
            transition={spring.press}
            className={`relative inline-flex min-h-8 items-center px-1.5 transition-colors ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
            {active && (
              <motion.span
                layoutId="sort-indicator"
                transition={spring.snappy}
                aria-hidden
                className="absolute inset-x-1.5 bottom-0.5 h-px bg-accent"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/** Collapsed to an icon until used; "/" focuses it from anywhere on the page. */
function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const open = focused || value !== "";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      const typing =
        t instanceof Element && t.closest("input, textarea, select, [contenteditable=true]");
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setFocused(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative flex h-8 min-w-0 flex-1 items-center">
      <motion.button
        type="button"
        aria-label="Search projects"
        title="Search  /"
        tabIndex={open ? -1 : 0}
        onClick={() => {
          setFocused(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        whileTap={{ scale: PRESS_SCALE }}
        transition={spring.press}
        className={`-ml-2 inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors ${
          open ? "text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"
        }`}
      >
        <Search aria-hidden className="size-4" />
      </motion.button>

      {/* Always in the DOM (so "/" and the label work); revealed with opacity + x only. */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
        transition={spring.soft}
        className={`relative min-w-0 max-w-56 flex-1 ${open ? "" : "pointer-events-none"}`}
      >
        <label htmlFor="project-search" className="sr-only">
          Search projects by name, description or stack
        </label>
        <input
          ref={inputRef}
          id="project-search"
          type="search"
          value={value}
          tabIndex={open ? 0 : -1}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onChange("");
              inputRef.current?.blur();
            }
          }}
          placeholder="name or stack"
          className="h-8 w-full bg-transparent font-mono text-meta text-foreground outline-none placeholder:text-subtle-foreground [&::-webkit-search-cancel-button]:hidden"
        />
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={spring.soft}
          className="absolute inset-x-0 bottom-0.5 h-px origin-left bg-accent"
        />
      </motion.div>
    </div>
  );
}
