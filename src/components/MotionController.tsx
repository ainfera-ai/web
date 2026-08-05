"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      observer?.disconnect();

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal='on']"),
      );

      if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        root.classList.remove("motion-ready");
        elements.forEach((element) => { element.dataset.revealed = "true"; });
        return;
      }

      root.classList.add("motion-ready");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.dataset.revealed = "true";
            observer?.unobserve(element);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      elements
        .filter((element) => element.dataset.revealed !== "true")
        .forEach((element) => observer?.observe(element));
    };

    setup();
    reducedMotion.addEventListener("change", setup);

    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener("change", setup);
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
