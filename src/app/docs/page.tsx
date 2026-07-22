import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Docs",
  description: "Neptune docs — quickstart and tool calling",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const codeBlock: React.CSSProperties = {
  border: "1px dashed rgba(169,199,255,0.25)",
  padding: "20px 24px",
  font: "400 12px/1.9 'IBM Plex Mono', monospace",
  color: "#98a3bd",
  overflowX: "auto",
};

const h2Style: React.CSSProperties = {
  font: "600 20px 'Poppins', sans-serif",
  letterSpacing: "-0.015em",
  color: "#eaf1ff",
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  font: "400 14px/1.7 'Poppins', sans-serif",
  color: "#98a3bd",
  margin: 0,
  maxWidth: "60ch",
};

const monoInline: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 12.5,
};

const barBase: React.CSSProperties = {
  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "100% 100%",
  color: "#060b16",
  padding: "0 0.24em 0.1em 0.19em",
};

// Ambient "data rain" backdrop behind the request-flow diagram.
const rain: { c: string; o: number; t: string }[] = [
  { c: "#2e4370", o: 1, t: "—   [+ /[     /T+   '' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        " },
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

const pageStyle = `
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes floatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes nodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
[data-reveal] [data-dc-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-dc-ch] { animation-play-state: running; }
@media (prefers-reduced-motion: reduce) {
  [data-dc-docs] * { animation: none !important; }
  [data-dc-docs] [data-dc-ch] { background-size: 100% 100% !important; color: #060b16 !important; }
}
`;

export default function DocsPage() {
  return (
    <div data-dc-docs="" style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: pageStyle }} />
      <Nav active="none" />

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
            flexDirection: "column",
            gap: 18,
            padding: "clamp(48px, 7vh, 80px) clamp(24px, 3.5vw, 48px) clamp(32px, 5vh, 48px)",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.22em",
              color: "#5a6478",
            }}
          >
            DOCS
          </span>
          <h1
            style={{
              font: "600 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.03em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Run{" "}
            <span
              style={{
                ...barBase,
                animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            >
              Neptune.
            </span>
          </h1>
          <p
            style={{
              font: "400 15px/1.7 'Poppins', sans-serif",
              color: "#98a3bd",
              margin: 0,
              maxWidth: 520,
            }}
          >
            Neptune-1.0-27B-Agent is a standard open-weights release — pull it from Hugging Face
            and serve it with the stack you already run.
          </p>

          <div style={{ position: "relative", width: "min(760px, 100%)", marginTop: 10 }}>
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
              {rain.map((r, i) => (
                <div
                  key={i}
                  style={{
                    font: "400 12px/17px 'IBM Plex Mono', monospace",
                    letterSpacing: "5px",
                    whiteSpace: "pre",
                    color: r.c,
                    opacity: r.o,
                  }}
                >
                  {r.t}
                </div>
              ))}
            </div>

            <svg
              viewBox="0 0 760 150"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                overflow: "visible",
                position: "relative",
              }}
              aria-label="Your agent calls Neptune and receives a Hermes-native tool call"
            >
              <defs>
                <radialGradient id="haloDocs" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(169,199,255,0.22)" />
                  <stop offset="100%" stopColor="rgba(169,199,255,0)" />
                </radialGradient>
              </defs>
              <ellipse cx="380" cy="76" rx="115" ry="48" fill="url(#haloDocs)" />
              <path
                d="M 130 74 L 326 74"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 2.2s linear infinite" }}
              />
              <path
                d="M 434 74 L 584 74"
                fill="none"
                stroke="#4c74ff"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
                style={{ animation: "dashFlow 2.2s linear infinite" }}
              />
              <g transform="translate(94,74) scale(0.85)" stroke="#a9c7ff" strokeWidth="1" opacity="0.85">
                <g style={{ animation: "floatY 8s ease-in-out infinite alternate" }}>
                  <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="#141c2e" />
                  <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
                  <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
                </g>
              </g>
              <text
                x="94"
                y="130"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                YOUR AGENT
              </text>
              <g>
                <ellipse cx="380" cy="86" rx="46" ry="14" fill="#060b16" stroke="#1b2740" />
                <ellipse
                  cx="380"
                  cy="74"
                  rx="46"
                  ry="14"
                  fill="rgba(37,71,244,0.16)"
                  stroke="#4c74ff"
                  opacity="0.85"
                />
                <ellipse cx="380" cy="62" rx="46" ry="14" fill="#0b1220" stroke="#a9c7ff" strokeWidth="1.5" />
                <circle
                  cx="380"
                  cy="62"
                  r="10"
                  fill="none"
                  stroke="#a9c7ff"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "nodePing 4.5s ease-out 1.4s infinite both",
                  }}
                />
              </g>
              <text
                x="380"
                y="130"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                NEPTUNE-27B
              </text>
              <rect x="592" y="60" width="120" height="28" fill="#060b16" stroke="#a9c7ff" />
              <text
                x="652"
                y="78"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9.5"
                letterSpacing="1"
                fill="#a9c7ff"
              >
                {"<tool_call>"}
              </text>
              <text
                x="652"
                y="130"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="9"
                letterSpacing="1.5"
                fill="#98a3bd"
              >
                HERMES JSON
              </text>
              <path
                d="M 250 26 L 256 32 L 250 38 L 244 32 Z"
                fill="none"
                stroke="#4c74ff"
                opacity="0.7"
                style={{ animation: "floatY 8s ease-in-out infinite alternate" }}
              />
              <path
                d="M 520 30 L 525 35 L 520 40 L 515 35 Z"
                fill="#2547f4"
                opacity="0.5"
                style={{ animation: "floatY 9s ease-in-out 1s infinite alternate" }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 130 74 L 326 74')",
                  animation: "pulseTravel 3.8s linear 0.6s infinite",
                }}
              />
              <circle
                r="3"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 434 74 L 584 74')",
                  animation: "pulseTravel 3.8s linear 2.4s infinite",
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div data-docs-grid="" style={{ padding: "clamp(40px, 6vh, 64px) clamp(24px, 3.5vw, 48px)" }}>
            <div
              data-docs-toc=""
              style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 130 }}
            >
              <a
                href="#quickstart"
                style={{
                  font: "400 10.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: "#a9c7ff",
                }}
              >
                01 · QUICKSTART
              </a>
              <a
                className="lnk-toc"
                href="#tool-calling"
                style={{ font: "400 10.5px 'IBM Plex Mono', monospace", letterSpacing: "0.16em" }}
              >
                02 · TOOL CALLING
              </a>
              <a
                className="lnk-toc"
                href="#resources"
                style={{ font: "400 10.5px 'IBM Plex Mono', monospace", letterSpacing: "0.16em" }}
              >
                03 · RESOURCES
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 44, minWidth: 0 }}>
              <div
                id="quickstart"
                style={{ display: "flex", flexDirection: "column", gap: 16, scrollMarginTop: 130 }}
              >
                <h2 style={h2Style}>
                  <span
                    style={{
                      ...barBase,
                      animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both",
                    }}
                  >
                    Quickstart
                  </span>
                </h2>
                <p style={bodyStyle}>
                  Weights are on Hugging Face under Apache 2.0. Any OpenAI-compatible server that
                  loads safetensors will serve it; below is the plain{" "}
                  <span style={monoInline}>transformers</span> path.
                </p>
                <div style={codeBlock}>
                  <span style={{ color: "#5a6478" }}># pull and load</span>
                  <br />
                  pip install transformers accelerate
                  <br />
                  <br />
                  from transformers import AutoModelForCausalLM, AutoTokenizer
                  <br />
                  m&nbsp;=&nbsp;AutoModelForCausalLM.from_pretrained(
                  <span style={{ color: "#a9c7ff" }}>&quot;ainfera/neptune-1.0-27b-agent&quot;</span>)
                  <br />
                  t&nbsp;=&nbsp;AutoTokenizer.from_pretrained(
                  <span style={{ color: "#a9c7ff" }}>&quot;ainfera/neptune-1.0-27b-agent&quot;</span>)
                  <span
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 13,
                      background: "#a9c7ff",
                      marginLeft: 3,
                      verticalAlign: -2,
                      animation: "cursorBlink 1.1s steps(1) infinite",
                    }}
                  />
                </div>
              </div>

              <Reveal
                id="tool-calling"
                dist={16}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  borderTop: "1px dashed rgba(169,199,255,0.12)",
                  paddingTop: 36,
                  scrollMarginTop: 130,
                }}
              >
                <h2 style={h2Style}>
                  Tool{" "}
                  <span
                    data-dc-ch=""
                    style={{
                      ...barBase,
                      animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
                    }}
                  >
                    calling
                  </span>
                </h2>
                <p style={bodyStyle}>
                  Neptune emits Hermes-native tool calls — structured JSON in{" "}
                  <span style={monoInline}>{"<tool_call>"}</span> tags, no wrapper prompts. Declare
                  tools in the system message; parse what comes back.
                </p>
                <div style={codeBlock}>
                  <span style={{ color: "#5a6478" }}># model output</span>
                  <br />
                  {"<tool_call>"}
                  <br />
                  {'{"name": '}
                  <span style={{ color: "#a9c7ff" }}>&quot;lookup_invoice&quot;</span>
                  {', "arguments": {"id": '}
                  <span style={{ color: "#a9c7ff" }}>&quot;INV-2209&quot;</span>
                  {"}}"}
                  <br />
                  {"</tool_call>"}
                </div>
              </Reveal>

              <Reveal
                id="resources"
                dist={16}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  borderTop: "1px dashed rgba(169,199,255,0.12)",
                  paddingTop: 36,
                  scrollMarginTop: 130,
                }}
              >
                <h2 style={h2Style}>
                  <span
                    data-dc-ch=""
                    style={{
                      ...barBase,
                      animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
                    }}
                  >
                    Resources
                  </span>
                </h2>
                <a
                  href="https://huggingface.co/ainfera"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 12px 'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
                >
                  MODEL CARD &amp; WEIGHTS&nbsp;↗
                </a>
                <a
                  href="https://huggingface.co/ainfera"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 12px 'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
                >
                  EVAL REPORT&nbsp;↗
                </a>
                <Link
                  href="/blog/inside-the-eval-gate"
                  style={{ font: "400 12px 'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
                >
                  HOW THE GATE WORKS&nbsp;→
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
