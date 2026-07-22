"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NotifyForm from "@/components/NotifyForm";

/* ---- background ASCII noise field (aria-hidden decorative texture) ---- */
const TX_STYLE: Record<string, { color: string; opacity: number }> = {
  a: { color: "#2e4370", opacity: 1 },
  b: { color: "#223052", opacity: 0.85 },
  c: { color: "rgba(79,206,141,0.34)", opacity: 0.9 },
};

const TEXTURE: [keyof typeof TX_STYLE, string][] = [
  ["a", "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        "],
  ["b", "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / "],
  ["c", "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ "],
  ["a", " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/"],
  ["b", "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '"],
  ["b", "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   "],
  ["a", " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # "],
  ["c", "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T "],
  ["b", "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '"],
  ["a", "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '"],
  ["b", " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T "],
  ["b", "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #"],
  ["c", " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   "],
  ["b", "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— "],
  ["b", "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  "],
  ["a", "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  "],
  ["b", " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   "],
  ["c", "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T [·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   "],
  ["a", "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — "],
  ["b", "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ "],
  ["b", " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   "],
  ["a", "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T"],
  ["c", " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — ["],
  ["b", "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+"],
  ["a", " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '"],
  ["b", " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ [' T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —"],
];

/* ---- live telemetry strip (two rows of randomly-sized/coloured cells) ---- */
type Cell = { w: string; bg: string; anim: string };
type Row = { cells: Cell[] };

