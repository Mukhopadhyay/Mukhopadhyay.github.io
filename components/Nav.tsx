import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import CommandPaletteTrigger from "./CommandPaletteTrigger";
import NavLinks from "./NavLinks";

export default function Nav() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-[46rem] items-center justify-between gap-4 px-5 pt-4">
        <Link
          href="/"
          className="-ml-1 inline-flex min-h-10 items-center whitespace-nowrap px-1 text-sm font-medium tracking-tight"
        >
          <span>@Mukhopadhyay</span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-3">
          <NavLinks />
          <div className="flex items-center">
            <CommandPaletteTrigger />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
