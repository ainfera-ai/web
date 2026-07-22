"use client";

import { useState } from "react";

const labelStyle: React.CSSProperties = {
  font: "400 10px 'IBM Plex Mono', monospace",
  letterSpacing: "0.18em",
  color: "#98a3bd",
};

const VERTICALS = [
  ["finance", "FINANCE"],
  ["crypto", "CRYPTO"],
  ["accounting-tax", "ACCOUNTING/TAX"],
  ["cybersecurity", "CYBERSECURITY"],
  ["legal", "LEGAL"],
  ["insurance", "INSURANCE"],
  ["other", "OTHER"],
] as const;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [vertical, setVertical] = useState("finance");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        style={{
          border: "1px dashed rgba(169,199,255,0.35)",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            font: "500 12px 'IBM Plex Mono', monospace",
            letterSpacing: "0.16em",
            color: "#a9c7ff",
          }}
        >
          INQUIRY LOGGED.
        </span>
        <span style={{ font: "400 13.5px/1.65 'Poppins', sans-serif", color: "#98a3bd" }}>
          You&apos;ll hear back from the founder — there is no sales team to route through.
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={labelStyle}>NAME</span>
        <input
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          style={{ font: "400 13px 'Poppins', sans-serif", padding: "13px 16px" }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={labelStyle}>COMPANY</span>
        <input
          className="field"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          style={{ font: "400 13px 'Poppins', sans-serif", padding: "13px 16px" }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={labelStyle}>VERTICAL</span>
        <select
          className="field"
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          style={{
            appearance: "none",
            font: "400 12px 'IBM Plex Mono', monospace",
            letterSpacing: "0.08em",
            padding: "13px 16px",
            cursor: "pointer",
          }}
        >
          {VERTICALS.map(([value, label]) => (
            <option key={value} value={value} style={{ background: "#060b16" }}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={labelStyle}>MESSAGE</span>
        <textarea
          className="field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="What will the agents do, and what would proof look like for you?"
          style={{
            font: "400 13px/1.6 'Poppins', sans-serif",
            padding: "13px 16px",
            resize: "vertical",
          }}
        />
      </label>
      <button
        className="btn-cta"
        onClick={() => setSent(true)}
        style={{
          alignSelf: "flex-start",
          font: "500 11.5px 'IBM Plex Mono', monospace",
          letterSpacing: "0.1em",
          padding: "16px 26px",
        }}
      >
        SUBMIT INQUIRY&nbsp;→
      </button>
    </div>
  );
}
