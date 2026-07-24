import Link from "next/link";
import HuggingFaceLogo from "./HuggingFaceLogo";

type FooterLink = { label: string; href?: string; external?: boolean };
type FooterColumn = { heading: string; links: FooterLink[] };

const footerColumns: FooterColumn[] = [
  {
    heading: "Models",
    links: [
      { label: "Neptune 27B", href: "https://huggingface.co/ainfera-ai/Neptune-1.0-27B", external: true },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "Philosophy", href: "/philosophy" },
      { label: "Whitepaper", href: "/whitepaper" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com/ainfera_ai", icon: "x" },
  { label: "Hugging Face", href: "https://huggingface.co/ainfera-ai", icon: "huggingface" },
  { label: "GitHub", href: "https://github.com/ainfera-ai", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ainfera/", icon: "linkedin" },
] as const;

function SocialMark({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  if (name === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .7A11.3 11.3 0 0 0 8.43 22.72c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.47 3.1-1.16 3.1-1.16.62 1.55.23 2.7.12 2.99.72.79 1.15 1.8 1.15 3.03 0 4.34-2.64 5.29-5.15 5.57.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z" />
      </svg>
    );
  }

  if (name === "huggingface") {
    return <HuggingFaceLogo />;
  }

  if (name === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.74-8.85L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.41v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <Link className="site-footer__brand" href="/">
            <img src="/brand/ainfera-mark-ice.svg" alt="" width="22" height="22" />
            <span>ainfera</span>
          </Link>
          <p className="site-footer__tagline">The AI-native model factory</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <span className="site-footer__heading">{column.heading}</span>
              {column.links.map((link) => !link.href ? (
                <span className="site-footer__utility" key={link.label}>{link.label}</span>
              ) : link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
              ) : (
                <Link key={link.label} href={link.href}>{link.label}</Link>
              ))}
            </div>
          ))}
          <div className="site-footer__follow">
            <span className="site-footer__heading">Follow</span>
            <div className="site-footer__socials">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                  <SocialMark name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="site-footer__base">
        <span>© 2026 Ainfera Inc.</span>
      </div>
    </footer>
  );
}
