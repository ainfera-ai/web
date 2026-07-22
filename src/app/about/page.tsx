import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "About Ainfera",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

/* Page-local keyframes (not in globals.css) — namespaced ab* to avoid collisions.
   Global `dashFlow` is reused as-is (exact name+def match). Global reduced-motion
   `* { animation: none }` already covers these. */
const pageCss = `
@keyframes abBarIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes abFloatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes abSigBreathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes abPulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
`;

/* Decorative masked ASCII backdrop behind the datacenter diagram (aria-hidden). */
const asciiLines: { c: string; o: number; t: string }[] = [
  { c: "#2e4370", o: 1, t: `—   [+ /[     /T+   '' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        ` },
  { c: "#223052", o: 0.85, t: `—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / ` },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: `[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ ` },
  { c: "#2e4370", o: 1, t: ` / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/` },
  { c: "#223052", o: 0.85, t: `  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' ''#' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '` },
  { c: "#223052", o: 0.85, t: `  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   ` },
  { c: "#2e4370", o: 1, t: ` +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # ` },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: `+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T ` },
  { c: "#223052", o: 0.85, t: `T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '` },
  { c: "#2e4370", o: 1, t: `     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '` },
  { c: "#223052", o: 0.85, t: ` '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T ` },
  { c: "#223052", o: 0.85, t: `   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #` },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: ` 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   ` },
  { c: "#223052", o: 0.85, t: `  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— ` },
  { c: "#223052", o: 0.85, t: `T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  ` },
  { c: "#2e4370", o: 1, t: `# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  ` },
  { c: "#223052", o: 0.85, t: ` '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   ` },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: `/   [   '[#  ·  [   '+  [ — [+   #  +    +    T [·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   ` },
  { c: "#2e4370", o: 1, t: `/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — ` },
  { c: "#223052", o: 0.85, t: `    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ ` },
  { c: "#223052", o: 0.85, t: ` +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   ` },
  { c: "#2e4370", o: 1, t: `     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T` },
  { c: "rgba(79,206,141,0.34)", o: 0.9, t: ` +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [` },
  { c: "#223052", o: 0.85, t: `[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+` },
  { c: "#2e4370", o: 1, t: ` ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '` },
  { c: "#223052", o: 0.85, t: ` '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  [' #     /#      // +  // +'+T + —` },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <Nav active="factory" />

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
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 28,
            flexWrap: "wrap",
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 3.5vw, 48px) clamp(40px, 6vh, 64px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.22em",
                color: "#5a6478",
              }}
            >
              ABOUT
            </span>
            <h1
              style={{
                font: "600 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
                letterSpacing: "-0.03em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Competence,
              <br />
              <span
                style={{
                  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  backgroundSize: "100% 100%",
                  color: "#060b16",
                  padding: "0 0.24em 0.1em 0.19em",
                  animation: "abBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
                }}
              >
                demonstrated.
              </span>
            </h1>
          </div>

          <div style={{ position: "relative", flex: "none" }}>
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
              {asciiLines.map((l, i) => (
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
              width="340"
              height="150"
              viewBox="0 0 340 150"
              style={{ display: "block", overflow: "visible", position: "relative" }}
              aria-label="The factory datacenter: isometric server racks running the training line, every rack gate-logged"
            >
              <ellipse
                cx="160"
                cy="118"
                rx="132"
                ry="18"
                fill="none"
                stroke="#2a3954"
                strokeDasharray="2 6"
                style={{ animation: "dashFlow 4.5s linear infinite" }}
              />
              <path
                d="M 104 16 C 150 4 200 6 236 16"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
                style={{ animation: "dashFlow 2.4s linear infinite" }}
              />
              <g stroke="#a9c7ff" strokeWidth="1">
                <path d="M 104 22 L 132 36 L 104 50 L 76 36 Z" fill="#141c2e" />
                <path d="M 76 36 L 76 104 L 104 118 L 104 50 Z" fill="#0b1220" />
                <path d="M 104 50 L 104 118 L 132 104 L 132 36 Z" fill="#060b16" />
                <g stroke="#1b2740" strokeWidth="1">
                  <path d="M 76 50 L 104 64" />
                  <path d="M 76 64 L 104 78" />
                  <path d="M 76 78 L 104 92" />
                  <path d="M 76 92 L 104 106" />
                </g>
                <g stroke="none">
                  <circle
                    cx="112"
                    cy="62"
                    r="1.8"
                    fill="#a9c7ff"
                    style={{ animation: "abSigBreathe 2.2s ease-in-out infinite" }}
                  />
                  <circle
                    cx="112"
                    cy="76"
                    r="1.8"
                    fill="#a9c7ff"
                    style={{ animation: "abSigBreathe 3.1s ease-in-out 0.6s infinite" }}
                  />
                  <circle
                    cx="112"
                    cy="90"
                    r="1.8"
                    fill="#4fce8d"
                    style={{ animation: "abSigBreathe 2.7s ease-in-out 1.1s infinite" }}
                  />
                  <circle cx="112" cy="104" r="1.8" fill="#2a3954" />
                </g>
              </g>
              <g stroke="#a9c7ff" strokeWidth="0.9" opacity="0.55">
                <path d="M 210 38 L 236 51 L 210 64 L 184 51 Z" fill="#141c2e" />
                <path d="M 184 51 L 184 105 L 210 118 L 210 64 Z" fill="#0b1220" />
                <path d="M 210 64 L 210 118 L 236 105 L 236 51 Z" fill="#060b16" />
                <g stroke="#1b2740" strokeWidth="1">
                  <path d="M 184 64 L 210 77" />
                  <path d="M 184 77 L 210 90" />
                  <path d="M 184 90 L 210 103" />
                </g>
                <g stroke="none">
                  <circle
                    cx="217"
                    cy="74"
                    r="1.7"
                    fill="#a9c7ff"
                    style={{ animation: "abSigBreathe 2.9s ease-in-out 0.4s infinite" }}
                  />
                  <circle cx="217" cy="88" r="1.7" fill="#2a3954" />
                  <circle cx="217" cy="102" r="1.7" fill="#2a3954" />
                </g>
              </g>
              <g style={{ animation: "abSigBreathe 3.4s ease-in-out infinite" }}>
                <rect x="252" y="6" width="82" height="20" fill="#060b16" stroke="#4fce8d" />
                <text
                  x="293"
                  y="19.5"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="8.5"
                  letterSpacing="1"
                  fill="#4fce8d"
                >
                  ✓ GATE-LOGGED
                </text>
              </g>
              <text
                x="160"
                y="146"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8.5"
                letterSpacing="1.5"
                fill="#5a6478"
              >
                FACTORY DATACENTER — THE LINE RUNS HERE
              </text>
              <path
                d="M 30 24 L 36 30 L 30 36 L 24 30 Z"
                fill="none"
                stroke="#4c74ff"
                opacity="0.7"
                style={{ animation: "abFloatY 8s ease-in-out infinite alternate" }}
              />
              <path
                d="M 296 82 L 301 87 L 296 92 L 291 87 Z"
                fill="#2547f4"
                opacity="0.5"
                style={{ animation: "abFloatY 9s ease-in-out 1.2s infinite alternate" }}
              />
              <circle
                r="2.5"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 104 16 C 150 4 200 6 236 16')",
                  animation: "abPulseTravel 4.6s linear 0.8s infinite",
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <Reveal
            data-about-grid=""
            dist={16}
            style={{ padding: "clamp(44px, 6vh, 72px) clamp(24px, 3.5vw, 48px)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: "58ch" }}>
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.22em",
                  color: "#5a6478",
                }}
              >
                01 · MISSION
              </span>
              <p style={{ font: "400 16px/1.85 'Poppins', sans-serif", color: "#b6c0d6", margin: 0 }}>
                Agents are becoming the main consumers of models, and agents cannot read marketing.
                They need models whose competence is demonstrated — evaluated on the work
                they&apos;ll actually be given, with the results recorded somewhere a buyer can
                check.
              </p>
              <p style={{ font: "400 16px/1.85 'Poppins', sans-serif", color: "#b6c0d6", margin: 0 }}>
                Ainfera builds the Neptune model family and the factory that trains it. Every
                release is gated by evals, every gate decision lands in a signed audit log with an
                event #, and every model carries its true parameter count in its name. If we
                can&apos;t prove it, we don&apos;t ship it.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="team-card" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <span
                  style={{
                    font: "400 9.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.2em",
                    color: "#5a6478",
                    padding: "16px 22px",
                    borderBottom: "1px dashed rgba(169,199,255,0.15)",
                  }}
                >
                  02 · TEAM
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "24px 22px" }}>
                  <span
                    style={{
                      font: "500 17px 'Poppins', sans-serif",
                      letterSpacing: "-0.01em",
                      color: "#eaf1ff",
                    }}
                  >
                    Hizrian &quot;Izzy&quot; Raz
                  </span>
                  <span
                    style={{
                      font: "400 10.5px 'IBM Plex Mono', monospace",
                      letterSpacing: "0.16em",
                      color: "#a9c7ff",
                    }}
                  >
                    FOUNDER &amp; CEO
                  </span>
                  <span
                    style={{
                      font: "400 13px/1.65 'Poppins', sans-serif",
                      color: "#98a3bd",
                      marginTop: 8,
                    }}
                  >
                    Runs the factory. Writes the gate suites. Answers the contact form.
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  font: "400 10.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  color: "#5a6478",
                }}
              >
                <span style={{ color: "#5a6478" }}>03 · COMPANY</span>
                <span style={{ color: "#98a3bd" }}>AINFERA INC. · DELAWARE · REMOTE-FIRST</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
