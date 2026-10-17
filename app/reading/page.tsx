import type { Metadata } from "next";
import Section from "@/components/Section";
import HoverGroup from "@/components/HoverGroup";
import BookCover from "@/components/reading/BookCover";
import Progress from "@/components/reading/Progress";
import { getReading, progressLabel, type Book } from "@/lib/reading";
import { formatDate, formatMonth } from "@/lib/format";
import { enterAt } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Reading",
  description: "What I'm reading now, what I finished recently, and what's next.",
};

/** Optional link out; plain text when the book has no url. */
function Title({ book, className = "" }: { book: Book; className?: string }) {
  const cls = `font-medium leading-snug transition-colors duration-150 group-hover:text-accent ${className}`;
  return book.url ? (
    <a href={book.url} target="_blank" rel="noreferrer" className={`link-draw-host ${cls}`}>
      <span className="link-draw-target">{book.title}</span>
    </a>
  ) : (
    <span className={cls}>{book.title}</span>
  );
}

export default function ReadingPage() {
  const { current, finished, want } = getReading();

  return (
    <div className="flex flex-col gap-14 md:gap-16">
      <header className="enter">
        <h1 className="text-title font-semibold tracking-[-0.02em]">Reading</h1>
        <p className="mt-3 max-w-[60ch] text-muted-foreground">
          What I&apos;m reading now, what I finished recently, and what&apos;s next.
        </p>
      </header>

      {current.length > 0 && (
        <Section id="current" title="Currently reading" className="enter" style={enterAt(1)}>
          <ul className="divide-y divide-border">
            {current.slice(0, 2).map((b) => {
              const started = formatDate(b.started);
              const pages = progressLabel(b.progress);
              return (
                <HoverGroup as="li" key={b.id} className="group flex gap-5 py-5 first:pt-0 last:pb-0">
                  <BookCover book={b} size="M" eager className="w-20 sm:w-24" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3>
                      <Title book={b} className="text-lead" />
                    </h3>
                    <p className="text-muted-foreground">{b.author}</p>
                    <div className="mt-auto max-w-sm pt-4">
                      <Progress progress={b.progress} />
                      <p className="mt-1 font-mono text-meta text-subtle-foreground">
                        {pages}
                        {pages && started && <span aria-hidden className="mx-1.5">·</span>}
                        {started && (
                          <>
                            started <time dateTime={b.started}>{started}</time>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </HoverGroup>
              );
            })}
          </ul>
        </Section>
      )}

      {finished.length > 0 && (
        <Section id="finished" title="Recently finished" className="enter" style={enterAt(2)}>
          {/* List on phones, cover grid from sm up */}
          <ul className="flex flex-col divide-y divide-border sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 sm:divide-y-0 md:grid-cols-4">
            {finished.map((b) => (
              <HoverGroup
                as="li"
                key={b.id}
                className="group flex gap-4 py-4 first:pt-0 last:pb-0 sm:flex-col sm:gap-3 sm:py-0"
              >
                <BookCover book={b} size="M" className="w-12 sm:w-full" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.9375rem]">
                    <Title book={b} />
                  </h3>
                  <p className="text-sm text-muted-foreground">{b.author}</p>
                  {b.finished && (
                    <p className="mt-1 font-mono text-meta text-subtle-foreground">
                      <time dateTime={b.finished}>{formatMonth(b.finished)}</time>
                    </p>
                  )}
                  {b.take && (
                    <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{b.take}</p>
                  )}
                </div>
              </HoverGroup>
            ))}
          </ul>
        </Section>
      )}

      {want.length > 0 && (
        <Section id="want" title="Want to read" className="enter" style={enterAt(3)}>
          <ul className="divide-y divide-border">
            {want.map((b) => (
              <li
                key={b.id}
                className="group flex flex-wrap items-baseline justify-between gap-x-4 py-3 first:pt-0 last:pb-0"
              >
                <h3 className="min-w-0">
                  <Title book={b} />
                </h3>
                <p className="font-mono text-meta text-subtle-foreground">{b.author}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
