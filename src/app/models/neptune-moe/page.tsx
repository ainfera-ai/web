import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Neptune MoE",
  description: "Neptune-MoE — the mixture-of-experts line, architecture phase",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const BLUE = "#2e4370";
const DIM = "#223052";
const GREEN = "rgba(79,206,141,0.34)";

// Decorative monospace noise field behind the router diagram (aria-hidden).
const NOISE_ROWS: { text: string; color: string; opacity: number }[] = [
  { text: "—   [+ /[     /T+   '' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        ", color: BLUE, opacity: 1 },
  { text: "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / ", color: DIM, opacity: 0.85 },
  { text: "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ ", color: GREEN, opacity: 0.9 },
  { text: " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/", color: BLUE, opacity: 1 },
  { text: "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '", color: DIM, opacity: 0.85 },
  { text: "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   ", color: DIM, opacity: 0.85 },
  { text: " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # ", color: BLUE, opacity: 1 },
  { text: "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T ", color: GREEN, opacity: 0.9 },
  { text: "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '", color: DIM, opacity: 0.85 },
  { text: "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '", color: BLUE, opacity: 1 },
  { text: " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T ", color: DIM, opacity: 0.85 },
  { text: "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #", color: DIM, opacity: 0.85 },
  { text: " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   ", color: GREEN, opacity: 0.9 },
  { text: "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— ", color: DIM, opacity: 0.85 },
  { text: "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  ", color: DIM, opacity: 0.85 },
  { text: "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  ", color: BLUE, opacity: 1 },
  { text: " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   ", color: DIM, opacity: 0.85 },
  { text: "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   ", color: GREEN, opacity: 0.9 },
  { text: "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — ", color: BLUE, opacity: 1 },
  { text: "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ ", color: DIM, opacity: 0.85 },
  { text: " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   ", color: DIM, opacity: 0.85 },
  { text: "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T", color: BLUE, opacity: 1 },
  { text: " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [", color: GREEN, opacity: 0.9 },
  { text: "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+", color: DIM, opacity: 0.85 },
  { text: " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '", color: BLUE, opacity: 1 },
  { text: " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —", color: DIM, opacity: 0.85 },
];

type Principle = { k: string; v: string; last?: boolean };

const PRINCIPLES: Principle[] = [
  {
    k: "TRUE COUNTS, PLURAL",
    v: "MoE names will state total and active parameters — no headline number that only counts one of them.",
  },
  {
    k: "AGENT-NATIVE FIRST",
    v: "Experts are trained on the same agentic curriculum as the dense line — tool calls, plans, recovery.",
  },
  {
    k: "SAME GATE",
    v: "A new architecture earns release the same way a new checkpoint does: it passes, or it stops.",
    last: true,
  },
];

const PAGE_CSS = `
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes floatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes nodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes spinSlow { to { transform: rotate(360deg); } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
[data-reveal] [data-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-ch] { animation-play-state: running; }
[data-moe-hero] { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: center; }
[data-moe-spec] { display: grid; grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 980px) {
  [data-moe-hero] { grid-template-columns: 1fr; }
  [data-moe-spec] { grid-template-columns: 1fr; }
  [data-moe-cell] { border-right: none !important; border-bottom: 1px dashed rgba(169,199,255,0.12); }
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] [data-ch] { animation-play-state: running; }
}
`;

const cornerBase: React.CSSProperties = {
  position: "absolute",
  top: -7,
  font: "400 12px 'IBM Plex Mono', monospace",
  color: "#2a3954",
  zIndex: 3,
};

const cubeFaces = (topFill: string) => (
  <>
    <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill={topFill} />
    <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
    <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
  </>
);

