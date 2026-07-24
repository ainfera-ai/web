type FigureProps = {
  className?: string;
};

function FigureFrame({
  className = "",
  title,
  description,
  children,
  viewBox = "0 0 900 520",
}: FigureProps & {
  title: string;
  description: string;
  children: React.ReactNode;
  viewBox?: string;
}) {
  const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;
  const descriptionId = `${titleId}-description`;

  return (
    <svg
      className={`technical-figure ${className}`.trim()}
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
    >
      <title id={titleId}>{title}</title>
      <desc id={descriptionId}>{description}</desc>
      {children}
    </svg>
  );
}

function Grid({ width = 900, height = 520, step = 40 }: { width?: number; height?: number; step?: number }) {
  return (
    <g className="technical-grid" aria-hidden="true">
      {Array.from({ length: Math.ceil(width / step) + 1 }, (_, index) => (
        <line key={`x-${index}`} x1={index * step} y1="0" x2={index * step} y2={height} />
      ))}
      {Array.from({ length: Math.ceil(height / step) + 1 }, (_, index) => (
        <line key={`y-${index}`} x1="0" y1={index * step} x2={width} y2={index * step} />
      ))}
    </g>
  );
}

export function ModelEnvelopeFigure({ className }: FigureProps) {
  const inputs = [
    ["OBJECTIVE", 164],
    ["SCHEMA", 244],
    ["TASK STATE", 324],
  ] as const;
  const outputs = [
    ["TOOL CALL", 154],
    ["OBSERVATION", 226],
    ["REPAIR", 298],
    ["COMPLETE", 370],
  ] as const;

  return (
    <FigureFrame
      className={className}
      title="Neptune 27B operating envelope"
      description="Prompt, schema, and task state enter Neptune 27B. The model connects tool calls, verification, and recovery across a private agent system."
      viewBox="0 0 1000 600"
    >
      <defs>
        <linearGradient id="neptune-core-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9c7ff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#4fce8d" stopOpacity="0.035" />
        </linearGradient>
      </defs>

      <Grid width={1000} height={600} step={32} />

      <g className="model-architecture-guides" aria-hidden="true">
        <rect x="254" y="74" width="492" height="402" />
        <rect x="282" y="102" width="436" height="346" />
        <path d="M500 74V476 M254 275H746" />
        <ellipse cx="500" cy="275" rx="190" ry="128" />
        <ellipse cx="500" cy="275" rx="146" ry="96" />
      </g>

      <g className="model-architecture-bus technical-lines">
        <path d="M54 124H188V364H54" />
        {inputs.map(([, y]) => <path key={y} d={`M54 ${y}H188L326 244`} />)}
        <path d="M812 112V412" />
        {outputs.map(([, y]) => <path key={y} d={`M674 244L812 ${y}H946`} />)}
        <path className="technical-line-accent model-architecture-return" d="M900 298C900 486 168 506 100 324" />
      </g>

      <g className="technical-labels">
        {inputs.map(([label, y]) => (
          <g key={label}>
            <circle cx="54" cy={y} r="5" />
            <text x="54" y={y - 17}>{label}</text>
          </g>
        ))}
        {outputs.map(([label, y]) => (
          <g key={label}>
            <circle className={label === "REPAIR" ? "is-green" : ""} cx="946" cy={y} r="5" />
            <text className={label === "REPAIR" ? "is-green" : ""} x="946" y={y - 17} textAnchor="end">{label}</text>
          </g>
        ))}
      </g>

      <g className="model-architecture-core technical-core">
        <path className="model-core-top" d="M500 118 674 214 500 310 326 214Z" />
        <path className="model-core-left" d="M326 214V340L500 436V310Z" />
        <path className="model-core-right" d="M500 310V436L674 340V214Z" />
        <path className="technical-core-inset" d="M500 166 590 216 500 266 410 216Z" />
        <path className="model-core-spine" d="M500 166V406" />
        <text className="model-core-number" x="500" y="334">27B</text>
        <text x="500" y="365">NEPTUNE / DENSE CORE</text>
        <text className="technical-subtext" x="500" y="389">OPEN WEIGHTS · AGENT-NATIVE INTERFACE</text>
      </g>

      <g className="model-architecture-hosts technical-labels">
        <path d="M270 510H730" />
        <path d="M270 502V518M424 502V518M578 502V518M730 502V518" />
        <text x="347" y="542" textAnchor="middle">WORKSTATION</text>
        <text x="501" y="542" textAnchor="middle">LOCAL NODE</text>
        <text x="654" y="542" textAnchor="middle">PRIVATE RACK</text>
      </g>

      <g className="technical-meta">
        <text x="28" y="34">FIG.01 / MODEL ARCHITECTURE</text>
        <text x="972" y="34" textAnchor="end">C27 / APPROX. 27B PARAMETERS</text>
        <text x="28" y="574">SYSTEM INTENT / DEVICE CLASSES ARE NOT CLEARANCE CLAIMS</text>
        <text className="is-green" x="972" y="574" textAnchor="end">RELEASE RECORD / RESULTS N/A</text>
      </g>
    </FigureFrame>
  );
}

