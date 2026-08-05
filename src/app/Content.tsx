import BenchmarkPalette from "@/components/BenchmarkPalette";
import { AgentLedgerFigure, NeptuneIndexFigure } from "@/components/InstitutionalFigures";
import LaunchHero from "@/components/LaunchHero";

export default function HomeContent() {
  return (
    <main id="main-content" className="precision-main precision-home">
      <LaunchHero
        imageSrc="/images/source-photos/neptune-norway-fjord-winter.jpg"
        imageAlt="Snow-covered Ersfjord near Tromsø, Norway, after sunset"
        showVideo={false}
        eyebrow="Model program"
        titleLines={["Neptune 27B"]}
        description="A 27B-class model program designed for long-horizon private agent systems, with native tool use and recovery."
        primaryAction={{
          label: "View model record",
          href: "https://huggingface.co/ainfera-ai/Neptune-1.0-27B",
        }}
        secondaryAction={{ label: "Read evaluation method", href: "/whitepaper" }}
      />

      <section className="precision-section model-introduction" aria-labelledby="neptune-intro-title">
        <header className="section-heading section-heading--split" data-reveal="on">
          <div>
            <span className="eyebrow">Neptune 27B</span>
            <h2 id="neptune-intro-title">The whole episode is the unit of work.</h2>
          </div>
          <p>
            Neptune 27B is an open dense model program in the approximately 27-billion-parameter
            class. Its definition connects agent behavior, private deployment intent, and an
            evaluation record with conditions attached.
          </p>
        </header>

        <div className="model-introduction__composition" data-reveal="on" data-reveal-group="split">
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
              View Neptune on Hugging Face <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </section>

      <BenchmarkPalette />

      <section className="precision-section agent-section" aria-labelledby="agent-section-title">
        <header className="section-heading section-heading--offset" data-reveal="on">
          <div>
            <span className="eyebrow">Design targets</span>
            <h2 id="agent-section-title">One objective across the episode.</h2>
          </div>
          <p>
            Neptune is being designed to keep intent, task state, tool outputs, and recovery
            connected across a complete task episode.
          </p>
        </header>

        <div className="agent-section__composition" data-reveal="on" data-reveal-group="split">
          <div className="agent-section__canvas">
            <AgentLedgerFigure />
          </div>

          <div className="agent-section__notes">
            <article className="agent-note agent-note--primary">
              <span className="agent-note__index">01 / protocol</span>
              <span className="eyebrow">Tool use</span>
              <h3>Emit native tool calls.</h3>
              <p>Keep schemas, arguments, observations, and results explicit across the exchange.</p>
            </article>
            <div className="agent-note-stack">
              <article className="agent-note">
                <span className="agent-note__index">02 / state</span>
                <span className="eyebrow">Continuity</span>
                <h3>Preserve task state.</h3>
                <p>Keep plans and state transitions connected to the original objective across multiple steps.</p>
              </article>
              <article className="agent-note">
                <span className="agent-note__index">03 / recovery</span>
                <span className="eyebrow">Recovery</span>
                <h3>Recover within the trace.</h3>
                <p>Keep rejected calls and failed paths inspectable so the system can correct and continue.</p>
              </article>
            </div>
          </div>
        </div>

        <a
          className="text-link section-end-link"
          href="https://huggingface.co/ainfera-ai/Neptune-1.0-27B"
          target="_blank"
          rel="noreferrer"
          data-reveal="on"
        >
          View Neptune on Hugging Face <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
