// import type { Project } from "@/.contentlayer/generated";
// import Link from "next/link";
import { MoveUp, Star } from "lucide-react";
import { Project as ProjectType } from "../../types/data";

import React from "react";

type Props = {
  data: ProjectType;
};

export const Project: React.FC<Props> = ({ data }) => {
  return (
    <a href={data.url} target="_blank">
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          {data.published ? (
            <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
              <span>SOON</span>
            </span>
          ) : (
            <></>
          )}

          {data.rating ? (
            <span className="text-zinc-500 text-xs  flex items-center gap-1">
              {data.ratingType === "upvotes" ? (
                <MoveUp className="w-4 h-4" />
              ) : (
                <Star className="w-4 h-4" />
              )}{" "}
              {data.rating}
            </span>
          ) : (
            <></>
          )}
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {data.name}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {data.description}
        </p>
      </article>
    </a>
  );
};
