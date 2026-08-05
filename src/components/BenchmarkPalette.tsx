import Link from "next/link";

type BenchmarkPaletteProps = {
  model?: "Neptune 27B" | "Aeneas 9B";
  compact?: boolean;
};

const MEASURES = {
  "Neptune 27B": [
    { code: "AFR", label: "Agent finish rate", scope: "Complete task episodes", result: "N/A" },
    { code: "TJV", label: "Tool JSON validity", scope: "Schema-valid calls and arguments", result: "N/A" },
    { code: "RAF", label: "Recovery after failure", scope: "Repair after rejected or malformed calls", result: "N/A" },
    { code: "THR", label: "Thrash ratio", scope: "Repeated or unnecessary action loops", result: "N/A" },
    { code: "VAC", label: "VAC per cost and time", scope: "Value-adjusted completion by envelope", result: "N/A" },
  ],
  "Aeneas 9B": [
    { code: "TCV", label: "Tool-choice validity", scope: "Required actions and admitted tools", result: "N/A" },
    { code: "AJV", label: "Argument JSON validity", scope: "Schema-valid arguments and calls", result: "N/A" },
    { code: "ABT", label: "Appropriate abstention", scope: "Explicit no-tool behavior when action is unwarranted", result: "N/A" },
    { code: "CLR", label: "Clarification when required", scope: "Missing information requested before action", result: "N/A" },
    { code: "RAF", label: "Recovery after failure", scope: "Repair after rejected or malformed calls", result: "N/A" },
  ],
} as const;

const CONDITIONS = [
  ["01", "Model", "Exact revision"],
  ["02", "Suite", "Named workload"],
  ["03", "Runtime", "Host and format"],
  ["04", "Date", "Observed window"],
  ["05", "Result", "Observed or N/A"],
] as const;

export default function BenchmarkPalette({ model = "Neptune 27B", compact = false }: BenchmarkPaletteProps) {
  const measures = MEASURES[model];
  const rows = compact ? measures.slice(0, 4) : measures;

  return (
    <section className={`benchmark-register${compact ? " benchmark-register--compact" : ""}`} aria-labelledby={`benchmark-title-${model.replace(/\s/g, "-")}`}>
      <header className="benchmark-register__header" data-reveal="on">
        <div>
          <span className="eyebrow">Benchmark</span>
          <h2 id={`benchmark-title-${model.replace(/\s/g, "-")}`}>No number without its conditions.</h2>
        </div>
        <p>
          Public benchmark data for {model} is N/A. When results are available, every value will carry
          the exact model, suite, runtime, date, and uncertainty needed to interpret it.
        </p>
      </header>

      <div className="benchmark-register__sheet" data-reveal="on">
        <div className="benchmark-register__mast">
          <div>
            <span>Evaluation register / {model}</span>
            <small>Release field · values publish only with complete conditions</small>
          </div>
          <div className="benchmark-register__status">
            <span>Public state</span>
            <strong>N/A</strong>
          </div>
        </div>

        <div className="benchmark-register__plot" aria-label={`${model} public benchmark result field`}>
          <div className="benchmark-register__axis" aria-hidden="true">
            <span>Measure / evaluation view</span>
            <div>
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
            <span>Public result</span>
          </div>

          {rows.map((measure, index) => (
            <div className="benchmark-register__row" key={measure.label}>
              <div className="benchmark-register__measure">
                <span>{String(index + 1).padStart(2, "0")} / {measure.code}</span>
                <strong>{measure.label}</strong>
                <small>{measure.scope}</small>
              </div>
              <div className="benchmark-register__track" aria-hidden="true">
                <i /><i /><i /><i /><i />
                <span>Awaiting observed value</span>
              </div>
              <output aria-label={`${measure.label} public result`}>{measure.result}</output>
            </div>
          ))}
        </div>

        <div className="benchmark-register__condition-grid" aria-label="Required result conditions">
          {CONDITIONS.map(([number, condition, detail]) => (
            <div key={condition}>
              <span>{number}</span>
              <strong>{condition}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>

        <footer className="benchmark-register__footer">
          <span>Targets, estimates, and unconditioned numbers stay outside the public result field.</span>
          <Link href="/whitepaper">Read the evaluation method <span aria-hidden="true">↗</span></Link>
        </footer>
      </div>
    </section>
  );
}
