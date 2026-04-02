import resume from "../../data/resume.json";

export default function BlogsPage() {
  const projects = resume.projects || [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Blog</h1>

      <p className="text-sm text-zinc-400">
        This section lists project notes and short writeups.
      </p>

      <ul className="flex flex-col gap-4">
        {projects.map((p, i) => (
          <li key={i}>
            <a href={p.link || "#"} className="group block">
              <div className="text-lg font-medium text-white group-hover:underline">
                {p.name}
              </div>
              {p.highlights?.[0] && (
                <div className="text-sm text-zinc-400">{p.highlights[0]}</div>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
