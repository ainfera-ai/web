import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";

type LaunchHeroProps = {
  imageSrc?: string;
  imageAlt?: string;
  showVideo?: boolean;
  eyebrow?: string;
  titleLines?: string[];
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export default function LaunchHero({
  imageSrc,
  imageAlt = "",
  showVideo = true,
  eyebrow,
  titleLines = ["The AI-native", "model factory."],
  description = "Neptune and Aeneas are model programs for agent systems. Factory connects definition, interface, evaluation, and release evidence.",
  primaryAction = { label: "Explore products", href: "/#products" },
  secondaryAction = { label: "Read the method", href: "/whitepaper" },
}: LaunchHeroProps = {}) {
  const renderAction = (
    action: { label: string; href: string },
    className: string,
  ) => action.href.startsWith("http") ? (
    <a className={className} href={action.href} target="_blank" rel="noreferrer">
      {action.label}
    </a>
  ) : (
    <Link className={className} href={action.href}>{action.label}</Link>
  );

  return (
    <section
      className={`home-hero${showVideo ? "" : " home-hero--still"}`}
      data-nav-hero
      aria-labelledby="home-title"
    >
      <div
        className="home-hero__media"
        aria-hidden={showVideo || !imageAlt ? "true" : undefined}
      >
        {showVideo ? (
          <HeroVideo />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
          />
        ) : null}
      </div>
      <div className="home-hero__veil" aria-hidden="true" />
      <div className="home-hero__copy">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 id="home-title">
          {titleLines.map((line, index) => (
            <span key={line}>{index > 0 ? <br /> : null}{line}</span>
          ))}
        </h1>
        <p>{description}</p>
        <div className="button-row">
          {renderAction(primaryAction, "button button--primary")}
          {renderAction(secondaryAction, "text-link")}
        </div>
      </div>
    </section>
  );
}
