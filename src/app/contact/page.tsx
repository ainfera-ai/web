import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { ContactIntakeFigure } from "@/components/InstitutionalPageFigures";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ainfera about Neptune models, agent workloads, deployment boundaries, and evaluation requirements.",
};

const intakeRegister = [
  ["Task", "The complete job the agent must finish—not a broad use-case label."],
  ["System", "The tools, data, hardware, privacy, latency, and operating boundaries around it."],
  ["Failure", "The behavior that breaks trust, creates cost, or prevents deployment."],
  ["Proof", "The observed result that would justify a clear product or deployment decision."],
];

const reviewNotes = [
  { index: "01", title: "Representative work", copy: "A real workflow, trace, or task boundary is more useful than a category such as finance or legal." },
  { index: "02", title: "Operating constraints", copy: "Include the deployment environment, data boundary, latency target, and any security requirements." },
  { index: "03", title: "Decision rule", copy: "Name the outcome, failure rate, or comparison your team would accept as sufficient evidence." },
];

export default function ContactPage() {
  return (
    <div className="precision-site institution-page contact-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="company" />

      <main id="main-content" className="precision-main">
        <header className="institution-page-hero" data-nav-hero aria-labelledby="contact-title">
          <div className="institution-page-hero__index">
            <span>Contact</span>
            <span>AIN / 04</span>
          </div>
          <div className="institution-page-hero__statement">
            <h1 id="contact-title">Start with the real task.</h1>
          </div>
          <div className="institution-page-hero__abstract">
            <p>
              Tell us what the agent must complete, where it must run, and what outcome your team
              would accept as evidence. We will answer with fit, limits, and the questions that matter.
            </p>
            <a className="text-link" href="#inquiry">Open the intake <span aria-hidden="true">↓</span></a>
          </div>
        </header>

        <section className="institution-chapter contact-brief-chapter" aria-labelledby="brief-title">
          <div className="institution-chapter__label">
            <span>01</span>
            <span>Operating brief</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis">
              <h2 id="brief-title">A useful inquiry reads like an operating brief.</h2>
              <p>
                Model fit depends on the whole system. A precise first note lets us separate a model
                question from an interface, data, runtime, or evaluation question before either team
                commits time to the wrong problem.
              </p>
            </div>
            <div className="institution-figure-stage">
              <ContactIntakeFigure />
            </div>
            <dl className="institution-register contact-intake-register" aria-label="Workload intake fields">
              {intakeRegister.map(([term, definition], index) => (
                <div key={term}>
                  <dt><span>0{index + 1}</span>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="inquiry" className="institution-chapter contact-inquiry-chapter" aria-labelledby="inquiry-title">
          <div className="institution-chapter__label">
            <span>02</span>
            <span>Inquiry</span>
          </div>
          <div className="institution-chapter__body contact-inquiry-composition">
            <div className="contact-inquiry-intro">
              <div className="institution-thesis">
                <h2 id="inquiry-title">Send the boundary, not the pitch.</h2>
                <p>
                  The strongest starting point is a short, concrete description of what exists today,
                  where it fails, and the decision this work needs to support.
                </p>
              </div>
              <div className="contact-review-notes" aria-label="Useful inquiry context">
                {reviewNotes.map((note) => (
                  <article key={note.index}>
                    <span>{note.index}</span>
                    <div><h3>{note.title}</h3><p>{note.copy}</p></div>
                  </article>
                ))}
              </div>
              <p className="contact-privacy-note">
                Before submitting, review our <Link href="/privacy">Privacy notice</Link>.
              </p>
            </div>
            <div className="contact-inquiry-form">
              <div className="contact-inquiry-form__index">
                <span>Inquiry register</span>
                <span>INT / 01</span>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
