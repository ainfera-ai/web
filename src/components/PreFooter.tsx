import Link from "next/link";
import ContinuityFieldVisual from "./ContinuityFieldVisual";

export default function PreFooter() {
  return (
    <section className="continuity-field" aria-labelledby="continuity-field-title">
      <ContinuityFieldVisual />
      <div className="continuity-field__veil" aria-hidden="true" />
      <div className="continuity-field__content">
        <h2 id="continuity-field-title">Built by agents, for agents.</h2>
        <Link className="button button--primary continuity-field__cta" href="/factory">
          Factory
        </Link>
      </div>
    </section>
  );
}
