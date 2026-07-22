import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Neptune 9B",
  description: "Neptune-1.0-9B-Agent — the compact line, queued after the flagship",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const ease = "cubic-bezier(0.16,1,0.3,1)";

const barStyle = (delay: string): React.CSSProperties => ({
  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "100% 100%",
  color: "#060b16",
  padding: "0 0.24em 0.1em 0.19em",
  animation: `barIn 0.8s cubic-bezier(0.16,1,0.3,1) ${delay} both`,
});

// Decorative ASCII field (aria-hidden, behind a radial mask)
const GREEN = "rgba(79,206,141,0.34)";
type ArtLine = { c: string; o: number; t: string };
const ART: ArtLine[] = [
  { c: "#2e4370", o: 1, t: `—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        ` },
  { c: "#223052", o: 0.85, t: `—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / ` },
  { c: GREEN, o: 0.9, t: `[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ ` },
  { c: "#2e4370", o: 1, t: ` / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/` },
  { c: "#223052", o: 0.85, t: `  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '` },
  { c: "#223052", o: 0.85, t: `  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   ` },
  { c: "#2e4370", o: 1, t: ` +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # ` },
  { c: GREEN, o: 0.9, t: `+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T ` },
  { c: "#223052", o: 0.85, t: `T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '` },
  { c: "#2e4370", o: 1, t: `     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '` },
  { c: "#223052", o: 0.85, t: ` '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T ` },
  { c: "#223052", o: 0.85, t: `   /+/  T    [' '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #` },
  { c: GREEN, o: 0.9, t: ` 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   ` },
  { c: "#223052", o: 0.85, t: `  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— ` },
  { c: "#223052", o: 0.85, t: `T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  ` },
  { c: "#2e4370", o: 1, t: `# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  ` },
  { c: "#223052", o: 0.85, t: ` '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   ` },
  { c: GREEN, o: 0.9, t: `/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   ` },
  { c: "#2e4370", o: 1, t: `/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — ` },
  { c: "#223052", o: 0.85, t: `    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ ` },
  { c: "#223052", o: 0.85, t: ` +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   ` },
  { c: "#2e4370", o: 1, t: `     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T` },
  { c: GREEN, o: 0.9, t: ` +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [` },
  { c: "#223052", o: 0.85, t: `[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+` },
  { c: "#2e4370", o: 1, t: ` ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '` },
  { c: "#223052", o: 0.85, t: ` '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —` },
];

const specCellBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "26px clamp(24px, 3.5vw, 48px)",
};

const labelStyle: React.CSSProperties = {
  font: "400 9.5px 'IBM Plex Mono', monospace",
  letterSpacing: "0.18em",
  color: "#5a6478",
};

