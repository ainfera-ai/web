import Image from "next/image";
import Link from "next/link";
import BenchmarkPalette from "@/components/BenchmarkPalette";
import { AgentLedgerFigure, NeptuneIndexFigure } from "@/components/InstitutionalFigures";

export default function HomeContent() {
  return (
    <main id="main-content" className="precision-main precision-home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__media" aria-hidden="true">
          <Image
            src="/images/ainfera-dolomites-hero-v1.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="home-hero__veil" aria-hidden="true" />
        <div className="home-hero__copy">
          <h1 id="home-title">The AI-native<br />model factory.</h1>
          <p>
            Ainfera is building Neptune 27B, an open-weight model for agentic systems. It is designed for native tool use, persistent state, long-horizon execution, and recovery.
          </p>
          <div className="button-row">
            <Link className="button button--primary" href="/philosophy">Philosophy</Link>
            <Link className="text-link" href="/whitepaper">Whitepaper <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="precision-section model-introduction" aria-labelledby="neptune-intro-title">
        <header className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">Neptune 27B</span>
            <h2 id="neptune-intro-title">The whole episode is the unit of work.</h2>
          </div>
          <p>
            Neptune 27B is an open dense, approximately 27-billion-parameter model for agent systems.
            Its product definition joins model identity, agent-native behavior, deployment intent, and an evaluation record.
          </p>
        </header>

        <div className="model-introduction__composition">
          <div className="figure-stage figure-stage--large">
            <NeptuneIndexFigure />
          </div>
          <aside className="model-register" aria-label="Neptune 27B summary">
            <div className="model-register__number" aria-hidden="true">27B</div>
            <dl>
              <div><dt>Class</dt><dd>Open dense, approximately 27B</dd></div>
              <div><dt>Interface</dt><dd>Agent-native</dd></div>
              <div><dt>Deployment intent</dt><dd>Workstation to private rack</dd></div>
              <div><dt>Public results</dt><dd className="is-accent">N/A</dd></div>
            </dl>
            <p className="fine-print">Device categories describe the intended system envelope. They are not measured clearance claims.</p>
            <a
              className="text-link"
              href="https://huggingface.co/ainfera-ai/Neptune-1.0-27B"
              target="_blank"
              rel="noreferrer"
            >
              Open the 27B model card <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </section>

      <BenchmarkPalette />

      <section className="precision-section agent-section" aria-labelledby="agent-section-title">
        <header className="section-heading section-heading--offset">
          <div>
            <span className="eyebrow">Agentic</span>
            <h2 id="agent-section-title">One objective across the episode.</h2>
          </div>
          <p>
            A useful agent must keep intent, state, tool outputs, and recovery connected. Neptune treats the task as a continuous system, not a stack of isolated replies.
          </p>
        </header>

        <div className="agent-section__composition">
          <div className="agent-section__canvas">
            <AgentLedgerFigure />
          </div>

          <div className="agent-section__notes">
            <article className="agent-note agent-note--primary">
              <span className="agent-note__index">01 / protocol</span>
              <span className="eyebrow">Tool use</span>
              <h3>Calls tools without translation.</h3>
              <p>Prompts, schemas, arguments, observations, and results remain explicit across the exchange.</p>
            </article>
            <div className="agent-note-stack">
              <article className="agent-note">
                <span className="agent-note__index">02 / state</span>
                <span className="eyebrow">Continuity</span>
                <h3>Keeps the objective alive.</h3>
                <p>Plans and state transitions remain connected to the original task across multiple steps.</p>
              </article>
              <article className="agent-note">
                <span className="agent-note__index">03 / recovery</span>
                <span className="eyebrow">Recovery</span>
                <h3>Repairs inside the task.</h3>
                <p>Rejected calls and failed paths stay inspectable, so the agent can correct and continue.</p>
              </article>
            </div>
          </div>
        </div>

        <a
          className="text-link section-end-link"
          href="https://huggingface.co/ainfera-ai/Neptune-1.0-27B"
          target="_blank"
          rel="noreferrer"
        >
          Open the Neptune 27B model card <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
