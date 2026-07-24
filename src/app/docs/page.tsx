import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "The operating record for Neptune models, interface contracts, evaluation conditions, and publication state.",
};

const INTERFACE_EXAMPLE = `{
  "intent": "reconcile_accounts",
  "tools": [
    {
      "name": "ledger_lookup",
      "input_schema": { "account_id": "string" }
    }
  ],
  "state": {
    "objective": "close_month",
    "completed": ["load_ledger"]
  }
}`;

const publications = [
  {
    name: "Neptune 27B",
    type: "Model card",
    state: "Pending publication",
    href: "https://huggingface.co/ainfera-ai/Neptune-1.0-27B",
    external: true,
  },
  {
    name: "Philosophy",
    type: "Evaluation method",
    state: "Available",
    href: "/philosophy",
    external: false,
  },
  {
    name: "Whitepaper",
    type: "Research record",
    state: "Available",
    href: "/whitepaper",
    external: false,
  },
];

const contractFields = [
  ["Intent", "The objective the system is trying to complete."],
  ["Tools", "The callable interfaces and their accepted arguments."],
  ["State", "What has happened, what remains, and what must persist."],
  ["Response", "A structured action, observation, or final answer."],
];

const evaluationFields = [
  ["Model identity", "Exact model, revision, tokenizer, and weights."],
  ["Suite identity", "Task set, dataset version, harness, and exclusions."],
  ["Runtime", "Hardware, precision, quantization, memory, and serving settings."],
  ["Observation", "Result, uncertainty, measurement date, and source record."],
];

export default function DocsPage() {
  return (
    <div className="precision-site institution-page docs-publication-page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav active="none" />

      <main id="main-content" className="precision-main">
        <section
          className="docs-publication-hero"
          data-nav-hero
          aria-labelledby="docs-title"
        >
          <p className="docs-publication-kicker">Documentation</p>

          <div className="docs-publication-hero__statement">
            <h1 id="docs-title">The operating record for Neptune.</h1>
          </div>

          <div className="docs-publication-hero__abstract">
            <p>
              Neptune documentation is maintained as a technical record. Model
              identity, interface contracts, evaluation conditions, and
              publication state remain attached in one place.
            </p>

            <dl className="docs-publication-facts">
              <div>
                <dt>Scope</dt>
                <dd>Identity, interface, evaluation</dd>
              </div>
              <div>
                <dt>Model cards</dt>
                <dd>Pending publication</dd>
              </div>
              <div>
                <dt>Canonical source</dt>
                <dd>Hugging Face</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className="docs-publication-section docs-register-section"
          aria-labelledby="publication-register-title"
        >
          <header className="docs-publication-section__header">
            <p className="docs-publication-section__label">
              Publication register
            </p>
            <h2 id="publication-register-title">
              Read the source before the summary.
            </h2>
            <p>
              Exact installation, serving, license, tokenizer, and runtime
              instructions publish with each model card. Ainfera does not
              present placeholder commands as runnable documentation.
            </p>
          </header>

          <div className="docs-publication-register" role="list">
            {publications.map((publication) => {
              const content = (
                <>
                  <span className="docs-publication-register__name">
                    {publication.name}
                  </span>
                  <span>{publication.type}</span>
                  <span className="docs-publication-register__state">
                    {publication.state}
                  </span>
                  <span aria-hidden="true">↗</span>
                </>
              );

              return publication.external ? (
                <a
                  key={publication.name}
                  className="docs-publication-register__row"
                  href={publication.href}
                  target="_blank"
                  rel="noreferrer"
                  role="listitem"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={publication.name}
                  className="docs-publication-register__row"
                  href={publication.href}
                  role="listitem"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section
          className="docs-publication-section docs-contract-section"
          aria-labelledby="contract-title"
        >
          <header className="docs-publication-section__header">
            <p className="docs-publication-section__label">
              Interface contract
            </p>
            <h2 id="contract-title">A request should explain itself.</h2>
            <p>
              Agent systems are easier to inspect when intent, tools, and state
              travel together. The response remains legible to the surrounding
              system at every step.
            </p>
          </header>

          <div className="docs-contract-layout">
            <div className="docs-contract-code">
              <div className="docs-contract-code__heading">
                <span>Illustrative request shape</span>
                <span>JSON</span>
              </div>
              <pre>
                <code>{INTERFACE_EXAMPLE}</code>
              </pre>
            </div>

            <dl className="docs-contract-fields">
              {contractFields.map(([term, description]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="docs-publication-section docs-evaluation-section"
          aria-labelledby="evaluation-title"
        >
          <header className="docs-evaluation-heading">
            <p className="docs-publication-section__label">
              Evaluation record
            </p>
            <h2 id="evaluation-title">
              A result is inseparable from its conditions.
            </h2>
            <div className="docs-evaluation-heading__copy">
              <p>
                Public values remain N/A until observed results can be
                published with the exact model revision, suite, harness,
                runtime, date, and uncertainty.
              </p>
              <strong aria-label="Public evaluation values not available">
                N/A
              </strong>
            </div>
          </header>

          <dl className="docs-evaluation-fields">
            {evaluationFields.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
                <span>N/A</span>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <Footer />
    </div>
  );
}
