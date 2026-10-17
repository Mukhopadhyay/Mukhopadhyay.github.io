import type { Book } from "@/lib/reading";

/**
 * Reading list, edited by hand.
 *
 * - `status`: "reading" | "finished" | "want"
 * - Dates are "YYYY-MM-DD" (or "YYYY-MM" for `finished`).
 * - `progress`: { page, total } or { percent }.
 * - Covers come from Open Library by `isbn` unless `cover` is set.
 *   A neutral placeholder is shown when neither loads.
 * - `take`: one optional line on a finished book.
 *
 * SAMPLE DATA: replace these with your own books.
 */
export const books: Book[] = [
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "9781449373320",
    status: "reading",
    started: "2026-09-08",
    progress: { page: 312, total: 590 },
  },
  {
    id: "philosophy-of-software-design",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    isbn: "9781732102200",
    status: "finished",
    finished: "2026-08",
    take: "Deep modules over shallow ones. Changed how I size an API.",
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "9780593135204",
    status: "finished",
    finished: "2026-07",
    take: "The best problem-solving loop in fiction.",
  },
  {
    id: "three-body-problem",
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    isbn: "9780765382030",
    status: "finished",
    finished: "2026-05",
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    status: "finished",
    finished: "2026-03",
    take: "A field guide to my own estimation errors.",
  },
  {
    id: "pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    isbn: "9780135957059",
    status: "want",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "9781455586691",
    status: "want",
  },
];
