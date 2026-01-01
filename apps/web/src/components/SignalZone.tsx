type SignalSeverity = "high" | "medium" | "low";

type Signal = {
  id: string;
  severity: SignalSeverity;
  due: string;
  what: string;
  recommendation: string;
  ctaLabel: string;
  ctaHref: string;
};

type SignalZoneProps = {
  signals: Signal[];
};

const severityOrder: Record<SignalSeverity, number> = {
  high: 0,
  medium: 1,
  low: 2
};

const severityStyles: Record<SignalSeverity, string> = {
  high: "bg-danger/20 text-danger",
  medium: "bg-warning/20 text-warning",
  low: "bg-info/20 text-info"
};

const SignalZone = ({ signals }: SignalZoneProps) => {
  const sortedSignals = [...signals].sort(
    (left, right) => severityOrder[left.severity] - severityOrder[right.severity]
  );

  return (
    <section className="w-full max-w-5xl rounded-2xl border border-border bg-surface px-6 py-5 text-left shadow-lg shadow-black/20">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-caption uppercase tracking-[0.2em] text-text/60">Signal Zone</p>
          <h2 className="text-h2">Triage list</h2>
        </div>
        <span className="text-caption text-text/60">{sortedSignals.length} signals</span>
      </header>
      <div className="mt-4 space-y-3">
        {sortedSignals.map((signal) => (
          <article
            key={signal.id}
            data-testid="signal-row"
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-canvas/60 px-4 py-3"
          >
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
              <span
                className={`rounded-full px-3 py-1 text-caption uppercase tracking-widest ${severityStyles[signal.severity]}`}
              >
                {signal.severity}
              </span>
              <span className="text-caption text-text/60">SLA {signal.due}</span>
              <span className="text-body text-text">{signal.what}</span>
              <span className="text-caption text-text/70">{signal.recommendation}</span>
            </div>
            <a
              href={signal.ctaHref}
              className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-caption font-semibold text-text transition hover:border-info hover:text-info"
            >
              {signal.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export type { Signal, SignalSeverity };
export default SignalZone;
