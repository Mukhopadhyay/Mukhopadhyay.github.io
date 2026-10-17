import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "../../lib/posts";
import personal from "../../data/personal.json";
import { enterAt } from "@/lib/motion";

export const metadata: Metadata = { title: "Blog" };

export default function BlogsPage() {
  const posts = getAllPosts();
  const github = personal.links.find((l) => l.type === "github")?.url;
  const kaggle = personal.links.find((l) => l.type === "kaggle")?.url;
  const inline =
    "link-draw link-inline text-foreground";

  return (
    <div className="flex flex-col gap-10">
      <header className="enter">
        <h1 className="text-title font-semibold tracking-[-0.02em]">Blog</h1>
        <p className="mt-3 max-w-[60ch] text-muted-foreground">
          Write-ups and notes.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="enter text-muted-foreground" style={enterAt(1)}>
          Nothing published yet.
        </p>
      ) : (
        <ol className="enter divide-y divide-border" style={enterAt(1)}>
          {posts.map((p) => (
            <li key={p.slug} className="py-5 first:pt-0 last:pb-0">
              <BlogCard post={p} layout="columns" />
            </li>
          ))}
        </ol>
      )}

      {(github || kaggle) && (
        <p
          className="enter text-sm text-muted-foreground md:pl-40"
          style={enterAt(2)}
        >
          Code lives on{" "}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className={inline}>
              GitHub
            </a>
          )}
          {github && kaggle && " and notebooks on "}
          {kaggle && (
            <a href={kaggle} target="_blank" rel="noreferrer" className={inline}>
              Kaggle
            </a>
          )}
          .
        </p>
      )}
    </div>
  );
}
