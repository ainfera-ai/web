import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ainfera — specialist access and press",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

const sideLabel: React.CSSProperties = {
  font: "400 10px 'IBM Plex Mono', monospace",
  letterSpacing: "0.18em",
  color: "#98a3bd",
};

export default function ContactPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <Nav active="enterprise" />

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
            CONTACT
          </span>
          <h1
            style={{
              font: "300 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.025em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Request access.
          </h1>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <Reveal
            data-contact-grid=""
            dist={16}
            style={{ padding: "clamp(44px, 6vh, 72px) clamp(24px, 3.5vw, 48px)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.22em",
                  color: "#5a6478",
                }}
              >
                01 · ACCESS &amp; PARTNERSHIP INQUIRY
              </span>
              <ContactForm />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                border: "1px dashed rgba(169,199,255,0.2)",
                alignSelf: "start",
              }}
            >
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.22em",
                  color: "#5a6478",
                  padding: "18px 24px",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                02 · GENERAL &amp; PRESS
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "22px 24px",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                <span style={sideLabel}>GENERAL</span>
                <a
                  href="mailto:hello@ainfera.ai"
                  style={{ font: "400 14px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}
                >
                  hello@ainfera.ai
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "22px 24px",
                  borderBottom: "1px dashed rgba(169,199,255,0.12)",
                }}
              >
                <span style={sideLabel}>PRESS</span>
                <a
                  href="mailto:press@ainfera.ai"
                  style={{ font: "400 14px 'IBM Plex Mono', monospace", color: "#a9c7ff" }}
                >
                  press@ainfera.ai
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "22px 24px" }}>
                <span style={sideLabel}>ELSEWHERE</span>
                <a
                  className="lnk-body"
                  href="https://huggingface.co/ainfera"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 13px 'Poppins', sans-serif" }}
                >
                  Hugging Face&nbsp;↗
                </a>
                <a
                  className="lnk-body"
                  href="https://x.com/ainfera"
                  target="_blank"
                  rel="noreferrer"
                  style={{ font: "400 13px 'Poppins', sans-serif" }}
                >
                  X&nbsp;↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
