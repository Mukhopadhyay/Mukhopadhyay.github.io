"use client";

import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import BlogCard from "./BlogCard";
import { Project } from "@/types/types";
import { PostMeta } from "@/lib/posts";

export default function HomeClient({
  projects,
  posts,
}: {
  projects: Project[];
  posts: PostMeta[];
}) {
  return (
    <>
      <Reveal delay={80}>
        <h2 className="text-2xl font-semibold">Recent</h2>
      </Reveal>

      <Reveal delay={120}>
        {projects.slice(0, 2).map((p: Project, idx: number) => (
          <ProjectCard key={idx} project={p} recent />
        ))}
        {posts.slice(0, 2).map((p: PostMeta, idx: number) => (
          <BlogCard key={idx} post={p} recent />
        ))}
      </Reveal>
    </>
  );
}
