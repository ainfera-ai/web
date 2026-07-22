import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ainfera — specialist access and press",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const sideLabel: React.CSSProperties = {
  font: "400 10px 'IBM Plex Mono', monospace",
  letterSpacing: "0.18em",
  color: "#98a3bd",
};

/* Page-local keyframes (not in globals.css). ctSpinSlow shares orbSpin's
   definition but keeps the design's own name; the rest are unique to this
   page. Global prefers-reduced-motion (`* { animation: none }`) disables them. */
const pageStyles = `
@keyframes ctBarIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes ctFloatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes ctSpinSlow { to { transform: rotate(360deg); } }
@keyframes ctNodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
`;

const asciiLineStyle: React.CSSProperties = {
  font: "400 12px/17px 'IBM Plex Mono', monospace",
  letterSpacing: "5px",
  whiteSpace: "pre",
  margin: 0,
};

const ASCII_PALETTE = [
  { color: "#2e4370", opacity: 1 },
  { color: "#223052", opacity: 0.85 },
  { color: "rgba(79,206,141,0.34)", opacity: 0.9 },
] as const;

const ASCII_LINES: readonly [number, string][] = [
  [0, "—   [+ /[     /T+   '' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        "],
  [1, "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / "],
  [2, "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ "],
  [0, " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/"],
  [1, "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '"],
  [1, "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   "],
  [0, " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # "],
  [2, "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T "],
  [1, "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '"],
  [0, "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '"],
  [1, " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T "],
  [1, "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #"],
  [2, " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   "],
  [1, "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— "],
  [1, "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  "],
  [0, "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  "],
  [1, " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   "],
  [2, "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   "],
  [0, "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — "],
  [1, "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ "],
  [1, " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   "],
  [0, "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T"],
  [2, " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — ["],
  [1, "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+"],
  [0, " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '"],
  [1, " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —"],
];

export default function ContactPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <Nav active="enterprise" />

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
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 3.5vw, 48px) clamp(36px, 5vh, 56px)",
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
            CONTACT
          </span>
          <h1
            style={{
              font: "600 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.03em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Request{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 100%",
                color: "#060b16",
                padding: "0 0.24em 0.1em 0.19em",
                animation: "ctBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            >
              access.
            </span>
          </h1>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <Reveal
            data-contact-grid=""
            dist={16}
            style={{ padding: "clamp(44px, 6vh, 72px) clamp(24px, 3.5vw, 48px)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.22em",
                  color: "#5a6478",
                }}
              >
                01 · ACCESS &amp; PARTNERSHIP INQUIRY
              </span>
              <ContactForm />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                border: "1px dashed rgba(169,199,255,0.2)",
                alignSelf: "start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                  overflow: "hidden",
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
                  {ASCII_LINES.map(([p, text], i) => (
                    <div
                      key={i}
                      style={{
                        ...asciiLineStyle,
                        color: ASCII_PALETTE[p].color,
                        opacity: ASCII_PALETTE[p].opacity,
                      }}
                    >
                      {text}
                    </div>
                  ))}
                </div>
                <svg
                  viewBox="0 0 320 150"
                  style={{ display: "block", width: "100%", height: "auto", position: "relative" }}
                  aria-label="Direct line: one founder, no routing layers"
                >
                  <circle
                    cx="160"
                    cy="75"
                    r="58"
                    fill="none"
                    stroke="#141c2e"
                    strokeDasharray="2 7"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "ctSpinSlow 36s linear infinite reverse",
                    }}
                  />
                  <circle
                    cx="160"
                    cy="75"
                    r="40"
                    fill="none"
                    stroke="#2a3954"
                    strokeDasharray="3 6"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "ctSpinSlow 24s linear infinite",
                    }}
                  />
                  <circle cx="160" cy="75" r="21" fill="#0b1220" stroke="rgba(169,199,255,0.5)" />
                  <circle
                    cx="160"
                    cy="75"
                    r="21"
                    fill="none"
                    stroke="#a9c7ff"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      animation: "ctNodePing 4.6s ease-out 1.2s infinite both",
                    }}
                  />
                  <image href="/brand/ainfera-mark-ice.svg" x="150" y="65" width="20" height="20" />
                  <path
                    d="M 58 34 L 64 40 L 58 46 L 52 40 Z"
                    fill="none"
                    stroke="#4c74ff"
                    opacity="0.7"
                    style={{ animation: "ctFloatY 8s ease-in-out infinite alternate" }}
                  />
                  <path
                    d="M 266 106 L 271 111 L 266 116 L 261 111 Z"
                    fill="#2547f4"
                    opacity="0.5"
                    style={{ animation: "ctFloatY 9s ease-in-out 1.2s infinite alternate" }}
                  />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    font: "400 8.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.16em",
                    color: "#5a6478",
                    background: "#060b16",
                    border: "1px dashed #1b2740",
                    padding: "4px 8px",
                  }}
                >
                  DIRECT TO FOUNDER · NO ROUTING
                </span>
              </div>

              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.22em",
                  color: "#5a6478",
                  padding: "18px 24px",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                02 · GENERAL &amp; PRESS
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "22px 24px",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                <span style={sideLabel}>GENERAL</span>
                <a
                  href="mailto:hello@ainfera.ai"
                  style={{ font: "400 14px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}
                >
                  hello@ainfera.ai
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "22px 24px",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                <span style={sideLabel}>PRESS</span>
                <a
                  href="mailto:press@ainfera.ai"
                  style={{ font: "400 14px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}
                >
                  press@ainfera.ai
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "22px 24px" }}>
                <span style={sideLabel}>ELSEWHERE</span>
                <a
                  className="lnk-body"
                  href="https://huggingface.co/ainfera-ai"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 13px 'Poppins', sans-serif" }}
                >
                  Hugging Face&nbsp;↗
                </a>
                <a
                  className="lnk-body"
                  href="https://x.com/ainfera_ai"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 13px 'Poppins', sans-serif" }}
                >
                  X&nbsp;↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
