import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FactoryRegisterFigure } from "@/components/InstitutionalPageFigures";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Factory",
  description:
    "Factory is Ainfera's model lifecycle system for connecting definition, interface, evaluation conditions, and release evidence.",
  alternates: { canonical: "/factory" },
};

const companyRegister = [
  ["Object", "Two model programs and one lifecycle system"],
  ["Method", "System-level evaluation with explicit conditions"],
  ["Release", "Models, interfaces, limits, and evidence records"],
];

function ProfileSocials() {
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

export default function FactoryPage() {
  return (
    <div className="precision-site institution-page factory-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="company" />

      <main id="main-content" className="precision-main">
        <header className="aeneas-hero factory-hero" data-nav-hero aria-labelledby="factory-page-title">
          <div className="aeneas-hero__media factory-hero__media">
            <Image
              src="/images/source-photos/factory-m87-hq.jpg"
              alt="The Event Horizon Telescope observation of the M87 supermassive black hole"
              fill
              priority
              quality={90}
              sizes="100vw"
            />
          </div>
          <div className="aeneas-hero__veil factory-hero__veil" aria-hidden="true" />
          <div className="aeneas-hero__index"><span>Model lifecycle system</span><span>Definition to release</span></div>
          <div className="aeneas-hero__copy">
            <span className="eyebrow">Model lifecycle system</span>
            <h1 id="factory-page-title">Factory</h1>
            <p>Factory connects model definition, interface, evaluation conditions, and release evidence.</p>
          </div>
          <dl className="aeneas-hero__register" aria-label="Ainfera factory definition">
            <div><dt>Role</dt><dd>Model lifecycle system</dd></div>
            <div><dt>Scope</dt><dd>Definition to release</dd></div>
            <div><dt>Method</dt><dd>System-level evaluation</dd></div>
            <div><dt>Evidence</dt><dd>Explicit conditions</dd></div>
          </dl>
        </header>

        <section id="company" className="institution-chapter company-chapter" aria-labelledby="company-title">
          <div className="institution-chapter__label" data-reveal="on">
            <span>01</span>
            <span>Company</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis" data-reveal="on">
              <h2 id="company-title">Three products, one operating discipline.</h2>
              <p>
                Ainfera develops Neptune 27B and Aeneas 9B through Factory, the lifecycle system that
                connects model identity, agent interface, evaluation conditions, and release records.
                Each product is defined by its intended behavior, deployment boundary, and available evidence.
              </p>
            </div>
            <dl className="institution-register" aria-label="Ainfera company register" data-reveal="on" data-reveal-group="stagger">
              {companyRegister.map(([term, definition], index) => (
                <div key={term}>
                  <dt><span>0{index + 1}</span>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="institution-chapter factory-chapter" aria-labelledby="factory-method-title">
          <div className="institution-chapter__label" data-reveal="on">
            <span>02</span>
            <span>Method</span>
          </div>
          <div className="institution-chapter__body">
            <div className="institution-thesis institution-thesis--wide" data-reveal="on">
              <h2 id="factory-method-title">Factory connects definition to release.</h2>
              <p>
                Factory treats model definition, agent interface, evaluation, and release record as one
                connected system. A model is ready to publish only when its intended behavior, limits,
                and evidence are legible.
              </p>
            </div>
            <div className="institution-figure-stage" data-reveal="on">
              <FactoryRegisterFigure />
            </div>
            <div className="factory-notes" aria-label="Factory principles" data-reveal="on" data-reveal-group="stagger">
              <article><span>01 / Define</span><h3>Define the operating envelope.</h3><p>Bind model identity, interface, context, and deployment intent in one record.</p></article>
              <article><span>02 / Evaluate</span><h3>Evaluate the complete system.</h3><p>Keep tools, state, recovery, hardware, and runtime attached to each observation.</p></article>
              <article><span>03 / Release</span><h3>Publish the model with its evidence.</h3><p>Keep public results N/A until their methods and conditions are published with them.</p></article>
            </div>
          </div>
        </section>

        <section id="profile" className="institution-chapter founder-chapter" aria-labelledby="profile-title">
          <div className="institution-chapter__label" data-reveal="on">
            <span>03</span>
            <span>Profile</span>
          </div>
          <div className="institution-chapter__body founder-composition" data-reveal="on">
            <figure className="founder-portrait">
              <Image
                src="/images/hizrian-raz.jpg"
                alt="Hizrian Raz, founder of Ainfera"
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 64vw"
              />
            </figure>
            <div className="founder-record">
              <div>
                <span className="eyebrow">Founder</span>
                <h2 id="profile-title">Hizrian Raz</h2>
                <ProfileSocials />
              </div>
              <p>
                Hizrian founded Ainfera to build models as complete systems, keeping the agent interface,
                deployment intent, and public evidence connected to the model itself.
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
