"use client";

import { useState } from "react";

type Row = [name: string, val: number, disp: string, hero: boolean];
type Tab = { label: string; note: string; unit: string; max: number; rows: Row[] };

const DATA: Tab[] = [
  {
    label: "AGENTIC BENCHMARKS",
    note: "COMPOSITE SCORE · HIGHER IS BETTER",
    unit: "SCALE 0–100 · SAMPLE",
    max: 75,
    rows: [
      ["NEPTUNE-1.0-27B-AGENT", 68.4, "68.4", true],
      ["OPEN 27–34B MEDIAN", 55.1, "55.1", false],
      ["OPEN 70B MEDIAN", 61.8, "61.8", false],
      ["PROPRIETARY SMALL TIER", 64.2, "64.2", false],
    ],
  },
  {
    label: "TOOL-CALLING ACCURACY",
    note: "HERMES SUITE · STRICT SCHEMA MATCH · HIGHER IS BETTER",
    unit: "% · SAMPLE",
    max: 100,
    rows: [
      ["NEPTUNE-1.0-27B-AGENT", 91.2, "91.2%", true],
      ["OPEN 27–34B MEDIAN", 78.5, "78.5%", false],
      ["OPEN 70B MEDIAN", 84.0, "84.0%", false],
      ["PROPRIETARY SMALL TIER", 88.1, "88.1%", false],
    ],
  },
  {
    label: "COST PER TOKEN",
    note: "SELF-HOSTED OUTPUT COST · LOWER IS BETTER",
    unit: "$ / 1M TOKENS · SAMPLE",
    max: 1.2,
    rows: [
      ["NEPTUNE-1.0-27B-AGENT", 0.31, "$0.31", true],
      ["OPEN 27–34B MEDIAN", 0.42, "$0.42", false],
      ["OPEN 70B MEDIAN", 0.89, "$0.89", false],
      ["PROPRIETARY SMALL TIER", 1.1, "$1.10", false],
    ],
  },
  {
    label: "CLASS COMPARISON",
    note: "AGENTIC COMPOSITE BY SIZE CLASS · HIGHER IS BETTER",
    unit: "SCALE 0–100 · SAMPLE",
    max: 75,
    rows: [
      ["NEPTUNE-1.0-27B-AGENT", 68.4, "68.4", true],
      ["13–14B CLASS MEDIAN", 48.9, "48.9", false],
      ["27–34B CLASS MEDIAN", 55.1, "55.1", false],
      ["70B CLASS MEDIAN", 61.8, "61.8", false],
    ],
  },
];

export default function BenchmarkPalette() {
  const [tab, setTab] = useState(0);
  const cur = DATA[tab];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          borderTop: "1px dashed rgba(169,199,255,0.12)",
          borderBottom: "1px dashed rgba(169,199,255,0.12)",
        }}
      >
        {DATA.map((d, i) => (
          <button
            key={d.label}
            onClick={() => setTab(i)}
            style={{
              background: i === tab ? "#a9c7ff" : "transparent",
              color: i === tab ? "#060b16" : "#98a3bd",
              border: "none",
              borderRight: "1px dashed rgba(169,199,255,0.12)",
              borderRadius: 0,
              font: "400 10.5px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              padding: "15px 22px",
              cursor: "pointer",
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          padding: "36px clamp(24px, 3.5vw, 48px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            font: "400 10px 'IBM Plex Mono', monospace",
            letterSpacing: "0.14em",
            color: "#5a6478",
          }}
        >
          <span>{cur.note}</span>
          <span>{cur.unit}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(169,199,255,0.08) 0 1px, transparent 1px 25%)",
            backgroundSize: "100% 100%",
          }}
        >
          {cur.rows.map(([name, val, disp, hero]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.12em",
                }}
              >
                <span style={{ color: hero ? "#eaf1ff" : "#5a6478" }}>{name}</span>
                <span style={{ color: hero ? "#a9c7ff" : "#5a6478" }}>{disp}</span>
              </div>
              <div
                style={{
                  height: 22,
                  border: "1px dashed rgba(169,199,255,0.15)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    bottom: 2,
                    left: 2,
                    width: Math.round((val / cur.max) * 100) + "%",
                    background: hero ? "#a9c7ff" : "#2a3954",
                    transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://huggingface.co/ainfera-ai"
          target="_blank"
          rel="noreferrer"
          style={{
            alignSelf: "flex-start",
            font: "400 10.5px 'IBM Plex Mono', monospace",
            letterSpacing: "0.14em",
            borderBottom: "1px dashed rgba(169,199,255,0.4)",
            paddingBottom: 3,
          }}
        >
          FULL EVALUATION REPORT&nbsp;↗
        </a>
      </div>
    </>
  );
}