export default function NeptuneMoePage() {
  return (
    <div
      style={
        {
          background: "#060b16",
          fontFamily: "'Poppins', sans-serif",
          "--ease": "cubic-bezier(0.16,1,0.3,1)",
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <Nav active="models" />

      {/* ---------- hero ---------- */}
      <div style={{ ...railStyle, position: "relative" }}>
        <span style={{ ...cornerBase, left: -6.5 }}>+</span>
        <span style={{ ...cornerBase, right: -6.5 }}>+</span>
        <div
          data-moe-hero=""
          style={{
            padding: "clamp(48px, 7vh, 84px) clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 80px)",
          }}
        >
          {/* left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.2em",
                color: "#5a6478",
                animation: "fadeUp 0.8s var(--ease) 0.05s both",
              }}
            >
              <Link href="/models" style={{ color: "#a9c7ff" }}>
                MODELS
              </Link>{" "}
              · STAGE 02 · ARCHITECTURE
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                animation: "fadeUp 0.9s var(--ease) 0.15s both",
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
                Neptune-
                <span
                  style={{
                    backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundSize: "100% 100%",
                    color: "#060b16",
                    padding: "0 0.24em 0.1em 0.19em",
                    animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both",
                  }}
                >
                  MoE
                </span>
              </h1>
              <span
                style={{
                  font: "400 9px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#98a3bd",
                  border: "1px dashed rgba(169,199,255,0.3)",
                  padding: "4px 9px",
                }}
              >
                ARCHITECTURE PHASE
              </span>
            </div>
            <p
              style={{
                font: "400 16px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 520,
                animation: "fadeUp 0.9s var(--ease) 0.25s both",
              }}
            >
              The mixture-of-experts line. Architecture work runs behind the same gate as everything
              else — it promotes when it proves, and{" "}
              <span style={{ color: "#eaf1ff" }}>
                its name will carry its true counts: total and active.
              </span>
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                animation: "fadeUp 0.9s var(--ease) 0.35s both",
              }}
            >
              <Link
                className="btn-cta"
                href="/contact"
                style={{
                  font: "500 11.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "16px 26px",
                }}
              >
                REGISTER INTEREST&nbsp;→
              </Link>
              <Link
                className="btn-ghost"
                href="/blog"
                style={{
                  font: "400 11.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "15px 24px",
                }}
              >
                FACTORY NOTES&nbsp;→
              </Link>
            </div>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
                animation: "fadeUp 0.9s var(--ease) 0.42s both",
              }}
            >
              COUNTS TBD · NAMED TRUE AT RELEASE · SAME GATE
            </span>
          </div>

          {/* right column — router diagram */}
          <div style={{ position: "relative", animation: "fadeUp 1.1s var(--ease) 0.4s both" }}>
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

            <svg
              viewBox="0 0 480 320"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                overflow: "visible",
                position: "relative",
              }}
              aria-label="A router disc dispatches tokens to expert cubes around it"
            >
              <defs>
                <radialGradient id="haloMoe" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                  <stop offset="100%" stopColor="rgba(169,199,255,0)" />
                </radialGradient>
              </defs>
              <ellipse cx="240" cy="162" rx="155" ry="64" fill="url(#haloMoe)" />
              <circle
                cx="240"
                cy="160"
                r="118"
                fill="none"
                stroke="#141c2e"
                strokeDasharray="2 7"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "spinSlow 40s linear infinite",
                }}
              />
              <path
                d="M 240 138 L 130 84"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
                style={{ animation: "dashFlow 2.2s linear infinite" }}
              />
              <path
                d="M 240 138 L 350 84"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
                style={{ animation: "dashFlow 2.6s linear infinite" }}
              />
              <path
                d="M 240 182 L 130 240"
                fill="none"
                stroke="#2a3954"
                strokeDasharray="3 6"
                opacity="0.8"
                style={{ animation: "dashFlow 3s linear infinite" }}
              />
              <path
                d="M 240 182 L 350 240"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
                style={{ animation: "dashFlow 2.4s linear infinite" }}
              />
              <g>
                <ellipse cx="240" cy="172" rx="52" ry="16" fill="#060b16" stroke="#1b2740" />
                <ellipse
                  cx="240"
                  cy="160"
                  rx="52"
                  ry="16"
                  fill="rgba(37,71,244,0.16)"
                  stroke="#4c74ff"
                  opacity="0.85"
                />
                <ellipse
                  cx="240"
                  cy="148"
                  rx="52"
                  ry="16"
                  fill="#0b1220"
                  stroke="#a9c7ff"
                  strokeWidth="1.5"
                />
                <circle
                  cx="240"
                  cy="148"
                  r="11"
                  fill="none"
                  stroke="#a9c7ff"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "nodePing 4.5s ease-out 1.2s infinite both",
                  }}
                />
              </g>
              <text
                x="240"
                y="212"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                ROUTER
              </text>
              <g stroke="#a9c7ff" strokeWidth="0.9">
                <g
                  transform="translate(118,74) scale(0.7)"
                  style={{ animation: "floatY 8s ease-in-out infinite alternate" }}
                >
                  {cubeFaces("rgba(37,71,244,0.25)")}
                </g>
                <g
                  transform="translate(362,74) scale(0.7)"
                  style={{ animation: "floatY 9s ease-in-out 0.7s infinite alternate" }}
                >
                  {cubeFaces("rgba(37,71,244,0.25)")}
                </g>
                <g
                  transform="translate(118,252) scale(0.7)"
                  opacity="0.45"
                  style={{ animation: "floatY 10s ease-in-out 1.3s infinite alternate" }}
                >
                  {cubeFaces("#141c2e")}
                </g>
                <g
                  transform="translate(362,252) scale(0.7)"
                  style={{ animation: "floatY 8.5s ease-in-out 1.9s infinite alternate" }}
                >
                  {cubeFaces("rgba(37,71,244,0.25)")}
                </g>
              </g>
              <g
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8.5"
                letterSpacing="1"
                fill="#5a6478"
              >
                <text x="118" y="118" textAnchor="middle">
                  EXPERT 01
                </text>
                <text x="362" y="118" textAnchor="middle">
                  EXPERT 02
                </text>
                <text x="118" y="296" textAnchor="middle">
                  EXPERT 03 · COLD
                </text>
                <text x="362" y="296" textAnchor="middle">
                  EXPERT 04
                </text>
              </g>
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 240 138 L 130 84')",
                  animation: "pulseTravel 3.6s linear 0.6s infinite",
                }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 240 138 L 350 84')",
                  animation: "pulseTravel 3.6s linear 1.8s infinite",
                }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 240 182 L 350 240')",
                  animation: "pulseTravel 3.6s linear 3s infinite",
                }}
              />
            </svg>

            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                font: "400 8.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
                background: "#060b16",
                border: "1px dashed #1b2740",
                padding: "5px 9px",
              }}
            >
              SPARSE ACTIVATION · ACTIVE EXPERTS ONLY
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 01 · principles ---------- */}
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
              01 · PRINCIPLES
            </span>
            <h2
              style={{
                font: "600 clamp(22px, 2.4vw, 30px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Architecture{" "}
              <span
                data-ch=""
                style={{
                  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  backgroundSize: "100% 100%",
                  color: "#060b16",
                  padding: "0 0.24em 0.1em 0.19em",
                  animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
                }}
              >
                behind the gate
              </span>
            </h2>
          </div>
          <div data-moe-spec="" style={{ borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            {PRINCIPLES.map((p) => (
              <div
                key={p.k}
                data-moe-cell=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "28px clamp(24px, 3.5vw, 48px)",
                  borderRight: p.last ? undefined : "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                <span
                  style={{
                    font: "500 11px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.16em",
                    color: "#eaf1ff",
                  }}
                >
                  {p.k}
                </span>
                <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                  {p.v}
                </span>
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
            SPECS PUBLISH WHEN THE ARCHITECTURE CLEARS ITS FIRST GATE — NOTHING TO CLAIM YET.
          </div>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
