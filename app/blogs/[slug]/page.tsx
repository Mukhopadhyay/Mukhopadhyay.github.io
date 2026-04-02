import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import BlogContent from "../../../components/BlogContent";
import Link from "next/link";

type Props = { params: { slug: string } };

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  // `params` can be a thenable/proxy in dev/streaming; await to ensure it's resolved
  const resolvedParams: any = await Promise.resolve(params as any);
  const slug = resolvedParams?.slug ?? null;
  console.log("Resolved params:", resolvedParams, "slug:", slug);
  const post = await getPostBySlug(typeof slug === "string" ? slug : undefined);
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
