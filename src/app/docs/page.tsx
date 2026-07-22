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
  font: "400 20px 'Poppins', sans-serif",
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

export default function DocsPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
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
              font: "300 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.025em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Run Neptune.
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
                <h2 style={h2Style}>Quickstart</h2>
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
                <h2 style={h2Style}>Tool calling</h2>
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
                <h2 style={h2Style}>Resources</h2>
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
