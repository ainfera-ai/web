import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "Inside the eval gate: how a checkpoint earns promotion",
  description:
    "The gate is the only stage of the Neptune factory that produces no weights. It produces decisions — and the signed record that makes them checkable.",
};

const bodyPara: React.CSSProperties = {
  font: "400 15.5px/1.85 'Poppins', sans-serif",
  color: "#b6c0d6",
  margin: 0,
};

/* Page-local keyframes not present in globals.css (dashFlow is global and reused).
   prefers-reduced-motion is handled globally via `* { animation: none !important }`. */
const artKeyframes = `
@keyframes artBarIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes artFloatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes artSigBreathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes artNodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes artPulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
`;

// Decorative aria-hidden noise field behind the eval-gate diagram.
type NoiseLine = { c: string; o: number; t: string };
const A = "#2e4370";
const B = "#223052";
const C = "rgba(79,206,141,0.34)";
const NOISE: NoiseLine[] = [
  { c: A, o: 1, t: "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        " },
  { c: B, o: 0.85, t: "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / " },
  { c: C, o: 0.9, t: "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ " },
  { c: A, o: 1, t: " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/" },
  { c: B, o: 0.85, t: "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '" },
  { c: B, o: 0.85, t: "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   " },
  { c: A, o: 1, t: " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # " },
  { c: C, o: 0.9, t: "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T " },
  { c: B, o: 0.85, t: "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '" },
  { c: A, o: 1, t: "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '" },
  { c: B, o: 0.85, t: " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T " },
  { c: B, o: 0.85, t: "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #" },
  { c: C, o: 0.9, t: " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   " },
  { c: B, o: 0.85, t: "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— " },
  { c: B, o: 0.85, t: "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  " },
  { c: A, o: 1, t: "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  " },
  { c: B, o: 0.85, t: " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   " },
  { c: C, o: 0.9, t: "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   " },
  { c: A, o: 1, t: "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — " },
  { c: B, o: 0.85, t: "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ " },
  { c: B, o: 0.85, t: " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   " },
  { c: A, o: 1, t: "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T" },
  { c: C, o: 0.9, t: " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [" },
  { c: B, o: 0.85, t: "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+" },
  { c: A, o: 1, t: " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '" },
  { c: B, o: 0.85, t: " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —" },
];

