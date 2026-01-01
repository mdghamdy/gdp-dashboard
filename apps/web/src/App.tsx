import ContextBar from "./components/ContextBar";
import SignalZone, { type Signal } from "./components/SignalZone";

const signals: Signal[] = [
  {
    id: "signal-1",
    severity: "high",
    due: "Due in 30 min",
    what: "PROM pending response",
    recommendation: "Send engagement reminder to avoid SLA breach.",
    ctaLabel: "Send engagement",
    ctaHref: "/engagements/send"
  },
  {
    id: "signal-2",
    severity: "medium",
    due: "Due today, 17:00",
    what: "Care plan review waiting",
    recommendation: "Queue clinician review with latest notes.",
    ctaLabel: "Review plan",
    ctaHref: "/plans/review"
  },
  {
    id: "signal-3",
    severity: "low",
    due: "Due tomorrow",
    what: "Device sync check",
    recommendation: "Confirm data sync window for the program.",
    ctaLabel: "Open sync log",
    ctaHref: "/devices/sync"
  }
];

const App = () => {
  return (
    <main className="min-h-screen bg-canvas text-text">
      <ContextBar
        caseId="CASE-1042"
        program="Cardio Care"
        status="Review pending"
        urgency="High"
        urgencyReason="Time-sensitive escalation"
        actionBy="Today, 16:00"
        owner="Ops Queue A"
      />
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col items-center gap-8 px-6 py-12 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-caption uppercase tracking-widest text-text/70">
          GDP Dashboard
        </span>
        <h1 className="text-h1">Setup complete</h1>
        <SignalZone signals={signals} />
        <div className="w-full max-w-xl rounded-2xl border border-border bg-surface px-6 py-5 text-left shadow-lg shadow-black/20">
          <h2 className="text-h2">Design token preview</h2>
          <p className="mt-2 text-body text-text/70">
            Vite, React, and Tailwind are configured. Add business logic when ready.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-caption">
            <span className="rounded-full bg-info/20 px-3 py-1 text-info">Info</span>
            <span className="rounded-full bg-success/20 px-3 py-1 text-success">Success</span>
            <span className="rounded-full bg-warning/20 px-3 py-1 text-warning">Warning</span>
            <span className="rounded-full bg-danger/20 px-3 py-1 text-danger">Danger</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
