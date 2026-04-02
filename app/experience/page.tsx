import resume from "../../data/resume.json";
import Reveal from "../../components/Reveal";

export default function ExperiencePage() {
  const experience = resume.experience || [];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Experience</h1>
      </Reveal>
      {experience.map((exp, idx) => (
        <Reveal key={idx} delay={idx * 60}>
          <article className="">
            <h2 className="text-lg font-semibold">
              {exp.company} — {exp.role}
            </h2>
            <div className="text-sm text-foreground/60">
              {exp.start_date} · {exp.end_date}
            </div>
            <div className="mt-2 text-sm text-foreground/60">
              {exp.projects?.map((p, i) => (
                <div key={i} className="mt-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-foreground/60 text-sm">
                    {p.highlights?.[0]}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
