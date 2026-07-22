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

type Field = { k: string; v: string; accent?: boolean };

type Model = {
  anchor: string;
  stage: string;
  name: string;
  chip: string;
  chipColor: string;
  chipBg: string;
  chipBorder: string;
  desc: string;
  open: boolean;
  certNote: boolean;
  fields: Field[];
};

const MODELS: Model[] = [
  {
    anchor: "neptune-27b",
    stage: "STAGE 01 · FLAGSHIP",
    name: "Neptune-1.0-27B-Agent",
    chip: "LIVE",
    chipColor: "#060b16",
    chipBg: "#a9c7ff",
    chipBorder: "1px solid #a9c7ff",
    desc: "The agent-native flagship. Hermes-native tool calling and multi-step agentic workflows, open under Apache 2.0 with its true parameter count in the name.",
    open: true,
    certNote: false,
    fields: [
      { k: "STATUS", v: "LIVE ON HUGGING FACE", accent: true },
      { k: "BASE", v: "NEPTUNE-1.0 PRETRAIN · DENSE" },
      { k: "PARAMETERS", v: "27B · TRUE COUNT" },
      { k: "LICENSE", v: "APACHE 2.0" },
      { k: "CONTEXT", v: "128K TOKENS" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
  {
    anchor: "neptune-9b",
    stage: "STAGE 01 · COMPACT",
    name: "Neptune-1.0-9B-Agent",
    chip: "IN TRAINING",
    chipColor: "#eaf1ff",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.45)",
    desc: "The compact line — same Hermes-native tool calling and agentic training as the flagship, sized for edge deployments and high-volume agent loops.",
    open: false,
    certNote: true,
    fields: [
      { k: "STATUS", v: "IN TRAINING", accent: true },
      { k: "BASE", v: "NEPTUNE-1.0 PRETRAIN · DENSE" },
      { k: "PARAMETERS", v: "9B · TRUE COUNT" },
      { k: "LICENSE", v: "APACHE 2.0" },
      { k: "CONTEXT", v: "128K TOKENS" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
  {
    anchor: "neptune-70b",
    stage: "STAGE 02 · DOMAIN-SPECIFIC",
    name: "Neptune-70B",
    chip: "PROOF-GATED",
    chipColor: "#98a3bd",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.3)",
    desc: "The domain-specific 70B line — one base, tuned per domain on the same factory, each release delivered with its eval certificate.",
    open: false,
    certNote: true,
    fields: [
      { k: "STATUS", v: "PROOF-GATED · QUEUED" },
      { k: "BASE", v: "NEPTUNE-1.0 PRETRAIN · DENSE" },
      { k: "PARAMETERS", v: "70B · TRUE COUNT" },
      { k: "LICENSE", v: "TBD" },
      { k: "CONTEXT", v: "128K TOKENS" },
      { k: "TOOL FORMAT", v: "HERMES-NATIVE" },
    ],
  },
  {
    anchor: "neptune-moe",
    stage: "STAGE 02 · ARCHITECTURE",
    name: "Neptune-MoE",
    chip: "PROOF-GATED",
    chipColor: "#98a3bd",
    chipBg: "transparent",
    chipBorder: "1px dashed rgba(169,199,255,0.3)",
    desc: "The mixture-of-experts line. Architecture work happens behind the same gate as everything else — it promotes when it proves, and its name will carry its true counts.",
    open: false,
    certNote: true,
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

export default function ModelsPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
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
              font: "300 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.025em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            The Neptune family.
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
              <a
                key={m.anchor}
                className="jump-chip"
                href={`#${m.anchor}`}
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  padding: "7px 13px",
                }}
              >
                {m.name.toUpperCase()}
              </a>
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
                    {m.open && (
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          background: "#060b16",
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
                {m.open ? (
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
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      marginTop: 6,
                      alignItems: "flex-start",
                    }}
                  >
                    <Link
                      className="btn-ghost"
                      href="/contact"
                      style={{
                        font: "400 11px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        padding: "13px 20px",
                      }}
                    >
                      PROOF-GATED — REGISTER INTEREST&nbsp;→
                    </Link>
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
              <div style={{ border: "1px dashed rgba(169,199,255,0.2)", alignSelf: "start" }}>
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
            </Reveal>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