function buildStrip(): Row[] {
  const palette: [string, number][] = [
    ["#060b16", 42],
    ["#0b1220", 20],
    ["#141c2e", 14],
    ["#2a3954", 9],
    ["#2547f4", 6],
    ["#4c74ff", 5],
    ["#a9c7ff", 3],
    ["#eaf1ff", 1],
  ];
  const lit: Record<string, boolean> = {
    "#2547f4": true,
    "#4c74ff": true,
    "#a9c7ff": true,
    "#eaf1ff": true,
  };
  const pick = () => {
    let r = Math.random() * 100;
    for (const [c, w] of palette) {
      if ((r -= w) < 0) return c;
    }
    return "#060b16";
  };
  const mkRow = (): Row => {
    const cells: Cell[] = [];
    let total = 0;
    while (total < 100) {
      let w = 3 + Math.floor(Math.random() * 9);
      if (total + w > 100) w = 100 - total;
      total += w;
      const bg = pick();
      cells.push({
        w: w + "%",
        bg,
        anim: lit[bg]
          ? "cellPulse " +
            (2.4 + Math.random() * 4).toFixed(1) +
            "s ease-in-out " +
            (Math.random() * 5).toFixed(1) +
            "s infinite"
          : "none",
      });
    }
    return { cells };
  };
  return [mkRow(), mkRow()];
}

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function Content() {
  const [step, setStep] = useState(114208);
  const [strip, setStrip] = useState<Row[]>([]);

  // Live step ticker — increments while the run is "training".
  useEffect(() => {
    const rm =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    const id = setInterval(() => {
      setStep((n) => n + 20 + Math.floor(Math.random() * 40));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // Strip is random → build after mount to avoid an SSR/hydration mismatch.
  useEffect(() => {
    setStrip(buildStrip());
  }, []);

  return (
    <div
      data-anim="on"
      style={{
        minHeight: "100vh",
        background: "#060b16",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        padding: "clamp(24px, 4vh, 48px) 24px 0",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes floatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes nodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
@keyframes cellPulse { 0%, 100% { opacity: 0.16; } 50% { opacity: 1; } }
@keyframes bgSlide { to { background-position: 7px 0; } }
[data-anim="off"] * { animation: none !important; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`,
        }}
      />

      {/* framing lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "clamp(20px, 8vw, 120px)",
          borderLeft: "1px dashed rgba(169,199,255,0.1)",
          animation: "lineDrawV 1.6s ease 0.2s both",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "clamp(20px, 8vw, 120px)",
          borderLeft: "1px dashed rgba(169,199,255,0.1)",
          animation: "lineDrawV 1.6s ease 0.2s both",
        }}
      />

      <div
        style={{
          width: "min(560px, 82vw)",
          borderTop: "1px dashed rgba(169,199,255,0.25)",
          animation: "lineDraw 1.4s ease 0.1s both",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(26px, 4vh, 40px)",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both",
          }}
        >
          <img
            src="/brand/ainfera-mark-ice.svg"
            alt="Ainfera mark"
            style={{ width: 44, height: 44, display: "block" }}
          />
          <span
            style={{
              font: "500 clamp(30px, 4vw, 40px)/1 'Poppins', sans-serif",
              letterSpacing: "-0.02em",
              color: "#eaf1ff",
            }}
          >
            ainfera
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16, width: "min(420px, 76vw)" }}>
            <span
              style={{
                flex: 1,
                borderTop: "1px dashed rgba(169,199,255,0.25)",
                animation: "lineDraw 1.2s ease 0.5s both",
              }}
            />
            <span
              style={{
                font: "400 12px 'IBM Plex Mono', monospace",
                letterSpacing: "0.5em",
                paddingLeft: "0.5em",
                color: "#a9c7ff",
              }}
            >
              Neptune
            </span>
            <span
              style={{
                flex: 1,
                borderTop: "1px dashed rgba(169,199,255,0.25)",
                animation: "lineDraw 1.2s ease 0.5s both",
              }}
            />
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            textAlign: "center",
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both",
          }}
        >
          <h1
            style={{
              font: "600 clamp(36px, 5vw, 60px)/1.1 'Poppins', sans-serif",
              letterSpacing: "-0.035em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Neptune-1.0-27B is{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 100%",
                color: "#060b16",
                padding: "0 0.24em 0.1em 0.19em",
                animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s both",
              }}
            >
              in training.
            </span>
          </h1>
          <p
            style={{
              font: "400 16px/1.7 'Poppins', sans-serif",
              color: "#98a3bd",
              margin: 0,
              maxWidth: 560,
            }}
          >
            It ships when the eval gate passes it — not before. Every stage below must prove itself,
            and every promotion lands in the signed audit log.
          </p>
        </div>

        {/* factory line status */}
        <div
          style={{
            width: "min(1040px, 100%)",
            overflowX: "auto",
            position: "relative",
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both",
          }}
        >
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
            {TEXTURE.map(([v, text], i) => (
              <div
                key={i}
                style={{
                  font: "400 12px/17px 'IBM Plex Mono', monospace",
                  letterSpacing: "5px",
                  whiteSpace: "pre",
                  color: TX_STYLE[v].color,
                  opacity: TX_STYLE[v].opacity,
                }}
              >
                {text}
              </div>
            ))}
          </div>

          <svg
            viewBox="0 0 1120 250"
            data-halo="1"
            aria-label="Training line status: SFT and DPO complete, GRPO running now, eval gate and later stages waiting"
            style={{
              display: "block",
              width: "100%",
              minWidth: 880,
              height: "auto",
              overflow: "visible",
              position: "relative",
            }}
          >
            <defs>
              <radialGradient id="haloIt" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                <stop offset="100%" stopColor="rgba(169,199,255,0)" />
              </radialGradient>
            </defs>
            <ellipse cx="390" cy="142" rx="140" ry="58" fill="url(#haloIt)" />
            <line
              x1="40"
              y1="140"
              x2="1080"
              y2="140"
              stroke="#2a3954"
              strokeDasharray="4 4"
              style={{ animation: "dashFlow 2.4s linear infinite" }}
            />
            <path
              d="M 560 158 C 516 216 452 222 400 168"
              fill="none"
              stroke="#2a3954"
              strokeDasharray="3 6"
              opacity="0.8"
              style={{ animation: "dashFlow 3.4s linear infinite" }}
            />
            <text
              x="478"
              y="234"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8.5"
              letterSpacing="1"
              fill="#5a6478"
              textAnchor="middle"
            >
              FAIL → BACK TO GRPO
            </text>

            {/* SFT */}
            <g
              stroke="#a9c7ff"
              strokeWidth="0.9"
              opacity="0.85"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
            >
              <path d="M 110 118 L 132 129 L 110 140 L 88 129 Z" fill="#141c2e" />
              <path d="M 88 129 L 88 153 L 110 164 L 110 140 Z" fill="#0b1220" />
              <path d="M 110 140 L 110 164 L 132 153 L 132 129 Z" fill="#060b16" />
              <text
                x="110"
                y="190"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#98a3bd"
                stroke="none"
              >
                SFT ✓
              </text>
            </g>
            {/* DPO */}
            <g
              stroke="#a9c7ff"
              strokeWidth="0.9"
              opacity="0.85"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
            >
              <path d="M 250 118 L 272 129 L 250 140 L 228 129 Z" fill="#141c2e" />
              <path d="M 228 129 L 228 153 L 250 164 L 250 140 Z" fill="#0b1220" />
              <path d="M 250 140 L 250 164 L 272 153 L 272 129 Z" fill="#060b16" />
              <text
                x="250"
                y="190"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#98a3bd"
                stroke="none"
              >
                DPO ✓
              </text>
            </g>
            {/* GRPO · NOW */}
            <g
              stroke="#a9c7ff"
              strokeWidth="1.2"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s both" }}
            >
              <g style={{ animation: "floatY 7s ease-in-out infinite alternate" }}>
                <path d="M 390 118 L 412 129 L 390 140 L 368 129 Z" fill="rgba(37,71,244,0.35)" />
                <path d="M 368 129 L 368 153 L 390 164 L 390 140 Z" fill="#0b1220" />
                <path d="M 390 140 L 390 164 L 412 153 L 412 129 Z" fill="#060b16" />
              </g>
              <circle
                cx="390"
                cy="140"
                r="12"
                fill="none"
                stroke="#a9c7ff"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "nodePing 4s ease-out 1.2s infinite both",
                }}
              />
              <text
                x="390"
                y="190"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#eaf1ff"
                stroke="none"
              >
                GRPO · NOW
              </text>
            </g>
            {/* eval gate */}
            <g style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.75s both" }}>
              <line
                x1="554"
                y1="86"
                x2="554"
                y2="194"
                stroke="#a9c7ff"
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.9"
                style={{ animation: "dashFlow 2.8s linear infinite" }}
              />
              <line
                x1="566"
                y1="80"
                x2="566"
                y2="188"
                stroke="#a9c7ff"
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.5"
                style={{ animation: "dashFlow 3.6s linear infinite" }}
              />
              <rect x="512" y="52" width="96" height="22" fill="#060b16" stroke="#a9c7ff" />
              <text
                x="560"
                y="67"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#a9c7ff"
              >
                EVAL GATE
              </text>
              <text
                x="560"
                y="212"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8.5"
                letterSpacing="1"
                fill="#5a6478"
              >
                WAITING
              </text>
            </g>
            {/* MTP (dimmed) */}
            <g
              stroke="#a9c7ff"
              strokeWidth="0.9"
              opacity="0.4"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.85s both" }}
            >
              <path d="M 700 118 L 722 129 L 700 140 L 678 129 Z" fill="#141c2e" />
              <path d="M 678 129 L 678 153 L 700 164 L 700 140 Z" fill="#0b1220" />
              <path d="M 700 140 L 700 164 L 722 153 L 722 129 Z" fill="#060b16" />
              <text
                x="700"
                y="190"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#5a6478"
                stroke="none"
              >
                MTP
              </text>
            </g>
            {/* QUANT (dimmed) */}
            <g
              stroke="#a9c7ff"
              strokeWidth="0.9"
              opacity="0.4"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.95s both" }}
            >
              <path d="M 840 118 L 862 129 L 840 140 L 818 129 Z" fill="#141c2e" />
              <path d="M 818 129 L 818 153 L 840 164 L 840 140 Z" fill="#0b1220" />
              <path d="M 840 140 L 840 164 L 862 153 L 862 129 Z" fill="#060b16" />
              <text
                x="840"
                y="190"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#5a6478"
                stroke="none"
              >
                QUANT
              </text>
            </g>
            {/* RELEASE (dimmed) */}
            <g opacity="0.45" style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.05s both" }}>
              <ellipse cx="1000" cy="150" rx="40" ry="13" fill="#060b16" stroke="#1b2740" />
              <ellipse
                cx="1000"
                cy="138"
                rx="40"
                ry="13"
                fill="rgba(37,71,244,0.16)"
                stroke="#4c74ff"
                opacity="0.85"
              />
              <ellipse
                cx="1000"
                cy="126"
                rx="40"
                ry="13"
                fill="#0b1220"
                stroke="#a9c7ff"
                strokeWidth="1.1"
              />
              <text
                x="1000"
                y="190"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#5a6478"
              >
                RELEASE
              </text>
            </g>

            {/* drifting diamonds */}
            <g fill="none" stroke="#4c74ff">
              <path
                d="M 200 56 L 207 63 L 200 70 L 193 63 Z"
                opacity="0.7"
                style={{ animation: "floatY 8s ease-in-out infinite alternate" }}
              />
              <path
                d="M 660 44 L 667 51 L 660 58 L 653 51 Z"
                opacity="0.6"
                style={{ animation: "floatY 9s ease-in-out 1.2s infinite alternate" }}
              />
            </g>
            <path
              d="M 930 46 L 936 52 L 930 58 L 924 52 Z"
              fill="#2547f4"
              opacity="0.55"
              style={{ animation: "floatY 10s ease-in-out 0.6s infinite alternate" }}
            />

            <circle
              r="3"
              fill="#eaf1ff"
              style={{
                offsetPath: "path('M 40 140 L 368 140')",
                animation: "pulseTravel 4.2s linear 1s infinite",
              }}
            />
          </svg>
        </div>

        {/* run telemetry */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "min(640px, 100%)",
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              color: "#5a6478",
            }}
          >
            <span>TRAINING RUN · NEPTUNE-1.0-27B-AGENT</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <div
            style={{
              height: 22,
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
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                font: "400 9px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#eaf1ff",
                border: "1px dashed #2a3954",
                padding: "6px 11px",
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
              CURRENT STAGE · GRPO
            </span>
            <span
              style={{
                font: "400 9px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#98a3bd",
                border: "1px dashed #1b2740",
                padding: "6px 11px",
              }}
            >
              STEP <span style={{ color: "#eaf1ff" }}>{fmt(step)}</span> / 300,000
            </span>
            <span
              style={{
                font: "400 9px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
                border: "1px dashed #1b2740",
                padding: "6px 11px",
              }}
            >
              NEXT · EVAL GATE
            </span>
          </div>
        </div>

        {/* notify */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            width: "min(420px, 100%)",
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both",
          }}
        >
          <span style={{ font: "400 13px 'Poppins', sans-serif", color: "#98a3bd" }}>
            Be notified when the gate passes it.
          </span>
          <NotifyForm />
          <div style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 6 }}>
            <Link
              href="/"
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.18em",
                borderBottom: "1px dashed rgba(169,199,255,0.4)",
                paddingBottom: 3,
              }}
            >
              EXPLORE NEPTUNE&nbsp;→
            </Link>
            <a
              className="cs-x"
              href="https://x.com/ainfera"
              target="_blank"
              rel="noreferrer"
              aria-label="Ainfera on X"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12">
                <line x1="1" y1="1" x2="11" y2="11" stroke="#98a3bd" strokeWidth="1.4" />
                <line x1="11" y1="1" x2="1" y2="11" stroke="#98a3bd" strokeWidth="1.4" />
              </svg>
            </a>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.18em",
                color: "#5a6478",
              }}
            >
              © AINFERA INC.
            </span>
          </div>
        </div>
      </div>

      {/* telemetry strip */}
      <div
        style={{
          width: "100%",
          margin: "0 -24px",
          borderTop: "1px dashed rgba(169,199,255,0.25)",
          overflow: "hidden",
          animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both",
        }}
      >
        {strip.map((row, i) => (
          <div key={i} style={{ display: "flex", height: 20 }}>
            {row.cells.map((c, j) => (
              <span
                key={j}
                style={{ width: c.w, height: 20, background: c.bg, animation: c.anim }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
