import { PageProps } from "gatsby";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Project as ProjectCard } from "../components/project";
import { Star, MoveUp } from "lucide-react";

import { projects } from "./../../data/projects";
import { Project } from "./../../types/data";

const highlight: Project = projects[0];

const top2 = projects[1];
const top3 = projects[2];

const otherProjects: Array<Project> = projects.slice(3);

const ProjectPage: React.FC<PageProps> = () => {
  return (
    // from-zinc-900 via-zinc-400/10 to-zinc-900
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black">
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">
              Some of the open source projects I worked on over the years. You
              can find more on my github{" "}
              <a
                className="underline"
                target="_blank"
                href="https://github.com/Mukhopadhyay"
              >
                @Mukhopadhyay
              </a>
            </p>
          </div>
          <div className="w-full h-px bg-zinc-800" />

          {/* Highlighted dataset */}
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            <Card>
              <a href={highlight.url} target="_blank">
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    {highlight.publishedDate !== undefined ? (
                      <div className="text-xs text-zinc-100">
                        {highlight.publishedDate}
                      </div>
                    ) : (
                      <></>
                    )}
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      {highlight.ratingType === "upvotes" ? (
                        <MoveUp className="w-4 h-4" />
                      ) : (
                        <Star className="w-4 h-4" />
                      )}
                      {highlight.rating}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {highlight.name}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {highlight.description}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>

                  {highlight.documentation?.url !== undefined ? (
                    <div className="absolute bottom-4 right-8 md:bottom-8">
                      <a
                        className="hidden text-zinc-200 hover:text-zinc-50 lg:block"
                        href={highlight.documentation.url}
                        target="_blank"
                      >
                        {highlight.documentation.platform}
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                </article>
              </a>
            </Card>

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].map((project) => (
                <Card key={project.name}>
                  <ProjectCard data={project} />
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden w-full h-px md:block bg-zinc-800" />

          {/* Other datasets */}
          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            {otherProjects.map((project) => (
              <Card key={project.name}>
                <ProjectCard data={project} />
              </Card>
            ))}
            {/* {otherProjects.map((project) => {
              <div className="grid grid-c ols-1 gap-4">
                <Card>
                  <ProjectCard />
                </Card>
              </div>;
            })} */}
            {/* <div className="grid grid-cols-1 gap-4">
              <Card>
                <DatasetCard />
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <DatasetCard />
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
