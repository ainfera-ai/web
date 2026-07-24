import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FactoryRegisterFigure } from "@/components/InstitutionalPageFigures";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "About Ainfera",
  description:
    "Ainfera is an AI-native company building open-weight, agent-native models and the evidence systems required to judge them.",
};

function FounderSocials() {
  return (
    <div className="founder-socials" aria-label="Hizrian Raz social profiles">
      <a href="https://x.com/HizrianRaz" target="_blank" rel="noreferrer" aria-label="Hizrian Raz on X">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.74-8.85L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/hizrian-raz"
        target="_blank"
        rel="noreferrer"
        aria-label="Hizrian Raz on LinkedIn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
        </svg>
      </a>
    </div>
  );
}

const companyRegister = [
  ["Object", "Open-weight models for agentic systems"],
  ["Method", "System-level evaluation with explicit conditions"],
  ["Release", "Weights, interface, limits, and evidence record"],
];

export default function AboutPage() {
  return (
    <div className="precision-site institution-page about-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="company" />

      <main id="main-content" className="precision-main">
        <header className="institution-page-hero" data-nav-hero aria-labelledby="about-title">
          <div className="institution-page-hero__index">
            <span>Company</span>
            <span>AIN / 01</span>
          </div>
          <div className="institution-page-hero__statement">
            <h1 id="about-title">An AI-native company for agent-native systems.</h1>
          </div>
          <div className="institution-page-hero__abstract">
            <p>
              Ainfera builds open-weight models for systems that use tools, preserve state, and recover
              across long-running tasks. The company is organized around one durable output: a model
              teams can own, operate, and judge on explicit evidence.
            </p>
            <a
              className="text-link"
              href="https://huggingface.co/ainfera-ai/Neptune-1.0-27B"
              target="_blank"
              rel="noreferrer"
            >
              Neptune 27B model card <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <section className="institution-chapter company-chapter" aria-labelledby="company-title">
          <div className="institution-chapter__label">
            <span>01</span>
            <span>Company</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis">
              <h2 id="company-title">The company is organized around the model.</h2>
              <p>
                AI-native means the model is not an add-on to a conventional product. Research,
                evaluation, interface design, and publication all meet at the release itself. Neptune is
                Ainfera&apos;s first model family and the reference point for that company architecture.
              </p>
            </div>
            <dl className="institution-register" aria-label="Ainfera company register">
              {companyRegister.map(([term, definition], index) => (
                <div key={term}>
                  <dt><span>0{index + 1}</span>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="institution-chapter factory-chapter" aria-labelledby="factory-title">
          <div className="institution-chapter__label">
            <span>02</span>
            <span>Factory</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis institution-thesis--wide">
              <h2 id="factory-title">The factory is AI-native, too.</h2>
              <p>
                The factory treats model definition, agent interface, evaluation, and release record as
                one connected system. The work is not finished when a weight file exists. It is finished
                when the intended behavior and the conditions of every claim are legible.
              </p>
            </div>
            <div className="institution-figure-stage">
              <FactoryRegisterFigure />
            </div>
            <div className="factory-notes" aria-label="Factory principles">
              <article><span>01 / Define</span><h3>Name the operating envelope.</h3><p>Identity, interface, context, and deployment intent begin in the same record.</p></article>
              <article><span>02 / Evaluate</span><h3>Test the complete system.</h3><p>Tools, state, recovery, hardware, and runtime remain attached to the observation.</p></article>
              <article><span>03 / Release</span><h3>Ship a model with its receipt.</h3><p>Public numbers stay N/A until their method and conditions can travel with them.</p></article>
            </div>
          </div>
        </section>

        <section id="founder" className="institution-chapter founder-chapter" aria-labelledby="founder-title">
          <div className="institution-chapter__label">
            <span>03</span>
            <span>Founder</span>
          </div>
          <div className="institution-chapter__body founder-composition">
            <figure className="founder-portrait">
              <Image
                src="/images/hizrian-raz.jpg"
                alt="Hizrian Raz, founder of Ainfera"
                fill
                sizes="(max-width: 900px) 100vw, 64vw"
              />
            </figure>
            <div className="founder-record">
              <div>
                <span className="eyebrow">Solo founder</span>
                <h2 id="founder-title">Hizrian Raz</h2>
                <FounderSocials />
              </div>
              <p>
                Hizrian founded Ainfera to build model companies differently: start with a model worth
                owning, make the agent system part of its definition, and keep public claims inside the
                boundary of available evidence.
              </p>
              <div className="founder-record__footer">
                <span>Ainfera / Founder</span>
                <Link className="text-link" href="/contact">Contact <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