export default function ArticlePage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: artKeyframes }} />
      <ProgressBar />
      <Nav active="research" />

      <div
        style={{
          margin: "0 clamp(20px, 7.6vw, 110px)",
          borderLeft: "1px dashed rgba(169,199,255,0.12)",
          borderRight: "1px dashed rgba(169,199,255,0.12)",
          position: "relative",
        }}
      >
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

        <article
          style={{
            maxWidth: "68ch",
            margin: "0 auto",
            padding: "clamp(48px, 7vh, 80px) 24px clamp(56px, 8vh, 96px)",
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.18em",
              color: "#5a6478",
            }}
          >
            <Link href="/blog" style={{ color: "#a9c7ff" }}>
              BLOG
            </Link>
            <span>·</span>
            <span>NOTE 003</span>
            <span>·</span>
            <span>EVALUATION</span>
            <span>·</span>
            <span>9 MIN</span>
          </div>
          <h1
            style={{
              font: "600 clamp(30px, 3.6vw, 46px)/1.25 'Poppins', sans-serif",
              letterSpacing: "-0.025em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Inside the eval gate: how a checkpoint{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 100%",
                color: "#060b16",
                padding: "0 0.24em 0.1em 0.19em",
                animation: "artBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            >
              earns promotion
            </span>
          </h1>
          <p style={{ font: "400 17px/1.75 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}>
            The gate is the only stage of the Neptune factory that produces no weights. It produces
            decisions — and the signed record that makes them checkable.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 0",
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              borderBottom: "1px dashed rgba(169,199,255,0.25)",
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              color: "#5a6478",
            }}
          >
            <img src="/brand/ainfera-mark-ice.svg" alt="" style={{ width: 16, height: 16 }} />
            <span>AINFERA RESEARCH</span>
            <span>·</span>
            <span>SIGNED AUDIT LOG · EVENT #000212</span>
          </div>

          <p style={bodyPara}>
            Every stage of the line — SFT, DPO, GRPO, MTP, QUANT — ends the same way: a candidate
            checkpoint arrives at the gate. The gate runs the eval suites registered for that
            stage, writes the scores, and makes exactly one of two calls. Pass, and the checkpoint
            promotes to the next stage. Fail, and the run stops where it stands.
            <sup>
              <a href="#fn1">1</a>
            </sup>
          </p>
          <p style={bodyPara}>
            The important property is that nothing else can make that call. There is no override
            flag, no &quot;promote anyway&quot; path in the orchestrator. A stage that wants to run
            can only consume checkpoints the gate has passed, the same way a build system can only
            link objects that compiled.
          </p>

          <div style={{ position: "relative" }}>
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
              {NOISE.map((n, i) => (
                <div
                  key={i}
                  style={{
                    font: "400 12px/17px 'IBM Plex Mono', monospace",
                    letterSpacing: "5px",
                    whiteSpace: "pre",
                    color: n.c,
                    opacity: n.o,
                  }}
                >
                  {n.t}
                </div>
              ))}
            </div>
            <svg
              viewBox="0 0 620 176"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                overflow: "visible",
                position: "relative",
              }}
              aria-label="Diagram: a checkpoint reaches the eval gate; promote continues to a signed entry, stop ends the run"
            >
              <path
                d="M 118 78 L 288 78"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 2.2s linear infinite" }}
              />
              <path
                d="M 312 78 L 452 78"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 2.2s linear infinite" }}
              />
              <path
                d="M 306 92 C 340 136 380 146 420 146"
                fill="none"
                stroke="#2a3954"
                strokeDasharray="3 6"
                opacity="0.8"
                style={{ animation: "dashFlow 3.4s linear infinite" }}
              />
              <g transform="translate(84,78) scale(0.8)" stroke="#a9c7ff" strokeWidth="1" opacity="0.85">
                <g style={{ animation: "artFloatY 8s ease-in-out infinite alternate" }}>
                  <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="#141c2e" />
                  <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
                  <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
                </g>
              </g>
              <text
                x="84"
                y="130"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                CHECKPOINT
              </text>
              <g>
                <line
                  x1="294"
                  y1="34"
                  x2="294"
                  y2="122"
                  stroke="#a9c7ff"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.9"
                  style={{ animation: "dashFlow 2.8s linear infinite" }}
                />
                <line
                  x1="306"
                  y1="28"
                  x2="306"
                  y2="116"
                  stroke="#a9c7ff"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.5"
                  style={{ animation: "dashFlow 3.6s linear infinite" }}
                />
                <rect x="252" y="2" width="96" height="22" fill="#060b16" stroke="#a9c7ff" />
                <text
                  x="300"
                  y="17"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="9.5"
                  letterSpacing="1.5"
                  fill="#a9c7ff"
                >
                  EVAL GATE
                </text>
                <circle
                  cx="300"
                  cy="78"
                  r="10"
                  fill="none"
                  stroke="#a9c7ff"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "artNodePing 4.5s ease-out 1.4s infinite both",
                  }}
                />
              </g>
              <g style={{ animation: "artSigBreathe 3.4s ease-in-out infinite" }}>
                <rect x="460" y="64" width="128" height="28" fill="#060b16" stroke="#4fce8d" />
                <text
                  x="524"
                  y="82"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="9"
                  letterSpacing="1"
                  fill="#4fce8d"
                >
                  PROMOTE · SIGNED
                </text>
              </g>
              <text
                x="497"
                y="150"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8.5"
                letterSpacing="1"
                fill="#5a6478"
              >
                STOP · RETAINED FOR DIAGNOSIS
              </text>
              <path
                d="M 190 26 L 196 32 L 190 38 L 184 32 Z"
                fill="none"
                stroke="#4c74ff"
                opacity="0.7"
                style={{ animation: "artFloatY 8s ease-in-out infinite alternate" }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 118 78 L 288 78')",
                  animation: "artPulseTravel 4s linear 0.6s infinite",
                }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 312 78 L 452 78')",
                  animation: "artPulseTravel 4s linear 2.6s infinite",
                }}
              />
            </svg>
          </div>

          <div
            style={{
              border: "1px dashed rgba(169,199,255,0.25)",
              padding: "20px 24px",
              font: "400 12px/2 'IBM Plex Mono', monospace",
              color: "#98a3bd",
              overflowX: "auto",
            }}
          >
            <span style={{ color: "#5a6478" }}>{"// gate contract, abridged"}</span>
            <br />
            checkpoint&nbsp;→&nbsp;run(suites[stage])&nbsp;→&nbsp;scores
            <br />
            scores&nbsp;→&nbsp;sign()&nbsp;→&nbsp;
            <span style={{ color: "#a9c7ff" }}>audit_log.append(event#)</span>
            <br />
            verdict&nbsp;∈&nbsp;{"{ PROMOTE, STOP }"}&nbsp;·&nbsp;no third value
          </div>
          <p style={bodyPara}>
            Each verdict is appended to a signed audit log with an event #. The entry records the
            checkpoint hash, the suite versions, the scores, and the verdict. Eval certificates —
            the documents that ship with Neptune models — are rendered from these entries, which is
            why a certificate always cites its event #.
            <sup>
              <a href="#fn2">2</a>
            </sup>
          </p>
          <p style={bodyPara}>
            This is also why we publish no roadmap dates. A date is a promise about the future; the
            gate only issues records about the past. When a model is listed as proof-gated, that is
            the whole claim: it ships when its evals clear, and you will be able to read the entry
            that says so.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 14,
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              paddingTop: 22,
            }}
          >
            <span
              style={{
                font: "400 9.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.2em",
                color: "#5a6478",
              }}
            >
              FOOTNOTES
            </span>
            <p
              id="fn1"
              style={{ font: "400 12.5px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                1&nbsp;
              </span>{" "}
              &quot;Stops&quot; means stops: the artifact is retained for diagnosis, but nothing
              downstream may reference it.
            </p>
            <p
              id="fn2"
              style={{ font: "400 12.5px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                2&nbsp;
              </span>{" "}
              Certificates are rendered from these entries and published with each release on
              Hugging Face.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              paddingTop: 22,
              font: "400 10.5px 'IBM Plex Mono', monospace",
              letterSpacing: "0.12em",
            }}
          >
            <Link href="/blog" style={{ color: "#a9c7ff" }}>
              ←&nbsp;ALL POSTS
            </Link>
            <Link href="/docs" style={{ color: "#a9c7ff" }}>
              DOCS&nbsp;→
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
