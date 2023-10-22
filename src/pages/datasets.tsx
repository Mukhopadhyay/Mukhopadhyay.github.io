import { PageProps } from "gatsby";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Dataset as DatasetCard } from "../components/dataset";
import { Eye, View, Star, MoveUp } from "lucide-react";

import { datasets } from "./../../data/datasets";
import { Dataset } from "./../../types/data";

const highlight: Dataset = datasets[0];
const otherDatasets: Array<Dataset> = datasets.slice(1);

const top2 = datasets[1];
const top3 = datasets[2];

const DatasetsPage: React.FC<PageProps> = () => {
  console.log("highlight");
  console.log(highlight);

  console.log("otherDatasets");
  console.log(otherDatasets);

  return (
    // from-zinc-900 via-zinc-400/10 to-zinc-900
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black">
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Datasets
            </h2>
            <p className="mt-4 text-zinc-400">
              Some of the datasets I created over the past few years. Find more
              on my{" "}
              <a
                className="underline"
                href="https://www.kaggle.com/praneshmukhopadhyay"
              >
                Kaggle
              </a>
            </p>
          </div>
          <div className="w-full h-px bg-zinc-800" />

          {/* Highlighted dataset */}
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            <Card>
              <a href={highlight.kaggleUrl} target="_blank">
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">"Mar 28, 2023"</div>
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
                </article>
              </a>
            </Card>

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].map((project) => (
                <Card key={project.name}>
                  <DatasetCard data={project} />
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden w-full h-px md:block bg-zinc-800" />

          {/* Other datasets */}
          {/* <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-c ols-1 gap-4">
              <Card>
                <DatasetCard />
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <DatasetCard />
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <DatasetCard />
              </Card>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DatasetsPage;
