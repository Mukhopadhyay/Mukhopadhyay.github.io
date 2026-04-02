"use client";

import { useEffect, useRef } from "react";

export default function BlogContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const buttons =
      container.querySelectorAll<HTMLButtonElement>(".tab-button");
    const handlers: Array<[HTMLButtonElement, () => void]> = [];

    buttons.forEach((button) => {
      const handler = () => {
        const group = button.dataset.group;
        const tabIndex = button.dataset.tab;
        const tabsContainer = button.closest(".content-tabs");
        if (!tabsContainer || group == null || tabIndex == null) return;

        tabsContainer
          .querySelectorAll<HTMLButtonElement>(".tab-button")
          .forEach((b) => b.classList.remove("active"));
        tabsContainer
          .querySelectorAll<HTMLElement>(".tab-panel")
          .forEach((p) => p.classList.remove("active"));

        button.classList.add("active");
        tabsContainer
          .querySelector<HTMLElement>(`.tab-panel[data-panel="${tabIndex}"]`)
          ?.classList.add("active");
      };

      button.addEventListener("click", handler);
      handlers.push([button, handler]);
    });

    return () => {
      handlers.forEach(([button, handler]) =>
        button.removeEventListener("click", handler),
      );
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-neutral dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
