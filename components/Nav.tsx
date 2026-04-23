import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const links = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    // { href: "/experience", label: "experience" },
    // { href: "/blogs", label: "blogs" },
  ];

  return (
    <header className="w-full border-b border-border">
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-6 py-4 text-sm">
        <nav className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="capitalize text-foreground/80 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
