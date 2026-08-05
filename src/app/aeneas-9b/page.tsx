import type { Metadata } from "next";
import Image from "next/image";
import BenchmarkPalette from "@/components/BenchmarkPalette";
import Footer from "@/components/Footer";
import { EvidenceThresholdFigure } from "@/components/InstitutionalPageFigures";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Aeneas 9B",
  description:
    "Aeneas 9B is Ainfera's compact 9B-class model program for native tool use within explicit policy boundaries. Training is underway, with no public results yet available.",
};

const actionContract = [
  ["Choose", "Select an admitted tool only when the task requires one."],
  ["Clarify", "Ask for missing information before taking an ambiguous action."],
  ["Abstain", "Keep no-tool behavior explicit when action is not justified."],
  ["Recover", "Retain failed calls and repair within the same task trace."],
];

export default function AeneasPage() {
  return (
    <div className="precision-site institution-page aeneas-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="models" />

      <main id="main-content" className="precision-main">
        <header className="aeneas-hero" data-nav-hero aria-labelledby="aeneas-title">
          <div className="aeneas-hero__media">
            <Image
              src="/images/source-photos/aeneas-rome-blue-hour.jpg"
              alt="The Tiber and Saint Peter's Basilica in Rome during blue hour"
              fill
              priority
              quality={90}
              sizes="100vw"
            />
          </div>
          <div className="aeneas-hero__veil" aria-hidden="true" />
          <div className="aeneas-hero__index"><span>Ainfera product</span><span>Aeneas / 9B</span></div>
          <div className="aeneas-hero__copy">
            <span className="eyebrow">Compact model program / In training</span>
            <h1 id="aeneas-title">Aeneas 9B</h1>
            <p>A compact 9B-class model program for native tool use within explicit policy boundaries.</p>
          </div>
          <dl className="aeneas-hero__register" aria-label="Aeneas 9B public state">
            <div><dt>Scale</dt><dd>Approximately 9B</dd></div>
            <div><dt>Action contract</dt><dd>Admitted tools only</dd></div>
            <div><dt>Intended host</dt><dd>DGX Spark</dd></div>
            <div><dt>Public state</dt><dd>In training</dd></div>
          </dl>
        </header>

        <section className="aeneas-chapter" aria-labelledby="aeneas-scope-title">
          <div className="aeneas-chapter__label" data-reveal="on"><span>01</span><span>Scope</span></div>
          <div className="aeneas-chapter__body">
            <div className="aeneas-thesis" data-reveal="on">
              <h2 id="aeneas-scope-title">The action contract is the product boundary.</h2>
              <p>
                Aeneas is not a general-intelligence claim. Its product boundary is narrower: decide
                when to act, emit typed calls, preserve policy boundaries, and recover without losing
                the task. Training is underway while its model, interface, environment, and evaluation
                identities are bound.
              </p>
            </div>
            <div className="aeneas-actions" data-reveal="on" data-reveal-group="stagger">
              {actionContract.map(([title, description], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BenchmarkPalette model="Aeneas 9B" />

        <section className="aeneas-chapter aeneas-evidence" aria-labelledby="aeneas-evidence-title">
          <div className="aeneas-chapter__label" data-reveal="on"><span>02</span><span>Evidence</span></div>
          <div className="aeneas-chapter__body aeneas-chapter__body--stacked">
            <div className="aeneas-thesis" data-reveal="on">
              <h2 id="aeneas-evidence-title">No capability claim before its conditions.</h2>
              <p>
                No public benchmark, download, ranking, or release claim is available. Aeneas advances
                only through explicit gates; public values remain N/A until the trained model and frozen
                evaluation record exist.
              </p>
            </div>
            <div className="aeneas-evidence__composition" data-reveal="on" data-reveal-group="split">
              <div className="institution-figure-stage">
                <EvidenceThresholdFigure />
              </div>
              <aside className="aeneas-state" aria-label="Aeneas 9B program status">
                <span>Current public state</span>
                <strong>In training</strong>
                <p>Training is underway. Public evaluation and release are not represented as complete.</p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
