import type { Metadata } from "next";
import Link from "next/link";
import BenchmarkPalette from "@/components/BenchmarkPalette";
import Footer from "@/components/Footer";
import { PublicationRecordFigure } from "@/components/InstitutionalPageFigures";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Whitepaper",
  description:
    "The public method behind Neptune model records: identity, workload, runtime conditions, observations, and uncertainty.",
};

const recordFields = [
  {
    index: "01",
    key: "identity",
    title: "Identity",
    copy: "Model family, parameter class, architecture, interface, and exact weight revision name the object under evaluation.",
  },
  {
    index: "02",
    key: "workload",
    title: "Workload",
    copy: "The task boundary, suite, data version, scoring rule, peer set, and exclusions define the work being measured.",
  },
  {
    index: "03",
    key: "runtime",
    title: "Runtime",
    copy: "Hardware, memory, serving format, context, quantization, and sampling settings describe the operating conditions.",
  },
  {
    index: "04",
    key: "observation",
    title: "Observation",
    copy: "The result carries its date, repetitions, uncertainty, exceptions, and source record. Unobserved values remain N/A.",
  },
];

export default function WhitepaperPage() {
  return (
    <div className="precision-site institution-page whitepaper-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="research" />

      <main id="main-content" className="precision-main">
        <header className="institution-page-hero publication-hero" data-nav-hero aria-labelledby="whitepaper-title">
          <div className="institution-page-hero__index">
            <span>Whitepaper</span>
            <span>REC / 01</span>
          </div>
          <div className="institution-page-hero__statement">
            <h1 id="whitepaper-title">A public method for model claims.</h1>
          </div>
          <div className="institution-page-hero__abstract publication-abstract">
            <p>
              This paper defines the record Ainfera uses to describe a Neptune release and interpret
              its evaluation. It binds model identity, workload, runtime conditions, observation, and
              uncertainty into one inspectable object.
            </p>
            <a className="text-link" href="#record">Read the record <span aria-hidden="true">↓</span></a>
          </div>
          <dl className="publication-meta" aria-label="Publication metadata">
            <div><dt>Status</dt><dd>Public method</dd></div>
            <div><dt>Scope</dt><dd>Model claims</dd></div>
            <div><dt>Reference</dt><dd>Neptune 27B</dd></div>
            <div><dt>Results</dt><dd>N/A</dd></div>
          </dl>
        </header>

        <section id="record" className="institution-chapter record-chapter" aria-labelledby="record-title">
          <div className="institution-chapter__label">
            <span>01</span>
            <span>Record</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis institution-thesis--wide">
              <h2 id="record-title">Four fields before one number.</h2>
              <p>
                A benchmark is useful only when another reader can reconstruct what was measured and
                why the comparison is valid. The record therefore exists before the result.
              </p>
            </div>
            <div className="institution-figure-stage">
              <PublicationRecordFigure />
            </div>
            <div className="record-field-grid">
              {recordFields.map((field) => (
                <article id={field.key} key={field.key}>
                  <span>{field.index} / {field.title}</span>
                  <h3>{field.title}</h3>
                  <p>{field.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="institution-chapter reference-chapter" aria-labelledby="reference-title">
          <div className="institution-chapter__label">
            <span>02</span>
            <span>Reference object</span>
          </div>
          <div className="institution-chapter__body reference-composition">
            <div className="institution-thesis">
              <h2 id="reference-title">Neptune 27B, in context.</h2>
              <p>
                Neptune 27B is an open dense model in the approximately 27-billion-parameter class. It
                is intended as the reasoning core of private agent systems, where tool use, sustained
                state, long-horizon execution, and recovery form one operating problem.
              </p>
              <p className="fine-print">System categories describe intended use. They are not measured performance claims.</p>
            </div>
            <dl className="reference-object">
              <div className="reference-object__number"><dt>Parameter class</dt><dd>27B</dd></div>
              <div><dt>Architecture</dt><dd>Open dense</dd></div>
              <div><dt>Interface</dt><dd>Agent-native</dd></div>
              <div><dt>Deployment intent</dt><dd>Private systems</dd></div>
              <div><dt>Public results</dt><dd>N/A</dd></div>
            </dl>
          </div>
        </section>

        <section id="benchmark" className="institution-chapter publication-benchmark" aria-labelledby="benchmark-title">
          <div className="institution-chapter__label">
            <span>03</span>
            <span>Publication state</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis institution-thesis--wide">
              <h2 id="benchmark-title">The table exists before the score.</h2>
              <p>
                Public benchmark data for Neptune 27B is not yet available. When results are released,
                each value will carry the exact model, suite, runtime, date, and uncertainty needed to
                interpret it.
              </p>
            </div>
            <BenchmarkPalette />
            <div className="publication-endnote">
              <span>Method / Rev. 01</span>
              <Link className="text-link" href="/philosophy">Evaluation philosophy <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
