import Link from "next/link";

/**
 * Editorial section: a narrow label column on the left (desktop only),
 * content on the right. Stacks on small screens.
 */
export default function Section({
  id,
  title,
  more,
  className = "",
  style,
  children,
}: React.PropsWithChildren<{
  id: string;
  title: string;
  more?: { href: string; label: string };
  className?: string;
  style?: React.CSSProperties;
}>) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={`grid gap-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8 ${className}`}
      style={style}
    >
      <h2
        id={`${id}-title`}
        className="text-sm font-medium text-muted-foreground md:pt-px"
      >
        {title}
      </h2>
      <div className="min-w-0">
        {children}
        {more && (
          <Link
            href={more.href}
            className="link-draw-host group mt-2 inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="link-draw-target">{more.label}</span>
            <span
              aria-hidden
              className="ml-1.5 inline-block [transition:transform_500ms_var(--ease-spring),color_150ms_ease] group-hover:translate-x-1 group-hover:text-accent motion-reduce:transform-none"
            >
              →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
