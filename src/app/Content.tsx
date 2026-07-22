"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

/* ---------- page-local keyframes / helpers (namespaced hm-*) ---------- */
const HM_STYLE = `
@keyframes hmBarIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes hmFloatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes hmRipple { from { transform: scale(1); opacity: 0.5; } to { transform: scale(1.9); opacity: 0; } }
@keyframes hmNodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes hmSigBreathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes hmPulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
@keyframes hmCellPulse { 0%, 100% { opacity: 0.16; } 50% { opacity: 1; } }
@keyframes hmBgSlide { to { background-position: 7px 0; } }
[data-reveal] [data-hm-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-hm-ch] { animation-play-state: running; }
.hm-lnk-accent { color: #a9c7ff; }
.hm-lnk-accent:hover { color: #eaf1ff; }
@media (max-width: 980px) { [data-hm-chips] { display: none !important; } }
`;

/* ---------- rail + corner helpers ---------- */
const rail: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};
const plusLeft: React.CSSProperties = {
  position: "absolute",
  top: -7,
  left: -6.5,
  font: "400 12px 'IBM Plex Mono', monospace",
  color: "#2a3954",
  zIndex: 3,
};
const plusRight: React.CSSProperties = { ...plusLeft, left: "auto", right: -6.5 };
const kicker: React.CSSProperties = {
  font: "400 10px 'IBM Plex Mono', monospace",
  letterSpacing: "0.22em",
  color: "#5a6478",
};
const barSpan: React.CSSProperties = {
  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "100% 100%",
  color: "#060b16",
  padding: "0 0.24em 0.1em 0.19em",
};

/* ---------- deterministic PRNG (SSR-safe) ---------- */
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ---------- decorative ASCII noise field (deterministic) ---------- */
const NOISE_COLORS: [string, number][] = [
  ["#2e4370", 1], ["#223052", 0.85], ["rgba(79,206,141,0.34)", 0.9],
  ["#2e4370", 1], ["#223052", 0.85], ["#223052", 0.85],
  ["#2e4370", 1], ["rgba(79,206,141,0.34)", 0.9], ["#223052", 0.85],
  ["#2e4370", 1], ["#223052", 0.85], ["#223052", 0.85],
  ["rgba(79,206,141,0.34)", 0.9], ["#223052", 0.85], ["#223052", 0.85],
  ["#2e4370", 1], ["#223052", 0.85], ["rgba(79,206,141,0.34)", 0.9],
  ["#2e4370", 1], ["#223052", 0.85], ["#223052", 0.85],
  ["#2e4370", 1], ["rgba(79,206,141,0.34)", 0.9], ["#223052", 0.85],
  ["#2e4370", 1], ["#223052", 0.85],
];
const NOISE_CHARS = [" ", " ", " ", " ", " ", "—", "[", "+", "/", "T", "#", "'", "·"];
const _noiseRng = seeded(20260722);
const NOISE_ROWS = NOISE_COLORS.map(([color, opacity]) => {
  let text = "";
  for (let i = 0; i < 132; i++) text += NOISE_CHARS[Math.floor(_noiseRng() * NOISE_CHARS.length)];
  return { text, color, opacity };
});

function NoiseField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        WebkitMaskImage: "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
        maskImage: "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
      }}
    >
      {NOISE_ROWS.map((r, i) => (
        <div
          key={i}
          style={{
            font: "400 12px/17px 'IBM Plex Mono', monospace",
            letterSpacing: "5px",
            whiteSpace: "pre",
            color: r.color,
            opacity: r.opacity,
          }}
        >
          {r.text}
        </div>
      ))}
    </div>
  );
}

/* ---------- telemetry strips (deterministic init, random after mount) ---------- */
type Cell = { w: string; bg: string; anim: string };
type Row = { cells: Cell[] };
type Strips = { a: Row[]; b: Row[] };

function makeStrips(rand: () => number): Strips {
  const palette: [string, number][] = [
    ["#060b16", 42], ["#0b1220", 20], ["#141c2e", 14], ["#2a3954", 9],
    ["#2547f4", 6], ["#4c74ff", 5], ["#a9c7ff", 3], ["#eaf1ff", 1],
  ];
  const lit: Record<string, number> = { "#2547f4": 1, "#4c74ff": 1, "#a9c7ff": 1, "#eaf1ff": 1 };
  const pick = () => {
    let r = rand() * 100;
    for (const [c, w] of palette) {
      if ((r -= w) < 0) return c;
    }
    return "#060b16";
  };
  const mkRow = (): Row => {
    const cells: Cell[] = [];
    let total = 0;
    while (total < 100) {
      let w = 3 + Math.floor(rand() * 9);
      if (total + w > 100) w = 100 - total;
      total += w;
      const bg = pick();
      cells.push({
        w: w + "%",
        bg,
        anim: lit[bg]
          ? "hmCellPulse " + (2.4 + rand() * 4).toFixed(1) + "s ease-in-out " + (rand() * 5).toFixed(1) + "s infinite"
          : "none",
      });
    }
    return { cells };
  };
  return { a: [mkRow(), mkRow(), mkRow()], b: [mkRow(), mkRow()] };
}

