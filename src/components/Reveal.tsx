"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  as?: "div" | "a";
  /** Reveal travel distance in px — matches the per-page values in the designs. */
  dist?: 14 | 16 | 18;
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLElement> &
  Record<string, unknown>;

/**
 * Scroll-reveal wrapper: renders with [data-reveal] and flips it to "on"
 * via IntersectionObserver (threshold 0.1, rootMargin 0 0 -60px), exactly
 * as the design references do. Reduced motion / no IO → revealed at once.
 */
export default function Reveal({ as = "div", dist = 18, children, className, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rm =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm || !("IntersectionObserver" in window)) {
      el.setAttribute("data-reveal", "on");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.setAttribute("data-reveal", "on");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls =
    [className, dist === 16 ? "rv-16" : dist === 14 ? "rv-14" : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} data-reveal="" className={cls} {...rest}>
      {children}
    </Tag>
  );
}
