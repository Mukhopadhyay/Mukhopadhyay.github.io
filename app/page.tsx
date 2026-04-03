"use client";

import { Project } from "@/types/types";
import ResumeCard from "../components/ResumeCard";
// import PostList from "../components/PostList";
import Reveal from "../components/Reveal";
// import resume from "../data/resume.json";
import projectsData from "../data/projects.json";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const projects: Project[] = projectsData || [];

  // const basics = resume.basics || {};
  // const projects = resume.projects || [];

  // // create simple posts from projects
  // const posts = projects.map((p, i) => {
  //   const d = new Date(2024, 3, 9 - i); // sample dates in April 2024
  //   const dateStr = d.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  //   return {
  //     title: p.name,
  //     date: dateStr,
  //     description: p.description || p.highlights?.[0] || "",
  //     link: p.link || "#",
  //   };
  // });

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
      </Reveal>
    </div>
  );
}
