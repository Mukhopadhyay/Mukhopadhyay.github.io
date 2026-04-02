// import resume from "../../data/resume.json";
import data from "../../data/projects.json";
import Reveal from "../../components/Reveal";
import { Project } from "@/types/types";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const projects: Project[] = data || [];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Projects</h1>
      </Reveal>

      {projects.map((p, i) => (
        <Reveal key={i} delay={i * 60}>
          <article className="">
            <h2 className="text-lg font-semibold cursor-pointer hover:underline">
              {p.name}
            </h2>
            {p.description && (
              <div className="text-sm text-foreground/60">{p.description}</div>
            )}
            {p.tech_stack && (
              // <div className="text-sm text-foreground/60 mt-2">

              <div className="flex flex-wrap gap-2 mt-2 items-center">
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
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {link.type}
                  </a>
                ))}
              </div>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
