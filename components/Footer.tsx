import { PersonalInfo } from "@/types/types";
import data from "../data/personal.json";

const SOURCE_URL = "https://github.com/Mukhopadhyay/Mukhopadhyay.github.io";

export default function Footer() {
  const year = new Date().getFullYear();
  const personal: PersonalInfo = data;
  const github = personal.links.find((link) => link.type === "github")?.url;

  const linkClass = "link-draw transition-colors hover:text-foreground";

  return (
    <footer className="mx-auto w-full max-w-[46rem] px-5 pb-10">
      <p className="border-t border-border pt-6 font-mono text-meta text-subtle-foreground">
        © {year} {personal.name}
        <span aria-hidden className="mx-2">·</span>
        <a href={SOURCE_URL} target="_blank" rel="noreferrer" className={linkClass}>
          Source
        </a>
        {github && (
          <>
            <span aria-hidden className="mx-2">·</span>
            <a href={github} target="_blank" rel="noreferrer" className={linkClass}>
              GitHub
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
