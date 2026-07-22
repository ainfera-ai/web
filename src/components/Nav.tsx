"use client";

import Link from "next/link";
import { useState } from "react";

export type NavKey = "none" | "models" | "enterprise" | "research" | "factory";

type MenuItem = { label: string; href: string; external?: boolean };
type Menu = { key: Exclude<NavKey, "none">; label: string; items: MenuItem[] };

const MENUS: Menu[] = [
  {
    key: "models",
    label: "Models",
    items: [
      { label: "Neptune 27B", href: "/models/neptune-27b" },
      { label: "Neptune 9B", href: "/models/neptune-9b" },
      { label: "Neptune 70B Finance", href: "/models/neptune-70b" },
      { label: "Neptune MoE", href: "/models/neptune-moe" },
    ],
  },
  {
    key: "enterprise",
    label: "Enterprise",
    items: [{ label: "Work with us!", href: "/contact" }],
  },
  {
    key: "research",
    label: "Research",
    items: [
      { label: "Philosophy", href: "/blog/inside-the-eval-gate" },
      { label: "Whitepaper", href: "/whitepaper" },
    ],
  },
  {
    key: "factory",
    label: "Factory",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function Nav({
  active = "none",
  banner = true,
}: {
  active?: NavKey;
  banner?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#060b16",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {banner && (
        <a
          className="nav-banner"
          href="https://huggingface.co/ainfera"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "9px 20px",
            borderBottom: "1px dashed rgba(169,199,255,0.25)",
            font: "400 10.5px 'IBM Plex Mono', monospace",
            letterSpacing: "0.14em",
          }}
        >
          NEPTUNE-1.0-27B-AGENT IS IN TRAINING — FOLLOW THE RUN ON HUGGING FACE&nbsp;&nbsp;→
        </a>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "8px clamp(20px, 4vw, 40px)",
          minHeight: 64,
          boxSizing: "border-box",
          flexWrap: "wrap",
          borderBottom: "1px dashed rgba(169,199,255,0.25)",
          background: "rgba(6,11,22,0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
          <img
            src="/brand/ainfera-mark-ice.svg"
            alt="Ainfera"
            style={{ width: 27, height: 27, display: "block" }}
          />
          <span
            style={{
              font: "500 17px 'Poppins', sans-serif",
              letterSpacing: "-0.015em",
              color: "#eaf1ff",
            }}
          >
            ainfera
          </span>
        </Link>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2.2vw, 30px)",
            flexWrap: "wrap",
          }}
        >
          {MENUS.map((m) => {
            const isOpen = open === m.key;
            const isActive = active === m.key;
            return (
              <div
                key={m.key}
                style={{ position: "relative", display: "flex" }}
                onMouseEnter={() => setOpen(m.key)}
                onMouseLeave={() => setOpen((o) => (o === m.key ? null : o))}
              >
                <button
                  onClick={() => setOpen((o) => (o === m.key ? null : m.key))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: "none",
                    border: "none",
                    borderRadius: 0,
                    padding: "4px 0",
                    cursor: "pointer",
                    font: "400 13px 'Poppins', sans-serif",
                    color: isActive || isOpen ? "#eaf1ff" : "#98a3bd",
                    borderBottom: isActive ? "1px dashed #a9c7ff" : "1px dashed transparent",
                  }}
                >
                  {m.label}
                  <span
                    style={{
                      fontSize: 7.5,
                      color: isOpen ? "#a9c7ff" : "#5a6478",
                      transform: "translateY(1px)",
                    }}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: -18,
                      paddingTop: 12,
                      zIndex: 60,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 196,
                        background: "rgba(7,13,26,0.97)",
                        border: "1px dashed rgba(169,199,255,0.3)",
                        backdropFilter: "blur(10px)",
                        animation: "navDrop 0.26s cubic-bezier(0.16,1,0.3,1) both",
                      }}
                    >
                      {m.items.map((i, idx) => {
                        const itemStyle: React.CSSProperties = {
                          padding: "12px 18px",
                          font: "400 13px 'Poppins', sans-serif",
                          borderBottom:
                            idx < m.items.length - 1
                              ? "1px dashed rgba(169,199,255,0.12)"
                              : "none",
                        };
                        return i.external ? (
                          <a
                            key={i.label}
                            className="dd-item"
                            href={i.href}
                            target="_blank"
                            rel="noreferrer"
                            style={itemStyle}
                          >
                            {i.label}
                          </a>
                        ) : (
                          <Link
                            key={i.label}
                            className="dd-item"
                            href={i.href}
                            style={itemStyle}
                            onClick={() => setOpen(null)}
                          >
                            {i.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <a
          className="btn-ghost"
          href="https://huggingface.co/ainfera"
          target="_blank"
          rel="noreferrer"
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 14,
            font: "500 10.5px 'IBM Plex Mono', monospace",
            letterSpacing: "0.12em",
            padding: "9px 16px",
          }}
        >
          <img
            src="https://cdn.simpleicons.org/huggingface/a9c7ff"
            alt="Hugging Face"
            style={{ width: 15, height: 15, display: "block" }}
          />
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#a9c7ff" }}>2.4K</span>
            <span style={{ color: "#98a3bd" }}>FOLLOWERS</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#a9c7ff" }}>318</span>
            <span style={{ color: "#98a3bd" }}>LIKES</span>
          </span>
          <span style={{ color: "#a9c7ff" }}>↗</span>
        </a>
      </div>
    </div>
  );
}
