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
      <p className="text-zinc-300 mt-3 max-w-prose">{basics.summary}</p>

      <div className="mt-4 text-sm text-white/70 flex flex-col sm:flex-row sm:items-center gap-2">
        <div>{basics.location}</div>
        <a href={`mailto:${basics.email}`} className="hover:underline">
          {basics.email}
        </a>
        <div className="flex gap-3 ml-0 sm:ml-4">
          {basics.links &&
            Object.entries(basics.links).map(([k, v]) => (
              <a
                key={k}
                href={v}
                target="_blank"
                rel="noreferrer"
                className="capitalize hover:text-white/90"
              >
                {k}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
