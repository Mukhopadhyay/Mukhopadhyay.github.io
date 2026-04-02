import { getPostBySlug } from "../../../lib/posts";
import BlogContent from "../../../components/BlogContent";
import Link from "next/link";
import fs from "fs";
import path from "path";

type Props = { params: { slug: string } };

export function generateStaticParams(): { slug: string }[] {
  const candidates = [
    path.join(process.cwd(), "blogs"),
    path.join(process.cwd(), "data", "blogs"),
  ];

  const files: string[] = [];
  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    const dirFiles = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    files.push(...dirFiles.map((f) => path.join(dir, f)));
  }

  // normalize to slugs and dedupe
  const slugs = Array.from(
    new Set(files.map((f) => path.basename(f).replace(/\.md$/, ""))),
  );

  return slugs.map((s) => ({ slug: s }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>Post not found</div>;
  }

  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="max-w-none">
      <div className="mb-4">
        <Link href="/blogs" className="text-foreground/60 hover:underline">
          ← Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {date && <div className="text-sm text-foreground/60 mb-6">{date}</div>}

      <BlogContent html={post.content} />
    </article>
  );
}
