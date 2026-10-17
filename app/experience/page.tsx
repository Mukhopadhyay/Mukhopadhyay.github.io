import data from "../../data/experiences.json";
import ExperienceCard from "../../components/ExperienceCard";
import { Experience } from "@/types/types";

export default function ExperiencePage() {
  const experiences = data as Experience[];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title font-semibold tracking-[-0.02em]">Experience</h1>
      {experiences.map((exp) => (
        <ExperienceCard key={`${exp.company}-${exp.start_date}`} exp={exp} />
      ))}
    </div>
  );
}
