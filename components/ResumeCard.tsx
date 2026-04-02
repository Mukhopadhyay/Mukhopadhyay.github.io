"use client";

import { FileText } from "lucide-react";

type Basics = {
  name?: string;
  location?: string;
  email?: string;
  summary?: string;
  links?: Record<string, string>;
};

export default function ResumeCard({ basics }: { basics: Basics }) {
  return (
    <section className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{basics.name}</h1>
      <p className="text-foreground/60 mt-3 max-w-prose">{basics.summary}</p>

      <div className="mt-4 text-sm text-foreground/70 flex flex-col sm:flex-row sm:items-center gap-2">
        <div>{basics.location}</div>
        <div className="hidden sm:block">
          <p>&bull;</p>
        </div>
        <a href={`mailto:${basics.email}`} className="hover:underline">
          {basics.email}
        </a>

        <div className="flex gap-3 ml-0 sm:ml-4">
          <div className="hidden sm:block">
            <p>|</p>
          </div>

          {basics.links &&
            Object.entries(basics.links).map(([k, v]) => (
              <a
                key={k}
                href={v}
                target="_blank"
                rel="noreferrer"
                className="capitalize hover:text-foreground"
              >
                {k}
              </a>
            ))}
        </div>
      </div>
      {/* Download my resume section */}
      <div
        className="text-sm text-foreground/70 flex items-center gap-1 mt-4 cursor-pointer hover:text-foreground hover:underline"
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