function StripRows({ rows }: { rows: Row[] }) {
  return (
    <>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", height: 20 }}>
          {row.cells.map((c, ci) => (
            <span key={ci} style={{ width: c.w, height: 20, background: c.bg, animation: c.anim }} />
          ))}
        </div>
      ))}
    </>
  );
}

const STAGES = ["01/06 · SFT", "02/06 · DPO", "03/06 · GRPO", "04/06 · EVAL GATE", "05/06 · MTP", "06/06 · QUANT"];

/* ---------- factory-line pipeline cube ---------- */
function PipeCube({ cx, label, delay }: { cx: number; label: string; delay: string }) {
  return (
    <g data-hm-ch="" stroke="#a9c7ff" strokeWidth="0.9" opacity="0.85" style={{ animation: `fadeUp 0.7s var(--ease) ${delay} both` }}>
      <path d={`M ${cx} 128 L ${cx + 22} 139 L ${cx} 150 L ${cx - 22} 139 Z`} fill="#141c2e" />
      <path d={`M ${cx - 22} 139 L ${cx - 22} 163 L ${cx} 174 L ${cx} 150 Z`} fill="#0b1220" />
      <path d={`M ${cx} 150 L ${cx} 174 L ${cx + 22} 163 L ${cx + 22} 139 Z`} fill="#060b16" />
      <text x={cx} y="200" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.5" fill="#98a3bd" stroke="none">
        {label}
      </text>
    </g>
  );
}

