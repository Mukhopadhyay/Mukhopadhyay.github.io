import type { Metadata } from "next";
import { Suspense } from "react";
import data from "../../data/projects.json";
import { Project } from "@/types/types";
import ProjectsExplorer, { ProjectsView } from "@/components/ProjectsExplorer";

export const metadata: Metadata = { title: "Projects" };

const projects = data as Project[];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="enter">
        <h1 className="text-title font-semibold tracking-[-0.02em]">Projects</h1>
        <p className="mt-3 max-w-[60ch] text-muted-foreground">
          Open-source libraries and datasets, with links to code, docs and packages.
        </p>
      </header>

      {/* The static HTML carries the unfiltered view; the URL query applies on hydrate. */}
      <Suspense fallback={<ProjectsView projects={projects} query="" />}>
        <ProjectsExplorer projects={projects} />
      </Suspense>
    </div>
  );
}
