"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SYNAPSE_HOST, SYNAPSE_TAGLINE, SYNAPSE_URL } from "@/lib/synapse";

/**
 * Full screen synapse rendering w/ a top ribbon linking back to the portfolio
 * and a link to the external vercel site. 
 */
export default function SynapseEmbed() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onLoad = () => setLoaded(true);
    frame.addEventListener("load", onLoad);
    frame.src = SYNAPSE_URL;
    return () => frame.removeEventListener("load", onLoad);
  }, []);

  const ribbonLink =
    "link-draw-host group inline-flex min-h-8 items-center gap-1 whitespace-nowrap transition-colors hover:text-foreground";

  return (
    <div data-fullbleed className="fixed inset-0 z-40 flex flex-col bg-background">
      <div
        role="banner"
        className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 pb-1 pt-[calc(0.25rem+env(safe-area-inset-top,0px))] font-mono text-meta text-muted-foreground sm:px-5"
      >
        <Link href="/" className={ribbonLink}>
          <span
            aria-hidden
            className="inline-block [transition:transform_500ms_var(--ease-spring),color_150ms_ease] group-hover:-translate-x-0.5 group-hover:text-accent motion-reduce:transform-none"
          >
            ←
          </span>
          <span className="link-draw-target">Portfolio</span>
        </Link>

        <p className="hidden min-w-0 truncate text-subtle-foreground md:block">
          <span className="text-foreground">Synapse</span>
          <span aria-hidden className="mx-2">·</span>
          {SYNAPSE_TAGLINE}
        </p>

        <a href={SYNAPSE_URL} target="_blank" rel="noreferrer" className={`${ribbonLink} min-w-0`}>
          <span className="hidden sm:inline">Hosted at</span>
          <span className="link-draw-target truncate text-foreground">{SYNAPSE_HOST}</span>
          <span
            aria-hidden
            className="inline-block [transition:transform_500ms_var(--ease-spring),color_150ms_ease] group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent motion-reduce:transform-none"
          >
            ↗
          </span>
        </a>
      </div>

      <div className="relative min-h-0 flex-1">
        {!loaded && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent" />
              Loading Synapse…
            </span>
            <a
              href={SYNAPSE_URL}
              target="_blank"
              rel="noreferrer"
              className="link-draw font-mono text-meta text-subtle-foreground transition-colors hover:text-foreground"
            >
              Or open it directly ↗
            </a>
          </div>
        )}
        <iframe
          ref={frameRef}
          title="Synapse"
          allow="clipboard-read; clipboard-write; fullscreen"
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
