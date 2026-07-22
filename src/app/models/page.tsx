import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Models",
  description: "Neptune models — the family, with true parameter counts",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

/* ── Isometric-glyph telemetry backdrop (identical for every model) ── */
const A1 = "#2e4370";
const A2 = "#223052";
const AG = "rgba(79,206,141,0.34)";

type AsciiLine = { t: string; c: string; o: number };

const ASCII: AsciiLine[] = [
  { t: "—   [+ /[     /T+   #'' '   '  #  +— —+ —/ '#        T[ + —     '#TT'      '##  —+[ '    / +            /[ #— + +'  —+     '        ", c: A1, o: 1 },
  { t: "—   ++·#·    —  / '  '  # ' [+###+—      +/           /—  T'[  ' [/ [+       # /  ' —      T· # T[#  T #  ·   #  #'·—  T   ''     / ", c: A2, o: 0.85 },
  { t: "[   ·  T[T—[[— / [  '· /     ·    T[[+T[       [ '[  ·   [   +·[   /  —[    '    + '   ' +—— [ /   ·    [ #   T[·/—— #+#   '   T+ [ ", c: AG, o: 0.9 },
  { t: " / ·#—   'T  TTT  · +T  ' /         #—  · # — + [ ' [#/ [T/     'T[TT      ' +  /  +#  '## · — —    · '#/   · # /     ·/' [ /  '  ·/", c: A1, o: 1 },
  { t: "  T—[     +/ '   //  '+—   #T ·   ·    T+T   / T[ —     '  +  +' +    T—' '##' #T—— [· [ #[   '    ·+ —['/#   · —  #    [+—[+·     '", c: A2, o: 0.85 },
  { t: "  /  ''    ·  /+/[· # ·  '  T   [+T[·  [— '#   ·            [     —    #  #TT'  /'T— '  ' · '/T   # [ +[  '—    T[    [+     ·/ ·   ", c: A2, o: 0.85 },
  { t: " +/   —#  #  /    · / '   [#T  '· ' /  —[#''      / /    ·  — [—  T 'T  /  '[T  ##   +  '/—[ ·      — ·         [ — — + — '  —  # # ", c: A1, o: 1 },
  { t: "+   — T[ ++##·    [ '  #  —      'T     [  ·T     /   T#        [   —T —T +     ' /[[    ·  #   — /—T T/T —T #  #/  —/ —+/# # /+ [T ", c: AG, o: 0.9 },
  { t: "T + +      —       +   ·   + + / ''  / —·   '/  ##'    #     + /——    +  ' +     · · [ [  #/—+·/  ·[### ·  —  [[ #   [#   # /+  —  '", c: A2, o: 0.85 },
  { t: "     T —·/  +— T + T/'  + + /     # [  T+ '  — ##[+ /—   +—  'T ·—  '#[T#  T      +  ·  ##    +/    —    ''·   +'        +·   ·    '", c: A1, o: 1 },
  { t: " '/          —  T   [/ T  +—      —['/·+     '   — —   '·—[# ——      ··/ /· /  #   —    /  / —   [/—'/ [ — —   [ + · —# [      '  T ", c: A2, o: 0.85 },
  { t: "   /+/  T    ['  '   —/#—  '  — +   —# [# ' T[ + · '/#/ ++# / +  + [· /  # +[     + T·  —+ ·    [   +· +#  #—    'T  ·+ [+ —'#  ·  #", c: A2, o: 0.85 },
  { t: " 'T—·+    #  [  +           #+ +   T +  ·'+·     ·    — [' ' #  — T   #··'— ' '/ # [     T# +'   #       ·  +  +   — T ···    [T+   ", c: AG, o: 0.9 },
  { t: "  /+  /[  ++ #   [—[ ——+/ +  '+/    +        '   T · ·· [   [ ·      / '— '[T+T    T# /     ' # T'  #    ·/  [ T T  · —  + —/   +#— ", c: A2, o: 0.85 },
  { t: "T +[     ' '/ ·+#· T/— +# '#       — ·  · · [  +  + T · /[/#     [/·/    [+/    +[ /·    [++' +  ·/ T T   [#+   + —    [   ·— T ——  ", c: A2, o: 0.85 },
  { t: "# T — ' [[ T#+·#   /            [  —  '+  ·+ — —· / —#     +T— ·  /#[' ·  [ [+/+·— T·      · '' ['/ ·   · — ·[ —/·   + ·/   —#T# '  ", c: A1, o: 1 },
  { t: " '           — /  ·   ' [       / '            ·/  ·  #  T/ #[ /' [/ /·      T—   T   [/ '+/         / T+   T     T/—   [ /   / —   ", c: A2, o: 0.85 },
  { t: "/   [   '[#  ·  [   '+  [ — [+   #  +    +    T [·· [   #      [' —  ''[+' —  ·  +           [  — ' —++[     ' '#'T  /· —     —T   ", c: AG, o: 0.9 },
  { t: "/  #       — #    —T      ++T—   T T ' ·   ·+ —    —  #    #  T #T·      +· +—T T/ —/· /[· '/— 'T  # [  + +  ·   T     [—# + T    — ", c: A1, o: 1 },
  { t: "    —     T    —   /[//## '  +[   #/  +[—[ [ +     + ——    —    ++T — T  / '  T      +     +·  +  ·[· —  T / +/   T—+TT  '  ·    [/ ", c: A2, o: 0.85 },
  { t: " +    [ — '#+  TT  — #   ·[  [+ +   —    [      T+ ·  [      ——·+  # ['        [[ T # / T # T  '    # / —— T[#   + T— ·    '—+//T   ", c: A2, o: 0.85 },
  { t: "     ' #+  /+—[— /#T'[  — +[T/T ·[T·    /  #  '·· /        ·T + # ·  —   — T—       [       · · ' ·  # '/ '      #  ·    / · —   + T", c: A1, o: 1 },
  { t: " +/ —'T     ++[#— T· T + / T [/—#+     [ TTT    #  ''     #  ' [—#    '/ '—/'+ ·    ··         [      —  [    + T —[  [ #      — — [", c: AG, o: 0.9 },
  { t: "[T '  T'  ' #  —[ [[/'/  '     + T [ /       +   [  ·  #++ +#   —·T '   /' +    — / T/·T  # '           [  + [ #—[—     #+ ''    /·+", c: A2, o: 0.85 },
  { t: " ·/'      [ /'· #  'T      — T +[—  + '/   '     [/  ' —+· T   /  [    '  T'·[  T             /·T    ——·  ·   [   /  [·   [· [[  — '", c: A1, o: 1 },
  { t: " '+—[+# [T '/—'T   T #     + [  / ' · [+T—TT   ·  / '+ ['T·—   ·    — [—  [##T——   ·/ —T/##—   T[  ['#     /#      // +  // +'+T + —", c: A2, o: 0.85 },
];