export default function HomeContent() {
  const [strips, setStrips] = useState<Strips>(() => makeStrips(seeded(0x9e3779b9)));

  const vizRef = useRef<HTMLDivElement | null>(null);
  const auditRef = useRef<HTMLSpanElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);

  // strips: regenerate with real randomness after mount (avoids hydration mismatch)
  useEffect(() => {
    setStrips(makeStrips(Math.random));
  }, []);

  // hero scroll-drift (NOT cursor tilt)
  useEffect(() => {
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    let raf = 0;
    const tick = () => {
      const drift = Math.min(window.scrollY || 0, 700) * 0.07;
      if (vizRef.current) vizRef.current.style.transform = "translateY(" + drift.toFixed(1) + "px)";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // live ticker — imperative chip updates via refs (deterministic initial values)
  useEffect(() => {
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    const n = { audit: 48213, stage: 2 };
    const id = setInterval(() => {
      n.audit += 1 + Math.floor(Math.random() * 6);
      if (Math.random() < 0.4) n.stage = (n.stage + 1) % 6;
      if (auditRef.current) auditRef.current.textContent = n.audit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (stageRef.current) {
        stageRef.current.textContent = "STAGE " + STAGES[n.stage];
        stageRef.current.style.color = n.stage === 3 ? "#a9c7ff" : "#98a3bd";
      }
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HM_STYLE }} />

      {/* §1 HERO */}
      <div style={{ ...rail, position: "relative" }}>
        <span style={plusLeft}>+</span>
        <span style={plusRight}>+</span>
        <div
          data-hero-grid=""
          style={{
            padding: "clamp(48px, 7vh, 90px) clamp(24px, 3.5vw, 48px) clamp(56px, 9vh, 100px)",
            minHeight: "min(720px, calc(100svh - 210px))",
            alignContent: "center",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.26em",
                color: "#a9c7ff",
                animation: "fadeUp 0.8s var(--ease) 0.05s both",
              }}
            >
              <span style={{ width: 38, borderTop: "1px dashed rgba(169,199,255,0.55)" }} />
              THE INFERENCE OF AI AGENTS
            </span>
            <h1
              style={{
                font: "600 clamp(44px, 5.6vw, 80px)/1.06 'Poppins', sans-serif",
                letterSpacing: "-0.035em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              <span style={{ display: "block", animation: "fadeUp 0.9s var(--ease) 0.15s both" }}>Built by agents,</span>
              <span style={{ display: "block", animation: "fadeUp 0.9s var(--ease) 0.3s both" }}>
                <span style={{ ...barSpan, animation: "hmBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 1s both" }}>for agents.</span>
              </span>
            </h1>
            <p
              style={{
                font: "400 17px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 520,
                animation: "fadeUp 0.9s var(--ease) 0.26s both",
              }}
            >
              Neptune models come off an agentic factory and are made for the agents you run. Every release is gated by
              evals and recorded in a signed audit log — <span style={{ color: "#eaf1ff" }}>competence demonstrated, not claimed.</span>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp 0.9s var(--ease) 0.38s both" }}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  className="btn-cta btn-cta--lift"
                  href="https://huggingface.co/ainfera-ai"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "500 11.5px 'IBM Plex Mono', monospace", letterSpacing: "0.1em", padding: "16px 26px" }}
                >
                  FOLLOW THE 27B TRAINING RUN&nbsp;↗
                </a>
                <a
                  className="btn-ghost btn-ghost--lift"
                  href="https://huggingface.co/ainfera-ai"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 11.5px 'IBM Plex Mono', monospace", letterSpacing: "0.1em", padding: "15px 24px" }}
                >
                  READ THE EVAL PROTOCOL&nbsp;↗
                </a>
              </div>
              <span style={{ font: "400 10px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#5a6478" }}>
                APACHE 2.0 · HERMES-NATIVE TOOL CALLING · MODELS THAT PROVE THEMSELVES
              </span>
            </div>
          </div>

          {/* factory-line diagram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "fadeUp 1.1s var(--ease) 0.4s both",
              perspective: 1100,
            }}
          >
            <div ref={vizRef} style={{ position: "relative", width: "min(560px, 100%)", willChange: "transform" }}>
              <NoiseField />
              <svg
                viewBox="0 0 560 460"
                style={{ width: "100%", height: "auto", display: "block", overflow: "visible", position: "relative" }}
                aria-label="The Neptune factory line: a checkpoint enters the training stack, passes the eval gate, and ships as a signed model"
              >
                <defs>
                  <pattern id="npDots" width="13" height="13" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.9" fill="#141c2e" />
                  </pattern>
                  <radialGradient id="npFade" cx="50%" cy="46%" r="54%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="72%" stopColor="#ffffff" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                  <mask id="npMask">
                    <rect width="560" height="460" fill="url(#npFade)" />
                  </mask>
                  <radialGradient id="npHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                    <stop offset="100%" stopColor="rgba(169,199,255,0)" />
                  </radialGradient>
                </defs>
                <rect width="560" height="460" fill="url(#npDots)" mask="url(#npMask)" opacity="0.7" />
                <path d="M 60 430 A 224 224 0 0 1 500 430" fill="none" stroke="#1b2740" strokeDasharray="2 7" />

                <path d="M 122 338 C 158 296 176 262 212 238" fill="none" stroke="#4c74ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.75" style={{ animation: "dashFlow 2.2s linear infinite" }} />
                <path d="M 352 226 C 396 214 428 240 452 274" fill="none" stroke="#4c74ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.75" style={{ animation: "dashFlow 2.2s linear infinite" }} />
                <path d="M 402 246 C 386 306 322 326 268 306" fill="none" stroke="#2a3954" strokeDasharray="3 6" opacity="0.8" style={{ animation: "dashFlow 3.4s linear infinite" }} />
                <text x="352" y="332" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1" fill="#5a6478" textAnchor="middle">FAIL → RETRAIN</text>

                <ellipse cx="282" cy="205" rx="185" ry="82" fill="url(#npHalo)" />
                <g style={{ animation: "fadeUp 0.9s var(--ease) 0.55s both" }}>
                  <ellipse cx="282" cy="204" rx="126" ry="42" fill="none" stroke="#2a3954" strokeDasharray="2 7" />
                  <ellipse cx="282" cy="236" rx="92" ry="30" fill="#060b16" stroke="#1b2740" />
                  <ellipse cx="282" cy="216" rx="92" ry="30" fill="rgba(37,71,244,0.16)" stroke="#4c74ff" opacity="0.85" />
                  <ellipse cx="282" cy="196" rx="92" ry="30" fill="#0b1220" stroke="#a9c7ff" strokeWidth="1.6" />
                  <ellipse cx="282" cy="196" rx="56" ry="17" fill="none" stroke="#a9c7ff" strokeDasharray="3 4" opacity="0.55" style={{ animation: "dashFlow 3s linear infinite" }} />
                  <line x1="282" y1="146" x2="282" y2="182" stroke="#a9c7ff" strokeDasharray="2 4" opacity="0.5" />
                  <g style={{ animation: "hmFloatY 7s ease-in-out infinite alternate" }}>
                    <image href="/brand/ainfera-mark-ice.svg" x="262" y="102" width="40" height="40" />
                  </g>
                  <ellipse cx="282" cy="196" rx="92" ry="30" fill="none" stroke="#a9c7ff" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "hmRipple 4.6s ease-out 1.6s infinite" }} />
                </g>

                <g stroke="#a9c7ff" strokeWidth="0.9" opacity="0.8" style={{ animation: "fadeUp 0.8s var(--ease) 0.75s both" }}>
                  <g style={{ animation: "hmFloatY 8s ease-in-out infinite alternate" }}>
                    <path d="M 105 336 L 135 351 L 105 366 L 75 351 Z" fill="#141c2e" />
                    <path d="M 75 351 L 75 385 L 105 400 L 105 366 Z" fill="#0b1220" />
                    <path d="M 105 366 L 105 400 L 135 385 L 135 351 Z" fill="#060b16" />
                  </g>
                </g>

                <g style={{ animation: "fadeUp 0.8s var(--ease) 1s both" }}>
                  <line x1="398" y1="150" x2="398" y2="262" stroke="#a9c7ff" strokeWidth="1" strokeDasharray="3 5" opacity="0.9" style={{ animation: "dashFlow 2.8s linear infinite" }} />
                  <line x1="410" y1="144" x2="410" y2="256" stroke="#a9c7ff" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" style={{ animation: "dashFlow 3.6s linear infinite" }} />
                  <rect x="356" y="118" width="96" height="22" fill="#060b16" stroke="#a9c7ff" />
                  <text x="404" y="133" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.5" fill="#a9c7ff">EVAL GATE</text>
                  <circle cx="404" cy="222" r="10" fill="none" stroke="#a9c7ff" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "hmNodePing 5s ease-out 2.2s infinite both" }} />
                </g>

                <g stroke="#a9c7ff" strokeWidth="1.1" style={{ animation: "fadeUp 0.8s var(--ease) 0.9s both" }}>
                  <g style={{ animation: "hmFloatY 9s ease-in-out 1.2s infinite alternate" }}>
                    <path d="M 470 270 L 500 285 L 470 300 L 440 285 Z" fill="rgba(37,71,244,0.28)" />
                    <path d="M 440 285 L 440 319 L 470 334 L 470 300 Z" fill="#0b1220" />
                    <path d="M 470 300 L 470 334 L 500 319 L 500 285 Z" fill="#060b16" />
                    <text x="470" y="356" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#eaf1ff" stroke="none">NEXT RELEASE</text>
                  </g>
                </g>

                <g fill="none" stroke="#4c74ff">
                  <path d="M 66 128 L 73 135 L 66 142 L 59 135 Z" opacity="0.8" style={{ animation: "hmFloatY 7s ease-in-out infinite alternate" }} />
                  <path d="M 508 92 L 516 100 L 508 108 L 500 100 Z" opacity="0.6" style={{ animation: "hmFloatY 9s ease-in-out 1s infinite alternate" }} />
                </g>
                <g fill="#2547f4" opacity="0.55">
                  <path d="M 200 74 L 206 80 L 200 86 L 194 80 Z" style={{ animation: "hmFloatY 8s ease-in-out 0.5s infinite alternate" }} />
                  <path d="M 530 206 L 536 212 L 530 218 L 524 212 Z" style={{ animation: "hmFloatY 10s ease-in-out 2s infinite alternate" }} />
                  <path d="M 58 236 L 64 242 L 58 248 L 52 242 Z" style={{ animation: "hmFloatY 9s ease-in-out 1.4s infinite alternate" }} />
                </g>

                <circle r="3" fill="#eaf1ff" style={{ offsetPath: "path('M 122 338 C 158 296 176 262 212 238')", animation: "hmPulseTravel 4.6s linear 1.2s infinite" }} />
                <circle r="3" fill="#eaf1ff" style={{ offsetPath: "path('M 352 226 C 396 214 428 240 452 274')", animation: "hmPulseTravel 4.6s linear 3.5s infinite" }} />
              </svg>

              <div data-hm-chips="" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", left: "4%", top: "6%", font: "400 9px 'IBM Plex Mono', monospace", letterSpacing: "0.18em", color: "#a9c7ff", background: "#060b16", border: "1px dashed #2a3954", padding: "6px 11px", animation: "fadeUp 0.7s var(--ease) 1.15s both" }}>
                  AINFERA FACTORY
                </div>
                <div style={{ position: "absolute", right: "2%", top: "13%", display: "flex", alignItems: "center", gap: 7, font: "400 8.5px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#98a3bd", background: "#060b16", border: "1px dashed #1b2740", padding: "5px 9px", animation: "fadeUp 0.7s var(--ease) 1.3s both" }}>
                  <span style={{ width: 5, height: 5, background: "#a9c7ff", animation: "blinkDot 2.6s ease-in-out infinite" }} />
                  <span ref={stageRef} style={{ color: "#98a3bd" }}>STAGE 03/06 · GRPO</span>
                </div>
                <div style={{ position: "absolute", left: "0%", top: "47%", font: "400 8.5px 'IBM Plex Mono', monospace", letterSpacing: "0.12em", color: "#98a3bd", background: "#060b16", border: "1px dashed #1b2740", padding: "5px 9px", animation: "fadeUp 0.7s var(--ease) 1.45s both" }}>
                  AUDIT LOG · <span ref={auditRef} style={{ color: "#eaf1ff" }}>48,213</span> ENTRIES
                </div>
                <div style={{ position: "absolute", right: "4%", top: "56%", font: "400 8.5px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#4fce8d", background: "#060b16", border: "1px dashed rgba(79,206,141,0.45)", padding: "5px 9px", animation: "fadeUp 0.7s var(--ease) 1.6s both, hmSigBreathe 3.4s ease-in-out 2.4s infinite" }}>
                  SIGNED ✓ 8F2A
                </div>
                <div style={{ position: "absolute", left: "7%", bottom: "2%", font: "400 8.5px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#5a6478", background: "#060b16", border: "1px dashed #1b2740", padding: "5px 9px", animation: "fadeUp 0.7s var(--ease) 1.75s both" }}>
                  CHECKPOINT IN
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 9,
              animation: "fadeUp 1s var(--ease) 2.4s both",
            }}
          >
            <span style={{ font: "400 8.5px 'IBM Plex Mono', monospace", letterSpacing: "0.32em", paddingLeft: "0.32em", color: "#5a6478" }}>SCROLL</span>
            <svg width="2" height="30" viewBox="0 0 2 30" style={{ display: "block", overflow: "visible" }}>
              <line x1="1" y1="0" x2="1" y2="30" stroke="rgba(169,199,255,0.45)" strokeWidth="1" strokeDasharray="3 5" style={{ animation: "scrollFlow 2.2s linear infinite" }} />
            </svg>
          </div>
        </div>
      </div>

      {/* §2 PROOF-STAT ROW */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={rail}>
          <div data-stat-row="">
            {(
              [
                ["◇", "AGENTIC COMPOSITE · AGENTIC-CORE V1", true],
                ["◇", "TOOL-CALL ACCURACY · HERMES SUITE", true],
                ["◇", "COST PER 1M TOKENS · 27B CLASS", false],
              ] as [string, string, boolean][]
            ).map(([stat, label, divider]) => (
              <div
                key={label}
                data-stat-cell=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "44px clamp(24px, 3.5vw, 48px)",
                  borderRight: divider ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                }}
              >
                <span style={{ font: "400 clamp(34px, 3.4vw, 48px) 'IBM Plex Mono', monospace", color: "#a9c7ff" }}>{stat}</span>
                <span style={{ font: "400 10px 'IBM Plex Mono', monospace", letterSpacing: "0.16em", color: "#98a3bd" }}>{label}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px dashed rgba(169,199,255,0.12)",
              padding: "14px clamp(24px, 3.5vw, 48px)",
              font: "400 9.5px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              color: "#5a6478",
            }}
          >
            TOKENS BIND TO SIGNED EVAL OUTPUTS AT PUBLISH — NO NUMBER APPEARS HERE UNTIL THE GATE PASSES IT.
          </div>
        </div>
      </Reveal>

      {/* TELEMETRY STRIP A (full-bleed) */}
      <Reveal
        style={{
          borderTop: "1px dashed rgba(169,199,255,0.25)",
          borderBottom: "1px dashed rgba(169,199,255,0.12)",
          position: "relative",
          background: "#060b16",
          overflow: "hidden",
        }}
      >
        <StripRows rows={strips.a} />
        <span
          style={{
            position: "absolute",
            top: 8,
            right: "clamp(20px, 7.6vw, 110px)",
            font: "400 8.5px 'IBM Plex Mono', monospace",
            letterSpacing: "0.18em",
            color: "#5a6478",
            background: "#060b16",
            border: "1px dashed #1b2740",
            padding: "4px 9px",
          }}
        >
          FACTORY TELEMETRY · ILLUSTRATIVE
        </span>
      </Reveal>

      {/* §3 FLAGSHIP */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={rail}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", padding: "clamp(48px, 7vh, 80px) clamp(24px, 3.5vw, 48px) 36px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>
              <span style={kicker}>
                01 · FLAGSHIP · <span style={{ color: "#a9c7ff" }}>IN TRAINING</span>
              </span>
              <h2 style={{ font: "500 clamp(26px, 3vw, 40px) 'IBM Plex Mono', monospace", letterSpacing: "-0.01em", color: "#eaf1ff", margin: 0 }}>
                Neptune-1.0-27B-<span data-hm-ch="" style={{ ...barSpan, animation: "hmBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}>Agent</span>
              </h2>
              <p style={{ font: "400 16px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0, maxWidth: 620 }}>
                An agent-native open model, on the line now. The name is the spec: 27B means 27 billion parameters — true
                count, no rounding games. Weights publish the moment the gate passes them.
              </p>
            </div>
            <svg width="150" height="122" viewBox="0 0 150 122" style={{ display: "block", overflow: "visible", flex: "none" }} aria-label="Isometric cube labeled 27B true count">
              <ellipse cx="75" cy="60" rx="58" ry="20" fill="none" stroke="#2a3954" strokeDasharray="2 6" style={{ animation: "dashFlow 4s linear infinite" }} />
              <g stroke="#a9c7ff" strokeWidth="1" style={{ animation: "hmFloatY 8s ease-in-out infinite alternate" }}>
                <path d="M 75 30 L 101 43 L 75 56 L 49 43 Z" fill="rgba(37,71,244,0.22)" />
                <path d="M 49 43 L 49 71 L 75 84 L 75 56 Z" fill="#0b1220" />
                <path d="M 75 56 L 75 84 L 101 71 L 101 43 Z" fill="#060b16" />
              </g>
              <text x="75" y="112" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#a9c7ff">27B · TRUE COUNT</text>
            </svg>
          </div>
          <div data-spec-grid="" style={{ borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            {(
              [
                ["HERMES-NATIVE TOOL CALLING", "Tool calls in the native format agents already speak — no wrapper prompts, no parsing glue.", true, true],
                ["AGENTIC WORKFLOWS", "Trained on multi-step plans, function chains, and recovery from failed calls — not single-turn chat.", false, true],
                ["APACHE 2.0", "Open weights, unrestricted commercial use. Take it, ship it, fine-tune it.", true, false],
                ["TRUE PARAMETER COUNT", "Every Neptune model carries its real size in its name. What you download is what it says.", false, false],
              ] as [string, string, boolean, boolean][]
            ).map(([title, body, right, bottom]) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "28px clamp(24px, 3.5vw, 48px)",
                  borderRight: right ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                  borderBottom: bottom ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                }}
              >
                <span style={{ font: "500 11px 'IBM Plex Mono', monospace", letterSpacing: "0.16em", color: "#eaf1ff" }}>{title}</span>
                <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>{body}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "36px clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 72px)", borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            <a className="btn-cta" href="https://huggingface.co/ainfera-ai" target="_blank" rel="noreferrer" style={{ font: "500 11.5px 'IBM Plex Mono', monospace", letterSpacing: "0.1em", padding: "15px 24px" }}>
              FOLLOW ON HUGGING FACE&nbsp;↗
            </a>
            <a className="btn-ghost" href="https://huggingface.co/ainfera-ai" target="_blank" rel="noreferrer" style={{ font: "400 11.5px 'IBM Plex Mono', monospace", letterSpacing: "0.1em", padding: "14px 22px" }}>
              MODEL CARD · AT RELEASE&nbsp;↗
            </a>
          </div>
        </div>
      </Reveal>

      {/* §4 EVIDENCE */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={rail}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "clamp(44px, 6vh, 64px) clamp(24px, 3.5vw, 48px) 28px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <span style={kicker}>02 · EVIDENCE</span>
              <h2 style={{ font: "600 clamp(24px, 2.6vw, 34px) 'Poppins', sans-serif", letterSpacing: "-0.02em", color: "#eaf1ff", margin: 0 }}>
                Benchmarks publish with the <span data-hm-ch="" style={{ ...barSpan, animation: "hmBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}>certificate</span>
              </h2>
            </div>
            <span style={{ font: "400 9.5px 'IBM Plex Mono', monospace", letterSpacing: "0.16em", color: "#5a6478", border: "1px dashed #1b2740", padding: "5px 10px" }}>
              NO NUMBERS UNTIL THE GATE SIGNS THEM
            </span>
          </div>
          <div style={{ borderTop: "1px dashed rgba(169,199,255,0.12)", borderBottom: "1px dashed rgba(169,199,255,0.12)", padding: "36px clamp(24px, 3.5vw, 48px)", display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ font: "400 16px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0, maxWidth: 640 }}>
              Every result on this site binds to a signed eval certificate at release. Until a checkpoint clears the
              gate there is nothing to show here — no targets dressed up as results, no cherry-picked leaderboard.
              When the numbers exist, they arrive with the certificate that proves them.
            </p>
            <span style={{ font: "400 9.5px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#5a6478" }}>
              BENCHMARKS PUBLISH WITH THE EVAL CERTIFICATE AT RELEASE — TARGETS ONLY UNTIL THE GATE SIGNS THEM.
            </span>
            <a className="hm-lnk-accent" href="/whitepaper" style={{ alignSelf: "flex-start", font: "400 10.5px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", borderBottom: "1px dashed rgba(169,199,255,0.4)", paddingBottom: 3 }}>
              HOW THE GATE WORKS&nbsp;→
            </a>
          </div>
        </div>
      </Reveal>

      {/* §5 ROADMAP LADDER */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={rail}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", padding: "clamp(44px, 6vh, 64px) clamp(24px, 3.5vw, 48px) 12px" }}>
            <span style={kicker}>03 · ROADMAP</span>
            <h2 style={{ font: "600 clamp(24px, 2.6vw, 34px) 'Poppins', sans-serif", letterSpacing: "-0.02em", color: "#eaf1ff", margin: 0 }}>
              Proof-gated, <span data-hm-ch="" style={{ ...barSpan, animation: "hmBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}>in order</span>
            </h2>
            <span style={{ font: "400 10px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#5a6478" }}>NO DATES. STAGES PROMOTE WHEN THE GATE PASSES THEM.</span>
          </div>
          <div style={{ overflowX: "auto", padding: "28px clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 72px)" }}>
            <div style={{ display: "flex", alignItems: "stretch", minWidth: 760, maxWidth: 1100 }}>
              <div style={{ flex: 1, border: "1px dashed rgba(169,199,255,0.35)", display: "flex", flexDirection: "column" }}>
                <span style={{ font: "400 9.5px 'IBM Plex Mono', monospace", letterSpacing: "0.18em", color: "#a9c7ff", padding: "14px 22px", borderBottom: "1px dashed rgba(169,199,255,0.2)" }}>STAGE 01 · CURRENT GENERATION</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px", borderBottom: "1px dashed rgba(169,199,255,0.15)", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>NEPTUNE-1.0-27B-AGENT</span>
                    <span style={{ font: "400 9px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#060b16", background: "#a9c7ff", padding: "4px 8px" }}>IN TRAINING</span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>Agent-native flagship. Apache 2.0 on Hugging Face at release.</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>NEPTUNE-1.0-9B-AGENT</span>
                    <span style={{ font: "400 9px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#eaf1ff", border: "1px dashed rgba(169,199,255,0.45)", padding: "3px 8px" }}>QUEUED</span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>Compact agent model for edge and high-volume loops.</span>
                </div>
              </div>
              <div style={{ flex: "none", width: 52, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <svg style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: 2, overflow: "visible" }}>
                  <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(169,199,255,0.35)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: "dashFlow 2.4s linear infinite" }} />
                </svg>
                <span style={{ position: "relative", font: "400 11px 'IBM Plex Mono', monospace", color: "#a9c7ff", background: "#060b16", padding: "0 4px", animation: "blinkDot 3.2s ease-in-out infinite" }}>◇</span>
              </div>
              <div style={{ flex: 1, border: "1px dashed rgba(169,199,255,0.2)", display: "flex", flexDirection: "column" }}>
                <span style={{ font: "400 9.5px 'IBM Plex Mono', monospace", letterSpacing: "0.18em", color: "#5a6478", padding: "14px 22px", borderBottom: "1px dashed rgba(169,199,255,0.15)" }}>STAGE 02 · PROOF-GATED</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px", borderBottom: "1px dashed rgba(169,199,255,0.15)", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>NEPTUNE-70B-FINANCE</span>
                    <span style={{ font: "400 9px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#98a3bd", border: "1px dashed rgba(169,199,255,0.3)", padding: "3px 8px" }}>DOMAIN LINE 01</span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>The finance line of the 70B base. Ships with an eval certificate.</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>NEPTUNE-MOE</span>
                    <span style={{ font: "400 9px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "#98a3bd", border: "1px dashed rgba(169,199,255,0.3)", padding: "3px 8px" }}>ARCHITECTURE</span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>Mixture-of-experts line. Gated like everything else.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* §6 FACTORY LINE */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={rail}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, padding: "clamp(56px, 9vh, 96px) clamp(24px, 3.5vw, 48px) 12px", textAlign: "center" }}>
            <span style={kicker}>04 · THE FACTORY</span>
            <h2 style={{ font: "600 clamp(30px, 3.6vw, 52px) 'Poppins', sans-serif", letterSpacing: "-0.025em", color: "#eaf1ff", margin: 0 }}>
              One factory. <span data-hm-ch="" style={{ ...barSpan, animation: "hmBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}>Every model.</span>
            </h2>
            <p style={{ font: "400 16px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0, maxWidth: 560 }}>
              Neptune models aren&apos;t hand-built — they come off a training line where every stage must prove itself
              before the next begins. The 27B is its first product, not its last.
            </p>
          </div>
          <div style={{ overflowX: "auto", position: "relative" }}>
            <NoiseField />
            <svg
              viewBox="0 0 1120 260"
              style={{ display: "block", width: "100%", minWidth: 940, height: "auto", overflow: "visible", padding: "8px 0 20px", position: "relative" }}
              aria-label="The training line: SFT, DPO, GRPO, then the eval gate, then MTP, quantization, and a signed release"
            >
              <line x1="40" y1="150" x2="1080" y2="150" stroke="#2a3954" strokeDasharray="4 4" style={{ animation: "dashFlow 2.4s linear infinite" }} />
              <path d="M 560 168 C 516 226 452 232 400 178" fill="none" stroke="#2a3954" strokeDasharray="3 6" opacity="0.8" style={{ animation: "dashFlow 3.4s linear infinite" }} />
              <text x="478" y="244" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1" fill="#5a6478" textAnchor="middle">FAIL → BACK TO GRPO</text>

              <PipeCube cx={110} label="SFT" delay="0.05s" />
              <PipeCube cx={250} label="DPO" delay="0.15s" />
              <PipeCube cx={390} label="GRPO" delay="0.25s" />

              <g data-hm-ch="" style={{ animation: "fadeUp 0.7s var(--ease) 0.4s both" }}>
                <line x1="554" y1="96" x2="554" y2="204" stroke="#a9c7ff" strokeWidth="1" strokeDasharray="3 5" opacity="0.9" style={{ animation: "dashFlow 2.8s linear infinite" }} />
                <line x1="566" y1="90" x2="566" y2="198" stroke="#a9c7ff" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" style={{ animation: "dashFlow 3.6s linear infinite" }} />
                <rect x="512" y="62" width="96" height="22" fill="#060b16" stroke="#a9c7ff" />
                <text x="560" y="77" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.5" fill="#a9c7ff">EVAL GATE</text>
                <circle cx="560" cy="150" r="10" fill="none" stroke="#a9c7ff" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "hmNodePing 5s ease-out 1.8s infinite both" }} />
              </g>

              <PipeCube cx={700} label="MTP" delay="0.5s" />
              <PipeCube cx={840} label="QUANT" delay="0.6s" />

              <g data-hm-ch="" style={{ animation: "fadeUp 0.7s var(--ease) 0.75s both" }}>
                <ellipse cx="1000" cy="160" rx="40" ry="13" fill="#060b16" stroke="#1b2740" />
                <ellipse cx="1000" cy="148" rx="40" ry="13" fill="rgba(37,71,244,0.16)" stroke="#4c74ff" opacity="0.85" />
                <ellipse cx="1000" cy="136" rx="40" ry="13" fill="#0b1220" stroke="#a9c7ff" strokeWidth="1.1" />
                <text x="1000" y="200" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="1.5" fill="#eaf1ff">RELEASE</text>
                <line x1="1000" y1="100" x2="1000" y2="121" stroke="#4fce8d" strokeDasharray="2 4" opacity="0.7" />
                <g style={{ animation: "hmSigBreathe 3.4s ease-in-out infinite" }}>
                  <rect x="960" y="78" width="80" height="20" fill="#060b16" stroke="#4fce8d" />
                  <text x="1000" y="92" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#4fce8d">CHAIN ✓</text>
                </g>
              </g>

              <g fill="none" stroke="#4c74ff">
                <path d="M 200 66 L 207 73 L 200 80 L 193 73 Z" opacity="0.7" style={{ animation: "hmFloatY 8s ease-in-out infinite alternate" }} />
                <path d="M 660 54 L 667 61 L 660 68 L 653 61 Z" opacity="0.6" style={{ animation: "hmFloatY 9s ease-in-out 1.2s infinite alternate" }} />
              </g>
              <path d="M 930 56 L 936 62 L 930 68 L 924 62 Z" fill="#2547f4" opacity="0.55" style={{ animation: "hmFloatY 10s ease-in-out 0.6s infinite alternate" }} />

              <circle r="3" fill="#eaf1ff" style={{ offsetPath: "path('M 40 150 L 1080 150')", animation: "hmPulseTravel 7s linear 1s infinite" }} />
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: "8px clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 80px)" }}>
            <Link className="hm-lnk-accent" href="/blog" style={{ font: "400 11px 'IBM Plex Mono', monospace", letterSpacing: "0.14em", borderBottom: "1px dashed rgba(169,199,255,0.4)", paddingBottom: 3 }}>
              READ THE FACTORY NOTES&nbsp;→
            </Link>
          </div>
        </div>
      </Reveal>

      {/* TELEMETRY STRIP B (full-bleed) */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)", position: "relative", background: "#060b16", overflow: "hidden" }}>
        <StripRows rows={strips.b} />
      </Reveal>
    </>
  );
}