export function AgentEpisodeFigure({ className }: FigureProps) {
  const nodes = [
    ["INTENT", 238, 258],
    ["PLAN", 352, 142],
    ["ACT", 530, 112],
    ["OBSERVE", 692, 168],
    ["CHECK", 742, 304],
    ["REPAIR", 570, 398],
    ["RETRY", 376, 374],
  ] as const;

  return (
    <FigureFrame
      className={className}
      title="Complete agent episode"
      description="An objective moves through planning, tool calls, observation, repair, and completion without losing the task state."
      viewBox="0 0 1000 560"
    >
      <g className="agent-observatory-guides" aria-hidden="true">
        <ellipse cx="500" cy="264" rx="316" ry="210" />
        <ellipse cx="500" cy="264" rx="242" ry="158" />
        <ellipse cx="500" cy="264" rx="164" ry="104" />
        <path d="M184 264H816M500 54V474" />
        <path d="M276 116 724 412M724 116 276 412" />
      </g>

      <g className="agent-observatory-route episode-route">
        <path d="M238 258C254 194 294 154 352 142C416 128 458 112 530 112C602 112 660 126 692 168C726 212 746 246 742 304" />
        <path className="agent-finish-route" d="M742 304C794 274 842 216 862 138" />
        <path className="episode-return" d="M742 304C714 356 646 392 570 398C488 404 418 398 376 374C322 342 280 304 238 258" />
        <path className="episode-branch" d="M692 168L742 304L570 398L376 374L238 258L352 142L530 112Z" />
      </g>

      <g className="technical-labels">
        {nodes.map(([label, x, y]) => (
          <g key={label}>
            <circle className={label === "REPAIR" ? "is-green" : ""} cx={x} cy={y} r="6" />
            <text className={label === "REPAIR" ? "is-green" : ""} x={x} y={y - 20} textAnchor="middle">{label}</text>
          </g>
        ))}
        <circle className="is-green" cx="862" cy="138" r="7" />
        <text className="is-green" x="862" y="116" textAnchor="middle">FINISH</text>
      </g>

      <g className="agent-observatory-core technical-core">
        <rect x="430" y="216" width="140" height="96" />
        <path className="technical-core-inset" d="M452 240H548V288H452Z" />
        <text x="500" y="258">OBJECTIVE</text>
        <text className="technical-subtext" x="500" y="282">PERSISTS ACROSS THE EPISODE</text>
      </g>

      <g className="agent-state-ledger episode-ledger">
        <path d="M132 500H868" />
        {[
          ["PROMPT", 132],
          ["SCHEMA", 316],
          ["TOOL RESULT", 500],
          ["FAILURE", 684],
          ["STATE KEPT", 868],
        ].map(([label, x], index) => (
          <g key={label}>
            <circle className={index === 4 ? "is-green" : ""} cx={Number(x)} cy="500" r="4" />
            <text className={index === 4 ? "is-green" : ""} x={Number(x)} y="528" textAnchor={index === 0 ? "start" : index === 4 ? "end" : "middle"}>{label}</text>
          </g>
        ))}
      </g>

      <g className="technical-meta">
        <text x="28" y="34">FIG.03 / EPISODE OBSERVATORY</text>
        <text x="972" y="34" textAnchor="end">OBJECTIVE / ACTION / RECOVERY / COMPLETION</text>
        <text x="28" y="548">FAILED PATHS REMAIN INSPECTABLE</text>
        <text className="is-green" x="972" y="548" textAnchor="end">RECOVERY REJOINS THE ORIGINAL TASK</text>
      </g>
    </FigureFrame>
  );
}

