import resume from "../../data/resume.json";

export default function ExperiencePage() {
  const experience = resume.experience || [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Experience</h1>
      {experience.map((exp, idx) => (
        <article key={idx} className="">
          <h2 className="text-lg font-semibold">
            {exp.company} — {exp.role}
          </h2>
          <div className="text-sm text-zinc-400">
            {exp.start_date} · {exp.end_date}
          </div>
          <div className="mt-2 text-sm text-zinc-300">
            {exp.projects?.map((p, i) => (
              <div key={i} className="mt-2">
                <div className="font-medium">{p.name}</div>
                <div className="text-zinc-400 text-sm">{p.highlights?.[0]}</div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
