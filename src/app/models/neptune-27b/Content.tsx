"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const cornerStyle: React.CSSProperties = {
  position: "absolute",
  top: -7,
  font: "400 12px 'IBM Plex Mono', monospace",
  color: "#2a3954",
  zIndex: 3,
};

const barSpan: React.CSSProperties = {
  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "100% 100%",
  color: "#060b16",
  padding: "0 0.24em 0.1em 0.19em",
};

const specLabel: React.CSSProperties = {
  font: "400 9.5px 'IBM Plex Mono', monospace",
  letterSpacing: "0.18em",
  color: "#5a6478",
};

const cellBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "26px clamp(24px, 3.5vw, 48px)",
};

const dashR = "1px dashed rgba(169,199,255,0.12)";

// Decorative "training noise" backdrop behind the hero diagram (aria-hidden).
const ASCII: { c: string; o: number; t: string }[] = [
  { c: "#2e4370", o: 1, t: "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        " },
  { c: "#223052", o: 0.85, t: "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / " },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ " },
  { c: "#2e4370", o: 1, t: " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/" },
  { c: "#223052", o: 0.85, t: "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '" },
  { c: "#223052", o: 0.85, t: "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   " },
  { c: "#2e4370", o: 1, t: " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # " },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T " },
  { c: "#223052", o: 0.85, t: "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '" },
  { c: "#2e4370", o: 1, t: "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '" },
  { c: "#223052", o: 0.85, t: " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T " },
  { c: "#223052", o: 0.85, t: "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #" },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   " },
  { c: "#223052", o: 0.85, t: "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— " },
  { c: "#223052", o: 0.85, t: "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  " },
  { c: "#2e4370", o: 1, t: "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  " },
  { c: "#223052", o: 0.85, t: " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   " },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   " },
  { c: "#2e4370", o: 1, t: "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — " },
  { c: "#223052", o: 0.85, t: "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ " },
  { c: "#223052", o: 0.85, t: " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   " },
  { c: "#2e4370", o: 1, t: "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T" },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [" },
  { c: "#223052", o: 0.85, t: "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+" },
  { c: "#2e4370", o: 1, t: " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '" },
  { c: "#223052", o: 0.85, t: " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —" },
];

export default function Content() {
  const stepRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const rm =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    let n = 114208;
    const tick = setInterval(() => {
      n += 20 + Math.floor(Math.random() * 40);
      if (stepRef.current) {
        stepRef.current.textContent = n
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }, 1400);
    return () => clearInterval(tick);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes floatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes nodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
@keyframes bgSlide { to { background-position: 7px 0; } }
[data-reveal] [data-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-ch] { animation-play-state: running; }
[data-n27-hero] { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: center; }
[data-n27-spec3] { display: grid; grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 980px) {
  [data-n27-hero] { grid-template-columns: 1fr; }
  [data-n27-spec3] { grid-template-columns: 1fr; }
  [data-n27-cell] { border-right: none !important; border-bottom: 1px dashed rgba(169,199,255,0.12); }
}
`,
        }}
      />

      {/* ---------------- HERO ---------------- */}
      <div style={{ ...railStyle, position: "relative" }}>
        <span style={{ ...cornerStyle, left: -6.5 }}>+</span>
        <span style={{ ...cornerStyle, right: -6.5 }}>+</span>
        <div
          data-n27-hero=""
          style={{
            padding:
              "clamp(48px, 7vh, 84px) clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 80px)",
          }}
        >
          {/* left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.2em",
                color: "#5a6478",
                animation: `fadeUp 0.8s ${EASE} 0.05s both`,
              }}
            >
              <Link href="/models" style={{ color: "#a9c7ff" }}>
                MODELS
              </Link>{" "}
              · STAGE 01 · FLAGSHIP
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                animation: `fadeUp 0.9s ${EASE} 0.15s both`,
              }}
            >
              <h1
                style={{
                  font: "500 clamp(28px, 3.4vw, 46px) 'IBM Plex Mono', monospace",
                  letterSpacing: "-0.01em",
                  color: "#eaf1ff",
                  margin: 0,
                }}
              >
                Neptune-1.0-27B-
                <span style={{ ...barSpan, animation: `barIn 0.8s ${EASE} 0.6s both` }}>
                  Agent
                </span>
              </h1>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  font: "400 9px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#eaf1ff",
                  border: "1px dashed rgba(169,199,255,0.45)",
                  padding: "4px 9px",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    background: "#a9c7ff",
                    animation: "blinkDot 2.4s ease-in-out infinite",
                  }}
                />
                IN TRAINING
              </span>
            </div>
            <p
              style={{
                font: "400 16px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 520,
                animation: `fadeUp 0.9s ${EASE} 0.25s both`,
              }}
            >
              The agent-native flagship, on the line now. Hermes-native tool calling, multi-step
              agentic workflows, and a name that is the spec — 27 billion parameters, true count.{" "}
              <span style={{ color: "#eaf1ff" }}>
                Weights publish the moment the gate passes them.
              </span>
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                animation: `fadeUp 0.9s ${EASE} 0.35s both`,
              }}
            >
              <a
                className="btn-cta"
                href="https://huggingface.co/ainfera"
                target="_blank"
                rel="noreferrer"
                style={{
                  font: "500 11.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "16px 26px",
                }}
              >
                FOLLOW THE TRAINING RUN&nbsp;↗
              </a>
              <Link
                className="btn-ghost"
                href="/blog/inside-the-eval-gate"
                style={{
                  font: "400 11.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "15px 24px",
                }}
              >
                HOW THE GATE WORKS&nbsp;→
              </Link>
            </div>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
                animation: `fadeUp 0.9s ${EASE} 0.42s both`,
              }}
            >
              APACHE 2.0 AT RELEASE · 27B TRUE COUNT · HERMES-NATIVE
            </span>
          </div>

          {/* right column — diagram + training ticker */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              animation: `fadeUp 1.1s ${EASE} 0.4s both`,
            }}
          >
            <div style={{ position: "relative" }}>
              {/* ASCII noise backdrop */}
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
                  WebkitMaskImage:
                    "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
                  maskImage:
                    "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
                }}
              >
                {ASCII.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      font: "400 12px/17px 'IBM Plex Mono', monospace",
                      letterSpacing: 5,
                      whiteSpace: "pre",
                      color: l.c,
                      opacity: l.o,
                    }}
                  >
                    {l.t}
                  </div>
                ))}
              </div>

              <svg
                viewBox="0 0 480 300"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  overflow: "visible",
                  position: "relative",
                }}
                aria-label="The 27B on the line: SFT and DPO passed, GRPO running, eval gate ahead"
              >
                <defs>
                  <radialGradient id="halo27" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                    <stop offset="100%" stopColor="rgba(169,199,255,0)" />
                  </radialGradient>
                </defs>
                <ellipse cx="220" cy="172" rx="155" ry="66" fill="url(#halo27)" />
                <ellipse
                  cx="220"
                  cy="170"
                  rx="130"
                  ry="36"
                  fill="none"
                  stroke="#2a3954"
                  strokeDasharray="2 6"
                  style={{ animation: "dashFlow 4.5s linear infinite" }}
                />
                <path
                  d="M 60 226 C 110 210 150 196 178 186"
                  fill="none"
                  stroke="#4c74ff"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.75"
                  style={{ animation: "dashFlow 2.2s linear infinite" }}
                />
                <path
                  d="M 262 156 C 310 142 348 148 384 168"
                  fill="none"
                  stroke="#4c74ff"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.75"
                  style={{ animation: "dashFlow 2.2s linear infinite" }}
                />
                <g fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1">
                  <rect x="18" y="216" width="52" height="20" fill="#0b1220" stroke="#1b2740" />
                  <text x="44" y="229.5" textAnchor="middle" fill="#5a6478">
                    SFT ✓
                  </text>
                  <rect x="18" y="242" width="52" height="20" fill="#0b1220" stroke="#1b2740" />
                  <text x="44" y="255.5" textAnchor="middle" fill="#5a6478">
                    DPO ✓
                  </text>
                </g>
                <g transform="translate(220,164) scale(1.35)" stroke="#a9c7ff" strokeWidth="1">
                  <g style={{ animation: "floatY 9s ease-in-out infinite alternate" }}>
                    <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="rgba(37,71,244,0.28)" />
                    <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
                    <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
                  </g>
                </g>
                <circle
                  cx="220"
                  cy="170"
                  r="14"
                  fill="none"
                  stroke="#a9c7ff"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "nodePing 4.5s ease-out 1.2s infinite both",
                  }}
                />
                <g style={{ animation: `fadeUp 0.8s ${EASE} 1s both` }}>
                  <line
                    x1="392"
                    y1="118"
                    x2="392"
                    y2="226"
                    stroke="#a9c7ff"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    opacity="0.9"
                    style={{ animation: "dashFlow 2.8s linear infinite" }}
                  />
                  <line
                    x1="404"
                    y1="112"
                    x2="404"
                    y2="220"
                    stroke="#a9c7ff"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    opacity="0.5"
                    style={{ animation: "dashFlow 3.6s linear infinite" }}
                  />
                  <rect x="350" y="86" width="96" height="22" fill="#060b16" stroke="#a9c7ff" />
                  <text
                    x="398"
                    y="101"
                    textAnchor="middle"
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize="9.5"
                    letterSpacing="1.5"
                    fill="#a9c7ff"
                  >
                    EVAL GATE
                  </text>
                </g>
                <path
                  d="M 96 92 L 103 99 L 96 106 L 89 99 Z"
                  fill="none"
                  stroke="#4c74ff"
                  opacity="0.7"
                  style={{ animation: "floatY 8s ease-in-out infinite alternate" }}
                />
                <path
                  d="M 330 52 L 336 58 L 330 64 L 324 58 Z"
                  fill="#2547f4"
                  opacity="0.5"
                  style={{ animation: "floatY 10s ease-in-out 0.6s infinite alternate" }}
                />
                <circle
                  r="3"
                  fill="#eaf1ff"
                  style={{
                    offsetPath: "path('M 60 226 C 110 210 150 196 178 186')",
                    animation: "pulseTravel 4.2s linear 0.8s infinite",
                  }}
                />
                <circle
                  r="3"
                  fill="#eaf1ff"
                  style={{
                    offsetPath: "path('M 262 156 C 310 142 348 148 384 168')",
                    animation: "pulseTravel 4.2s linear 2.6s infinite",
                  }}
                />
              </svg>

              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  font: "400 8.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  color: "#98a3bd",
                  background: "#060b16",
                  border: "1px dashed #1b2740",
                  padding: "5px 9px",
                  animation: `fadeUp 0.7s ${EASE} 1.2s both`,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    background: "#a9c7ff",
                    animation: "blinkDot 2.6s ease-in-out infinite",
                  }}
                />
                STAGE 03/06 · GRPO
              </span>
            </div>

            {/* training run ticker + progress */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  font: "400 9.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  color: "#5a6478",
                }}
              >
                <span>
                  TRAINING RUN · STEP{" "}
                  <span ref={stepRef} style={{ color: "#eaf1ff" }}>
                    114,208
                  </span>{" "}
                  / 300,000
                </span>
                <span>ILLUSTRATIVE</span>
              </div>
              <div
                style={{
                  height: 18,
                  border: "1px dashed rgba(169,199,255,0.25)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    bottom: 2,
                    left: 2,
                    width: "38%",
                    background: "#a9c7ff",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(6,11,22,0.3) 0 1px, transparent 1px 7px)",
                      animation: "bgSlide 1.4s linear infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 01 · SPEC ---------------- */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div
            style={{
              padding: "clamp(40px, 6vh, 60px) clamp(24px, 3.5vw, 48px) 24px",
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.22em",
                color: "#5a6478",
              }}
            >
              01 · SPEC
            </span>
            <h2
              style={{
                font: "600 clamp(22px, 2.4vw, 30px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              The name is{" "}
              <span data-ch="" style={{ ...barSpan, animation: `barIn 0.8s ${EASE} 0.25s both` }}>
                the spec
              </span>
            </h2>
          </div>
          <div data-n27-spec3="" style={{ borderTop: dashR }}>
            <div data-n27-cell="" style={{ ...cellBase, borderRight: dashR }}>
              <span style={specLabel}>PARAMETERS</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                27B · TRUE COUNT
              </span>
            </div>
            <div data-n27-cell="" style={{ ...cellBase, borderRight: dashR }}>
              <span style={specLabel}>CONTEXT</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                128K TOKENS
              </span>
            </div>
            <div data-n27-cell="" style={cellBase}>
              <span style={specLabel}>TOOL FORMAT</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                HERMES-NATIVE
              </span>
            </div>
            <div data-n27-cell="" style={{ ...cellBase, borderTop: dashR, borderRight: dashR }}>
              <span style={specLabel}>BASE</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                NEPTUNE-1.0 PRETRAIN · DENSE
              </span>
            </div>
            <div data-n27-cell="" style={{ ...cellBase, borderTop: dashR, borderRight: dashR }}>
              <span style={specLabel}>LICENSE</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                APACHE 2.0 AT RELEASE
              </span>
            </div>
            <div data-n27-cell="" style={{ ...cellBase, borderTop: dashR }}>
              <span style={specLabel}>STATUS</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                IN TRAINING · GRPO
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------------- 02 · TRAINED FOR ---------------- */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div
            style={{
              padding: "clamp(40px, 6vh, 60px) clamp(24px, 3.5vw, 48px) 24px",
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.22em",
                color: "#5a6478",
              }}
            >
              02 · TRAINED FOR
            </span>
            <h2
              style={{
                font: "600 clamp(22px, 2.4vw, 30px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Agent work,{" "}
              <span data-ch="" style={{ ...barSpan, animation: `barIn 0.8s ${EASE} 0.25s both` }}>
                not chat
              </span>
            </h2>
          </div>
          <div data-n27-spec3="" style={{ borderTop: dashR }}>
            <div
              data-n27-cell=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "28px clamp(24px, 3.5vw, 48px)",
                borderRight: dashR,
              }}
            >
              <span
                style={{
                  font: "500 11px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#eaf1ff",
                }}
              >
                HERMES-NATIVE TOOL CALLING
              </span>
              <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                Structured tool calls in the format agents already speak — no wrapper prompts, no
                parsing glue.
              </span>
            </div>
            <div
              data-n27-cell=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "28px clamp(24px, 3.5vw, 48px)",
                borderRight: dashR,
              }}
            >
              <span
                style={{
                  font: "500 11px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#eaf1ff",
                }}
              >
                MULTI-STEP WORKFLOWS
              </span>
              <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                GRPO over full agent episodes: plans, function chains, and long-horizon task
                completion.
              </span>
            </div>
            <div
              data-n27-cell=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "28px clamp(24px, 3.5vw, 48px)",
              }}
            >
              <span
                style={{
                  font: "500 11px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#eaf1ff",
                }}
              >
                FAILURE RECOVERY
              </span>
              <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                Trained on recovery from failed calls and bad tool output — the part of agent life
                chat models never see.
              </span>
            </div>
          </div>
          <div
            style={{
              borderTop: dashR,
              padding: "14px clamp(24px, 3.5vw, 48px)",
              font: "400 9.5px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              color: "#5a6478",
            }}
          >
            BENCHMARKS PUBLISH WITH THE EVAL CERTIFICATE AT RELEASE — TARGETS ONLY UNTIL THE GATE
            SIGNS THEM.
          </div>
        </div>
      </Reveal>
    </>
  );
}
