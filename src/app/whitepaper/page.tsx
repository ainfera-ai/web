import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Whitepaper",
  description: "Ainfera whitepaper — models that prove themselves",
};

/* ---------- shared styles ---------- */
const sectionLabel: React.CSSProperties = {
  font: "400 9.5px 'IBM Plex Mono', monospace",
  letterSpacing: "0.22em",
  color: "#5a6478",
};

const sectionH2: React.CSSProperties = {
  font: "600 21px 'Poppins', sans-serif",
  letterSpacing: "-0.015em",
  color: "#eaf1ff",
  margin: 0,
};

const sectionBody: React.CSSProperties = {
  font: "400 15px/1.85 'Poppins', sans-serif",
  color: "#b6c0d6",
  margin: 0,
};

const highlight: React.CSSProperties = {
  backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left center",
  backgroundSize: "100% 100%",
  color: "#060b16",
  padding: "0 0.24em 0.1em 0.19em",
  animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
};

const jumpChip: React.CSSProperties = { padding: "7px 12px" };

/* ---------- ambient ASCII field (behind the two diagrams) ---------- */
const ASCII_STYLES = [
  { color: "#2e4370", opacity: 1 },
  { color: "#223052", opacity: 0.85 },
  { color: "rgba(79,206,141,0.34)", opacity: 0.9 },
];

const ASCII_LINES: { t: string; v: number }[] = [
  { t: "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        ", v: 0 },
  { t: "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / ", v: 1 },
  { t: "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ ", v: 2 },
  { t: " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/", v: 0 },
  { t: "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '", v: 1 },
  { t: "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   ", v: 1 },
  { t: " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # ", v: 0 },
  { t: "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T ", v: 2 },
  { t: "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '", v: 1 },
  { t: "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '", v: 0 },
  { t: " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T ", v: 1 },
  { t: "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #", v: 1 },
  { t: " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   ", v: 2 },
  { t: "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— ", v: 1 },
  { t: "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  ", v: 1 },
  { t: "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  ", v: 0 },
  { t: " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   ", v: 1 },
  { t: "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T ['·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   ", v: 2 },
  { t: "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — ", v: 0 },
  { t: "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ ", v: 1 },
  { t: " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   ", v: 1 },
  { t: "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T", v: 0 },
  { t: " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [", v: 2 },
  { t: "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+", v: 1 },
  { t: " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '", v: 0 },
  { t: " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —", v: 1 },
];

function AsciiField() {
  return (
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
        WebkitMaskImage: "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
        maskImage: "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
      }}
    >
      {ASCII_LINES.map((l, i) => (
        <div
          key={i}
          style={{
            font: "400 12px/17px 'IBM Plex Mono', monospace",
            letterSpacing: 5,
            whiteSpace: "pre",
            color: ASCII_STYLES[l.v].color,
            opacity: ASCII_STYLES[l.v].opacity,
          }}
        >
          {l.t}
        </div>
      ))}
    </div>
  );
}

