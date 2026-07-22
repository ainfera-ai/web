import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ainfera blog — notes and the log",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

/* Page-local keyframes (not in globals.css). Namespaced bl* to avoid collision.
   dashFlow + blinkDot are reused from globals (exact name+def match). */
const BL_KEYFRAMES = `
@keyframes blBarIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes blFloatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes blPulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
`;

/* Decorative masked ASCII backdrop behind the hero diagram (aria-hidden). */
const RAIN_A = "#2e4370";
const RAIN_B = "#223052";
const RAIN_C = "rgba(79,206,141,0.34)";
const RAIN: { c: string; o: number; t: string }[] = [
  { c: RAIN_A, o: 1, t: "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        " },
  { c: RAIN_B, o: 0.85, t: "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / " },
  { c: RAIN_C, o: 0.9, t: "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ " },
  { c: RAIN_A, o: 1, t: " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/" },
  { c: RAIN_B, o: 0.85, t: "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '" },
  { c: RAIN_B, o: 0.85, t: "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   " },
  { c: RAIN_A, o: 1, t: " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # " },
  { c: RAIN_C, o: 0.9, t: "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T " },
  { c: RAIN_B, o: 0.85, t: "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '" },
  { c: RAIN_A, o: 1, t: "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '" },
  { c: RAIN_B, o: 0.85, t: " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T " },
  { c: RAIN_B, o: 0.85, t: "   /+/  T    [' '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #" },
  { c: RAIN_C, o: 0.9, t: " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   " },
  { c: RAIN_B, o: 0.85, t: "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— " },
  { c: RAIN_B, o: 0.85, t: "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  " },
  { c: RAIN_A, o: 1, t: "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  " },
  { c: RAIN_B, o: 0.85, t: " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   " },
  { c: RAIN_C, o: 0.9, t: "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   " },
  { c: RAIN_A, o: 1, t: "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — " },
  { c: RAIN_B, o: 0.85, t: "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ " },
  { c: RAIN_B, o: 0.85, t: " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   " },
  { c: RAIN_A, o: 1, t: "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T" },
  { c: RAIN_C, o: 0.9, t: " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [" },
  { c: RAIN_B, o: 0.85, t: "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+" },
  { c: RAIN_A, o: 1, t: " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '" },
  { c: RAIN_B, o: 0.85, t: " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ [' T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —" },
];

const POSTS = [
  {
    eyebrow: "LOG 012 · RELEASE",
    eyebrowColor: "#a9c7ff",
    title: "Neptune-1.0-27B-Agent is live on Hugging Face",
    excerpt:
      "The flagship is out: open weights, Apache 2.0, Hermes-native tool calling, and its eval certificate published alongside.",
  },
  {
    eyebrow: "NOTE 003 · EVALUATION",
    eyebrowColor: "#5a6478",
    title: "Inside the eval gate: how a checkpoint earns promotion",
    excerpt:
      "The gate is a pipeline dependency, not a dashboard. What runs, what gets signed to the audit log, and why a failed gate stops the line.",
  },
  {
    eyebrow: "NOTE 002 · TRAINING",
    eyebrowColor: "#5a6478",
    title: "GRPO over full agent episodes, not single turns",
    excerpt:
      "Reinforcement on whole tool-use trajectories — grouped rollouts, recovery behavior, and what changes when the reward sees the entire episode.",
  },
  {
    eyebrow: "NOTE 001 · TOOLING",
    eyebrowColor: "#5a6478",
    title: "Why Neptune speaks Hermes-native tool calls",
    excerpt:
      "Wrapper prompts are parsing debt. On choosing an existing tool-call format agents already speak, and training to it directly.",
  },
  {
    eyebrow: "LOG 010 · FACTORY",
    eyebrowColor: "#5a6478",
    title: "Stage 0: the factory is operational",
    excerpt:
      "All six pipeline stages running end-to-end, 47 pipeline tests passing, and the signed audit log recording every gate decision.",
  },
];

export default function BlogPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: BL_KEYFRAMES }} />
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
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 3.5vw, 48px) clamp(36px, 5vh, 56px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
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
              BLOG
            </span>
            <h1
              style={{
                font: "600 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
                letterSpacing: "-0.03em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Notes from{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  backgroundSize: "100% 100%",
                  color: "#060b16",
                  padding: "0 0.24em 0.1em 0.19em",
                  animation: "blBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
                }}
              >
                the line.
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
              Method notes and release logs, in order. Entries are numbered, not dated — things ship
              when they pass the gate.
            </p>
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
              {RAIN.map((r, i) => (
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
              width="300"
              height="110"
              viewBox="0 0 300 110"
              style={{ display: "block", overflow: "visible", position: "relative" }}
              aria-label="The log line: numbered entries, next slot opens at gate pass"
            >
              <line
                x1="6"
                y1="52"
                x2="294"
                y2="52"
                stroke="#2a3954"
                strokeDasharray="4 4"
                style={{ animation: "dashFlow 2.6s linear infinite" }}
              />
              <g fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1">
                <rect x="14" y="39" width="62" height="26" fill="#0b1220" stroke="#1b2740" />
                <text x="45" y="55.5" textAnchor="middle" fill="#5a6478">
                  LOG 010
                </text>
                <rect x="92" y="39" width="62" height="26" fill="#0b1220" stroke="#1b2740" />
                <text x="123" y="55.5" textAnchor="middle" fill="#5a6478">
                  NOTE 003
                </text>
                <g style={{ animation: "blinkDot 3.2s ease-in-out infinite" }}>
                  <rect
                    x="170"
                    y="39"
                    width="62"
                    height="26"
                    fill="#060b16"
                    stroke="#a9c7ff"
                    strokeDasharray="4 3"
                  />
                  <text x="201" y="55.5" textAnchor="middle" fill="#a9c7ff">
                    NEXT
                  </text>
                </g>
                <text x="150" y="98" textAnchor="middle" fill="#5a6478" letterSpacing="1.5">
                  ENTRIES APPEND AT GATE PASS — NO DATES
                </text>
              </g>
              <path
                d="M 268 18 L 274 24 L 268 30 L 262 24 Z"
                fill="none"
                stroke="#4c74ff"
                opacity="0.7"
                style={{ animation: "blFloatY 8s ease-in-out infinite alternate" }}
              />
              <circle
                r="2.5"
                fill="#eaf1ff"
                style={{
                  offsetPath: "path('M 6 52 L 294 52')",
                  animation: "blPulseTravel 5.5s linear 0.8s infinite",
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          {POSTS.map((p) => (
            <Reveal
              key={p.title}
              as="a"
              dist={14}
              href="/blog/inside-the-eval-gate"
              className="idx-row"
              data-idx-row=""
              style={{ borderBottom: "1px dashed rgba(169,199,255,0.12)" }}
            >
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.16em",
                  color: p.eyebrowColor,
                }}
              >
                {p.eyebrow}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    font: "400 clamp(18px, 2vw, 24px)/1.35 'Poppins', sans-serif",
                    letterSpacing: "-0.015em",
                    color: "#eaf1ff",
                  }}
                >
                  {p.title}
                </span>
                <span
                  style={{
                    font: "400 13.5px/1.65 'Poppins', sans-serif",
                    color: "#98a3bd",
                    maxWidth: "68ch",
                  }}
                >
                  {p.excerpt}
                </span>
              </span>
              <span
                style={{
                  font: "400 11px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.12em",
                  color: "#a9c7ff",
                }}
              >
                READ&nbsp;→
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
