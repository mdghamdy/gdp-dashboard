type CarePlanSnapshotProps = {
  goals: string[];
  milestones: string[];
  careTeamRoles: string[];
};

const CarePlanSnapshot = ({ goals, milestones, careTeamRoles }: CarePlanSnapshotProps) => {
  return (
    <section className="rounded-2xl border border-border bg-surface px-6 py-5 shadow-lg shadow-black/20">
      <header>
        <p className="text-caption uppercase tracking-[0.2em] text-text/60">Care plan snapshot</p>
        <h2 className="text-h2">Plan essentials</h2>
      </header>
      <div className="mt-4 space-y-6">
        <div>
          <h3 className="text-caption font-semibold uppercase tracking-widest text-text/60">
            Goals (max 3)
          </h3>
          <ul className="mt-2 space-y-2 text-body text-text">
            {goals.map((goal) => (
              <li key={goal} className="rounded-lg border border-border bg-canvas/60 px-3 py-2">
                {goal}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-caption font-semibold uppercase tracking-widest text-text/60">
            Milestones / checkpoints
          </h3>
          <ul className="mt-2 space-y-2 text-body text-text">
            {milestones.map((milestone) => (
              <li
                key={milestone}
                className="flex items-start gap-2 rounded-lg border border-border bg-canvas/60 px-3 py-2"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-info" aria-hidden="true" />
                <span>{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-caption font-semibold uppercase tracking-widest text-text/60">
            Assigned care team (roles)
          </h3>
          <div className="mt-2 flex flex-wrap gap-2 text-caption">
            {careTeamRoles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-border bg-canvas/60 px-3 py-1 text-text"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarePlanSnapshot;
