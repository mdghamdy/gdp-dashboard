type SignalSeverity = "high" | "medium" | "low";

type SignalCardProps = {
  title: string;
  description: string;
  recommendedAction: string;
  severity: SignalSeverity;
  due: string;
  ctaLabel: string;
  ctaHref?: string;
  onAction?: () => void;
};

const severityStyles: Record<SignalSeverity, string> = {
  high: "bg-danger/20 text-danger",
  medium: "bg-warning/20 text-warning",
  low: "bg-info/20 text-info"
};

const SignalCard = ({
  title,
  description,
  recommendedAction,
  severity,
  due,
  ctaLabel,
  ctaHref,
  onAction
}: SignalCardProps) => {
  return (
    <article
      data-testid="signal-row"
      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-canvas/60 px-4 py-4"
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-caption uppercase tracking-widest ${
              severityStyles[severity]
            }`}
          >
            {severity}
          </span>
          <span className="text-caption text-text/60">SLA {due}</span>
        </div>
        <div className="text-body text-text">
          <span className="font-semibold">Signal:</span> {title}
        </div>
        <div className="text-caption text-text/70">
          <span className="font-semibold text-text/60">Reason:</span> {description}
        </div>
        <div className="text-caption text-text/80">
          <span className="font-semibold text-text/60">Suggested next action:</span>{" "}
          {recommendedAction}
        </div>
      </div>
      {ctaHref ? (
        <a
          href={ctaHref}
          className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-caption font-semibold text-text transition hover:border-info hover:text-info"
        >
          {ctaLabel}
        </a>
      ) : (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-caption font-semibold text-text transition hover:border-info hover:text-info"
        >
          {ctaLabel}
        </button>
      )}
    </article>
  );
};

export type { SignalSeverity };
export default SignalCard;
