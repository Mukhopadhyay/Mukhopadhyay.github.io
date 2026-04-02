// import resume from "../data/resume.json";
import { PersonalInfo } from "@/types/types";
import data from "../data/personal.json";

export default function Footer() {
  const year = new Date().getFullYear();
  const personal: PersonalInfo = data;

  // Filter type == 'github' and get the url
  const github = personal.links.find((link) => link.type === "github")?.url;

  return (
    <footer className="w-full border-t border-border py-8">
      <div className="max-w-3xl mx-auto px-6 text-sm text-foreground/60">
        <div className="flex gap-4 mb-4">
          {/* <a href="/rss.xml" className="hover:text-foreground">
            ↗ rss
          </a> */}
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            ↗ github
          </a>
          <a
            href="https://github.com/Mukhopadhyay/Mukhopadhyay.github.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            ↗ view source
          </a>
        </div>
        <div>© {year} MIT Licensed</div>
      </div>
    </footer>
  );
}
