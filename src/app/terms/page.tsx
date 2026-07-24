import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for accessing Ainfera's website, public materials, and linked model resources.",
};

const clauses = [
  {
    index: "01",
    title: "Scope",
    copy: "These terms govern access to ainfera.ai and the public information, documentation, graphics, and other materials presented on it. Model weights, code, datasets, hosted services, and private engagements may carry separate licenses or agreements. When a separate agreement applies, it controls for that product or service.",
  },
  {
    index: "02",
    title: "Acceptable use",
    copy: "You may use the site to learn about Ainfera, review public methods, and contact us. Do not interfere with the site's operation or security, attempt unauthorized access, misrepresent affiliation with Ainfera, use the site unlawfully, or use its materials to violate another person's rights.",
  },
  {
    index: "03",
    title: "Materials and licenses",
    copy: "The site and its original content remain the property of Ainfera or the identified rights holder. No right to model weights, source code, trademarks, or confidential material is granted by browsing the site. Any public artifact will state its own license where it is published.",
  },
  {
    index: "04",
    title: "Public information",
    copy: "Product descriptions, plans, availability, and benchmark fields may change. A value shown as N/A is not a result, estimate, or promise. Public material is provided for general information and should not be treated as professional, financial, legal, security, or deployment advice.",
  },
  {
    index: "05",
    title: "Third-party services",
    copy: "The site links to services such as Hugging Face, GitHub, X, and LinkedIn. Those services are operated by third parties and apply their own terms and privacy practices. Ainfera is not responsible for their availability, content, or conduct.",
  },
  {
    index: "06",
    title: "Disclaimers and responsibility",
    copy: "To the extent permitted by applicable law, the public site and its materials are provided as available, without warranties that they will be uninterrupted, error-free, or suitable for a particular purpose. Ainfera is not liable for indirect or consequential loss arising solely from use of the public site.",
  },
  {
    index: "07",
    title: "Changes and contact",
    copy: "We may revise these terms as the site and its public materials change. The effective date identifies the current version. Questions about these terms can be sent through the Contact page.",
  },
];

export default function TermsPage() {
  return (
    <div className="precision-site institution-page legal-institution-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="none" />

      <main id="main-content" className="precision-main">
        <header className="institution-page-hero legal-page-hero" data-nav-hero aria-labelledby="terms-title">
          <div className="institution-page-hero__index"><span>Terms</span><span>LEG / 01</span></div>
          <div className="institution-page-hero__statement">
            <h1 id="terms-title">Terms for using Ainfera&apos;s public materials.</h1>
          </div>
          <div className="institution-page-hero__abstract">
            <p>
              A concise agreement for the public website. Product licenses, model cards, and private
              engagements remain separate records with their own conditions.
            </p>
            <Link className="text-link" href="/contact">Questions about these terms <span aria-hidden="true">↗</span></Link>
          </div>
          <dl className="publication-meta legal-hero-meta">
            <div><dt>Effective</dt><dd>24 July 2026</dd></div>
            <div><dt>Operator</dt><dd>Ainfera Inc.</dd></div>
            <div><dt>Applies to</dt><dd>ainfera.ai</dd></div>
            <div><dt>Revision</dt><dd>01</dd></div>
          </dl>
        </header>

        <section className="institution-chapter legal-document-chapter" aria-labelledby="terms-record-title">
          <div className="institution-chapter__label"><span>01</span><span>Agreement</span></div>
          <div className="institution-chapter__body">
            <div className="institution-thesis">
              <h2 id="terms-record-title">The public site is a record, not a product license.</h2>
              <p>
                By accessing the site, you agree to these terms. If you do not agree, do not use the
                site. Nothing here overrides a model license, service agreement, or other written
                agreement signed with Ainfera.
              </p>
            </div>
            <div className="legal-clause-list">
              {clauses.map((clause) => (
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
