import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { EvidenceThresholdFigure } from "@/components/InstitutionalPageFigures";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "Ainfera's philosophy for model claims: observation before promotion, conditions before comparison, and provenance before publication.",
};

const principles = [
  {
    index: "01",
    label: "Observation",
    title: "Absence is information.",
    copy: "A target, estimate, internal run, or selected trace is not a public result. Until a repeatable observation is ready, the value remains N/A.",
  },
  {
    index: "02",
    label: "Conditions",
    title: "A score has an envelope.",
    copy: "Model revision, peers, workload, hardware, runtime, quantization, and uncertainty define the comparison. Change the envelope and the claim changes with it.",
  },
  {
    index: "03",
    label: "Provenance",
    title: "The receipt travels with the result.",
    copy: "A published value points back to the object, method, data, runtime, exclusions, and date required to inspect it. Context is part of the number.",
  },
];

const claimFields = [
  ["Object", "Model ID, architecture, and exact revision"],
  ["Workload", "Suite, data version, task boundary, and scoring rule"],
  ["Runtime", "Hardware, serving format, context, and settings"],
  ["Observation", "Result, date, variance, exclusions, and source record"],
];

export default function PhilosophyPage() {
  return (
    <div className="precision-site institution-page philosophy-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="research" />

      <main id="main-content" className="precision-main">
        <header className="institution-page-hero" data-nav-hero aria-labelledby="philosophy-title">
          <div className="institution-page-hero__index">
            <span>Philosophy</span>
            <span>EVD / 01</span>
          </div>
          <div className="institution-page-hero__statement">
            <h1 id="philosophy-title">Evidence before adjectives.</h1>
          </div>
          <div className="institution-page-hero__abstract">
            <p>
              A model claim should be inspectable before it is impressive. Ainfera separates intent
              from observation, publishes the conditions that give a result meaning, and leaves the
              number blank when the evidence is not ready.
            </p>
            <Link className="text-link" href="/whitepaper">Read the public method <span aria-hidden="true">↗</span></Link>
          </div>
        </header>

        <section className="institution-chapter evidence-chapter" aria-labelledby="evidence-system-title">
          <div className="institution-chapter__label">
            <span>01</span>
            <span>Claim system</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis institution-thesis--wide">
              <h2 id="evidence-system-title">A claim is a system, not a sentence.</h2>
              <p>
                The public sentence sits at the end of a chain. The model must be identified, the work
                must be defined, runtime conditions must be disclosed, and the observation must survive
                review. The figure below makes that threshold visible.
              </p>
            </div>
            <div className="institution-figure-stage institution-figure-stage--contained">
              <EvidenceThresholdFigure />
            </div>
          </div>
        </section>

        <section className="institution-chapter principle-chapter" aria-labelledby="principle-title">
          <div className="institution-chapter__label">
            <span>02</span>
            <span>Discipline</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis">
              <h2 id="principle-title">Three rules govern every public number.</h2>
              <p>They are deliberately conservative. The cost of withholding a number is lower than the cost of publishing one without its meaning.</p>
            </div>
            <div className="institution-principles">
              {principles.map((principle) => (
                <article key={principle.index}>
                  <div className="institution-principles__key"><span>{principle.index}</span><span>{principle.label}</span></div>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="institution-chapter boundary-chapter" aria-labelledby="boundary-title">
          <div className="institution-chapter__label">
            <span>03</span>
            <span>Boundary</span>
          </div>
          <div className="institution-chapter__body boundary-composition">
            <div className="institution-thesis">
              <h2 id="boundary-title">The number is the smallest field in the record.</h2>
              <p>
                Identity, protocol, runtime, and uncertainty determine whether two measurements belong
                in the same comparison. The claim boundary keeps those conditions visible.
              </p>
            </div>
            <dl className="institution-register institution-register--numbered">
              {claimFields.map(([term, definition], index) => (
                <div key={term}>
                  <dt><span>0{index + 1}</span>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
            <div className="boundary-footer">
              <span>Observation state / Neptune 27B</span>
              <strong>N/A</strong>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
