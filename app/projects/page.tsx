import resume from "../../data/resume.json";

export default function ProjectsPage() {
  const projects = resume.projects || [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      {projects.map((p, i) => (
        <article key={i} className="">
          <h2 className="text-lg font-semibold">{p.name}</h2>
          {p.description && (
            <div className="text-sm text-zinc-300">{p.description}</div>
          )}
          {p.tech_stack && (
            <div className="text-sm text-zinc-400 mt-2">
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
      ))}
    </div>
  );
}
