type VisualTelemetryProps = {
  system: string;
  primary: string;
  secondary: string;
  compact?: boolean;
};

export default function VisualTelemetry({
  system,
  primary,
  secondary,
  compact = false,
}: VisualTelemetryProps) {
  return (
    <div
      className={`viz-telemetry${compact ? " viz-telemetry--compact" : ""}`}
      aria-hidden="true"
    >
      <div className="viz-telemetry__top">
        <span>{system}</span>
        <span>{primary}</span>
      </div>
      <div className="viz-telemetry__scale">
        {Array.from({ length: 7 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="viz-telemetry__datum" />
      <div className="viz-telemetry__bottom">
        <span>{secondary}</span>
        <span>AINFERA / VERIFIED</span>
      </div>
    </div>
  );
}
