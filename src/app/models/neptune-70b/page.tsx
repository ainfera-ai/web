import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Neptune 70B Finance",
  description:
    "Neptune-70B-Finance — the first domain line of the 70B base, tuned for filings, reconciliation, risk and compliance, and proof-gated behind an eval certificate.",
};

/* Page-local CSS: keyframes and grids not present in globals.css.
   fadeUp / dashFlow / blinkDot are already global and match this design,
   so they are reused; barIn / floatY / sigBreathe / pulseTravel are local.
   prefers-reduced-motion is covered globally (* { animation: none }). */
const pageCss = `
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes floatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes sigBreathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
[data-reveal] [data-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-ch] { animation-play-state: running; }
[data-n70-hero] { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: center; }
[data-n70-spec3] { display: grid; grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 980px) {
  [data-n70-hero] { grid-template-columns: 1fr; }
  [data-n70-spec3] { grid-template-columns: 1fr; }
  [data-n70-spec-cell] { border-right: none !important; border-bottom: 1px dashed rgba(169,199,255,0.12); }
}
`;

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const cornerBase: React.CSSProperties = {
  position: "absolute",
  top: -7,
  font: "400 12px 'IBM Plex Mono', monospace",
  color: "#2a3954",
  zIndex: 3,
};

/* Decorative masked glyph-field behind the finance diagram. */
const A = { color: "#2e4370", opacity: 1 };
const B = { color: "#223052", opacity: 0.85 };
const G = { color: "rgba(79,206,141,0.34)", opacity: 0.9 };

const ASCII: Array<[{ color: string; opacity: number }, string]> = [
  [A, "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        "],
  [B, "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / "],
  [G, "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ "],
  [A, " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/"],
  [B, "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —[/#   · —  #    [+—[+·     '"],
  [B, "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   "],
  [A, " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # "],
  [G, "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T "],
  [B, "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '"],
  [A, "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '"],
  [B, " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T "],
  [B, "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #"],
  [G, " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   "],
  [B, "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— "],
  [B, "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  "],
  [A, "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  "],
  [B, " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   "],
  [G, "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T [·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   "],
  [A, "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — "],
  [B, "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ "],
  [B, " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   "],
  [A, "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T"],
  [G, " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — ["],
  [B, "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+"],
  [A, " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '"],
  [B, " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ [ 'T·—   ·    — [—  [##T——   ·/ —T/##—   T[  [ '#     /#      // +  // +'+T + —"],
];

