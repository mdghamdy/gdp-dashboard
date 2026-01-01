type TrendDatum = {
  id: string;
  label: string;
  description: string;
  change: string;
  sparkline: number[];
  tooltip: string;
};

type OutcomeTrendsProps = {
  trends: TrendDatum[];
};

const OutcomeTrends = ({ trends }: OutcomeTrendsProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface px-6 py-5 shadow-lg shadow-black/20">
      <header>
        <p className="text-caption uppercase tracking-[0.2em] text-text/60">Outcome trends</p>
        <h2 className="text-h2">PREMs / PRMs / CRMs</h2>
      </header>
      <div className="mt-4 space-y-4">
        {trends.map((trend) => (
          <div key={trend.id} className="rounded-xl border border-border bg-canvas/60 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-body font-semibold text-text">
                  <span>{trend.label}</span>
                  <span
                    className="text-text/40"
                    title={trend.tooltip}
                    aria-label={`${trend.label} info`}
                  >
                    ⓘ
                  </span>
                </div>
                <p className="text-caption text-text/70">{trend.description}</p>
              </div>
              <span className="text-caption font-semibold text-success">{trend.change}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-full items-end gap-1">
                {trend.sparkline.map((value, index) => (
                  <span
                    key={`${trend.id}-spark-${index}`}
                    className="flex-1 rounded-sm bg-info/40"
                    style={{ height: `${value}%` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-caption text-text/60">Last 6 weeks</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export type { TrendDatum };
export default OutcomeTrends;
