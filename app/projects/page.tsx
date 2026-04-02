import resume from "../../data/resume.json";
import Reveal from "../../components/Reveal";

export default function ProjectsPage() {
  const projects = resume.projects || [];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Projects</h1>
      </Reveal>

      {projects.map((p, i) => (
        <Reveal key={i} delay={i * 60}>
          <article className="">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            {p.description && (
              <div className="text-sm text-foreground/60">{p.description}</div>
            )}
            {p.tech_stack && (
              <div className="text-sm text-foreground/60 mt-2">
                {p.tech_stack.join(" • ")}
              </div>
            )}
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm mt-2 inline-block hover:underline"
              >
                view
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
