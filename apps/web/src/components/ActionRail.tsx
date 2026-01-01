type ActionItem = {
  id: string;
  label: string;
  type: "approve" | "request_changes" | "escalate" | "pause" | "close" | "log";
  payload?: Record<string, string>;
  tone: "primary" | "secondary" | "danger";
};

type ActivityItem = {
  id: string;
  label: string;
  timestamp: string;
  detail?: string;
};

type ActionRailProps = {
  primaryActions: ActionItem[];
  secondaryActions: ActionItem[];
  activity: ActivityItem[];
  onAction: (action: ActionItem) => void;
};

const toneStyles: Record<ActionItem["tone"], string> = {
  primary: "bg-info text-white hover:bg-info/90",
  secondary: "border border-border bg-surface text-text hover:border-info hover:text-info",
  danger: "border border-danger/40 bg-danger/10 text-danger hover:border-danger"
};

const ActionRail = ({ primaryActions, secondaryActions, activity, onAction }: ActionRailProps) => {
  return (
    <aside className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-surface px-5 py-5 shadow-lg shadow-black/20 lg:fixed lg:right-6 lg:top-24 lg:w-72">
      <div>
        <h2 className="text-h2">Action rail</h2>
        <p className="text-caption text-text/60">Launch actions without leaving the case.</p>
      </div>
      <div className="space-y-2">
        <p className="text-caption font-semibold uppercase tracking-widest text-text/60">
          Primary actions
        </p>
        {primaryActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction(action)}
            className={`w-full rounded-xl px-4 py-3 text-left text-body font-semibold transition ${
              toneStyles[action.tone]
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-caption font-semibold uppercase tracking-widest text-text/60">
          Secondary actions
        </p>
        {secondaryActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction(action)}
            className={`w-full rounded-xl px-4 py-3 text-left text-body font-semibold transition ${
              toneStyles[action.tone]
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-caption font-semibold uppercase tracking-widest text-text/60">
          Activity log
        </p>
        <div className="max-h-40 space-y-2 overflow-y-auto">
          {activity.length === 0 ? (
            <p className="text-caption text-text/60">No actions logged yet.</p>
          ) : (
            activity.map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-canvas/60 px-3 py-2">
                <p className="text-caption font-semibold text-text">{item.label}</p>
                {item.detail ? (
                  <p className="text-caption text-text/60">{item.detail}</p>
                ) : null}
                <p className="text-caption text-text/40">{item.timestamp}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export type { ActionItem, ActivityItem };
export default ActionRail;
