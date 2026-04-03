"use client";
import data from "../../data/experiences.json";
import Reveal from "../../components/Reveal";
import ExperienceCard from "../../components/ExperienceCard";
import { Experience } from "@/types/types";

export default function ExperiencePage() {
  const experiences: Experience[] = data || [];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Experience</h1>
      </Reveal>
      {experiences.map((exp, expIdx) => (
        <Reveal key={expIdx} delay={expIdx * 60}>
          <ExperienceCard exp={exp} />
        </Reveal>
      ))}
    </div>
  );
}
