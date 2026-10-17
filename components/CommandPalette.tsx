"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import {
  BookOpen,
  Copy,
  FileText,
  FolderGit2,
  Home,
  Rss,
  Search,
  Table,
} from "lucide-react";
import personal from "@/data/personal.json";
import GithubIcon from "./icons/gh";
import LinkedinIcon from "./icons/linkedin";
import { Input } from "./ui/input";
import { downloadResume } from "@/lib/downloadResume";
import { linkLabel } from "@/lib/format";

export const COMMAND_PALETTE_OPEN_EVENT = "open-command-palette";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: () => React.ReactNode;
  run: (router: ReturnType<typeof useRouter>) => void;
};

const LINK_ICON: Record<string, () => React.ReactNode> = {
  github: () => <GithubIcon />,
  linkedin: () => <LinkedinIcon />,
  kaggle: () => <Table className="w-4 h-4" />,
};

function buildCommands(): Command[] {
  const commands: Command[] = [
    {
      id: "home",
      label: "Home",
      icon: () => <Home className="w-4 h-4" />,
      run: (router) => router.push("/"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: () => <FolderGit2 className="w-4 h-4" />,
      run: (router) => router.push("/projects"),
    },
    {
      id: "blogs",
      label: "Blog",
      icon: () => <Rss className="w-4 h-4" />,
      run: (router) => router.push("/blogs"),
    },
    {
      id: "reading",
      label: "Reading",
      icon: () => <BookOpen className="w-4 h-4" />,
      run: (router) => router.push("/reading"),
    },
    {
      id: "copy-email",
      label: "Copy email address",
      hint: personal.email,
      icon: () => <Copy className="w-4 h-4" />,
      run: () => {
        navigator.clipboard.writeText(personal.email).catch(() => {});
      },
    },
    {
      id: "download-resume",
      label: "Download resume",
      icon: () => <FileText className="w-4 h-4" />,
      run: () => downloadResume(),
    },
  ];

  personal.links.forEach((link) => {
    commands.push({
      id: `link-${link.type}`,
      label: `Open ${linkLabel(link.type)}`,
      hint: link.url,
      icon: LINK_ICON[link.type] ?? (() => <Search className="w-4 h-4" />),
      run: () => window.open(link.url, "_blank", "noreferrer"),
    });
  });

  return commands;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo(() => buildCommands(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  const openPalette = () => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) return false;
          setQuery("");
          setActiveIndex(0);
          return true;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, openPalette);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, openPalette);
    };
  }, []);

  const runCommand = (cmd: Command) => {
    cmd.run(router);
    setOpen(false);
  };

  const onQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) runCommand(cmd);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/20 dark:bg-black/50 motion-safe:animate-in motion-safe:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-24 z-50 w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 rounded-lg border border-border bg-popover text-popover-foreground shadow-xl motion-safe:animate-in motion-safe:fade-in-0"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search and jump to a page, action, or link.
          </Dialog.Description>

          <div className="relative border-b border-border">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to a page, action, or link..."
              className="h-11 border-0 pl-9 focus-visible:ring-0"
            />
          </div>

          <div className="max-h-80 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No matches.
              </div>
            ) : (
              filtered.map((cmd, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => runCommand(cmd)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-surface text-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="shrink-0">{cmd.icon()}</span>
                    <span className="flex-1">{cmd.label}</span>
                    {cmd.hint && (
                      <span className="truncate font-mono text-xs text-subtle-foreground max-w-[9rem]">
                        {cmd.hint}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
