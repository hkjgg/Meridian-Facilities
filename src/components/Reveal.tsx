"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, for revealing siblings in sequence. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades content up as it enters the viewport.
 *
 * The element renders in its final position on the server and is only hidden
 * once this effect runs, so content is always visible without JavaScript and
 * never disappears for crawlers. Users who ask for reduced motion skip the
 * animation entirely — the CSS keeps them at full opacity.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    node.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
