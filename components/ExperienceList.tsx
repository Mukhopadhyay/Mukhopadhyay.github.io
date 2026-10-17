import { Experience } from "@/types/types";
import { formatMonth } from "@/lib/format";

export default function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="divide-y divide-border">
      {items.map((exp) => (
        <li key={`${exp.company}-${exp.start_date}`} className="py-5 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <h3 className="font-medium">{exp.company}</h3>
            <p className="font-mono text-meta text-subtle-foreground">
              <time dateTime={exp.start_date}>{formatMonth(exp.start_date)}</time>
              {" – "}
              {exp.end_date === "Present" ? (
                "Present"
              ) : (
                <time dateTime={exp.end_date}>{formatMonth(exp.end_date)}</time>
              )}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{exp.role}</p>
          {exp.impact && <p className="mt-2 text-pretty">{exp.impact}</p>}
        </li>
      ))}
    </ol>
  );
}