export default function WhitepaperPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes barIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes nodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
@keyframes sigBreathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes pulseTravel { 0% { offset-distance: 0%; opacity: 0; } 6% { opacity: 1; } 46% { offset-distance: 100%; opacity: 1; } 52% { offset-distance: 100%; opacity: 0; } 100% { offset-distance: 100%; opacity: 0; } }
[data-reveal] [data-ch] { animation-play-state: paused; }
[data-reveal="on"] [data-ch] { animation-play-state: running; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
`,
        }}
      />

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
            maxWidth: "72ch",
            margin: "0 auto",
            padding: "clamp(48px, 7vh, 80px) 24px clamp(56px, 8vh, 96px)",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* eyebrow meta */}
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
            <span style={{ color: "#a9c7ff" }}>WHITEPAPER · WP-001</span>
            <span>·</span>
            <span>V0.9 DRAFT</span>
            <span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: "#a9c7ff",
                  animation: "blinkDot 2.6s ease-in-out infinite",
                }}
              />
              UPDATES AT GATE EVENTS
            </span>
          </div>

          <h1
            style={{
              font: "600 clamp(32px, 4vw, 52px)/1.15 'Poppins', sans-serif",
              letterSpacing: "-0.03em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Models that{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 100%",
                color: "#060b16",
                padding: "0 0.24em 0.1em 0.19em",
                animation: "barIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            >
              prove themselves
            </span>
          </h1>

          <p style={{ font: "400 17px/1.75 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}>
            An agentic factory for training models, an eval gate that cannot be overridden, and a
            signed audit log that makes every claim checkable.
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
              flexWrap: "wrap",
            }}
          >
            <img src="/brand/ainfera-mark-ice.svg" alt="" style={{ width: 16, height: 16 }} />
            <span>AINFERA RESEARCH</span>
            <span>·</span>
            <span>H. RAZ</span>
            <span>·</span>
            <span>SIGNED AUDIT LOG · EVENT #000198</span>
          </div>

          {/* abstract */}
          <div
            style={{
              border: "1px dashed rgba(169,199,255,0.3)",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                font: "400 9.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.22em",
                color: "#a9c7ff",
              }}
            >
              ABSTRACT
            </span>
            <p style={{ font: "400 14.5px/1.8 'Poppins', sans-serif", color: "#b6c0d6", margin: 0 }}>
              Agents are becoming the main consumers of models, and agents cannot read marketing. We
              describe the Neptune factory: a training line whose stages — SFT, DPO, GRPO, MTP, QUANT
              — are separated by a single eval gate with no override path. Every gate verdict is
              appended to a signed audit log with an event number; eval certificates are rendered
              from those entries; and every model&apos;s name carries its true parameter count. The
              result is a release process in which competence is demonstrated, not claimed.
            </p>
          </div>

          {/* jump chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              font: "400 9.5px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
            }}
          >
            <a className="jump-chip" href="#wp-problem" style={jumpChip}>
              01 · THE PROBLEM
            </a>
            <a className="jump-chip" href="#wp-factory" style={jumpChip}>
              02 · THE FACTORY
            </a>
            <a className="jump-chip" href="#wp-gate" style={jumpChip}>
              03 · THE GATE
            </a>
            <a className="jump-chip" href="#wp-log" style={jumpChip}>
              04 · THE LOG
            </a>
            <a className="jump-chip" href="#wp-naming" style={jumpChip}>
              05 · NAMING
            </a>
            <a className="jump-chip" href="#wp-policy" style={jumpChip}>
              06 · RELEASE POLICY
            </a>
          </div>

          {/* 01 · THE PROBLEM */}
          <Reveal
            id="wp-problem"
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              paddingTop: 26,
              scrollMarginTop: 130,
            }}
          >
            <span style={sectionLabel}>01 · THE PROBLEM</span>
            <h2 style={sectionH2}>
              Agents{" "}
              <span data-ch="" style={highlight}>
                buy models
              </span>
            </h2>
            <p style={sectionBody}>
              When a human picks a model, a launch post and a demo can close the sale. An agent
              selecting a model for a task — or an engineer provisioning a fleet of them — needs
              something machine-checkable: what was evaluated, on which suite version, with what
              result, and whether anyone could have overridden the verdict. Today&apos;s answer is
              usually a README. Ours is a signed record.
            </p>
          </Reveal>

          {/* 02 · THE FACTORY */}
          <Reveal
            id="wp-factory"
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px dashed rgba(169,199,255,0.12)",
              paddingTop: 26,
              scrollMarginTop: 130,
            }}
          >
            <span style={sectionLabel}>02 · THE FACTORY</span>
            <h2 style={sectionH2}>
              One line,{" "}
              <span data-ch="" style={highlight}>
                six stages
              </span>
            </h2>
            <p style={sectionBody}>
              Neptune models are produced, not crafted. A checkpoint moves through supervised
              fine-tuning, preference optimization, and reinforcement over full agent episodes; after
              the gate, it picks up multi-token prediction and quantized variants. The line is the
              same for every model — flagship, compact, or domain-tuned.
            </p>
            <div style={{ position: "relative" }}>
              <AsciiField />
              <svg
                viewBox="0 0 640 96"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  overflow: "visible",
                  position: "relative",
                }}
                aria-label="The line: SFT, DPO, GRPO, gate, MTP, QUANT"
              >
                <line
                  x1="16"
                  y1="44"
                  x2="624"
                  y2="44"
                  stroke="#2a3954"
                  strokeDasharray="4 4"
                  style={{ animation: "dashFlow 2.4s linear infinite" }}
                />
                <g fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1">
                  <rect x="36" y="30" width="58" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="65" y="47" textAnchor="middle" fill="#98a3bd">
                    SFT
                  </text>
                  <rect x="134" y="30" width="58" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="163" y="47" textAnchor="middle" fill="#98a3bd">
                    DPO
                  </text>
                  <rect x="232" y="30" width="58" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="261" y="47" textAnchor="middle" fill="#98a3bd">
                    GRPO
                  </text>
                  <rect x="404" y="30" width="58" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="433" y="47" textAnchor="middle" fill="#98a3bd">
                    MTP
                  </text>
                  <rect x="502" y="30" width="58" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="531" y="47" textAnchor="middle" fill="#98a3bd">
                    QUANT
                  </text>
                </g>
                <line
                  x1="340"
                  y1="10"
                  x2="340"
                  y2="78"
                  stroke="#a9c7ff"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  style={{ animation: "dashFlow 2.8s linear infinite" }}
                />
                <line
                  x1="352"
                  y1="14"
                  x2="352"
                  y2="82"
                  stroke="#a9c7ff"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.5"
                  style={{ animation: "dashFlow 3.6s linear infinite" }}
                />
                <text
                  x="346"
                  y="94"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="8.5"
                  letterSpacing="1.5"
                  fill="#a9c7ff"
                >
                  EVAL GATE
                </text>
                <circle
                  cx="346"
                  cy="44"
                  r="9"
                  fill="none"
                  stroke="#a9c7ff"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "nodePing 4.5s ease-out 1.2s infinite both",
                  }}
                />
                <circle
                  r="2.5"
                  fill="#eaf1ff"
                  style={{
                    offsetPath: "path('M 16 44 L 624 44')",
                    animation: "pulseTravel 6s linear 0.8s infinite",
                  }}
                />
              </svg>
            </div>
          </Reveal>

          {/* 03 · THE GATE */}
          <Reveal
            id="wp-gate"
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px dashed rgba(169,199,255,0.12)",
              paddingTop: 26,
              scrollMarginTop: 130,
            }}
          >
            <span style={sectionLabel}>03 · THE GATE</span>
            <h2 style={sectionH2}>
              Two verdicts,{" "}
              <span data-ch="" style={highlight}>
                no override
              </span>
            </h2>
            <p style={sectionBody}>
              The gate runs the eval suites registered for a stage and issues exactly one of two
              verdicts. There is no promote-anyway flag: downstream stages can only consume
              checkpoints the gate has passed, the way a linker can only consume objects that
              compiled.
            </p>
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
            <Link
              href="/blog/inside-the-eval-gate"
              style={{
                alignSelf: "flex-start",
                font: "400 10.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#a9c7ff",
                borderBottom: "1px dashed rgba(169,199,255,0.4)",
                paddingBottom: 3,
              }}
            >
              FULL GATE NOTE&nbsp;→
            </Link>
          </Reveal>

          {/* 04 · THE LOG */}
          <Reveal
            id="wp-log"
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px dashed rgba(169,199,255,0.12)",
              paddingTop: 26,
              scrollMarginTop: 130,
            }}
          >
            <span style={sectionLabel}>04 · THE LOG</span>
            <h2 style={sectionH2}>
              A signed,{" "}
              <span data-ch="" style={highlight}>
                append-only record
              </span>
            </h2>
            <p style={sectionBody}>
              Each verdict is appended with an event number, the checkpoint hash, suite versions, and
              scores. Eval certificates — the documents that ship with releases — are rendered from
              these entries and cite their event #, so a certificate can always be traced back to the
              record that produced it.
            </p>
            <div style={{ position: "relative" }}>
              <AsciiField />
              <svg
                viewBox="0 0 640 70"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  overflow: "visible",
                  position: "relative",
                }}
                aria-label="Audit log entries appended in order, newest signed"
              >
                <line
                  x1="10"
                  y1="34"
                  x2="630"
                  y2="34"
                  stroke="#2a3954"
                  strokeDasharray="4 4"
                  style={{ animation: "dashFlow 2.6s linear infinite" }}
                />
                <g fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1">
                  <rect x="60" y="21" width="70" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="95" y="38" textAnchor="middle" fill="#5a6478">
                    #000196
                  </text>
                  <rect x="190" y="21" width="70" height="26" fill="#0b1220" stroke="#1b2740" />
                  <text x="225" y="38" textAnchor="middle" fill="#5a6478">
                    #000197
                  </text>
                  <g style={{ animation: "sigBreathe 3.4s ease-in-out infinite" }}>
                    <rect x="320" y="21" width="86" height="26" fill="#060b16" stroke="#4fce8d" />
                    <text x="363" y="38" textAnchor="middle" fill="#4fce8d">
                      ✓ #000198
                    </text>
                  </g>
                  <g style={{ animation: "blinkDot 3.2s ease-in-out infinite" }}>
                    <rect
                      x="466"
                      y="21"
                      width="70"
                      height="26"
                      fill="#060b16"
                      stroke="#a9c7ff"
                      strokeDasharray="4 3"
                    />
                    <text x="501" y="38" textAnchor="middle" fill="#a9c7ff">
                      NEXT
                    </text>
                  </g>
                </g>
                <circle
                  r="2.5"
                  fill="#eaf1ff"
                  style={{
                    offsetPath: "path('M 10 34 L 630 34')",
                    animation: "pulseTravel 5.5s linear 0.8s infinite",
                  }}
                />
              </svg>
            </div>
          </Reveal>

          {/* 05 · NAMING */}
          <Reveal
            id="wp-naming"
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px dashed rgba(169,199,255,0.12)",
              paddingTop: 26,
              scrollMarginTop: 130,
            }}
          >
            <span style={sectionLabel}>05 · NAMING</span>
            <h2 style={sectionH2}>
              The name is{" "}
              <span data-ch="" style={highlight}>
                the spec
              </span>
            </h2>
            <p style={sectionBody}>
              Neptune-1.0-27B-Agent has 27 billion parameters — true count, no rounding games.
              Mixture-of-experts releases will state both totals: parameters held and parameters
              active. A name an agent can parse is a spec it can trust.
            </p>
          </Reveal>

          {/* 06 · RELEASE POLICY */}
          <Reveal
            id="wp-policy"
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: "1px dashed rgba(169,199,255,0.12)",
              paddingTop: 26,
              scrollMarginTop: 130,
            }}
          >
            <span style={sectionLabel}>06 · RELEASE POLICY</span>
            <h2 style={sectionH2}>
              Records,{" "}
              <span data-ch="" style={highlight}>
                not promises
              </span>
            </h2>
            <p style={sectionBody}>
              We publish no roadmap dates. A date is a promise about the future; the gate only issues
              records about the past. A model listed as proof-gated ships when its evals clear — and
              you will be able to read the entry that says so.
            </p>
          </Reveal>

          {/* CITE */}
          <Reveal
            dist={16}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 10,
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
              CITE
            </span>
            <div
              style={{
                border: "1px dashed rgba(169,199,255,0.25)",
                padding: "18px 22px",
                font: "400 11.5px/1.9 'IBM Plex Mono', monospace",
                color: "#98a3bd",
                overflowX: "auto",
              }}
            >
              {"@techreport{ainfera2026neptune,"}
              <br />
              &nbsp;&nbsp;title&nbsp;=&nbsp;{"{Models That Prove Themselves},"}
              <br />
              &nbsp;&nbsp;author&nbsp;=&nbsp;{"{Raz, Hizrian},"}
              <br />
              &nbsp;&nbsp;institution&nbsp;=&nbsp;{"{Ainfera Inc.},"}
              <br />
              &nbsp;&nbsp;number&nbsp;=&nbsp;{"{WP-001},"}&nbsp;year&nbsp;=&nbsp;{"{2026},"}&nbsp;note&nbsp;=&nbsp;{"{v0.9 draft}"}
              <br />
              {"}"}
            </div>
          </Reveal>

          {/* prev / next */}
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
              ←&nbsp;NOTES FROM THE LINE
            </Link>
            <Link href="/models" style={{ color: "#a9c7ff" }}>
              THE MODELS&nbsp;→
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
