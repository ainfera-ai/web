import Image from "next/image";
import Link from "next/link";
import LaunchHero from "@/components/LaunchHero";

const pathways = [
  {
    key: "neptune",
    category: "Model program",
    title: "Neptune 27B",
    description: "A 27B-class program for long-horizon private agent systems, planned for open-weight release.",
    status: "In training",
    href: "/neptune-27b",
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
          <h2 id="gateway-title">Two model programs. One lifecycle system.</h2>
          <p>
            Neptune targets long-horizon agent work. Aeneas targets native tool use within explicit
            policy boundaries. Factory connects model definition, interface, evaluation conditions,
            and release evidence.
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
                sizes={pathway.key === "neptune" ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 38vw"}
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
