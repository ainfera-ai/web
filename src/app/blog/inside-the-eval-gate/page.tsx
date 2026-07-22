import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "Inside the eval gate: how a checkpoint earns promotion",
  description:
    "The gate is the only stage of the Neptune factory that produces no weights. It produces decisions — and the signed record that makes them checkable.",
};

const bodyPara: React.CSSProperties = {
  font: "400 15.5px/1.85 'Poppins', sans-serif",
  color: "#b6c0d6",
  margin: 0,
};

export default function ArticlePage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <ProgressBar />
      <Nav active="research" />

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

        <article
          style={{
            maxWidth: "68ch",
            margin: "0 auto",
            padding: "clamp(48px, 7vh, 80px) 24px clamp(56px, 8vh, 96px)",
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.18em",
              color: "#5a6478",
            }}
          >
            <Link href="/blog" style={{ color: "#a9c7ff" }}>
              BLOG
            </Link>
            <span>·</span>
            <span>NOTE 003</span>
            <span>·</span>
            <span>EVALUATION</span>
            <span>·</span>
            <span>9 MIN</span>
          </div>
          <h1
            style={{
              font: "300 clamp(30px, 3.6vw, 46px)/1.2 'Poppins', sans-serif",
              letterSpacing: "-0.02em",
              color: "#eaf1ff",
              margin: 0,
            }}
          >
            Inside the eval gate: how a checkpoint earns promotion
          </h1>
          <p style={{ font: "400 17px/1.75 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}>
            The gate is the only stage of the Neptune factory that produces no weights. It produces
            decisions — and the signed record that makes them checkable.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 0",
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              borderBottom: "1px dashed rgba(169,199,255,0.25)",
              font: "400 10px 'IBM Plex Mono', monospace",
              letterSpacing: "0.14em",
              color: "#5a6478",
            }}
          >
            <img src="/brand/ainfera-mark-ice.svg" alt="" style={{ width: 16, height: 16 }} />
            <span>AINFERA RESEARCH</span>
            <span>·</span>
            <span>SIGNED AUDIT LOG · EVENT #000212</span>
          </div>

          <p style={bodyPara}>
            Every stage of the line — SFT, DPO, GRPO, MTP, QUANT — ends the same way: a candidate
            checkpoint arrives at the gate. The gate runs the eval suites registered for that
            stage, writes the scores, and makes exactly one of two calls. Pass, and the checkpoint
            promotes to the next stage. Fail, and the run stops where it stands.
            <sup>
              <a href="#fn1">1</a>
            </sup>
          </p>
          <p style={bodyPara}>
            The important property is that nothing else can make that call. There is no override
            flag, no &quot;promote anyway&quot; path in the orchestrator. A stage that wants to run
            can only consume checkpoints the gate has passed, the same way a build system can only
            link objects that compiled.
          </p>
          <div
            style={{
              border: "1px dashed rgba(169,199,255,0.25)",
              padding: "20px 24px",
              font: "400 12px/2 'IBM Plex Mono', monospace",
              color: "#98a3bd",
              overflowX: "auto",
            }}
          >
            <span style={{ color: "#5a6478" }}>{"// gate contract, abridged"}</span>
            <br />
            checkpoint&nbsp;→&nbsp;run(suites[stage])&nbsp;→&nbsp;scores
            <br />
            scores&nbsp;→&nbsp;sign()&nbsp;→&nbsp;
            <span style={{ color: "#a9c7ff" }}>audit_log.append(event#)</span>
            <br />
            verdict&nbsp;∈&nbsp;{"{ PROMOTE, STOP }"}&nbsp;·&nbsp;no third value
          </div>
          <p style={bodyPara}>
            Each verdict is appended to a signed audit log with an event #. The entry records the
            checkpoint hash, the suite versions, the scores, and the verdict. Eval certificates —
            the documents that ship with Neptune models — are rendered from these entries, which is
            why a certificate always cites its event #.
            <sup>
              <a href="#fn2">2</a>
            </sup>
          </p>
          <p style={bodyPara}>
            This is also why we publish no roadmap dates. A date is a promise about the future; the
            gate only issues records about the past. When a model is listed as proof-gated, that is
            the whole claim: it ships when its evals clear, and you will be able to read the entry
            that says so.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 14,
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              paddingTop: 22,
            }}
          >
            <span
              style={{
                font: "400 9.5px 'IBM Plex Mono', monospace",
                letterSpacing: "0.2em",
                color: "#5a6478",
              }}
            >
              FOOTNOTES
            </span>
            <p
              id="fn1"
              style={{ font: "400 12.5px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                1&nbsp;
              </span>{" "}
              &quot;Stops&quot; means stops: the artifact is retained for diagnosis, but nothing
              downstream may reference it.
            </p>
            <p
              id="fn2"
              style={{ font: "400 12.5px/1.7 'Poppins', sans-serif", color: "#98a3bd", margin: 0 }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#a9c7ff" }}>
                2&nbsp;
              </span>{" "}
              Certificates are rendered from these entries and published with each release on
              Hugging Face.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              borderTop: "1px dashed rgba(169,199,255,0.25)",
              paddingTop: 22,
              font: "400 10.5px 'IBM Plex Mono', monospace",
              letterSpacing: "0.12em",
            }}
          >
            <Link href="/blog" style={{ color: "#a9c7ff" }}>
              ←&nbsp;ALL POSTS
            </Link>
            <Link href="/docs" style={{ color: "#a9c7ff" }}>
              DOCS&nbsp;→
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