const CUBE = (
  <>
    <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="#141c2e" />
    <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
    <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
  </>
);

function ModelViz({
  vizT,
  vizTag,
  vizDim,
  sideOp,
  pingAnim,
}: {
  vizT: string;
  vizTag: string;
  vizDim: number;
  sideOp: number;
  pingAnim: string;
}) {
  return (
    <div
      style={{
        border: "1px dashed rgba(169,199,255,0.2)",
        borderBottom: "none",
        position: "relative",
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
          maskImage: "radial-gradient(ellipse 74% 78% at 50% 50%, black 50%, transparent 92%)",
        }}
      >
        {ASCII.map((ln, i) => (
          <div
            key={i}
            style={{
              font: "400 12px/17px 'IBM Plex Mono', monospace",
              letterSpacing: "5px",
              whiteSpace: "pre",
              color: ln.c,
              opacity: ln.o,
            }}
          >
            {ln.t}
          </div>
        ))}
      </div>
      <svg
        viewBox="0 0 320 138"
        style={{ display: "block", width: "100%", height: "auto", position: "relative" }}
        aria-label="Isometric glyph for this model"
      >
        <g opacity={vizDim}>
          <ellipse
            cx="160"
            cy="76"
            rx="98"
            ry="27"
            fill="none"
            stroke="#2a3954"
            strokeDasharray="2 6"
            style={{ animation: "dashFlow 4.5s linear infinite" }}
          />
          <g stroke="#a9c7ff" strokeWidth="0.9" opacity={sideOp}>
            <g
              transform="translate(104,84) scale(0.62)"
              style={{ animation: "mdlFloatY 8s ease-in-out infinite alternate" }}
            >
              {CUBE}
            </g>
            <g
              transform="translate(216,84) scale(0.62)"
              style={{ animation: "mdlFloatY 10s ease-in-out 1.4s infinite alternate" }}
            >
              {CUBE}
            </g>
          </g>
          <g transform={vizT} stroke="#a9c7ff" strokeWidth="1">
            <g style={{ animation: "mdlFloatY 9s ease-in-out 0.6s infinite alternate" }}>
              <path d="M 0 -26 L 26 -13 L 0 0 L -26 -13 Z" fill="rgba(37,71,244,0.25)" />
              <path d="M -26 -13 L -26 15 L 0 28 L 0 0 Z" fill="#0b1220" />
              <path d="M 0 0 L 0 28 L 26 15 L 26 -13 Z" fill="#060b16" />
            </g>
          </g>
          <circle
            cx="160"
            cy="76"
            r="12"
            fill="none"
            stroke="#a9c7ff"
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center", animation: pingAnim }}
          />
          <path
            d="M 52 34 L 58 40 L 52 46 L 46 40 Z"
            fill="none"
            stroke="#4c74ff"
            opacity="0.7"
            style={{ animation: "mdlFloatY 8s ease-in-out infinite alternate" }}
          />
          <path
            d="M 272 30 L 277 35 L 272 40 L 267 35 Z"
            fill="#2547f4"
            opacity="0.5"
            style={{ animation: "mdlFloatY 10s ease-in-out 1s infinite alternate" }}
          />
        </g>
      </svg>
      <span
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          font: "400 8.5px 'IBM Plex Mono', monospace",
          letterSpacing: "0.16em",
          color: "#5a6478",
          background: "#060b16",
          border: "1px dashed #1b2740",
          padding: "4px 8px",
        }}
      >
        {vizTag}
      </span>
    </div>
  );
}

