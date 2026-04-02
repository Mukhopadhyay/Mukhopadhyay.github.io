import Reveal from "../../components/Reveal";
import { getAllPosts } from "../../lib/posts";
import Link from "next/link";

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
                <Link href={`/blogs/${p.slug}`} className="group block">
                  <div className="text-lg font-medium text-foreground group-hover:underline">
                    {p.title}
                  </div>
                  {p.description && (
                    <div className="text-sm text-foreground/60">
                      {p.description}
                    </div>
                  )}
                  {p.date && (
                    <div className="text-sm text-foreground/60 mt-1">
                      {new Date(p.date).toLocaleDateString()}
                    </div>
                  )}
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
