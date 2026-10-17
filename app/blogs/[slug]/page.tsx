import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, TocItem } from "../../../lib/posts";
import BlogContent from "../../../components/BlogContent";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return post ? { title: post.title, description: post.description } : {};
}

function TocList({ items }: { items: TocItem[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t) => (
        <li key={t.id} className={t.depth === 3 ? "pl-3" : undefined}>
          <a
            href={`#${t.id}`}
            className="block text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = formatDate(post.date);
  const showToc = post.toc.filter((t) => t.depth === 2).length >= 3;

  return (
    <article className="relative">
      <Link
        href="/blogs"
        className="link-draw-host group -ml-0.5 inline-flex min-h-10 items-center font-mono text-meta text-subtle-foreground transition-colors hover:text-foreground"
      >
        <span
          aria-hidden
          className="mr-1.5 transition-transform duration-500 ease-spring group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        >
          ←
        </span>
        <span className="link-draw-target">Blog</span>
      </Link>

      <header className="mt-6 max-w-[68ch]">
        <h1 className="text-title font-semibold tracking-[-0.02em] text-balance">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-3 text-lead text-muted-foreground text-pretty">
            {post.description}
          </p>
        )}
        <p className="mt-4 font-mono text-meta text-subtle-foreground">
          {date && <time dateTime={post.date}>{date}</time>}
          {date && <span aria-hidden className="mx-2">·</span>}
          {post.minutes} min read
        </p>
      </header>

      {showToc && (
        <>
          {/* Narrow screens: collapsible contents above the post */}
          <details className="group mt-8 max-w-[68ch] border-y border-border py-3 text-sm xl:hidden">
            <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between font-mono text-meta text-subtle-foreground [&::-webkit-details-marker]:hidden">
              Contents
              <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <nav aria-label="Contents" className="pb-1 pt-3">
              <TocList items={post.toc} />
            </nav>
          </details>

          {/* Wide screens: sticky in the right margin */}
          <aside className="absolute bottom-0 left-full top-0 ml-12 hidden w-52 xl:block">
            <nav aria-label="Contents" className="sticky top-10 text-[0.8125rem] leading-snug">
              <p className="mb-3 font-mono text-meta text-subtle-foreground">Contents</p>
              <TocList items={post.toc} />
            </nav>
          </aside>
        </>
      )}

      <div className="mt-10">
        <BlogContent html={post.content} />
      </div>
    </article>
  );
}