export function HostEnvelopeFigure({ className }: FigureProps) {
  const hosts = [
    ["PC", 96, 168],
    ["MAC", 264, 312],
    ["RTX", 432, 456],
    ["SPARK", 600, 624],
    ["RACK", 768, 816],
  ] as const;

  return (
    <FigureFrame
      className={className}
      title="Neptune 27B host envelope"
      description="Neptune 27B is positioned inside a layered private system, from application contract and model interface through runtime and intended host classes."
    >
      <Grid />
      <g className="technical-lines">
        <path d="M100 116 H800 L750 184 H150 Z" />
        <path d="M150 184 H750 L700 252 H200 Z" />
        <path d="M200 252 H700 L650 320 H250 Z" />
        <path className="technical-line-accent" d="M250 320 H650 L592 388 H308 Z" />
        <path d="M450 116 V388" strokeDasharray="4 8" />
      </g>
      <g className="technical-labels">
        <text x="124" y="148">APPLICATION CONTRACT</text>
        <text x="174" y="216">MODEL INTERFACE</text>
        <text x="224" y="284">RUNTIME ENVELOPE</text>
        <text className="is-green" x="274" y="352">INTENDED HOST</text>
      </g>
      <g className="technical-core">
        <rect x="384" y="176" width="132" height="132" />
        <rect className="technical-core-inset" x="404" y="196" width="92" height="92" />
        <text x="450" y="238">NEPTUNE</text>
        <text x="450" y="260">27B</text>
      </g>
      <g className="technical-labels">
        <path d="M84 430 H816" />
        {hosts.map(([label, x1, x2]) => (
          <g key={label}>
            <path d={`M${x1} 422 V438 M${x2} 422 V438`} />
            <text x={(x1 + x2) / 2} y="466" textAnchor="middle">{label}</text>
          </g>
        ))}
      </g>
      <g className="technical-meta">
        <text x="32" y="36">OPERATING ENVELOPE</text>
        <text x="868" y="36" textAnchor="end">SYSTEM INTENT / NOT MEASURED CLEARANCE</text>
        <text x="32" y="500">HOST CLASS PUBLISHES WITH RUNTIME RECORD</text>
      </g>
    </FigureFrame>
  );
}

