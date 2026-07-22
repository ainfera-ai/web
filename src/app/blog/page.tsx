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
            BLOG
          </span>
          <h1
            style={{
              font: "300 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.025em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Notes from the line.
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
