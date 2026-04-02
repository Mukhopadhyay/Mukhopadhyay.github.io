"use client";

// import resume from "../../data/resume.json";
import data from "../../data/projects.json";
import Reveal from "../../components/Reveal";
import { Project } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import GithubIcon from "@/components/icons/gh";
import { BookOpen, Box, Table } from "lucide-react";
import { useState } from "react";

export default function ProjectsPage() {
  const projects: Project[] = data || [];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Projects</h1>
      </Reveal>

      {projects.map((p, i) => (
        <Reveal key={i} delay={i * 60}>
          <article className="border-b-2 pb-6">
            <h2 className="text-lg font-semibold cursor-pointer hover:underline">
              {p.name}
            </h2>
            {p.description && (
              <div className="text-sm text-foreground/60">{p.description}</div>
            )}
            {p.tech_stack && (
              <div className="flex flex-wrap gap-3 mt-2 items-center">
                {p.tech_stack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="destructive"
                    className="cursor-pointer px-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {p.links && p.links.length > 0 && (
              <div className="text-sm text-foreground/60 mt-2 flex flex-row gap-2">
                {p.links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                      window.open(link.url, "_blank");
                    }}
                  >
                    {/* Github icon if link.type == 'github' */}
                    {link.type === "github" && <GithubIcon />}
                    {link.type === "docs" && <BookOpen className="w-4 h-4" />}
                    {link.type === "pypi" && <Box className="w-4 h-4" />}
                    {link.type === "kaggle" && <Table className="w-4 h-4" />}
                    <span className="hover:underline">{link.type}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div>
              {p.highlights && p.highlights.length > 0 && (
                <div className="mt-2 ml-4">
                  <h3 className="font-medium">Highlights:</h3>
                  <ul className="list-disc list-inside mt-1 text-sm text-foreground/60">
                    {p.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