type Field = { k: string; v: string; accent?: boolean };

type Model = {
  anchor: string;
  pageHref: string;
  stage: string;
  name: string;
  chip: string;
  chipColor: string;
  chipBg: string;
  chipBorder: string;
  dot: boolean;
  dotBg: string;
  desc: string;
  open: boolean;
  closed: boolean;
  certNote: boolean;
  ctaLabel: string;
  ctaHref: string;
  ctaExternal: boolean;
  vizT: string;
  vizTag: string;
  vizDim: number;
  sideOp: number;
  pingAnim: string;
  fields: Field[];
};

const MODELS: Model[] = [
  {
    anchor: "neptune-27b",
    pageHref: "/models/neptune-27b",
    stage: "STAGE 01 · FLAGSHIP",
    name: "Neptune-1.0-27B-Agent",
    chip: "IN TRAINING",
    chipColor: "#eaf1ff",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.45)",
    dot: true,
    dotBg: "#a9c7ff",
    desc: "The agent-native flagship, on the line now — Hermes-native tool calling and multi-step agentic workflows, open under Apache 2.0 with its true parameter count in the name. Weights publish the moment the gate passes them.",
    open: false,
    closed: true,
    certNote: true,
    ctaLabel: "FOLLOW THE TRAINING RUN ↗",
    ctaHref: "https://huggingface.co/ainfera",
    ctaExternal: true,
    vizT: "translate(160,76) scale(1)",
    vizTag: "27B · DENSE · GRPO NOW",
    vizDim: 1,
    sideOp: 0,
    pingAnim: "mdlNodePing 4.5s ease-out 1.2s infinite both",
    fields: [
      { k: "STATUS", v: "IN TRAINING · GRPO", accent: true },
      { k: "BASE", v: "NEPTUNE-1.0 PRETRAIN · DENSE" },
      { k: "PARAMETERS", v: "27B · TRUE COUNT" },
      { k: "LICENSE", v: "APACHE 2.0 AT RELEASE" },
      { k: "CONTEXT", v: "128K TOKENS" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
  {
    anchor: "neptune-9b",
    pageHref: "/models/neptune-9b",
    stage: "STAGE 01 · COMPACT",
    name: "Neptune-1.0-9B-Agent",
    chip: "QUEUED",
    chipColor: "#eaf1ff",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.45)",
    dot: false,
    dotBg: "#a9c7ff",
    desc: "The compact line — same Hermes-native tool calling and agentic training as the flagship, sized for edge deployments and high-volume agent loops.",
    open: false,
    closed: true,
    certNote: true,
    ctaLabel: "REGISTER INTEREST →",
    ctaHref: "/contact",
    ctaExternal: false,
    vizT: "translate(160,76) scale(0.72)",
    vizTag: "9B · DENSE · QUEUED",
    vizDim: 0.75,
    sideOp: 0,
    pingAnim: "none",
    fields: [
      { k: "STATUS", v: "QUEUED · AFTER 27B", accent: true },
      { k: "BASE", v: "NEPTUNE-1.0 PRETRAIN · DENSE" },
      { k: "PARAMETERS", v: "9B · TRUE COUNT" },
      { k: "LICENSE", v: "APACHE 2.0 AT RELEASE" },
      { k: "CONTEXT", v: "128K TOKENS" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
  {
    anchor: "neptune-70b",
    pageHref: "/models/neptune-70b",
    stage: "STAGE 02 · DOMAIN LINE 01 · FINANCE",
    name: "Neptune-70B-Finance",
    chip: "PROOF-GATED",
    chipColor: "#98a3bd",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.3)",
    dot: false,
    dotBg: "#a9c7ff",
    desc: "The finance line of the 70B base — tuned for filings, reconciliation, risk, and compliance work, delivered with an eval certificate scored on finance tasks.",
    open: false,
    closed: true,
    certNote: true,
    ctaLabel: "REGISTER FOR THE FINANCE LINE →",
    ctaHref: "/contact",
    ctaExternal: false,
    vizT: "translate(160,76) scale(1.22)",
    vizTag: "70B · FINANCE LINE",
    vizDim: 0.5,
    sideOp: 0,
    pingAnim: "none",
    fields: [
      { k: "STATUS", v: "PROOF-GATED · QUEUED" },
      { k: "BASE", v: "NEPTUNE-1.0 PRETRAIN · DENSE" },
      { k: "PARAMETERS", v: "70B · TRUE COUNT" },
      { k: "DOMAIN", v: "FINANCE · LINE 01" },
      { k: "LICENSE", v: "TBD" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
  {
    anchor: "neptune-moe",
    pageHref: "/models/neptune-moe",
    stage: "STAGE 02 · ARCHITECTURE",
    name: "Neptune-MoE",
    chip: "PROOF-GATED",
    chipColor: "#98a3bd",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.3)",
    dot: false,
    dotBg: "#a9c7ff",
    desc: "The mixture-of-experts line. Architecture work happens behind the same gate as everything else — it promotes when it proves, and its name will carry its true counts.",
    open: false,
    closed: true,
    certNote: true,
    ctaLabel: "PROOF-GATED — REGISTER INTEREST →",
    ctaHref: "/contact",
    ctaExternal: false,
    vizT: "translate(160,60) scale(0.62)",
    vizTag: "MOE · TRUE COUNTS AT NAMING",
    vizDim: 0.5,
    sideOp: 1,
    pingAnim: "none",
    fields: [
      { k: "STATUS", v: "ARCHITECTURE PHASE" },
      { k: "BASE", v: "NEPTUNE FACTORY" },
      { k: "PARAMETERS", v: "TBD · WILL BE NAMED TRUE" },
      { k: "LICENSE", v: "TBD" },
      { k: "CONTEXT", v: "TBD" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
];

const PAGE_CSS = `
@keyframes mdlBarIn { from { background-size: 0% 100%; color: #eaf1ff; } to { background-size: 100% 100%; color: #060b16; } }
@keyframes mdlFloatY { from { transform: translateY(3px); } to { transform: translateY(-5px); } }
@keyframes mdlNodePing { 0% { transform: scale(0.96); opacity: 0; } 3% { opacity: 0.7; } 32% { transform: scale(1.65); opacity: 0; } 100% { transform: scale(1.65); opacity: 0; } }
.mdl-page-lnk { color: #a9c7ff; border-bottom: 1px dashed rgba(169,199,255,0.4); padding-bottom: 3px; transition: color 0.25s; }
.mdl-page-lnk:hover { color: #eaf1ff; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
`;

const ctaLinkStyle: React.CSSProperties = {
  font: "400 11px 'IBM Plex Mono', monospace",
  letterSpacing: "0.1em",
  padding: "13px 20px",
};

export default function ModelsPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <Nav active="models" />

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
            gap: 20,
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 3.5vw, 48px) clamp(40px, 6vh, 64px)",
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
            MODELS
          </span>
          <h1
            style={{
              font: "600 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.03em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            The Neptune{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(#a9c7ff, #a9c7ff)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 100%",
                color: "#060b16",
                padding: "0 0.24em 0.1em 0.19em",
                animation: "mdlBarIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            >
              family.
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
            Every model carries its true parameter count in its name, and none promotes past the
            eval gate without proof.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {MODELS.map((m) => (
              <Link
                key={m.anchor}
                className="jump-chip"
                href={m.pageHref}
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  padding: "7px 13px",
                }}
              >
                {m.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {MODELS.map((m) => (
        <div
          key={m.anchor}
          id={m.anchor}
          style={{ borderTop: "1px dashed rgba(169,199,255,0.25)", scrollMarginTop: 120 }}
        >
          <div style={railStyle}>
            <Reveal
              data-model-grid=""
              style={{ padding: "clamp(44px, 6vh, 72px) clamp(24px, 3.5vw, 48px)" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
                <span
                  style={{
                    font: "400 10px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.22em",
                    color: "#5a6478",
                  }}
                >
                  {m.stage}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <h2
                    style={{
                      font: "500 clamp(22px, 2.4vw, 32px) 'IBM Plex Mono', monospace",
                      letterSpacing: "-0.01em",
                      color: "#eaf1ff",
                      margin: 0,
                    }}
                  >
                    {m.name}
                  </h2>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      font: "400 9px 'IBM Plex Mono', monospace",
                      letterSpacing: "0.16em",
                      color: m.chipColor,
                      background: m.chipBg,
                      border: m.chipBorder,
                      padding: "4px 9px",
                    }}
                  >
                    {m.dot && (
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          background: m.dotBg,
                          animation: "blinkDot 2.4s ease-in-out infinite",
                        }}
                      />
                    )}
                    {m.chip}
                  </span>
                </div>
                <p
                  style={{
                    font: "400 14.5px/1.7 'Poppins', sans-serif",
                    color: "#98a3bd",
                    margin: 0,
                    maxWidth: 480,
                  }}
                >
                  {m.desc}
                </p>
                <Link className="mdl-page-lnk" href={m.pageHref} style={{ font: "400 10.5px 'IBM Plex Mono', monospace", letterSpacing: "0.14em" }}>
                  FULL MODEL PAGE&nbsp;→
                </Link>
                {m.open && (
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
                    <a
                      className="btn-cta"
                      href="https://huggingface.co/ainfera"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        font: "500 11px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        padding: "14px 22px",
                      }}
                    >
                      DOWNLOAD ON HF&nbsp;↗
                    </a>
                    <a
                      className="btn-ghost"
                      href="https://huggingface.co/ainfera"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        font: "400 11px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        padding: "13px 20px",
                      }}
                    >
                      MODEL CARD&nbsp;↗
                    </a>
                  </div>
                )}
                {m.closed && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      marginTop: 6,
                      alignItems: "flex-start",
                    }}
                  >
                    {m.ctaExternal ? (
                      <a
                        className="btn-ghost"
                        href={m.ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        style={ctaLinkStyle}
                      >
                        {m.ctaLabel}
                      </a>
                    ) : (
                      <Link className="btn-ghost" href={m.ctaHref} style={ctaLinkStyle}>
                        {m.ctaLabel}
                      </Link>
                    )}
                    {m.certNote && (
                      <span
                        style={{
                          font: "400 9.5px 'IBM Plex Mono', monospace",
                          letterSpacing: "0.14em",
                          color: "#a9c7ff",
                        }}
                      >
                        ◇ SHIPS WITH AN EVAL CERTIFICATE
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div style={{ alignSelf: "start" }}>
                <ModelViz
                  vizT={m.vizT}
                  vizTag={m.vizTag}
                  vizDim={m.vizDim}
                  sideOp={m.sideOp}
                  pingAnim={m.pingAnim}
                />
                <div style={{ border: "1px dashed rgba(169,199,255,0.2)" }}>
                  {m.fields.map((f) => (
                    <div
                      key={f.k}
                      className="spec-row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: "14px 20px",
                        borderBottom: "1px dashed rgba(169,199,255,0.12)",
                        font: "400 10.5px 'IBM Plex Mono', monospace",
                      }}
                    >
                      <span style={{ color: "#5a6478", letterSpacing: "0.14em", flex: "none" }}>
                        {f.k}
                      </span>
                      <span style={{ color: f.accent ? "#a9c7ff" : "#eaf1ff", textAlign: "right" }}>
                        {f.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
