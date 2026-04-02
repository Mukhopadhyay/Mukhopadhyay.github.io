import Link from "next/link";

export default function Nav() {
  const links = [
    { href: "/", label: "home" },
    { href: "/experience", label: "experience" },
    { href: "/projects", label: "projects" },
    { href: "/blogs", label: "blogs" },
  ];

  return (
    <header className="w-full border-b border-white/6">
      <div className="max-w-3xl mx-auto flex items-center justify-start gap-6 py-4 text-sm">
        <nav className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="capitalize text-white/80 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
