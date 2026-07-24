const neptuneRanges = Array.from({ length: 42 }, (_, index) => {
  const x = 64 + index * 14.2;
  const center = 288 + Math.sin(index * 0.47) * 58 + Math.cos(index * 0.19) * 22;
  const span = 48 + (index % 6) * 7;
  return { x, y1: center - span, y2: center + span };
});

const episodeRanges = Array.from({ length: 48 }, (_, index) => {
  const x = 62 + index * 18.2;
  const phase = index < 16 ? 0 : index < 32 ? 1 : 2;
  const centers = [218, 306, 234];
  const center = centers[phase] + Math.sin(index * 0.52) * 18;
  const span = phase === 1 ? 60 : 46;
  return { x, y1: center - span, y2: center + span, phase };
});

export function NeptuneIndexFigure() {
  return (
    <svg
      className="institutional-figure institutional-figure--neptune"
      viewBox="0 0 980 590"
      role="img"
      aria-labelledby="neptune-index-title neptune-index-description"
    >
      <title id="neptune-index-title">Neptune 27B model register</title>
      <desc id="neptune-index-description">
        A restrained parameter register describing Neptune 27B as an open dense, agent-native model with public benchmark values pending.
      </desc>

      <defs>
        <linearGradient id="neptune-field" x1="0" x2="1">
          <stop offset="0" stopColor="#f1f4fa" stopOpacity="0" />
          <stop offset="0.46" stopColor="#f1f4fa" stopOpacity="0.035" />
          <stop offset="1" stopColor="#a9c7ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect className="institutional-figure__wash" x="42" y="82" width="626" height="404" fill="url(#neptune-field)" />

      <g className="institutional-figure__meta">
        <text x="42" y="35">MODEL REGISTER / NEPTUNE 27B</text>
        <text x="938" y="35" textAnchor="end">OPEN DENSE / AGENT-NATIVE</text>
        <text x="42" y="558">SYSTEM ENVELOPE / PRIVATE DEPLOYMENT</text>
        <text x="938" y="558" textAnchor="end">PUBLIC RESULT / N/A</text>
      </g>

      <g className="institutional-figure__rule-field">
        {neptuneRanges.map(({ x }) => (
          <line key={`rule-${x}`} x1={x} x2={x} y1="82" y2="486" />
        ))}
      </g>

      <g className="institutional-figure__range-field">
        {neptuneRanges.map(({ x, y1, y2 }, index) => (
          <line
            className={index % 7 === 0 || index % 11 === 0 ? "is-key" : undefined}
            key={`range-${x}`}
            x1={x}
            x2={x}
            y1={y1}
            y2={y2}
          />
        ))}
      </g>

      <g className="institutional-figure__axis">
        <line x1="42" x2="668" y1="82" y2="82" />
        <line x1="42" x2="668" y1="486" y2="486" />
        <line x1="42" x2="668" y1="286" y2="286" />
        <text x="42" y="69">PARAMETER SIGNAL / DECLARATIVE VIEW</text>
        <text x="668" y="505" textAnchor="end">NOT A PERFORMANCE MEASURE</text>
      </g>

      <g className="institutional-figure__datum institutional-figure__datum--neptune">
        <line x1="716" x2="938" y1="82" y2="82" />
        <text x="716" y="116">MODEL CLASS</text>
        <text className="institutional-figure__number" x="710" y="252">27B</text>
        <text x="716" y="280">APPROXIMATE PARAMETER CLASS</text>

        <line x1="716" x2="938" y1="322" y2="322" />
        <text x="716" y="352">SYSTEM INTERFACE</text>
        <text className="institutional-figure__value" x="938" y="352" textAnchor="end">AGENT-NATIVE</text>
        <text x="716" y="389">DEPLOYMENT INTENT</text>
        <text className="institutional-figure__value" x="938" y="389" textAnchor="end">PRIVATE SYSTEMS</text>
        <text x="716" y="426">PUBLIC RESULTS</text>
        <text className="institutional-figure__value" x="938" y="426" textAnchor="end">N/A</text>

        <line x1="716" x2="938" y1="458" y2="458" />
        <text x="716" y="481">TOOLS</text>
        <text x="794" y="481">STATE</text>
        <text x="872" y="481">RECOVERY</text>
        <circle cx="736" cy="507" r="4" />
        <circle cx="814" cy="507" r="4" />
        <circle cx="902" cy="507" r="4" />
        <line x1="736" x2="902" y1="507" y2="507" />
      </g>
    </svg>
  );
}

export function AgentLedgerFigure() {
  return (
    <svg
      className="institutional-figure institutional-figure--agent"
      viewBox="0 0 980 590"
      role="img"
      aria-labelledby="agent-ledger-title agent-ledger-description"
    >
      <title id="agent-ledger-title">Agent episode ledger</title>
      <desc id="agent-ledger-description">
        A continuous episode register connecting tool use, persistent state, and recovery to one retained objective.
      </desc>

      <g className="institutional-figure__meta">
        <text x="42" y="35">EPISODE LEDGER / ONE OBJECTIVE</text>
        <text x="938" y="35" textAnchor="end">ACTION → OBSERVATION → REPAIR</text>
        <text x="42" y="558">AGENT-NATIVE SYSTEM CONTRACT</text>
        <text x="938" y="558" textAnchor="end">STATE REMAINS ATTACHED</text>
      </g>

      <g className="institutional-figure__rule-field institutional-figure__rule-field--episode">
        {episodeRanges.map(({ x }) => (
          <line key={`episode-rule-${x}`} x1={x} x2={x} y1="88" y2="480" />
        ))}
      </g>

      <g className="institutional-figure__range-field institutional-figure__range-field--episode">
        {episodeRanges.map(({ x, y1, y2, phase }, index) => (
          <line
            className={`${phase === 1 ? "is-state" : ""}${index % 9 === 0 ? " is-key" : ""}`.trim()}
            key={`episode-range-${x}`}
            x1={x}
            x2={x}
            y1={y1}
            y2={y2}
          />
        ))}
      </g>

      <g className="institutional-figure__axis institutional-figure__axis--episode">
        <line x1="42" x2="938" y1="88" y2="88" />
        <line x1="42" x2="938" y1="480" y2="480" />
        <line className="is-objective" x1="42" x2="938" y1="284" y2="284" />
        <text x="42" y="74">EPISODE 01 / CONTINUITY REGISTER</text>
        <text x="938" y="74" textAnchor="end">FAILED PATHS REMAIN INSPECTABLE</text>
      </g>

      <g className="institutional-figure__sequence institutional-figure__sequence--ornn">
        <line x1="346" x2="346" y1="88" y2="480" />
        <line x1="638" x2="638" y1="88" y2="480" />

        <text x="56" y="112">01 / TOOL USE</text>
        <text x="360" y="112">02 / RETAIN STATE</text>
        <text x="652" y="112">03 / RECOVERY</text>

        <text className="institutional-figure__step" x="56" y="452">CALL</text>
        <text className="institutional-figure__step" x="360" y="452">HOLD</text>
        <text className="institutional-figure__step" x="652" y="452">REPAIR</text>

        <circle cx="178" cy="284" r="5" />
        <circle cx="490" cy="284" r="5" />
        <circle cx="802" cy="284" r="5" />
        <path className="institutional-figure__sequence-spine" d="M178 284 H802" />
        <text x="490" y="268" textAnchor="middle">OBJECTIVE RETAINED ACROSS THE FULL EPISODE</text>
      </g>
    </svg>
  );
}
