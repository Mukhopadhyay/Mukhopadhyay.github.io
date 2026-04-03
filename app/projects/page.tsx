"use client";

// import resume from "../../data/resume.json";
import data from "../../data/projects.json";
import Reveal from "../../components/Reveal";
import { Project } from "@/types/types";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const projects: Project[] = data || [];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Projects</h1>
      </Reveal>

      {projects.map((project, i) => (
        <Reveal key={i} delay={i * 60}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
