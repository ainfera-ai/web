import Image from "next/image";
import Link from "next/link";
import LaunchHero from "@/components/LaunchHero";

const pathways = [
  {
    key: "studiotune",
    category: "Public product",
    title: "StudioTune",
    description: "A beta platform for shaping model behavior with a visible proof trail.",
    status: "Beta release",
    href: "https://studiotune.ai",
    image: "/images/studiotune-builder-demo.png",
    alt: "StudioTune Desktop beta builder showing a model, dataset, goal, and next action in the experiment workspace",
  },
  {
    key: "aeneas",
    category: "Model program",
    title: "Aeneas 9B",
    description: "A compact 9B-class model program for native tool use within explicit policy boundaries.",
    status: "In training",
    href: "/aeneas-9b",
    image: "/images/source-photos/aeneas-rome-blue-hour.jpg",
    alt: "The Tiber and Saint Peter's Basilica in Rome during blue hour",
  },
  {
    key: "factory",
    category: "Model lifecycle system",
    title: "Factory",
    description: "Connects model definition, interface, evaluation conditions, and release evidence.",
    status: "Definition to release",
    href: "/factory",
    image: "/images/source-photos/factory-m87-hq.jpg",
    alt: "The Event Horizon Telescope image of the M87 supermassive black hole",
  },
];

export default function LandingContent() {
  return (
    <main id="main-content" className="precision-main precision-home landing-home">
      <LaunchHero />

      <section id="products" className="landing-gateway" aria-labelledby="gateway-title">
        <header className="landing-gateway__header" data-reveal="on">
          <div className="landing-gateway__index">
            <span>Ainfera</span>
            <span>Product register / 2026</span>
          </div>
          <h2 id="gateway-title">One public product. One model track. One method.</h2>
          <p>
            StudioTune is the public beta product for shaping model behavior. Mercury is a separate
            iPhone-fit model track derived from Qwen3.8-27B. It is in training; device, quality, and
            release validation remain pending.
          </p>
        </header>

        <div className="landing-gateway__grid" data-reveal="on" data-reveal-group="stagger">
          {pathways.map((pathway) => (
            <Link
              className={`gateway-card gateway-card--${pathway.key}`}
              href={pathway.href}
              key={pathway.key}
            >
              <Image
                src={pathway.image}
                alt={pathway.alt}
                fill
                quality={90}
                unoptimized={pathway.key === "studiotune"}
                sizes={pathway.key === "studiotune" ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 38vw"}
              />
              <span className="gateway-card__veil" aria-hidden="true" />
              <span className="gateway-card__meta">
                <span>{pathway.category}</span>
                <span>{pathway.status}</span>
              </span>
              <span className="gateway-card__copy">
                <strong>{pathway.title}</strong>
                <span>{pathway.description}</span>
              </span>
              <span className="gateway-card__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
