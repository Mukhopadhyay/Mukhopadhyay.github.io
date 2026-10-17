/**
 * Reading data layer. Pages only call `getReading()`, so the source can
 * change (Goodreads RSS, Hardcover API) without touching any component:
 * write another `ReadingSource` that returns `Book[]` and swap it below.
 */

import { books } from "@/content/reading";

export type BookStatus = "reading" | "finished" | "want";

export type BookProgress = { page: number; total: number } | { percent: number };

export type Book = {
  /** Stable id (slug). Sources should keep it stable across syncs. */
  id: string;
  title: string;
  author: string;
  isbn?: string;
  /** Explicit cover URL; wins over the ISBN lookup. */
  cover?: string;
  status: BookStatus;
  /** "YYYY-MM-DD" */
  started?: string;
  /** "YYYY-MM" or "YYYY-MM-DD" */
  finished?: string;
  progress?: BookProgress;
  /** One line on a finished book. */
  take?: string;
  /** Optional link out (Goodreads, publisher, review). */
  url?: string;
};

export type Reading = {
  current: Book[];
  finished: Book[];
  want: Book[];
};

export type ReadingSource = () => Book[];


/** Local, hand-edited file. */
const localSource: ReadingSource = () => books;

const source: ReadingSource = localSource;

const byDateDesc = (k: "started" | "finished") => (a: Book, b: Book) =>
  (b[k] ?? "").localeCompare(a[k] ?? "");

export function getReading(): Reading {
  const all = source();
  return {
    current: all.filter((b) => b.status === "reading").sort(byDateDesc("started")),
    finished: all.filter((b) => b.status === "finished").sort(byDateDesc("finished")),
    want: all.filter((b) => b.status === "want"),
  };
}

/**
 * Cover URL, or null when there is nothing to try. `default=false` makes
 * Open Library return 404 instead of a blank image, so the placeholder shows.
 */
export function coverUrl(book: Book, size: "S" | "M" | "L" = "M"): string | null {
  if (book.cover) return book.cover;
  if (book.isbn) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn.replace(/[^0-9X]/gi, "")}-${size}.jpg?default=false`;
  }
  return null;
}

/** 0–100, or null when progress isn't known. */
export function progressPercent(p?: BookProgress): number | null {
  if (!p) return null;
  const pct = "percent" in p ? p.percent : p.total > 0 ? (p.page / p.total) * 100 : 0;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export function progressLabel(p?: BookProgress): string | null {
  if (!p) return null;
  return "percent" in p ? `${progressPercent(p)}%` : `p. ${p.page} / ${p.total}`;
}
