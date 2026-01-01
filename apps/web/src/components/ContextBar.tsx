type ContextBarProps = {
  caseId: string;
  program: string;
  status: string;
  urgency: string;
  urgencyReason: string;
  actionBy: string;
  owner: string;
};

const ContextBar = ({
  caseId,
  program,
  status,
  urgency,
  urgencyReason,
  actionBy,
  owner
}: ContextBarProps) => {
  return (
    <section className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 text-caption text-text/80">
        <div className="flex items-center gap-2">
          <span className="text-text/60">Case</span>
          <span className="rounded-full border border-border px-2 py-0.5 text-text">{caseId}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Program</span>
          <span className="text-text">{program}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Status</span>
          <span className="text-text">{status}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Urgency</span>
          <span className="text-warning">{urgency}</span>
          <span className="text-text/60">({urgencyReason})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Action-by</span>
          <span className="text-text">{actionBy}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Owner</span>
          <span className="text-text">{owner}</span>
        </div>
      </div>
    </section>
  );
};

export default ContextBar;
