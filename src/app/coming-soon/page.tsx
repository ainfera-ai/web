import type { Metadata } from "next";
import NotifyForm from "@/components/NotifyForm";

export const metadata: Metadata = {
  title: "Coming soon",
  description: "Ainfera Neptune — coming soon",
};

const csSlot: React.CSSProperties = {
  padding: "18px 12px",
  textAlign: "center",
  font: "400 10.5px 'IBM Plex Mono', monospace",
  letterSpacing: "0.16em",
};

export default function ComingSoonPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060b16",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(24px, 4vh, 48px) 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "clamp(20px, 8vw, 120px)",
          borderLeft: "1px dashed rgba(169,199,255,0.1)",
          animation: "lineDrawV 1.6s ease 0.2s both",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "clamp(20px, 8vw, 120px)",
          borderLeft: "1px dashed rgba(169,199,255,0.1)",
          animation: "lineDrawV 1.6s ease 0.2s both",
        }}
      />

      <div
        style={{
          width: "min(560px, 82vw)",
          borderTop: "1px dashed rgba(169,199,255,0.25)",
          animation: "lineDraw 1.4s ease 0.1s both",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(28px, 4.5vh, 44px)",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <img
            src="/brand/ainfera-mark-ice.svg"
            alt="Ainfera mark"
            style={{ width: 44, height: 44, display: "block" }}
          />
          <h1
            style={{
              font: "500 clamp(34px, 5.5vw, 52px)/1 'Poppins', sans-serif",
              letterSpacing: "-0.02em",
              color: "#eaf1ff",
              margin: 0,
              textAlign: "center",
            }}
          >
            ainfera
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, width: "min(420px, 76vw)" }}>
            <span
              style={{
                flex: 1,
                borderTop: "1px dashed rgba(169,199,255,0.25)",
                animation: "lineDraw 1.2s ease 0.5s both",
              }}
            />
            <span
              style={{
                font: "400 12px 'IBM Plex Mono', monospace",
                letterSpacing: "0.5em",
                paddingLeft: "0.5em",
                color: "#a9c7ff",
              }}
            >
              NEPTUNE
            </span>
            <span
              style={{
                flex: 1,
                borderTop: "1px dashed rgba(169,199,255,0.25)",
                animation: "lineDraw 1.2s ease 0.5s both",
              }}
            />
          </div>
        </div>

        <p
          style={{
            font: "400 clamp(15px, 1.6vw, 17px)/1.6 'Poppins', sans-serif",
            color: "#98a3bd",
            margin: 0,
            textAlign: "center",
          }}
        >
          The inference of AI agents — in training.
        </p>

        <div
          data-cs-row=""
          style={{
            width: "min(760px, 100%)",
            border: "1px dashed rgba(169,199,255,0.25)",
            animation: "lineDraw 1.6s ease 0.8s both",
          }}
        >
          <div
            data-cs-slot=""
            style={{
              ...csSlot,
              borderRight: "1px dashed rgba(169,199,255,0.25)",
              color: "#98a3bd",
            }}
          >
            STAGE 0 · FACTORY OPERATIONAL
          </div>
          <div
            data-cs-slot=""
            style={{
              ...csSlot,
              borderRight: "1px dashed rgba(169,199,255,0.25)",
              color: "#98a3bd",
            }}
          >
            47 PIPELINE TESTS PASSING
          </div>
          <div data-cs-slot="" style={{ ...csSlot, color: "#a9c7ff" }}>
            NEPTUNE-1.0-27B · IN TRAINING
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            width: "min(420px, 100%)",
          }}
        >
          <span style={{ font: "400 13px 'Poppins', sans-serif", color: "#98a3bd" }}>
            Be notified at release.
          </span>
          <NotifyForm />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
        }}
      >
        <div
          style={{
            width: "min(560px, 82vw)",
            borderTop: "1px dashed rgba(169,199,255,0.25)",
            animation: "lineDraw 1.4s ease 0.3s both",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a
            className="cs-x"
            href="https://x.com/ainfera"
            target="_blank"
            rel="noreferrer"
            aria-label="Ainfera on X"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12">
              <line x1="1" y1="1" x2="11" y2="11" stroke="#98a3bd" strokeWidth="1.4" />
              <line x1="11" y1="1" x2="1" y2="11" stroke="#98a3bd" strokeWidth="1.4" />
            </svg>
          </a>
          <span
            style={{
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.18em",
              color: "#5a6478",
            }}
          >
            © AINFERA INC.
          </span>
        </div>
      </div>
    </div>
  );
}
