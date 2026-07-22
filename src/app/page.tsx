import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import HeroOrbit from "@/components/HeroOrbit";
import BenchmarkPalette from "@/components/BenchmarkPalette";

export const metadata: Metadata = {
  title: { absolute: "Ainfera — models that prove themselves" },
  description: "Ainfera Neptune — models that prove themselves",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const plusLeft: React.CSSProperties = {
  position: "absolute",
  top: -7,
  left: -6.5,
  font: "400 12px 'IBM Plex Mono', monospace",
  color: "#2a3954",
  zIndex: 3,
};

const plusRight: React.CSSProperties = { ...plusLeft, left: "auto", right: -6.5 };

const kicker: React.CSSProperties = {
  font: "400 10px 'IBM Plex Mono', monospace",
  letterSpacing: "0.22em",
  color: "#5a6478",
};

export default function Home() {
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
      <Nav active="none" />

      {/* §1 HERO */}
      <div style={{ ...railStyle, position: "relative" }}>
        <span style={plusLeft}>+</span>
        <span style={plusRight}>+</span>
        <div
          data-hero-grid=""
          style={{
            padding: "clamp(48px, 7vh, 90px) clamp(24px, 3.5vw, 48px) clamp(56px, 9vh, 100px)",
            minHeight: "min(720px, calc(100svh - 210px))",
            alignContent: "center",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.26em",
                color: "#a9c7ff",
                animation: "fadeUp 0.8s var(--ease) 0.05s both",
              }}
            >
              <span style={{ width: 38, borderTop: "1px dashed rgba(169,199,255,0.55)" }} />
              THE INFERENCE OF AI AGENTS
            </span>
            <h1
              style={{
                font: "300 clamp(44px, 5.6vw, 80px)/1.06 'Poppins', sans-serif",
                letterSpacing: "-0.03em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              <span style={{ display: "block", animation: "fadeUp 0.9s var(--ease) 0.15s both" }}>
                Built by agents,
              </span>
              <span style={{ display: "block", animation: "fadeUp 0.9s var(--ease) 0.3s both" }}>
                <span style={{ borderBottom: "1px dashed #a9c7ff", paddingBottom: "0.06em" }}>
                  for agents.
                </span>
              </span>
            </h1>
            <p
              style={{
                font: "400 17px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 520,
                animation: "fadeUp 0.9s var(--ease) 0.26s both",
              }}
            >
              Neptune models come off an agentic factory and are made for the agents you run.
              Every release is gated by evals and recorded in a signed audit log —{" "}
              <span style={{ color: "#eaf1ff" }}>competence demonstrated, not claimed.</span>
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                animation: "fadeUp 0.9s var(--ease) 0.38s both",
              }}
            >
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  className="btn-cta btn-cta--lift"
                  href="https://huggingface.co/ainfera"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    font: "500 11.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.1em",
                    padding: "16px 26px",
                  }}
                >
                  DOWNLOAD NEPTUNE-1.0-27B&nbsp;↗
                </a>
                <a
                  className="btn-ghost btn-ghost--lift"
                  href="https://huggingface.co/ainfera"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    font: "400 11.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.1em",
                    padding: "15px 24px",
                  }}
                >
                  READ THE EVAL REPORT&nbsp;↗
                </a>
              </div>
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  color: "#5a6478",
                }}
              >
                APACHE 2.0 · HERMES-NATIVE TOOL CALLING · MODELS THAT PROVE THEMSELVES
              </span>
            </div>
          </div>

          <HeroOrbit />

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 9,
              animation: "fadeUp 1s var(--ease) 2.4s both",
            }}
          >
            <span
              style={{
                font: "400 8.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.32em",
                paddingLeft: "0.32em",
                color: "#5a6478",
              }}
            >
              SCROLL
            </span>
            <svg width="2" height="30" viewBox="0 0 2 30" style={{ display: "block", overflow: "visible" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="30"
                stroke="rgba(169,199,255,0.45)"
                strokeWidth="1"
                strokeDasharray="3 5"
                style={{ animation: "scrollFlow 2.2s linear infinite" }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* §2 PROOF-STAT ROW */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div data-stat-row="">
            {(
              [
                ["{STAT_1}", "AGENTIC COMPOSITE · AGENTIC-CORE V1", true],
                ["{STAT_2}", "TOOL-CALL ACCURACY · HERMES SUITE", true],
                ["{STAT_3}", "COST PER 1M TOKENS · 27B CLASS", false],
              ] as [string, string, boolean][]
            ).map(([stat, label, divider]) => (
              <div
                key={label}
                data-stat-cell=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "44px clamp(24px, 3.5vw, 48px)",
                  borderRight: divider ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                }}
              >
                <span style={{ font: "400 clamp(34px, 3.4vw, 48px) 'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                  {stat}
                </span>
                <span
                  style={{
                    font: "400 10px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.16em",
                    color: "#98a3bd",
                  }}
                >
                  {label}
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
            TOKENS BIND TO SIGNED EVAL OUTPUTS AT PUBLISH — NO NUMBER APPEARS HERE UNTIL THE GATE
            PASSES IT.
          </div>
        </div>
      </Reveal>

      {/* §3 FLAGSHIP */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              padding: "clamp(48px, 7vh, 80px) clamp(24px, 3.5vw, 48px) 36px",
              alignItems: "flex-start",
            }}
          >
            <span style={kicker}>01 · FLAGSHIP · OPEN WEIGHTS</span>
            <h2
              style={{
                font: "500 clamp(26px, 3vw, 40px) 'IBM Plex Mono', monospace",
                letterSpacing: "-0.01em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Neptune-1.0-27B-Agent
            </h2>
            <p
              style={{
                font: "400 16px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 620,
              }}
            >
              An agent-native open model. The name is the spec: 27B means 27 billion parameters —
              true count, no rounding games.
            </p>
          </div>
          <div data-spec-grid="" style={{ borderTop: "1px dashed rgba(169,199,255,0.12)" }}>
            {(
              [
                [
                  "HERMES-NATIVE TOOL CALLING",
                  "Tool calls in the native format agents already speak — no wrapper prompts, no parsing glue.",
                  true,
                  true,
                ],
                [
                  "AGENTIC WORKFLOWS",
                  "Trained on multi-step plans, function chains, and recovery from failed calls — not single-turn chat.",
                  false,
                  true,
                ],
                [
                  "APACHE 2.0",
                  "Open weights, unrestricted commercial use. Take it, ship it, fine-tune it.",
                  true,
                  false,
                ],
                [
                  "TRUE PARAMETER COUNT",
                  "Every Neptune model carries its real size in its name. What you download is what it says.",
                  false,
                  false,
                ],
              ] as [string, string, boolean, boolean][]
            ).map(([title, body, right, bottom]) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "28px clamp(24px, 3.5vw, 48px)",
                  borderRight: right ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                  borderBottom: bottom ? "1px dashed rgba(169,199,255,0.12)" : undefined,
                }}
              >
                <span
                  style={{
                    font: "500 11px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.16em",
                    color: "#eaf1ff",
                  }}
                >
                  {title}
                </span>
                <span style={{ font: "400 13px/1.6 'Poppins', sans-serif", color: "#98a3bd" }}>
                  {body}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              padding: "36px clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 72px)",
              borderTop: "1px dashed rgba(169,199,255,0.12)",
            }}
          >
            <a
              className="btn-cta"
              href="https://huggingface.co/ainfera"
              target="_blank"
              rel="noreferrer"
              style={{
                font: "500 11.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.1em",
                padding: "15px 24px",
              }}
            >
              DOWNLOAD ON HUGGING FACE&nbsp;↗
            </a>
            <a
              className="btn-ghost"
              href="https://huggingface.co/ainfera"
              target="_blank"
              rel="noreferrer"
              style={{
                font: "400 11.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.1em",
                padding: "14px 22px",
              }}
            >
              MODEL CARD&nbsp;↗
            </a>
          </div>
        </div>
      </Reveal>

      {/* §4 BENCHMARK PALETTE */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              padding: "clamp(44px, 6vh, 64px) clamp(24px, 3.5vw, 48px) 28px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <span style={kicker}>02 · EVIDENCE</span>
              <h2
                style={{
                  font: "300 clamp(24px, 2.6vw, 34px) 'Poppins', sans-serif",
                  letterSpacing: "-0.02em",
                  color: "#eaf1ff",
                  margin: 0,
                }}
              >
                Benchmark palette
              </h2>
            </div>
            <span
              style={{
                font: "400 9.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.16em",
                color: "#060b16",
                background: "#a9c7ff",
                padding: "5px 10px",
              }}
            >
              SAMPLE DATA — ILLUSTRATIVE ONLY
            </span>
          </div>
          <BenchmarkPalette />
        </div>
      </Reveal>

      {/* §5 ROADMAP LADDER */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              flexWrap: "wrap",
              padding: "clamp(44px, 6vh, 64px) clamp(24px, 3.5vw, 48px) 12px",
            }}
          >
            <span style={kicker}>03 · ROADMAP</span>
            <h2
              style={{
                font: "300 clamp(24px, 2.6vw, 34px) 'Poppins', sans-serif",
                letterSpacing: "-0.02em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              Proof-gated, in order
            </h2>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#5a6478",
              }}
            >
              NO DATES. STAGES PROMOTE WHEN THE GATE PASSES THEM.
            </span>
          </div>
          <div style={{ overflowX: "auto", padding: "28px clamp(24px, 3.5vw, 48px) clamp(48px, 7vh, 72px)" }}>
            <div style={{ display: "flex", alignItems: "stretch", minWidth: 760, maxWidth: 1100 }}>
              <div
                style={{
                  flex: 1,
                  border: "1px dashed rgba(169,199,255,0.35)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    font: "400 9.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.18em",
                    color: "#a9c7ff",
                    padding: "14px 22px",
                    borderBottom: "1px dashed rgba(169,199,255,0.2)",
                  }}
                >
                  STAGE 01 · LIVE GENERATION
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                    padding: "20px 22px",
                    borderBottom: "1px dashed rgba(169,199,255,0.15)",
                    flex: 1,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                      NEPTUNE-1.0-27B-AGENT
                    </span>
                    <span
                      style={{
                        font: "400 9px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.14em",
                        color: "#060b16",
                        background: "#a9c7ff",
                        padding: "4px 8px",
                      }}
                    >
                      OPEN · LIVE
                    </span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>
                    Agent-native flagship. Apache 2.0, on Hugging Face.
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                      NEPTUNE-1.0-9B-AGENT
                    </span>
                    <span
                      style={{
                        font: "400 9px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.14em",
                        color: "#eaf1ff",
                        border: "1px dashed rgba(169,199,255,0.45)",
                        padding: "3px 8px",
                      }}
                    >
                      IN TRAINING
                    </span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>
                    Compact agent model for edge and high-volume loops.
                  </span>
                </div>
              </div>
              <div
                style={{
                  flex: "none",
                  width: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "50%",
                    borderTop: "1px dashed rgba(169,199,255,0.3)",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    font: "400 11px 'IBM Plex Mono', monospace",
                    color: "#a9c7ff",
                    background: "#060b16",
                    padding: "0 4px",
                    animation: "blinkDot 3.2s ease-in-out infinite",
                  }}
                >
                  ◇
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  border: "1px dashed rgba(169,199,255,0.2)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    font: "400 9.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.18em",
                    color: "#5a6478",
                    padding: "14px 22px",
                    borderBottom: "1px dashed rgba(169,199,255,0.15)",
                  }}
                >
                  STAGE 02 · PROOF-GATED
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                    padding: "20px 22px",
                    borderBottom: "1px dashed rgba(169,199,255,0.15)",
                    flex: 1,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                      NEPTUNE-70B
                    </span>
                    <span
                      style={{
                        font: "400 9px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.14em",
                        color: "#98a3bd",
                        border: "1px dashed rgba(169,199,255,0.3)",
                        padding: "3px 8px",
                      }}
                    >
                      DOMAIN-SPECIFIC
                    </span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>
                    The 70B line, tuned per domain. Ships with an eval certificate.
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ font: "500 13.5px 'IBM Plex Mono', monospace", color: "#eaf1ff" }}>
                      NEPTUNE-MOE
                    </span>
                    <span
                      style={{
                        font: "400 9px 'IBM Plex Mono', monospace",
                        letterSpacing: "0.14em",
                        color: "#98a3bd",
                        border: "1px dashed rgba(169,199,255,0.3)",
                        padding: "3px 8px",
                      }}
                    >
                      ARCHITECTURE
                    </span>
                  </div>
                  <span style={{ font: "400 12px/1.55 'Poppins', sans-serif", color: "#98a3bd" }}>
                    Mixture-of-experts line. Gated like everything else.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* §6 FACTORY TEASER */}
      <Reveal style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
              padding: "clamp(56px, 9vh, 96px) clamp(24px, 3.5vw, 48px)",
              textAlign: "center",
            }}
          >
            <span style={kicker}>04 · THE FACTORY</span>
            <h2
              style={{
                font: "300 clamp(30px, 3.6vw, 52px) 'Poppins', sans-serif",
                letterSpacing: "-0.025em",
                color: "#eaf1ff",
                margin: 0,
              }}
            >
              One factory. Every model.
            </h2>
            <p
              style={{
                font: "400 16px/1.7 'Poppins', sans-serif",
                color: "#98a3bd",
                margin: 0,
                maxWidth: 560,
              }}
            >
              Neptune models aren&apos;t hand-built — they come off a training line where every
              stage must prove itself before the next begins. The 27B is its first product, not its
              last.
            </p>
            <span
              style={{
                font: "400 10.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.18em",
                color: "#5a6478",
                border: "1px dashed rgba(169,199,255,0.2)",
                padding: "12px 20px",
              }}
            >
              SFT&nbsp;→&nbsp;DPO&nbsp;→&nbsp;GRPO&nbsp;→&nbsp;
              <span style={{ color: "#a9c7ff" }}>EVAL GATE</span>&nbsp;→&nbsp;MTP&nbsp;→&nbsp;QUANT
            </span>
            <Link
              href="/blog"
              style={{
                font: "400 11px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                borderBottom: "1px dashed rgba(169,199,255,0.4)",
                paddingBottom: 3,
              }}
            >
              READ THE FACTORY NOTES&nbsp;→
            </Link>
          </div>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
