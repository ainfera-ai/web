import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "About Ainfera",
};

const railStyle: React.CSSProperties = {
  margin: "0 clamp(20px, 7.6vw, 110px)",
  borderLeft: "1px dashed rgba(169,199,255,0.12)",
  borderRight: "1px dashed rgba(169,199,255,0.12)",
};

export default function AboutPage() {
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
            gap: 20,
            padding: "clamp(56px, 8vh, 90px) clamp(24px, 3.5vw, 48px) clamp(40px, 6vh, 64px)",
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
            ABOUT
          </span>
          <h1
            style={{
              font: "300 clamp(36px, 4.4vw, 62px)/1.12 'Poppins', sans-serif",
              letterSpacing: "-0.025em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Competence,
            <br />
            demonstrated.
          </h1>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed rgba(169,199,255,0.25)" }}>
        <div style={railStyle}>
          <Reveal
            data-about-grid=""
            dist={16}
            style={{ padding: "clamp(44px, 6vh, 72px) clamp(24px, 3.5vw, 48px)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: "58ch" }}>
              <span
                style={{
                  font: "400 10px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.22em",
                  color: "#5a6478",
                }}
              >
                01 · MISSION
              </span>
              <p style={{ font: "400 16px/1.85 'Poppins', sans-serif", color: "#b6c0d6", margin: 0 }}>
                Agents are becoming the main consumers of models, and agents cannot read marketing.
                They need models whose competence is demonstrated — evaluated on the work
                they&apos;ll actually be given, with the results recorded somewhere a buyer can
                check.
              </p>
              <p style={{ font: "400 16px/1.85 'Poppins', sans-serif", color: "#b6c0d6", margin: 0 }}>
                Ainfera builds the Neptune model family and the factory that trains it. Every
                release is gated by evals, every gate decision lands in a signed audit log with an
                event #, and every model carries its true parameter count in its name. If we
                can&apos;t prove it, we don&apos;t ship it.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="team-card" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <span
                  style={{
                    font: "400 9.5px 'IBM Plex Mono', monospace",
                    letterSpacing: "0.2em",
                    color: "#5a6478",
                    padding: "16px 22px",
                    borderBottom: "1px dashed rgba(169,199,255,0.15)",
                  }}
                >
                  02 · TEAM
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "24px 22px" }}>
                  <span
                    style={{
                      font: "500 17px 'Poppins', sans-serif",
                      letterSpacing: "-0.01em",
                      color: "#eaf1ff",
                    }}
                  >
                    Hizrian &quot;Izzy&quot; Raz
                  </span>
                  <span
                    style={{
                      font: "400 10.5px 'IBM Plex Mono', monospace",
                      letterSpacing: "0.16em",
                      color: "#a9c7ff",
                    }}
                  >
                    FOUNDER &amp; CEO
                  </span>
                  <span
                    style={{
                      font: "400 13px/1.65 'Poppins', sans-serif",
                      color: "#98a3bd",
                      marginTop: 8,
                    }}
                  >
                    Runs the factory. Writes the gate suites. Answers the contact form.
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  font: "400 10.5px 'IBM Plex Mono', monospace",
                  letterSpacing: "0.14em",
                  color: "#5a6478",
                }}
              >
                <span style={{ color: "#5a6478" }}>03 · COMPANY</span>
                <span style={{ color: "#98a3bd" }}>AINFERA INC. · DELAWARE · REMOTE-FIRST</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
