// One label convention across the site: Title Case, correct brand spelling.
const LINK_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  kaggle: "Kaggle",
  docs: "Docs",
  pypi: "PyPI",
  email: "Email",
};

export function linkLabel(type: string): string {
  return LINK_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1);
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2021-12" → "Dec 2021"; anything else (e.g. "Present") is returned as is. */
export function formatMonth(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})/);
  if (!m) return value;
  return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

/** ISO date → "Apr 13, 2026" (UTC, so static export and client agree). */
export function formatDate(value?: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** ISO date → "Sep 8" in the current year, else "Sep 8, 2025" (UTC). */
export function formatShortDate(value?: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const sameYear = d.getUTCFullYear() === new Date().getUTCFullYear();
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
    timeZone: "UTC",
  });
}
