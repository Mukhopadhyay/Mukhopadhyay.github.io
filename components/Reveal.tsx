"use client";

import { useEffect, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: React.PropsWithChildren<{ delay?: number; className?: string }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`transform ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } motion-safe:transition-opacity motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out ${className}`}
    >
      {children}
    </div>
  );
}
