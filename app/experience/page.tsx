"use client";
import { useState } from "react";
import data from "../../data/experiences.json";
import Reveal from "../../components/Reveal";
import { Experience } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { EyeClosed } from "lucide-react";

export default function ExperiencePage() {
  const experiences: Experience[] = data || [];

  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({});
  const [expandedHighlights, setExpandedHighlights] = useState<
    Record<string, boolean>
  >({});

  const techKey = (expIdx: number, projIdx: number) =>
    `tech-${expIdx}-${projIdx}`;
  const highlightsKey = (expIdx: number, projIdx: number) =>
    `high-${expIdx}-${projIdx}`;

  const toggleTech = (key: string) =>
    setExpandedTech((s) => ({ ...s, [key]: !s[key] }));
  const toggleHighlights = (key: string) =>
    setExpandedHighlights((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="text-2xl font-bold">Experience</h1>
      </Reveal>
      {experiences.map((exp, expIdx) => (
        <Reveal key={expIdx} delay={expIdx * 60}>
          <article className="border-b-2 pb-6">
            <h2 className="text-lg font-semibold">{exp.company}</h2>
            <p className="text-foreground/80 font-medium">{exp.role}</p>
            <div className="text-sm text-foreground/60">
              {exp.start_date} · {exp.end_date}
            </div>
            <div className="mt-2 text-sm text-foreground/60">
              {exp.projects?.map((p, projIdx) => {
                const tKey = techKey(expIdx, projIdx);
                const hKey = highlightsKey(expIdx, projIdx);
                const isTechExpanded = !!expandedTech[tKey];
                const isHighlightsExpanded = !!expandedHighlights[hKey];

                return (
                  <div key={projIdx} className="mt-2">
                    <div className="font-medium">{p.name}</div>

                    {p.tech_stack && (
                      <div className="flex gap-2 mt-1 items-center">
                        {p.tech_stack.slice(0, 3).map((tech, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="cursor-pointer px-2"
                          >
                            {tech}
                          </Badge>
                        ))}

                        <div
                          aria-hidden={!isTechExpanded}
                          className={`inline-flex flex-nowrap gap-2 items-center overflow-hidden transition-[max-width,max-height,opacity] duration-300 ease-in-out ${
                            isTechExpanded
                              ? "max-w-[640px] max-h-10 opacity-100"
                              : "max-w-0 max-h-0 opacity-0"
                          }`}
                        >
                          {p.tech_stack.slice(3).map((tech, j) => (
                            <Badge
                              key={`extra-${j}`}
                              variant="secondary"
                              className="cursor-pointer px-2"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {p.tech_stack.length > 3 && (
                          <Badge
                            variant="outline"
                            className="cursor-pointer px-2"
                            onClick={() => toggleTech(tKey)}
                            aria-expanded={isTechExpanded}
                          >
                            {isTechExpanded ? (
                              <>
                                <EyeClosed />
                                <p>Hide</p>
                              </>
                            ) : (
                              `+${p.tech_stack.length - 3} more`
                            )}
                          </Badge>
                        )}
                      </div>
                    )}

                    {p.highlights && (
                      <div>
                        <ul className="list-disc list-inside mt-2 text-sm text-foreground/80 ml-4">
                          {p.highlights.slice(0, 1).map((h, i) => (
                            <li key={i} className="text-foreground/60">
                              {h}
                            </li>
                          ))}

                          {p.highlights.slice(1).map((h, i) => (
                            <li
                              key={`extra-h-${i}`}
                              className={`text-foreground/60 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out ${
                                isHighlightsExpanded
                                  ? "max-h-40 opacity-100 translate-y-0"
                                  : "max-h-0 opacity-0 -translate-y-1"
                              }`}
                            >
                              {h}
                            </li>
                          ))}
                        </ul>

                        {p.highlights.length > 1 && (
                          <Badge
                            variant="outline"
                            className="cursor-pointer px-2 mt-1 ml-2"
                            onClick={() => toggleHighlights(hKey)}
                            aria-expanded={isHighlightsExpanded}
                          >
                            {isHighlightsExpanded ? (
                              <>
                                <EyeClosed />
                                <p>Hide</p>
                              </>
                            ) : (
                              `+${p.highlights.length - 1} more`
                            )}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