export function RecoveryProtocolFigure({ className }: FigureProps) {
  const steps = [
    ["ACT", 86, 220],
    ["OBSERVE", 250, 156],
    ["INVALID", 424, 156],
    ["REPAIR", 596, 286],
    ["RETRY", 744, 156],
    ["VERIFY", 842, 88],
  ] as const;

  return (
    <FigureFrame
      className={className}
      title="Neptune recovery protocol"
      description="A failed tool action remains visible to the agent, becomes a repair input, and returns to the original objective through retry and verification."
      viewBox="0 0 900 480"
    >
      <Grid height={480} />
      <g className="episode-route">
        <path d="M86 220 C146 220 184 156 250 156 H424" />
        <path className="episode-return" d="M424 156 C496 156 524 286 596 286 C676 286 682 156 744 156 C790 156 808 88 842 88" />
        <path className="episode-branch" d="M424 156 V358 H250" />
        <path d="M250 358 C146 358 112 294 86 220" strokeDasharray="4 8" />
      </g>
      <g className="technical-labels">
        {steps.map(([label, x, y]) => (
          <g key={label}>
            <rect x={x - 6} y={y - 6} width="12" height="12" />
            <text className={label === "REPAIR" ? "is-green" : ""} x={x} y={y - 22} textAnchor="middle">{label}</text>
          </g>
        ))}
        <text x="250" y="382" textAnchor="middle">FAILED PATH REMAINS PART OF STATE</text>
      </g>
      <g className="episode-ledger">
        <path d="M86 426 H842" />
        <circle cx="86" cy="426" r="4" /><text x="86" y="452">OBJECTIVE</text>
        <circle cx="424" cy="426" r="4" /><text x="424" y="452" textAnchor="middle">FAILURE OBSERVED</text>
        <circle cx="842" cy="426" r="4" /><text x="842" y="452" textAnchor="end">OBJECTIVE PRESERVED</text>
      </g>
      <g className="technical-meta">
        <text x="32" y="36">RECOVERY PROTOCOL</text>
        <text x="868" y="36" textAnchor="end">ACTION / OBSERVATION / REPAIR</text>
      </g>
    </FigureFrame>
  );
}

export function EvidenceChainFigure({ className }: FigureProps) {
  const items = ["MODEL ID", "SUITE", "RUNTIME", "DATE"];
  return (
    <FigureFrame
      className={className}
      title="Evaluation evidence chain"
      description="Model identity, evaluation suite, runtime, and date converge on an observed result or an explicit N/A before entering the public model record."
      viewBox="0 0 820 460"
    >
      <Grid width={820} height={460} />
      <g className="evidence-chain technical-lines">
        {items.map((_, index) => <path key={index} d={`M88 ${108 + index * 72} H286 L364 222`} />)}
        <path className="technical-line-accent" d="M506 222 H714" />
      </g>
      <g className="evidence-inputs technical-labels">
        {items.map((item, index) => (
          <g key={item}>
            <rect x="88" y={90 + index * 72} width="132" height="36" />
            <text x="154" y={113 + index * 72} textAnchor="middle">{item}</text>
          </g>
        ))}
      </g>
      <g className="evidence-result technical-core">
        <rect x="364" y="158" width="142" height="128" />
        <text x="435" y="210">OBSERVED</text>
        <text x="435" y="234">RESULT</text>
        <text className="technical-subtext" x="435" y="260">OR EXPLICIT N/A</text>
      </g>
      <g className="evidence-card technical-labels">
        <rect x="624" y="166" width="112" height="112" />
        <text className="is-green" x="680" y="216" textAnchor="middle">MODEL</text>
        <text className="is-green" x="680" y="238" textAnchor="middle">RECORD</text>
      </g>
      <g className="technical-meta">
        <text x="28" y="34">CLAIM BOUNDARY</text>
        <text x="792" y="34" textAnchor="end">CONDITIONS TRAVEL WITH THE NUMBER</text>
        <text x="28" y="428">NO ESTIMATE PRESENTED AS OBSERVATION</text>
      </g>
    </FigureFrame>
  );
}

