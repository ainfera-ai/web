const bars = Array.from({ length: 48 }, (_, index) => {
  const phase = index / 47;
  return {
    x: 68 + index * 21.7,
    top: 180 - Math.sin(phase * Math.PI * 3.2) * 38,
    bottom: 405 + Math.cos(phase * Math.PI * 2.4) * 34,
    active: index === 7 || index === 19 || index === 31 || index === 42,
  };
});

function FigureTitle({
  title,
  description,
  titleId,
  descriptionId,
}: {
  title: string;
  description: string;
  titleId: string;
  descriptionId: string;
}) {
  return (
    <>
      <title id={titleId}>{title}</title>
      <desc id={descriptionId}>{description}</desc>
    </>
  );
}

export function FactoryRegisterFigure() {
  return (
    <svg
      className="institution-page-figure institution-page-figure--factory"
      viewBox="0 0 1200 620"
      role="img"
      aria-labelledby="factory-register-title factory-register-description"
    >
      <FigureTitle
        titleId="factory-register-title"
        descriptionId="factory-register-description"
        title="AI-native factory register"
        description="A four-stage register connecting model definition, interface, evaluation, and release record."
      />
      <defs>
        <linearGradient id="factory-line" x1="0" x2="1">
          <stop offset="0" stopColor="#eef3fb" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#a9c7ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#eef3fb" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <g className="page-figure-grid">
        {Array.from({ length: 14 }, (_, index) => (
          <line key={`h-${index}`} x1="48" x2="1152" y1={92 + index * 34} y2={92 + index * 34} />
        ))}
        {Array.from({ length: 25 }, (_, index) => (
          <line key={`v-${index}`} x1={48 + index * 46} x2={48 + index * 46} y1="92" y2="534" />
        ))}
      </g>

      <text className="page-figure-meta" x="48" y="50">FACTORY REGISTER / ONE RELEASE OBJECT</text>
      <text className="page-figure-meta page-figure-meta--end" x="1152" y="50">DEFINITION → EVIDENCE → RECORD</text>

      <g className="page-figure-bars">
        {bars.map((bar, index) => (
          <g key={index}>
            <line x1={bar.x} x2={bar.x} y1="118" y2="496" className="page-figure-bar-rail" />
            <line
              x1={bar.x}
              x2={bar.x}
              y1={bar.top}
              y2={bar.bottom}
              className={bar.active ? "page-figure-bar page-figure-bar--active" : "page-figure-bar"}
            />
          </g>
        ))}
      </g>

      <line className="page-figure-axis" x1="48" x2="1152" y1="314" y2="314" />
      {[190, 450, 710, 970].map((x, index) => (
        <g key={x}>
          <circle className="page-figure-node" cx={x} cy="314" r="7" />
          <text className="page-figure-index" x={x} y="348">0{index + 1}</text>
        </g>
      ))}

      <g className="page-figure-stage-labels">
        <text x="68" y="568">DEFINE</text>
        <text x="328" y="568">INTERFACE</text>
        <text x="588" y="568">EVALUATE</text>
        <text x="848" y="568">RELEASE</text>
      </g>
      <line x1="48" x2="1152" y1="590" y2="590" stroke="url(#factory-line)" />
    </svg>
  );
}

