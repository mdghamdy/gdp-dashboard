import SignalCard, { type SignalSeverity } from "./SignalCard";

type Signal = {
  id: string;
  severity: SignalSeverity;
  due: string;
  what: string;
  recommendation: string;
  ctaLabel: string;
  ctaHref?: string;
};

type SignalZoneProps = {
  signals: Signal[];
  onSignalAction?: (signal: Signal) => void;
};

const severityOrder: Record<SignalSeverity, number> = {
  high: 0,
  medium: 1,
  low: 2
};

const SignalZone = ({ signals, onSignalAction }: SignalZoneProps) => {
  const sortedSignals = [...signals].sort(
    (left, right) => severityOrder[left.severity] - severityOrder[right.severity]
  );

  return (
    <section className="w-full rounded-2xl border border-border bg-surface px-6 py-5 text-left shadow-lg shadow-black/20">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-caption uppercase tracking-[0.2em] text-text/60">Signal Zone</p>
          <h2 className="text-h2">Triage list</h2>
        </div>
        <span className="text-caption text-text/60">{sortedSignals.length} signals</span>
      </header>
      <div className="mt-4 space-y-3">
        {sortedSignals.map((signal) => (
          <SignalCard
            key={signal.id}
            title={signal.what}
            description={signal.recommendation}
            recommendedAction={signal.ctaLabel}
            severity={signal.severity}
            due={signal.due}
            ctaLabel={signal.ctaLabel}
            ctaHref={signal.ctaHref}
            onAction={
              signal.ctaHref
                ? undefined
                : () => {
                    onSignalAction?.(signal);
                  }
            }
          />
        ))}
      </div>
    </section>
  );
};

export type { Signal };
export default SignalZone;
