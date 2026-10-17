import type { Project, ProjectStatus, ProjectType } from "@/types/types";

/* ─── Sorting ─────────────────────────────────────────────────── */

export type ProjectSort = "newest" | "oldest" | "name";
export const SORTS: { value: ProjectSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name", label: "A–Z" },
];
export const DEFAULT_SORT: ProjectSort = "newest";

function when(p: Project): number {
  if (p.date) return new Date(p.date).getTime();
  if (p.year) return Date.UTC(p.year, 0, 1);
  return -Infinity;
}

export function sortBy(list: Project[], sort: ProjectSort): Project[] {
  const out = [...list];
  if (sort === "name") return out.sort((a, b) => a.name.localeCompare(b.name));
  const dir = sort === "newest" ? -1 : 1;
  return out.sort((a, b) => {
    const da = when(a);
    const db = when(b);
    // Undated projects go last in both directions.
    if (da === db) return a.name.localeCompare(b.name);
    if (da === -Infinity) return 1;
    if (db === -Infinity) return -1;
    return (da - db) * dir;
  });
}

/** Home page order: active first, then newest. */
export function sortProjects(list: Project[]): Project[] {
  return sortBy(list, "newest").sort(
    (a, b) => Number(b.status === "active") - Number(a.status === "active"),
  );
}

/* ─── Filters ─────────────────────────────────────────────────── */

export const TYPE_LABEL: Record<ProjectType, string> = {
  library: "Library",
  dataset: "Dataset",
  tool: "Tool",
};
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "Active",
  maintained: "Maintained",
  archived: "Archived",
};

export type FilterGroup = "type" | "status" | "stack";
export const GROUPS: { key: FilterGroup; label: string }[] = [
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "stack", label: "Stack" },
];

export type FilterState = Record<FilterGroup, string[]> & {
  sort: ProjectSort;
  q: string;
};

export type FilterOption = { value: string; label: string };

/** "GitHub Actions" → "github-actions", so URLs stay readable. */
export const slug = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function valuesFor(p: Project, group: FilterGroup): string[] {
  if (group === "type") return p.type ? [p.type] : [];
  if (group === "status") return p.status ? [p.status] : [];
  return (p.tags ?? []).map(slug);
}

/** Options per group, built from the data so nothing is listed that can't match. */
export function buildOptions(projects: Project[]): Record<FilterGroup, FilterOption[]> {
  const present = (g: FilterGroup) => new Set(projects.flatMap((p) => valuesFor(p, g)));
  const types = present("type");
  const statuses = present("status");

  // Stack: most-used first, then alphabetical.
  const tagCount = new Map<string, { label: string; n: number }>();
  for (const p of projects) {
    for (const t of p.tags ?? []) {
      const cur = tagCount.get(slug(t));
      tagCount.set(slug(t), { label: cur?.label ?? t, n: (cur?.n ?? 0) + 1 });
    }
  }

  return {
    type: (Object.keys(TYPE_LABEL) as ProjectType[])
      .filter((t) => types.has(t))
      .map((t) => ({ value: t, label: TYPE_LABEL[t] })),
    status: (Object.keys(STATUS_LABEL) as ProjectStatus[])
      .filter((s) => statuses.has(s))
      .map((s) => ({ value: s, label: STATUS_LABEL[s] })),
    stack: [...tagCount.entries()]
      .sort((a, b) => b[1].n - a[1].n || a[1].label.localeCompare(b[1].label))
      .map(([value, { label }]) => ({ value, label })),
  };
}

function matchesQuery(p: Project, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return [p.name, p.description, ...(p.tags ?? [])].some((s) =>
    s?.toLowerCase().includes(needle),
  );
}

/** OR within a group, AND across groups. `skip` leaves one group out (for facet counts). */
export function matches(p: Project, state: FilterState, skip?: FilterGroup): boolean {
  if (!matchesQuery(p, state.q.trim())) return false;
  return GROUPS.every(({ key }) => {
    if (key === skip || state[key].length === 0) return true;
    const own = valuesFor(p, key);
    return state[key].some((v) => own.includes(v));
  });
}

/** How many projects each option would show, given every other active filter. */
export function facetCounts(
  projects: Project[],
  state: FilterState,
): Record<FilterGroup, Record<string, number>> {
  const out = { type: {}, status: {}, stack: {} } as Record<FilterGroup, Record<string, number>>;
  for (const { key } of GROUPS) {
    for (const p of projects) {
      if (!matches(p, state, key)) continue;
      for (const v of valuesFor(p, key)) out[key][v] = (out[key][v] ?? 0) + 1;
    }
  }
  return out;
}

export const hasFilters = (s: FilterState) =>
  s.q.trim() !== "" || GROUPS.some(({ key }) => s[key].length > 0);

/* ─── URL state: ?type=library,dataset&stack=pydantic&sort=oldest&q=log ── */

export function parseFilters(params: URLSearchParams): FilterState {
  const list = (k: string) =>
    (params.get(k) ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  const sort = params.get("sort");
  return {
    type: list("type"),
    status: list("status"),
    stack: list("stack"),
    sort: SORTS.some((s) => s.value === sort) ? (sort as ProjectSort) : DEFAULT_SORT,
    q: params.get("q") ?? "",
  };
}

export function serializeFilters(s: FilterState): string {
  const params = new URLSearchParams();
  for (const { key } of GROUPS) if (s[key].length) params.set(key, s[key].join(","));
  if (s.sort !== DEFAULT_SORT) params.set("sort", s.sort);
  if (s.q.trim()) params.set("q", s.q);
  // Keep commas readable in shared links.
  return params.toString().replace(/%2C/g, ",");
}
