import Link from "next/link";
import { SYNAPSE_DESCRIPTION, SYNAPSE_HOST, SYNAPSE_TAGLINE } from "@/lib/synapse";

/** When adding this to the portfolio */
const ADDED = { iso: "2026-11", label: "Added Nov 2026" };

// Small concept graphs
function Glyph({ className = "" }: { className?: string }) {
  const nodes = [
    [14, 44],
    [46, 18],
    [50, 62],
    [84, 36],
    [88, 74],
    [116, 16],
    [120, 54],
  ] as const;
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [1, 5],
    [3, 6],
    [4, 6],
  ] as const;
  const path = new Set(["0-2", "2-3", "3-6"]);
  const onPath = new Set([0, 2, 3, 6]);

  return (
    <svg
      viewBox="0 0 134 90"
      width={134}
      height={90}
      fill="none"
      aria-hidden
      className={`h-auto ${className}`}
    >
      {edges.map(([a, b]) => {
        const hot = path.has(`${a}-${b}`);
        return (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            strokeWidth={1}
            className={`stroke-subtle-foreground/45 transition-colors duration-300 ${
              hot ? "group-hover:stroke-accent" : ""
            }`}
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 4 : 3}
          strokeWidth={1}
          className={`fill-background stroke-subtle-foreground transition-colors duration-300 ${
            onPath.has(i) ? "group-hover:stroke-accent" : ""
          }`}
        />
      ))}
    </svg>
  );
}

/**Synapse hook card to be used in the home page */
export default function SynapseHook() {
  return (
    <Link
      href="/synapse"
      aria-label={`New: Synapse, ${SYNAPSE_TAGLINE.toLowerCase()}. Open it.`}
      className="promo-card group relative isolate block overflow-hidden rounded-xl border border-border bg-surface/40 p-5 transition-colors duration-300 hover:border-accent/35 sm:p-6"
    >
      {/* Glow + a hairline highlight along the top edge */}
      <span aria-hidden className="promo-glow" />
      <span
        aria-hidden
        className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
      />

      <div className="flex items-center gap-6">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-meta text-subtle-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-px text-accent">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
              New
            </span>
            <time dateTime={ADDED.iso}>{ADDED.label}</time>
          </p>

          <h2 className="mt-3 text-lead font-semibold tracking-[-0.01em]">Synapse</h2>
          <p className="mt-0.5 text-foreground text-pretty">{SYNAPSE_TAGLINE}.</p>
          <p className="mt-2 max-w-[56ch] text-muted-foreground text-pretty">
            {SYNAPSE_DESCRIPTION}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="link-draw-host inline-flex min-h-8 items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-accent">
              <span className="link-draw-target">Explore the map</span>
              <span
                aria-hidden
                className="inline-block [transition:transform_500ms_var(--ease-spring)] group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </span>
            <span className="break-all font-mono text-meta text-subtle-foreground">
              {SYNAPSE_HOST}
            </span>
          </div>
        </div>

        <Glyph className="hidden w-40 shrink-0 sm:block" />
      </div>
    </Link>
  );
}
