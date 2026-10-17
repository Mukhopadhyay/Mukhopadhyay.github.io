import {
  Brain,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers,
  Server,
  Sparkles,
} from "lucide-react";
import skillsData from "@/data/skills.json";
import educationData from "@/data/education.json";
import { Badge } from "./ui/badge";
import { Education, Skill } from "@/types/types";

const CATEGORY_ICON: Record<keyof Skill, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4 text-accent" />,
  Backend: <Server className="w-4 h-4 text-accent" />,
  DevOps: <Cloud className="w-4 h-4 text-accent" />,
  Databases: <Database className="w-4 h-4 text-accent" />,
  ML: <Brain className="w-4 h-4 text-accent" />,
  MLOps: <Layers className="w-4 h-4 text-accent" />,
  LLM: <Sparkles className="w-4 h-4 text-accent" />,
};

export default function SkillsEducation() {
  const skills: Skill = skillsData;
  const education: Education[] = educationData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <h2 className="text-2xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-col gap-3">
          {(Object.keys(skills) as (keyof Skill)[]).map((category) => (
            <div key={category}>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                {CATEGORY_ICON[category]}
                {category}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {skills[category].map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((edu) => (
            <div key={edu.institution} className="flex gap-2">
              <GraduationCap className="w-4 h-4 mt-1 shrink-0 text-accent" />
              <div>
                <div className="font-medium">{edu.degree}</div>
                <div className="text-sm text-foreground/60">
                  {edu.institution}
                </div>
                <div className="text-sm text-foreground/60">
                  {edu.location} &middot; {edu.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
