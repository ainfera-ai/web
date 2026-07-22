"use client";

import { useEffect, useRef } from "react";

/**
 * The hero visual: the Ainfera mark drawing itself from a single point,
 * with slow orbital spin, comet pulses, and a mouse-parallax / scroll-drift
 * transform on the wrapper — ported 1:1 from `Neptune Home.dc.html`.
 */
export default function HeroOrbit() {
  const vizRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rm =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;

    const rot = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const el = vizRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width < 10 || r.bottom < 0) return;
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / r.width));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / r.height));
      rot.tx = -ny * 4.5;
      rot.ty = nx * 4.5;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      rot.x += (rot.tx - rot.x) * 0.055;
      rot.y += (rot.ty - rot.y) * 0.055;
      const drift = Math.min(window.scrollY || 0, 700) * 0.07;
      if (vizRef.current) {
        vizRef.current.style.transform =
          "translateY(" +
          drift.toFixed(1) +
          "px) rotateX(" +
          rot.x.toFixed(3) +
          "deg) rotateY(" +
          rot.y.toFixed(3) +
          "deg)";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const drawn = (delay: string, extra?: string): React.CSSProperties => ({
    animation:
      `orbDraw 1.5s cubic-bezier(0.16,1,0.3,1) ${delay} both` + (extra ? `, ${extra}` : ""),
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeUp 1.1s var(--ease) 0.4s both",
        perspective: 1100,
      }}
    >
      <div
        ref={vizRef}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "min(540px, 100%)",
          willChange: "transform",
        }}
      >
        <svg
          data-orbit=""
          viewBox="0 0 100 100"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
            filter: "drop-shadow(0 0 28px rgba(169,199,255,0.13))",
            animation: "markBreathe 14s ease-in-out 3s infinite",
          }}
          aria-label="Ainfera mark, drawing itself from a single point"
        >
          <g
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: "markGrow 2.4s cubic-bezier(0.16,1,0.3,1) 0.15s both",
            }}
          >
            <g
              fill="none"
              stroke="#A9C7FF"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: "orbSpin 110s linear infinite",
              }}
            >
              <ellipse cx="50" cy="50" rx="37" ry="30" strokeWidth="0.5" opacity="0.85" transform="rotate(8 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.35s")} />
              <ellipse cx="51" cy="49" rx="38" ry="28" strokeWidth="0.55" opacity="0.9" transform="rotate(41 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.55s")} />
              <ellipse cx="52" cy="51" rx="36" ry="30" strokeWidth="0.45" opacity="0.75" transform="rotate(92 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.75s", "orbBreathe 9s ease-in-out 3s infinite alternate")} />
              <ellipse cx="51" cy="51" rx="36" ry="29" strokeWidth="0.5" opacity="0.8" transform="rotate(141 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.95s")} />
              <ellipse cx="50" cy="50" rx="33" ry="30" strokeWidth="0.35" opacity="0.5" transform="rotate(172 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("1.15s", "orbBreathe 11s ease-in-out 4s infinite alternate")} />
            </g>
            <g
              fill="none"
              stroke="#A9C7FF"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: "orbSpinRev 150s linear infinite",
              }}
            >
              <ellipse cx="49" cy="51" rx="35" ry="31" strokeWidth="0.4" opacity="0.7" transform="rotate(24 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.45s")} />
              <ellipse cx="50" cy="50" rx="34" ry="32" strokeWidth="0.35" opacity="0.6" transform="rotate(57 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.65s", "orbBreathe 10s ease-in-out 3.5s infinite alternate")} />
              <ellipse cx="50" cy="49" rx="38" ry="27" strokeWidth="0.55" opacity="0.9" transform="rotate(108 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("0.85s")} />
              <ellipse cx="49" cy="50" rx="35" ry="31" strokeWidth="0.4" opacity="0.65" transform="rotate(159 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={drawn("1.05s")} />
            </g>
            <g fill="none" stroke="#A9C7FF">
              <ellipse cx="51" cy="50" rx="38" ry="29" strokeWidth="0.6" opacity="0.95" transform="rotate(15 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "orbDraw 1.6s cubic-bezier(0.16,1,0.3,1) 0.25s both" }} />
              <ellipse cx="48" cy="50" rx="37" ry="29" strokeWidth="0.5" opacity="0.85" transform="rotate(73 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "orbDraw 1.6s cubic-bezier(0.16,1,0.3,1) 0.5s both" }} />
              <ellipse cx="49" cy="50" rx="35" ry="31" strokeWidth="0.4" opacity="0.65" transform="rotate(124 50 50)" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "orbDraw 1.6s cubic-bezier(0.16,1,0.3,1) 0.7s both" }} />
            </g>
            <g fill="none" strokeLinecap="round">
              <ellipse cx="51" cy="50" rx="38" ry="29" transform="rotate(15 50 50)" pathLength="100" stroke="#a9c7ff" strokeWidth="0.7" strokeDasharray="15 85" opacity="0.35" style={{ animation: "cometFlow 9s linear -2.4s infinite, cometIn 1.2s ease 1.6s both" }} />
              <ellipse cx="51" cy="50" rx="38" ry="29" transform="rotate(15 50 50)" pathLength="100" stroke="#eaf1ff" strokeWidth="0.8" strokeDasharray="3 97" opacity="0.95" style={{ animation: "cometFlow 9s linear -2.4s infinite, cometIn 1.2s ease 1.6s both" }} />
              <ellipse cx="48" cy="50" rx="37" ry="29" transform="rotate(73 50 50)" pathLength="100" stroke="#a9c7ff" strokeWidth="0.6" strokeDasharray="12 88" opacity="0.3" style={{ animation: "cometFlowRev 14s linear -5s infinite, cometIn 1.2s ease 1.9s both" }} />
              <ellipse cx="48" cy="50" rx="37" ry="29" transform="rotate(73 50 50)" pathLength="100" stroke="#eaf1ff" strokeWidth="0.7" strokeDasharray="2.4 97.6" opacity="0.85" style={{ animation: "cometFlowRev 14s linear -5s infinite, cometIn 1.2s ease 1.9s both" }} />
              <ellipse cx="49" cy="50" rx="35" ry="31" transform="rotate(124 50 50)" pathLength="100" stroke="#a9c7ff" strokeWidth="0.5" strokeDasharray="10 90" opacity="0.22" style={{ animation: "cometFlow 21s linear -11s infinite, cometIn 1.2s ease 2.2s both" }} />
              <ellipse cx="49" cy="50" rx="35" ry="31" transform="rotate(124 50 50)" pathLength="100" stroke="#eaf1ff" strokeWidth="0.6" strokeDasharray="2 98" opacity="0.7" style={{ animation: "cometFlow 21s linear -11s infinite, cometIn 1.2s ease 2.2s both" }} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
