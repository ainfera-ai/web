"use client";

import Link from "next/link";
import { useState } from "react";

const colHead: React.CSSProperties = {
  font: "400 10px 'IBM Plex Mono', monospace",
  letterSpacing: "0.2em",
  color: "#5a6478",
};

const colLink: React.CSSProperties = {
  font: "400 13px 'Poppins', sans-serif",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer
      style={{
        background: "#060b16",
        fontFamily: "'Poppins', sans-serif",
        borderTop: "1px dashed rgba(169,199,255,0.25)",
      }}
    >
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
          }}
        >
          +
        </span>

        <div data-ft-grid="" style={{ padding: "56px clamp(24px, 3.5vw, 48px) 48px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              alignItems: "flex-start",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="/brand/ainfera-mark-ice.svg"
                alt="Ainfera"
                style={{ width: 22, height: 22, display: "block" }}
              />
              <span
                style={{
                  font: "500 16px 'Poppins', sans-serif",
                  letterSpacing: "-0.015em",
                  color: "#eaf1ff",
                }}
              >
                ainfera
              </span>
            </span>
            <span
              style={{
                font: "400 10.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.16em",
                color: "#5a6478",
              }}
            >
              BE NOTIFIED OF PROOF-GATED RELEASES
            </span>
            {!done ? (
              <div style={{ display: "flex", width: "100%", maxWidth: 340 }}>
                <input
                  className="field field--joined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    font: "400 11.5px 'IBM Plex Mono', monospace",
                    padding: "11px 14px",
                  }}
                />
                <button
                  className="btn-cta"
                  onClick={() => setDone(true)}
                  style={{
                    flex: "none",
                    font: "500 10.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.12em",
                    padding: "0 18px",
                  }}
                >
                  NOTIFY
                </button>
              </div>
            ) : (
              <span
                style={{
                  font: "400 11px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.12em",
                  color: "#a9c7ff",
                  border: "1px dashed rgba(169,199,255,0.35)",
                  padding: "12px 16px",
                }}
              >
                NOTED — YOU&apos;LL HEAR AT RELEASE.
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <span style={colHead}>MODELS</span>
            <Link className="lnk-body" href="/models/neptune-27b" style={colLink}>
              Neptune 27B
            </Link>
            <Link className="lnk-body" href="/models/neptune-9b" style={colLink}>
              Neptune 9B
            </Link>
            <Link className="lnk-body" href="/models/neptune-70b" style={colLink}>
              Neptune 70B Finance
            </Link>
            <Link className="lnk-body" href="/models/neptune-moe" style={colLink}>
              Neptune MoE
            </Link>
            <Link className="lnk-body" href="/docs" style={colLink}>
              Docs
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <span style={colHead}>ENTERPRISE</span>
            <Link className="lnk-body" href="/contact" style={colLink}>
              Work with us!
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <span style={colHead}>RESEARCH</span>
            <Link className="lnk-body" href="/blog/inside-the-eval-gate" style={colLink}>
              Philosophy
            </Link>
            <Link className="lnk-body" href="/whitepaper" style={colLink}>
              Whitepaper
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <span style={colHead}>FACTORY</span>
            <Link className="lnk-body" href="/about" style={colLink}>
              About
            </Link>
            <Link className="lnk-body" href="/blog" style={colLink}>
              Blog
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div style={{ display: "flex", gap: 18, alignItems: "center", marginTop: -14 }}>
              <a
                className="icon-lnk"
                href="https://github.com/ainfera"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                style={{ display: "flex" }}
              >
                <img
                  src="https://cdn.simpleicons.org/github/98a3bd"
                  alt="GitHub"
                  style={{ width: 16, height: 16, display: "block" }}
                />
              </a>
              <a
                className="icon-lnk"
                href="https://huggingface.co/ainfera"
                target="_blank"
                rel="noreferrer"
                aria-label="Hugging Face"
                style={{ display: "flex" }}
              >
                <img
                  src="https://cdn.simpleicons.org/huggingface/98a3bd"
                  alt="Hugging Face"
                  style={{ width: 16, height: 16, display: "block" }}
                />
              </a>
              <a
                className="icon-lnk"
                href="https://x.com/ainfera"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                style={{ display: "flex" }}
              >
                <img
                  src="https://cdn.simpleicons.org/x/98a3bd"
                  alt="X"
                  style={{ width: 16, height: 16, display: "block" }}
                />
              </a>
              <a
                className="icon-lnk"
                href="https://linkedin.com/company/ainfera"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                style={{ display: "flex" }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, display: "block", flex: "none" }}>
                  <path
                    fill="#98a3bd"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            padding: "20px clamp(24px, 3.5vw, 48px) 24px",
            borderTop: "1px dashed rgba(169,199,255,0.12)",
          }}
        >
          <span
            style={{
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              color: "#5a6478",
            }}
          >
            © 2026 Ainfera Inc. All rights reserved.
          </span>
          <span style={{ display: "flex", gap: 22 }}>
            <a
              className="lnk-faint"
              href="#"
              style={{ font: "400 10px 'IBM Plex Mono', monospace", letterSpacing: "0.14em" }}
            >
              TERMS
            </a>
            <a
              className="lnk-faint"
              href="#"
              style={{ font: "400 10px 'IBM Plex Mono', monospace", letterSpacing: "0.14em" }}
            >
              PRIVACY
            </a>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span
              style={{
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.2em",
                color: "#2a3954",
              }}
            >
              MODELS THAT PROVE THEMSELVES.
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                font: "400 10px 'IBM Plex Mono', monospace",
                letterSpacing: "0.14em",
                color: "#a9c7ff",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: "#a9c7ff",
                  animation: "blinkDot 2.6s ease-in-out infinite",
                }}
              />
              FACTORY LIVE · GRPO
            </span>
          </span>
        </div>

        <div
          aria-hidden="true"
          style={{ overflow: "hidden", display: "flex", justifyContent: "center", paddingTop: 28 }}
        >
          <span
            style={{
              font: "500 clamp(110px, 22vw, 320px)/0.78 'Poppins', sans-serif",
              letterSpacing: "-0.045em",
              color: "rgba(169,199,255,0.05)",
              whiteSpace: "nowrap",
              marginBottom: "-0.14em",
              userSelect: "none",
            }}
          >
            ainfera
          </span>
        </div>
      </div>
    </footer>
  );
}
