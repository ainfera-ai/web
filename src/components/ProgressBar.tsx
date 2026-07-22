"use client";

import { useEffect, useRef } from "react";

/** Fixed 2px reading-progress bar, as in `Neptune Article.dc.html`. */
export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      if (barRef.current) {
        barRef.current.style.width =
          (max > 0 ? (d.scrollTop / max) * 100 : 0).toFixed(2) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: "0%",
        background: "#a9c7ff",
        zIndex: 100,
      }}
    />
  );
}
