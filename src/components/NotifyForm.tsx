"use client";

import { useState } from "react";

/** Email-notify capture used on the Coming Soon page. */
export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <span
        style={{
          font: "400 11px 'IBM Plex Mono', monospace",
          letterSpacing: "0.14em",
          color: "#a9c7ff",
          border: "1px dashed rgba(169,199,255,0.35)",
          padding: "14px 20px",
        }}
      >
        NOTED — YOU&apos;LL HEAR AT RELEASE.
      </span>
    );
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <input
        className="field field--joined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        style={{
          flex: 1,
          minWidth: 0,
          font: "400 12px 'IBM Plex Mono', monospace",
          padding: "13px 16px",
        }}
      />
      <button
        className="btn-cta"
        onClick={() => setDone(true)}
        style={{
          flex: "none",
          font: "500 11px 'IBM Plex Mono', monospace",
          letterSpacing: "0.12em",
          padding: "0 22px",
        }}
      >
        NOTIFY ME
      </button>
    </div>
  );
}
