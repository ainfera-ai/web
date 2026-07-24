import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Ainfera's privacy notice for its public website, inquiry form, and release-note form.",
};

const dataRegister = [
  ["Inquiry data", "Name, work email, company, sector, and the message you choose to send.", "Respond to your request and understand the workload context."],
  ["Release-note data", "The email address entered in the footer form.", "Send the release information you requested."],
  ["Technical data", "Hosting and security systems may process IP address, browser, timestamp, and requested URL.", "Deliver, protect, diagnose, and maintain the site."],
  ["Outbound services", "A destination service receives ordinary connection data after you choose its link.", "Open Ainfera pages on Hugging Face, GitHub, X, or LinkedIn."],
];

const privacyClauses = [
  {
    index: "01",
    title: "What we use it for",
    copy: "We use submitted information to answer inquiries, provide requested release notices, keep a record of the conversation, protect the site, diagnose faults, and meet legal obligations. We do not use a contact form submission to make an automated decision about you.",
  },
  {
    index: "02",
    title: "When information is shared",
    copy: "Information may be handled by providers that support hosting, security, and communications, only for the work they perform for Ainfera. We may also disclose information when required by law or when reasonably necessary to protect people, rights, or the integrity of the service. We do not sell personal information submitted through these forms.",
  },
  {
    index: "03",
    title: "Retention and security",
    copy: "We retain information only as long as reasonably needed for the purpose described, an active relationship, security, recordkeeping, or legal obligations. We use proportionate safeguards, but no internet transmission or storage system can be guaranteed completely secure.",
  },
  {
    index: "04",
    title: "Cookies and local storage",
    copy: "No advertising tracker is built into the current public site. Essential hosting, security, and browser systems may still create technical logs or storage required to operate and protect the service.",
  },
  {
    index: "05",
    title: "Your choices and rights",
    copy: "Depending on where you live, you may have rights to request access, correction, deletion, restriction, objection, or portability of personal information. You can also ask to stop release notices. We may need to verify a request before completing it.",
  },
  {
    index: "06",
    title: "Changes and contact",
    copy: "We may update this notice when the site or its data practices change. The effective date identifies the current version. Use the Contact page for a privacy question or rights request.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="precision-site institution-page legal-institution-page privacy-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="none" />

      <main id="main-content" className="precision-main">
        <header className="institution-page-hero legal-page-hero" data-nav-hero aria-labelledby="privacy-title">
          <div className="institution-page-hero__index"><span>Privacy</span><span>DAT / 01</span></div>
          <div className="institution-page-hero__statement">
            <h1 id="privacy-title">A plain record of what this site handles.</h1>
          </div>
          <div className="institution-page-hero__abstract">
            <p>
              This notice describes information handled through Ainfera&apos;s public website, why it is
              used, when it may be shared, and the choices available to you.
            </p>
            <Link className="text-link" href="/contact">Privacy request <span aria-hidden="true">↗</span></Link>
          </div>
          <dl className="publication-meta legal-hero-meta">
            <div><dt>Effective</dt><dd>24 July 2026</dd></div>
            <div><dt>Controller</dt><dd>Ainfera Inc.</dd></div>
            <div><dt>Applies to</dt><dd>ainfera.ai</dd></div>
            <div><dt>Revision</dt><dd>01</dd></div>
          </dl>
        </header>

        <section className="institution-chapter privacy-register-chapter" aria-labelledby="data-register-title">
          <div className="institution-chapter__label"><span>01</span><span>Data register</span></div>
          <div className="institution-chapter__body">
            <div className="institution-thesis">
              <h2 id="data-register-title">Collect only what the interaction requires.</h2>
              <p>
                You can browse most of the site without identifying yourself. Information becomes
                personal when you submit it, when essential infrastructure records a request, or when
                you follow a link to another service.
              </p>
            </div>
            <div className="privacy-data-register" role="table" aria-label="Personal information register">
              <div className="privacy-data-register__header" role="row">
                <span role="columnheader">Record</span><span role="columnheader">Information</span><span role="columnheader">Purpose</span>
              </div>
              {dataRegister.map(([record, information, purpose], index) => (
                <div role="row" key={record}>
                  <h3 role="rowheader"><span>0{index + 1}</span>{record}</h3>
                  <p role="cell">{information}</p>
                  <p role="cell">{purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="institution-chapter legal-document-chapter" aria-labelledby="privacy-practice-title">
          <div className="institution-chapter__label"><span>02</span><span>Practice</span></div>
          <div className="institution-chapter__body">
            <div className="institution-thesis">
              <h2 id="privacy-practice-title">Purpose, access, retention, and choice stay visible.</h2>
              <p>
                Privacy is an operating discipline. These clauses describe the boundaries applied to
                information handled through this public site.
              </p>
            </div>
            <div className="legal-clause-list">
              {privacyClauses.map((clause) => (
                <article key={clause.index}>
                  <span>{clause.index}</span>
                  <h3>{clause.title}</h3>
                  <p>{clause.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
