"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import basics from "../data/personal.json";
import { PersonalInfo } from "@/types/types";
import type { Book } from "@/lib/reading";
import { linkLabel } from "@/lib/format";
import { PRESS_SCALE, enterAt, spring } from "@/lib/motion";
import Magnetic from "./Magnetic";
import NowReadingCard from "./reading/NowReadingCard";
import Link from "next/link";

export const RESUME_URL = "/Resume-Pranesh.M.pdf";

/** The hit area is the padded link; the underline sits under the words. */
const textLink =
  "link-draw-host inline-flex min-h-10 items-center transition-colors hover:text-foreground";

export default function ResumeCard({ nowReading }: { nowReading?: Book }) {
  const personal: PersonalInfo = basics;
  const [copied, setCopied] = useState(false);
  const city = personal.location.split(",")[0];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked: the mailto link still works
    }
  };

  return (
    <header>

      <Magnetic>
        <a
          href={`https://github.com/${personal.username}`} target="_blank"
          className={textLink}
          title={personal.email}
        >
          <span className="link-draw-target link-inline">
            @{personal.username}
          </span>
        </a>
      </Magnetic>

      <h1 className="enter text-display font-semibold tracking-[-0.025em] text-balance">
        {personal.name}
      </h1>
      <p className="enter mt-3 text-lead" style={enterAt(1)}>
        {personal.role}
        <span className="block whitespace-nowrap text-muted-foreground sm:inline">
          <span aria-hidden className="mx-2 hidden sm:inline">·</span>
          <span className="sr-only">, </span>
          {personal.tenure}
          <span aria-hidden className="mx-2">·</span>
          <span className="sr-only">, </span>
          {city}
        </span>
      </p>

      <div className="mt-5 grid gap-8 md:grid-cols-[minmax(0,1fr)_14.5rem] md:gap-10">
        <div className="enter min-w-0" style={enterAt(2)}>
          <p className="max-w-[60ch] text-muted-foreground text-pretty">{personal.summary}</p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-5 text-sm">
            {personal.links.map((link) => (
              <li key={link.type}>
                <Magnetic>
                  <a href={link.url} target="_blank" rel="noreferrer" className={textLink}>
                    <span className="link-draw-target link-inline">{linkLabel(link.type)}</span>
                  </a>
                </Magnetic>
              </li>
            ))}
            <li className="flex items-center">
              <Magnetic>
                <a
                  href={`mailto:${personal.email}`}
                  className={textLink}
                  title={personal.email}
                >
                  <span className="link-draw-target link-inline">Email</span>
                </a>
              </Magnetic>
              <motion.button
                type="button"
                onClick={copyEmail}
                whileTap={{ scale: 0.9 }}
                transition={spring.press}
                aria-label={`Copy email address (${personal.email})`}
                className="relative ml-0.5 inline-flex size-8 items-center justify-center rounded text-subtle-foreground transition-colors hover:text-foreground"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={copied ? "check" : "copy"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={spring.pop}
                    className={`inline-flex ${copied ? "text-foreground" : ""}`}
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <span role="status" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </li>
            <li>
              <motion.a
                href={RESUME_URL}
                download
                whileTap={{ scale: PRESS_SCALE }}
                transition={spring.press}
                className={`${textLink} group font-medium text-foreground`}
              >
                <span className="link-draw-target" data-rest>
                  Resume
                </span>
                <span className="ml-1.5 font-mono text-meta text-subtle-foreground">PDF</span>
                <span
                  aria-hidden
                  className="ml-1 inline-block text-meta text-subtle-foreground [transition:transform_500ms_var(--ease-spring),color_150ms_ease] group-hover:translate-y-0.5 group-hover:text-accent motion-reduce:transform-none"
                >
                  ↓
                </span>
              </motion.a>
            </li>
          </ul>
        </div>

        {nowReading && (
          <aside
            aria-label="Now reading"
            className="enter md:mt-9 md:border-l md:border-border md:pl-6"
            style={enterAt(3)}
          >
            <NowReadingCard book={nowReading} />
          </aside>
        )}
      </div>
    </header>
  );
}