export default function Neptune70BPage() {
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
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      <Nav active="models" />

      {/* ---------- HERO ---------- */}
      <div style={{ ...railStyle, position: "relative" }}>
        <span style={{ ...cornerBase, left: -6.5 }}>+</span>
        <span style={{ ...cornerBase, right: -6.5 }}>+</span>

        <div
          data-n70-hero=""
          style={{ padding: "clamp(48px, 7vh, 84px) clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 80px)" }}
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
              · STAGE 02 · DOMAIN LINE 01 · FINANCE
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
                Neptune-70B-
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
                  Finance
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
                PROOF-GATED
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
              The first domain line of the 70B base — tuned for the work finance agents are actually
              given: filings, reconciliation, risk, compliance. It ships with an eval certificate{" "}
              <span style={{ color: "#eaf1ff" }}>scored on finance tasks, not general chat.</span>
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
                {"REGISTER FOR THE FINANCE LINE →"}
              </Link>
              <Link
                className="btn-ghost"
                href="/blog/inside-the-eval-gate"
                style={{
                  font: "400 11.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "15px 24px",
                }}
              >
                {"HOW CERTIFICATES WORK →"}
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
              70B TRUE COUNT · DOMAIN LINE 01 · CERTIFICATE PER RELEASE
            </span>
          </div>

          {/* right column — finance fan-out visual */}
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
              {ASCII.map(([c, line], i) => (
                <div
                  key={i}
                  style={{
                    font: "400 12px/17px 'IBM Plex Mono', monospace",
                    letterSpacing: "5px",
                    whiteSpace: "pre",
                    color: c.color,
                    opacity: c.opacity,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            <svg
              viewBox="0 0 480 320"
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible", position: "relative" }}
              aria-label="The 70B base feeds the finance line: filings, reconciliation, and risk suites, each gate-scored"
            >
              <defs>
                <radialGradient id="halo70" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                  <stop offset="100%" stopColor="rgba(169,199,255,0)" />
                </radialGradient>
              </defs>
              <ellipse cx="112" cy="162" rx="115" ry="52" fill="url(#halo70)" />
              <path
                d="M 148 160 C 220 120 270 96 330 84"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 2.2s linear infinite" }}
              />
              <path
                d="M 148 160 L 324 160"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 2.6s linear infinite" }}
              />
              <path
                d="M 148 160 C 220 200 270 224 330 236"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 3s linear infinite" }}
              />
              <g transform="translate(110,156) scale(1.4)" stroke="#a9c7ff" strokeWidth="1">
                <g style={{ animation: "floatY 9s ease-in-out infinite alternate" }}>
                  <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="rgba(37,71,244,0.28)" />
                  <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
                  <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
                </g>
              </g>
              <text
                x="110"
                y="230"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                70B-FINANCE
              </text>
              <g fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1">
                <g style={{ animation: "fadeUp 0.7s var(--ease) 0.7s both" }}>
                  <rect x="336" y="70" width="96" height="22" fill="#0b1220" stroke="#1b2740" />
                  <text x="384" y="84.5" textAnchor="middle" fill="#98a3bd">
                    FILINGS
                  </text>
                  <g style={{ animation: "sigBreathe 3.4s ease-in-out infinite" }}>
                    <rect x="440" y="70" width="26" height="22" fill="#060b16" stroke="#4fce8d" />
                    <text x="453" y="84.5" textAnchor="middle" fill="#4fce8d">
                      ✓
                    </text>
                  </g>
                </g>
                <g style={{ animation: "fadeUp 0.7s var(--ease) 0.85s both" }}>
                  <rect x="336" y="149" width="96" height="22" fill="#0b1220" stroke="#1b2740" />
                  <text x="384" y="163.5" textAnchor="middle" fill="#98a3bd">
                    RECONCILE
                  </text>
                  <g style={{ animation: "sigBreathe 3.4s ease-in-out 0.8s infinite" }}>
                    <rect x="440" y="149" width="26" height="22" fill="#060b16" stroke="#4fce8d" />
                    <text x="453" y="163.5" textAnchor="middle" fill="#4fce8d">
                      ✓
                    </text>
                  </g>
                </g>
                <g style={{ animation: "fadeUp 0.7s var(--ease) 1s both" }}>
                  <rect x="336" y="226" width="96" height="22" fill="#0b1220" stroke="#1b2740" />
                  <text x="384" y="240.5" textAnchor="middle" fill="#98a3bd">
                    RISK
                  </text>
                  <g style={{ animation: "sigBreathe 3.4s ease-in-out 1.6s infinite" }}>
                    <rect x="440" y="226" width="26" height="22" fill="#060b16" stroke="#4fce8d" />
                    <text x="453" y="240.5" textAnchor="middle" fill="#4fce8d">
                      ✓
                    </text>
                  </g>
                </g>
              </g>
              <path
                d="M 60 60 L 67 67 L 60 74 L 53 67 Z"
                fill="none"
                stroke="#4c74ff"
                opacity="0.7"
                style={{ animation: "floatY 8s ease-in-out infinite alternate" }}
              />
              <path
                d="M 240 280 L 246 286 L 240 292 L 234 286 Z"
                fill="#2547f4"
                opacity="0.5"
                style={{ animation: "floatY 10s ease-in-out 0.6s infinite alternate" }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 148 160 C 220 120 270 96 330 84')",
                  animation: "pulseTravel 4.4s linear 0.6s infinite",
                }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 148 160 L 324 160')",
                  animation: "pulseTravel 4.4s linear 2s infinite",
                }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 148 160 C 220 200 270 224 330 236')",
                  animation: "pulseTravel 4.4s linear 3.4s infinite",
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
              FINANCE SUITES · GATE-SCORED
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 01 · FINANCE SUITES ---------- */}
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
              01 · FINANCE SUITES
            </span>
            <h2
              style={{
                font: "600 clamp(22px, 2.4vw, 30px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              What the{" "}
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
                gate scores
              </span>
            </h2>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
              }}
            >
              SUITES VERSIONED, SIGNED, AND CITED BY THE CERTIFICATE.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              padding: "24px clamp(24px, 3.5vw, 48px) clamp(44px, 6vh, 64px)",
              borderTop: "1px dashed rgba(169,199,255,0.12)",
            }}
          >
            {[
              { t: "SEC FILINGS", on: true },
              { t: "RECONCILIATION", on: true },
              { t: "KYC / AML", on: false },
              { t: "RISK MEMOS", on: false },
              { t: "MARKET OPS", on: false },
              { t: "AUDIT SUPPORT", on: false },
            ].map((s) => (
              <span
                key={s.t}
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: s.on ? "#eaf1ff" : "#98a3bd",
                  border: s.on
                    ? "1px dashed rgba(169,199,255,0.4)"
                    : "1px dashed rgba(169,199,255,0.2)",
                  padding: "10px 16px",
                }}
              >
                {s.t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------- 02 · THE CERTIFICATE ---------- */}
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
              02 · THE CERTIFICATE
            </span>
            <h2
              style={{
                font: "600 clamp(22px, 2.4vw, 30px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Proof travels{" "}
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
                with the model
              </span>
            </h2>
          </div>
          <div data-n70-spec3="" style={{ borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            {[
              {
                k: "FINANCE SUITES",
                v: "Evals written for finance's actual tasks — filings, reconciliation, risk and compliance work — not proxy benchmarks.",
                border: true,
              },
              {
                k: "SIGNED EVENT #",
                v: "Every certificate cites the audit-log entry it was rendered from, so a buyer can check the claim.",
                border: true,
              },
              {
                k: "NO DATES",
                v: "The finance line promotes when its suites clear the gate — that is the whole claim.",
                border: false,
              },
            ].map((cell) => (
              <div
                key={cell.k}
                data-n70-spec-cell=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "28px clamp(24px, 3.5vw, 48px)",
                  borderRight: cell.border ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                }}
              >
                <span
                  style={{
                    font: "500 11px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.16em",
                    color: "#eaf1ff",
                  }}
                >
                  {cell.k}
                </span>
                <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                  {cell.v}
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
            LICENSE AND SERVING TERMS FOR THE FINANCE LINE PUBLISH AT RELEASE.
          </div>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
