"use client";

import { Project } from "@/types/types";
import ResumeCard from "../components/ResumeCard";
// import PostList from "../components/PostList";
import Reveal from "../components/Reveal";
// import resume from "../data/resume.json";
import projectsData from "../data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const projects: Project[] = projectsData || [];
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <ResumeCard />
      </Reveal>

      <Reveal delay={80}>
        <h2 className="text-2xl font-semibold">Recent</h2>
      </Reveal>

      <Reveal delay={120}>
        {projects.slice(0, 2).map((p, idx) => (
          <ProjectCard key={idx} project={p} recent />
        ))}
        {posts.slice(0, 2).map((p, idx) => (
          <BlogCard key={idx} post={p} />
        ))}
      </Reveal>
    </div>
  );
}