export function ClaimBoundaryFigure({ className }: FigureProps) {
  return (
    <FigureFrame
      className={className}
      title="Public claim boundary"
      description="A public claim becomes stronger only as evaluation specificity and evidence depth increase. Targets and estimates remain outside the observed result boundary."
      viewBox="0 0 820 460"
    >
      <Grid width={820} height={460} />
      <g className="technical-lines">
        <path d="M92 374 V78 M92 374 H752" />
        <path d="M170 334 C282 294 338 250 420 194 C506 136 610 106 704 98" />
        <path className="technical-line-accent" d="M352 270 C438 204 536 152 704 98" />
        <path d="M352 270 H704 V98" strokeDasharray="4 8" />
      </g>
      <g className="technical-labels">
        <circle cx="170" cy="334" r="5" /><text x="170" y="314" textAnchor="middle">TARGET</text>
        <circle cx="270" cy="300" r="5" /><text x="270" y="280" textAnchor="middle">ESTIMATE</text>
        <circle cx="352" cy="270" r="5" /><text x="352" y="250" textAnchor="middle">OBSERVATION</text>
        <circle className="is-green" cx="704" cy="98" r="6" /><text className="is-green" x="704" y="76" textAnchor="middle">PUBLIC CLAIM</text>
        <text x="422" y="414" textAnchor="middle">EVALUATION SPECIFICITY</text>
        <text x="44" y="226" textAnchor="middle" transform="rotate(-90 44 226)">EVIDENCE DEPTH</text>
      </g>
      <g className="technical-meta">
        <text x="28" y="34">CLAIM BOUNDARY</text>
        <text x="792" y="34" textAnchor="end">OBSERVATION BEFORE ASSERTION</text>
        <text x="514" y="286">CONDITIONS ATTACHED</text>
      </g>
    </FigureFrame>
  );
}

export function MethodRecordFigure({ className }: FigureProps) {
  const columns = [
    ["IDENTITY", "MODEL / REVISION", 56],
    ["WORKLOAD", "SUITE / DATA", 236],
    ["RUNTIME", "HOST / FORMAT", 416],
    ["OBSERVATION", "RESULT / DATE", 596],
  ] as const;

  return (
    <FigureFrame
      className={className}
      title="Evaluation method record"
      description="Four complete fields, identity, workload, runtime, and observation, compose the public record. The result remains N/A until every field is attached."
      viewBox="0 0 900 520"
    >
      <Grid />
      <g className="technical-labels">
        {columns.map(([label, sublabel, x], index) => (
          <g key={label}>
            <rect x={x} y="88" width="152" height="248" />
            <text x={x + 18} y="122">0{index + 1}</text>
            <text x={x + 18} y="174">{label}</text>
            <text x={x + 18} y="198">{sublabel}</text>
            <path d={`M${x + 18} 232 H${x + 134}`} />
            <path d={`M${x + 18} 264 H${x + 110}`} />
            <path d={`M${x + 18} 296 H${x + 124}`} />
          </g>
        ))}
      </g>
      <g className="technical-lines">
        <path d="M132 336 V390 H768 V336" />
        <path className="technical-line-accent" d="M450 390 V438 H768" />
      </g>
      <g className="technical-labels">
        <rect x="658" y="404" width="110" height="68" />
        <text className="is-green" x="713" y="434" textAnchor="middle">PUBLIC</text>
        <text className="is-green" x="713" y="454" textAnchor="middle">RECORD</text>
        <text x="132" y="420">COMPLETE FIELDS</text>
      </g>
      <g className="technical-meta">
        <text x="32" y="36">EVALUATION METHOD</text>
        <text x="868" y="36" textAnchor="end">FOUR FIELDS / ONE CLAIM</text>
        <text x="32" y="494">RESULT STATE: OBSERVED OR N/A</text>
      </g>
    </FigureFrame>
  );
}

export function CompanySystemFigure({ className }: FigureProps) {
  return (
    <FigureFrame
      className={className}
      title="Ainfera model system"
      description="Ainfera joins open weights, agent behavior, and a reproducible model record into one product definition."
      viewBox="0 0 820 480"
    >
      <Grid width={820} height={480} />
      <g className="company-axis technical-lines">
        <path d="M108 240 H712" />
        <path d="M410 92 V388" />
        <circle cx="410" cy="240" r="118" />
        <circle cx="410" cy="240" r="176" />
      </g>
      <g className="company-nodes technical-labels">
        <g><rect x="72" y="204" width="164" height="72" /><text x="154" y="234" textAnchor="middle">OPEN WEIGHTS</text><text x="154" y="255" textAnchor="middle">INSPECTABLE</text></g>
        <g><rect x="328" y="204" width="164" height="72" /><text x="410" y="234" textAnchor="middle">AGENT BEHAVIOR</text><text x="410" y="255" textAnchor="middle">EPISODE-LEVEL</text></g>
        <g><rect x="584" y="204" width="164" height="72" /><text className="is-green" x="666" y="234" textAnchor="middle">MODEL RECORD</text><text className="is-green" x="666" y="255" textAnchor="middle">CONDITIONS ATTACHED</text></g>
      </g>
      <g className="technical-meta">
        <text x="28" y="34">AINFERA / PRODUCT DEFINITION</text>
        <text x="792" y="34" textAnchor="end">MODEL + BEHAVIOR + EVIDENCE</text>
      </g>
    </FigureFrame>
  );
}

