type ContextBarProps = {
  patientInitials: string;
  ageBand: string;
  caseId: string;
  patientIdMasked: string;
  mpiMasked: string;
  program: string;
  status: string;
  urgency: string;
  lastReview: string;
};

const ContextBar = ({
  patientInitials,
  ageBand,
  caseId,
  patientIdMasked,
  mpiMasked,
  program,
  status,
  urgency,
  lastReview
}: ContextBarProps) => {
  return (
    <section className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 text-caption text-text/80">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-canvas px-3 py-1 text-caption font-semibold text-text">
            Patient {patientInitials}
          </span>
          <span className="text-text/60">Age band</span>
          <span className="text-text">{ageBand}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Case ID</span>
          <span className="rounded-full border border-border px-2 py-0.5 text-text">
            {caseId}
          </span>
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
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Last review</span>
          <span className="text-text">{lastReview}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">Patient ID</span>
          <span className="text-text">{patientIdMasked}</span>
          <span
            className="text-text/40"
            title="Patient ID is a masked internal reference used for the care team."
            aria-label="Patient ID information"
          >
            ⓘ
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text/60">MPI</span>
          <span className="text-text">{mpiMasked}</span>
          <span
            className="text-text/40"
            title="MPI stands for Master Patient Index. This view uses masked identifiers only."
            aria-label="MPI information"
          >
            ⓘ
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContextBar;
