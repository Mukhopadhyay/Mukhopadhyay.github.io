"use client";

import { FileText } from "lucide-react";
import basics from "../data/personal.json";
import { PersonalInfo } from "@/types/types";
// type Basics = {
//   name?: string;
//   location?: string;
//   email?: string;
//   summary?: string;
//   links?: Record<string, string>;
// };

export default function ResumeCard() {
  const personal: PersonalInfo = basics;

  return (
    <section className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{personal.name}</h1>
      <p className="text-foreground/60 mt-3 max-w-prose">{personal.summary}</p>

      <div className="mt-4 text-sm text-foreground/70 flex flex-col sm:flex-row sm:items-center gap-2">
        <div>{personal.location}</div>
        <div className="hidden sm:block">
          <p>&bull;</p>
        </div>
        <a href={`mailto:${personal.email}`} className="hover:underline">
          {personal.email}
        </a>

        <div className="flex gap-3 ml-0 sm:ml-4">
          <div className="hidden sm:block">
            <p>|</p>
          </div>

          {/* Rendering the links */}
          {personal.links &&
            personal.links.map((link, idx) => {
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="capitalize hover:text-foreground"
                >
                  {link.type}
                </a>
              );
            })}

          {/* {personal.links &&
            Object.entries(personal.links).map(([k, v]) => {
              console.log("link", k, v);

              return (
                <a
                  key={v}
                  href={v}
                  target="_blank"
                  rel="noreferrer"
                  className="capitalize hover:text-foreground"
                >
                  {k}
                </a>
              );
            })} */}
        </div>
      </div>
      {/* Download my resume section */}
      <div
        className="text-sm text-foreground/70 flex items-center gap-1 mt-4 cursor-pointer hover:text-foreground underline transition duration-300"
        onClick={() => {
          const pdfUrl = "/Resume-Pranesh.M.pdf";
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = "Resume-Pranesh.M.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        <FileText size={15} />
        <div>Download Resume</div>
      </div>
    </section>
  );
}
