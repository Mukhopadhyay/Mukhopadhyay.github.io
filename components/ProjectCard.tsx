import { BookOpen, Box, Code, Table } from "lucide-react";
import { Badge } from "./ui/badge";
import GithubIcon from "./icons/gh";
import { Project } from "@/types/types";

const ProjectCard = ({
  project,
  recent = false,
}: {
  project: Project;
  recent?: boolean;
}) => {
  return (
    <article className="border-b-2 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold cursor-pointer hover:underline">
          {project.name}
        </h2>
        <div className="flex items-center gap-1">
          <Code size={14} />
          <p className="text-xs">Project</p>
        </div>
      </div>
      {project.description && (
        <div className="text-sm text-foreground/60">{project.description}</div>
      )}
      {project.tech_stack && (
        <div className="flex flex-wrap gap-3 mt-2 items-center">
          {project.tech_stack.map((tech, i) => (
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

      {project.links && project.links.length > 0 && (
        <div className="text-sm text-foreground/60 mt-2 flex flex-row gap-2">
          {project.links.map((link, idx) => (
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
      {recent === false && (
        <div>
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-2 ml-4">
              <h3 className="font-medium">Highlights:</h3>
              <ul className="list-disc list-inside mt-1 text-sm text-foreground/60">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