export function EvidenceThresholdFigure() {
  const rows = ["OBJECT", "WORKLOAD", "RUNTIME", "OBSERVATION"];
  return (
    <svg
      className="institution-page-figure institution-page-figure--evidence"
      viewBox="0 0 980 560"
      role="img"
      aria-labelledby="evidence-threshold-title evidence-threshold-description"
    >
      <FigureTitle
        titleId="evidence-threshold-title"
        descriptionId="evidence-threshold-description"
        title="Evidence threshold"
        description="A claim register showing the object, workload, runtime, and observation fields required before a public result."
      />
      <g className="page-figure-grid">
        {Array.from({ length: 18 }, (_, index) => (
          <line key={`v-${index}`} x1={40 + index * 52} x2={40 + index * 52} y1="84" y2="502" />
        ))}
        {Array.from({ length: 10 }, (_, index) => (
          <line key={`h-${index}`} x1="40" x2="940" y1={84 + index * 46} y2={84 + index * 46} />
        ))}
      </g>
      <text className="page-figure-meta" x="40" y="46">CLAIM REGISTER / PUBLIC THRESHOLD</text>
      <text className="page-figure-meta page-figure-meta--end" x="940" y="46">STATUS / WITHHELD UNTIL OBSERVED</text>

      <line className="page-figure-threshold" x1="734" x2="734" y1="84" y2="502" />
      <text className="page-figure-meta" x="750" y="105">PUBLIC LINE</text>

      {rows.map((row, index) => {
        const y = 154 + index * 88;
        return (
          <g key={row} className="page-figure-evidence-row">
            <text x="58" y={y}>{`0${index + 1} / ${row}`}</text>
            <line x1="214" x2="690" y1={y - 7} y2={y - 7} />
            <circle cx={index === 3 ? 690 : 530 + index * 42} cy={y - 7} r="6" />
            <line x1="734" x2="895" y1={y - 7} y2={y - 7} className="page-figure-result-line" />
          </g>
        );
      })}

      <text className="page-figure-serif" x="802" y="333">N/A</text>
      <text className="page-figure-meta" x="752" y="480">NO NUMBER WITHOUT ITS CONDITIONS</text>
    </svg>
  );
}

export function PublicationRecordFigure() {
  return (
    <svg
      className="institution-page-figure institution-page-figure--record"
      viewBox="0 0 1100 620"
      role="img"
      aria-labelledby="publication-record-title publication-record-description"
    >
      <FigureTitle
        titleId="publication-record-title"
        descriptionId="publication-record-description"
        title="Publication record architecture"
        description="A restrained publication plate showing how identity, method, conditions, and observations bind into one model record."
      />
      <g className="page-figure-grid">
        {Array.from({ length: 22 }, (_, index) => (
          <line key={`v-${index}`} x1={42 + index * 49} x2={42 + index * 49} y1="92" y2="566" />
        ))}
        {Array.from({ length: 12 }, (_, index) => (
          <line key={`h-${index}`} x1="42" x2="1058" y1={92 + index * 43} y2={92 + index * 43} />
        ))}
      </g>
      <text className="page-figure-meta" x="42" y="48">MODEL RECORD / NEPTUNE 27B</text>
      <text className="page-figure-meta page-figure-meta--end" x="1058" y="48">PUBLIC METHOD / REV. 01</text>

      <rect className="page-figure-record-sheet" x="86" y="124" width="642" height="398" />
      <line className="page-figure-axis" x1="86" x2="728" y1="196" y2="196" />
      <line className="page-figure-axis" x1="248" x2="248" y1="124" y2="522" />
      {["IDENTITY", "WORKLOAD", "RUNTIME", "OBSERVATION"].map((label, index) => {
        const y = 252 + index * 72;
        return (
          <g key={label} className="page-figure-record-row">
            <text x="112" y={y}>{`0${index + 1}`}</text>
            <text x="278" y={y}>{label}</text>
            <line x1="438" x2="682" y1={y - 6} y2={y - 6} />
            <rect x={626 - index * 21} y={y - 11} width={56 + index * 21} height="10" />
          </g>
        );
      })}
      <text className="page-figure-meta" x="112" y="165">RECORD FIELD</text>
      <text className="page-figure-meta" x="278" y="165">REQUIRED CONTEXT</text>

      <g className="page-figure-release-object">
        <text className="page-figure-meta" x="780" y="142">RELEASE OBJECT</text>
        <text className="page-figure-serif" x="780" y="284">27B</text>
        <line x1="780" x2="1014" y1="315" y2="315" />
        <text x="780" y="350">OPEN DENSE</text>
        <text x="780" y="384">AGENT-NATIVE</text>
        <text x="780" y="418">RESULTS / N/A</text>
        <line x1="780" x2="1014" y1="454" y2="454" />
        <text className="page-figure-meta" x="780" y="486">IDENTITY AND CONDITIONS</text>
        <text className="page-figure-meta" x="780" y="505">TRAVEL WITH THE CLAIM</text>
      </g>
    </svg>
  );
}

