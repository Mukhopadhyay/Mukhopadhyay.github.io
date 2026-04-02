import resume from "../data/resume.json";

export default function Footer() {
  const year = new Date().getFullYear();
  const github = resume.basics?.links?.github || "#";

  return (
    <footer className="w-full border-t border-white/6 py-8">
      <div className="max-w-3xl mx-auto text-sm text-white/60">
        <div className="flex gap-4 mb-4">
          <a href="/rss.xml" className="hover:text-white">
            ↗ rss
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            ↗ github
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            ↗ view source
          </a>
        </div>
        <div>© {year} MIT Licensed</div>
      </div>
    </footer>
  );
}