export function WorkloadFitFigure({ className }: FigureProps) {
  const inputs = ["WORKLOAD", "SYSTEM", "PROOF CONDITION"];
  return (
    <FigureFrame
      className={className}
      title="Workload fit review"
      description="The workload, deployment system, and proof condition define the engagement before a model recommendation is made."
      viewBox="0 0 780 480"
    >
      <Grid width={780} height={480} />
      <g className="technical-lines">
        {inputs.map((_, index) => <path key={index} d={`M72 ${126 + index * 96} H286 L378 240`} />)}
        <path className="technical-line-accent" d="M486 240 H704" />
      </g>
      <g className="technical-labels">
        {inputs.map((label, index) => (
          <g key={label}><rect x="72" y={106 + index * 96} width="156" height="40" /><text x="150" y={131 + index * 96} textAnchor="middle">{label}</text></g>
        ))}
        <rect x="326" y="186" width="160" height="108" />
        <text x="406" y="232" textAnchor="middle">FIT</text>
        <text x="406" y="254" textAnchor="middle">REVIEW</text>
        <rect x="594" y="192" width="110" height="96" />
        <text className="is-green" x="649" y="232" textAnchor="middle">CLEAR</text>
        <text className="is-green" x="649" y="254" textAnchor="middle">NEXT STEP</text>
      </g>
      <g className="technical-meta">
        <text x="28" y="34">ENTERPRISE INTAKE</text>
        <text x="752" y="34" textAnchor="end">DECISION BEFORE DEPLOYMENT</text>
      </g>
    </FigureFrame>
  );
}

export function InterfaceFigure({ className }: FigureProps) {
  return (
    <FigureFrame
      className={className}
      title="Agent-native interface contract"
      description="A request carries intent, tools, and state into the model, then returns a structured action, observation, or final answer."
      viewBox="0 0 820 460"
    >
      <Grid width={820} height={460} />
      <g className="interface-columns technical-labels">
        <rect x="66" y="88" width="210" height="280" />
        <rect x="305" y="88" width="210" height="280" />
        <rect x="544" y="88" width="210" height="280" />
        <text x="86" y="122">REQUEST</text>
        <text x="325" y="122">NEPTUNE</text>
        <text x="564" y="122">RESPONSE</text>
        <text x="86" y="172">intent</text><text x="86" y="210">tools[]</text><text x="86" y="248">state</text>
        <text x="325" y="172">select</text><text x="325" y="210">reason</text><text x="325" y="248">verify</text><text x="325" y="286">recover</text>
        <text x="564" y="172">tool_call</text><text x="564" y="210">observation</text><text x="564" y="248">final</text>
      </g>
      <g className="technical-lines">
        <path d="M276 228 H305" /><path className="technical-line-accent" d="M515 228 H544" />
      </g>
      <g className="technical-meta">
        <text x="28" y="34">INTERFACE CONTRACT</text>
        <text x="792" y="34" textAnchor="end">EXPLICIT INPUT / EXPLICIT ACTION</text>
        <text x="28" y="422">ILLUSTRATIVE SHAPE / EXACT REPOSITORY INSTRUCTIONS PUBLISH WITH THE MODEL CARD</text>
      </g>
    </FigureFrame>
  );
}