export function ContactIntakeFigure() {
  const segments = [
    { label: "TASK", code: "01 / OBJECT", start: 70, end: 366 },
    { label: "SYSTEM", code: "02 / ENVELOPE", start: 366, end: 730 },
    { label: "PROOF", code: "03 / DECISION", start: 730, end: 1130 },
  ];

  const rails = Array.from({ length: 45 }, (_, index) => {
    const x = 72 + index * 23.6;
    const wave = Math.sin(index * 0.43) * 28;
    const center = index < 13 ? 294 : index < 29 ? 338 : 278;
    const height = index % 7 === 0 ? 142 : 82 + Math.abs(wave);
    return { x, top: center - height, bottom: center + height, active: [5, 17, 28, 39].includes(index) };
  });

  return (
    <svg
      className="institution-page-figure institution-page-figure--contact"
      viewBox="0 0 1200 610"
      role="img"
      aria-labelledby="contact-intake-title contact-intake-description"
    >
      <FigureTitle
        titleId="contact-intake-title"
        descriptionId="contact-intake-description"
        title="Workload intake register"
        description="A three-part operating brief connecting the task, its system envelope, and the evidence required for a decision."
      />

      <g className="page-figure-grid">
        {Array.from({ length: 12 }, (_, index) => (
          <line key={`contact-h-${index}`} x1="48" x2="1152" y1={96 + index * 38} y2={96 + index * 38} />
        ))}
        {Array.from({ length: 25 }, (_, index) => (
          <line key={`contact-v-${index}`} x1={48 + index * 46} x2={48 + index * 46} y1="96" y2="514" />
        ))}
      </g>

      <text className="page-figure-meta" x="48" y="48">OPERATING BRIEF / WORKLOAD INTAKE</text>
      <text className="page-figure-meta page-figure-meta--end" x="1152" y="48">TASK → SYSTEM → PROOF</text>

      <g className="contact-figure-rails">
        {rails.map((rail, index) => (
          <g key={index}>
            <line className="contact-figure-rail" x1={rail.x} x2={rail.x} y1="116" y2="492" />
            <line
              className={rail.active ? "contact-figure-range contact-figure-range--active" : "contact-figure-range"}
              x1={rail.x}
              x2={rail.x}
              y1={rail.top}
              y2={rail.bottom}
            />
          </g>
        ))}
      </g>

      <line className="page-figure-axis" x1="48" x2="1152" y1="314" y2="314" />
      {segments.map((segment, index) => (
        <g className="contact-figure-segment" key={segment.label}>
          <line x1={segment.start} x2={segment.start} y1="96" y2="514" />
          <circle cx={segment.start} cy="314" r="7" />
          <text className="page-figure-meta" x={segment.start + 18} y="128">{segment.code}</text>
          <text x={segment.start + 18} y="468">{segment.label}</text>
          <text className="page-figure-meta" x={segment.start + 18} y="492">
            {index === 0 ? "WHAT MUST COMPLETE" : index === 1 ? "WHERE IT MUST RUN" : "WHAT EARNS A YES"}
          </text>
        </g>
      ))}
      <line className="contact-figure-segment" x1="1130" x2="1130" y1="96" y2="514" />

      <text className="page-figure-meta" x="48" y="558">ONE INQUIRY / ONE OPERATING BOUNDARY</text>
      <text className="page-figure-meta page-figure-meta--end" x="1152" y="558">OUTPUT / FIT · LIMITS · NEXT TEST</text>
    </svg>
  );
}