export default function Neptune9BPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-n9hero] { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: center; }
[data-n9spec] { display: grid; grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 980px) {
  [data-n9hero] { grid-template-columns: 1fr; }
  [data-n9spec] { grid-template-columns: 1fr; }
  [data-n9cell] { border-right: none !important; border-bottom: 1px dashed rgba(169,199,255,0.12); }
}
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes floatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes nodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
[data-reveal] [data-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-ch] { animation-play-state: running; }
`,
        }}
      />

      <Nav active="models" />

      {/* ---------- HERO ---------- */}
      <div style={{ ...railStyle, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: -7,
            left: -6.5,
            font: "400 12px 'IBM Plex Mono', monospace",
            color: "#2a3954",
            zIndex: 3,
          }}
        >
          +
        </span>
        <span
          style={{
            position: "absolute",
            top: -7,
            right: -6.5,
            font: "400 12px 'IBM Plex Mono', monospace",
            color: "#2a3954",
            zIndex: 3,
          }}
        >
          +
        </span>

        <div
          data-n9hero=""
          style={{ padding: "clamp(48px, 7vh, 84px) clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 80px)" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.2em",
                color: "#5a6478",
                animation: `fadeUp 0.8s ${ease} 0.05s both`,
              }}
            >
              <Link href="/models" style={{ color: "#a9c7ff" }}>
                MODELS
              </Link>{" "}
              · STAGE 01 · COMPACT
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                animation: `fadeUp 0.9s ${ease} 0.15s both`,
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
                Neptune-1.0-9B-<span style={barStyle("0.6s")}>Agent</span>
              </h1>
              <span
                style={{
                  font: "400 9px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#eaf1ff",
                  border: "1px dashed rgba(169,199,255,0.45)",
                  padding: "4px 9px",
                }}
              >
                QUEUED
              </span>
            </div>

            <p
              style={{
                font: "400 16px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 520,
                animation: `fadeUp 0.9s ${ease} 0.25s both`,
              }}
            >
              The compact line — the same Hermes-native tool calling and agentic training as the
              flagship, sized for edge deployments and high-volume agent loops.{" "}
              <span style={{ color: "#eaf1ff" }}>Next on the line after the 27B.</span>
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                animation: `fadeUp 0.9s ${ease} 0.35s both`,
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
                href="/models/neptune-27b"
                style={{
                  font: "400 11.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "15px 24px",
                }}
              >
                SEE THE 27B RUN&nbsp;→
              </Link>
            </div>

            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
                animation: `fadeUp 0.9s ${ease} 0.42s both`,
              }}
            >
              APACHE 2.0 AT RELEASE · 9B TRUE COUNT · SHIPS WITH AN EVAL CERTIFICATE
            </span>
          </div>

          {/* Right column — the queue diagram */}
          <div style={{ position: "relative", animation: `fadeUp 1.1s ${ease} 0.4s both` }}>
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
              {ART.map((l, i) => (
                <div
                  key={i}
                  style={{
                    font: "400 12px/17px 'IBM Plex Mono', monospace",
                    letterSpacing: "5px",
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
              aria-label="The queue: the 27B is on the line now, the 9B holds the next slot"
            >
              <defs>
                <radialGradient id="halo9" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                  <stop offset="100%" stopColor="rgba(169,199,255,0)" />
                </radialGradient>
              </defs>
              <ellipse cx="150" cy="188" rx="125" ry="55" fill="url(#halo9)" />
              <line
                x1="30"
                y1="190"
                x2="450"
                y2="190"
                stroke="#2a3954"
                strokeDasharray="4 4"
                style={{ animation: "dashFlow 2.4s linear infinite" }}
              />
              <g transform="translate(150,180) scale(1.15)" stroke="#a9c7ff" strokeWidth="1" opacity="0.85">
                <g style={{ animation: "floatY 9s ease-in-out infinite alternate" }}>
                  <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="rgba(37,71,244,0.28)" />
                  <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
                  <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
                </g>
              </g>
              <circle
                cx="150"
                cy="186"
                r="12"
                fill="none"
                stroke="#a9c7ff"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "nodePing 4.5s ease-out 1.2s infinite both",
                }}
              />
              <text
                x="150"
                y="248"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                27B · ON THE LINE
              </text>
              <g
                transform="translate(330,184) scale(0.8)"
                stroke="#a9c7ff"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.7"
              >
                <g style={{ animation: "floatY 8s ease-in-out 0.8s infinite alternate" }}>
                  <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="#0b1220" />
                  <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#060b16" />
                  <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
                </g>
              </g>
              <text
                x="330"
                y="248"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#eaf1ff"
              >
                9B · NEXT SLOT
              </text>
              <g style={{ animation: "blinkDot 3.2s ease-in-out infinite" }}>
                <rect x="288" y="96" width="84" height="20" fill="#060b16" stroke="#a9c7ff" strokeDasharray="4 3" />
                <text
                  x="330"
                  y="109.5"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="8.5"
                  letterSpacing="1"
                  fill="#a9c7ff"
                >
                  QUEUED
                </text>
              </g>
              <line x1="330" y1="120" x2="330" y2="150" stroke="#2a3954" strokeDasharray="2 4" />
              <path
                d="M 60 80 L 67 87 L 60 94 L 53 87 Z"
                fill="none"
                stroke="#4c74ff"
                opacity="0.7"
                style={{ animation: "floatY 8s ease-in-out infinite alternate" }}
              />
              <path
                d="M 420 60 L 426 66 L 420 72 L 414 66 Z"
                fill="#2547f4"
                opacity="0.5"
                style={{ animation: "floatY 10s ease-in-out 0.6s infinite alternate" }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 30 190 L 450 190')",
                  animation: "pulseTravel 5.5s linear 0.8s infinite",
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
              THE QUEUE · ONE LINE, IN ORDER
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 01 · SPEC ---------- */}
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
              Small,{" "}
              <span data-ch="" style={barStyle("0.25s")}>
                same standards
              </span>
            </h2>
          </div>

          <div data-n9spec="" style={{ borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            <div data-n9cell="" style={{ ...specCellBase, borderRight: "1px dashed rgba(169,199,255,0.12)" }}>
              <span style={labelStyle}>PARAMETERS</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                9B · TRUE COUNT
              </span>
            </div>
            <div data-n9cell="" style={{ ...specCellBase, borderRight: "1px dashed rgba(169,199,255,0.12)" }}>
              <span style={labelStyle}>CONTEXT</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                128K TOKENS
              </span>
            </div>
            <div data-n9cell="" style={specCellBase}>
              <span style={labelStyle}>TOOL FORMAT</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                HERMES-NATIVE
              </span>
            </div>
            <div
              data-n9cell=""
              style={{
                ...specCellBase,
                borderTop: "1px dashed rgba(169,199,255,0.12)",
                borderRight: "1px dashed rgba(169,199,255,0.12)",
              }}
            >
              <span style={labelStyle}>BASE</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                NEPTUNE-1.0 PRETRAIN · DENSE
              </span>
            </div>
            <div
              data-n9cell=""
              style={{
                ...specCellBase,
                borderTop: "1px dashed rgba(169,199,255,0.12)",
                borderRight: "1px dashed rgba(169,199,255,0.12)",
              }}
            >
              <span style={labelStyle}>LICENSE</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                APACHE 2.0 AT RELEASE
              </span>
            </div>
            <div data-n9cell="" style={{ ...specCellBase, borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
              <span style={labelStyle}>STATUS</span>
              <span style={{ font: "400 15px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                QUEUED · AFTER 27B
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------- 02 · WHERE IT FITS ---------- */}
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
              02 · WHERE IT FITS
            </span>
            <h2
              style={{
                font: "600 clamp(22px, 2.4vw, 30px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Built for{" "}
              <span data-ch="" style={barStyle("0.25s")}>
                volume
              </span>
            </h2>
          </div>

          <div data-n9spec="" style={{ borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            <div
              data-n9cell=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "28px clamp(24px, 3.5vw, 48px)",
                borderRight: "1px dashed rgba(169,199,255,0.12)",
              }}
            >
              <span style={{ font: "500 11px 'IBM Plex Mono', monospace", letterSpacing: "0.16em", color: "#eaf1ff" }}>
                EDGE DEPLOYMENTS
              </span>
              <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                Small enough to run close to the work — single-GPU serving without giving up tool
                calling.
              </span>
            </div>
            <div
              data-n9cell=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "28px clamp(24px, 3.5vw, 48px)",
                borderRight: "1px dashed rgba(169,199,255,0.12)",
              }}
            >
              <span style={{ font: "500 11px 'IBM Plex Mono', monospace", letterSpacing: "0.16em", color: "#eaf1ff" }}>
                HIGH-VOLUME LOOPS
              </span>
              <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                The inner loop of agent fleets: cheap, fast steps that only escalate to the 27B when
                needed.
              </span>
            </div>
            <div
              data-n9cell=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "28px clamp(24px, 3.5vw, 48px)",
              }}
            >
              <span style={{ font: "500 11px 'IBM Plex Mono', monospace", letterSpacing: "0.16em", color: "#eaf1ff" }}>
                SAME GATE
              </span>
              <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                The compact line passes the same eval gate as the flagship — smaller never means
                less proven.
              </span>
            </div>
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
            TRAINING BEGINS WHEN THE 27B CLEARS ITS GATE — THE LINE RUNS IN ORDER.
          </div>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
