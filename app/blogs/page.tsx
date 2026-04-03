import BlogCard from "@/components/BlogCard";
import Reveal from "../../components/Reveal";
import { getAllPosts } from "../../lib/posts";

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Blog</h1>
      </Reveal>

      <Reveal delay={60}>
        <p className="text-sm text-foreground/60">
          Short writeups and external posts.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal delay={120}>
          <div className="text-foreground/60 text-xl">Coming Soon</div>
        </Reveal>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <li>
                <BlogCard post={p} />
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
