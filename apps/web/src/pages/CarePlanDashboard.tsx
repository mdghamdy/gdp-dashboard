import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ActionRail, { type ActionItem, type ActivityItem } from "../components/ActionRail";
import CarePlanSnapshot from "../components/CarePlanSnapshot";
import ConfirmDialog from "../components/ConfirmDialog";
import ContextBar from "../components/ContextBar";
import OutcomeTrends, { type TrendDatum } from "../components/OutcomeTrends";
import SignalZone, { type Signal } from "../components/SignalZone";

type ConfirmState = {
  open: boolean;
  action?: ActionItem;
};

const buildTimestamp = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const CarePlanDashboard = () => {
  const { caseId } = useParams();
  const resolvedCaseId = caseId ?? "CM-2847";

  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState>({ open: false });

  const signals: Signal[] = [
    {
      id: "signal-1",
      severity: "high",
      due: "Due in 45 min",
      what: "PREM follow-up overdue",
      recommendation: "Patient has not completed the latest experience check-in.",
      ctaLabel: "Send reminder"
    },
    {
      id: "signal-2",
      severity: "medium",
      due: "Due today, 16:30",
      what: "Care plan checkpoint pending",
      recommendation: "Checkpoint review needs clinician sign-off.",
      ctaLabel: "Queue review"
    },
    {
      id: "signal-3",
      severity: "medium",
      due: "Due tomorrow",
      what: "Engagement cadence slip",
      recommendation: "Engagement cadence is trending below target.",
      ctaLabel: "Send engagement"
    },
    {
      id: "signal-4",
      severity: "low",
      due: "Next 3 days",
      what: "Outcome trend dip",
      recommendation: "PRM trend indicates mild decline in self-reporting.",
      ctaLabel: "Log action"
    }
  ];

  const goals = [
    "Maintain stable symptom reporting cadence",
    "Improve daily activity adherence",
    "Complete plan review with care team"
  ];

  const milestones = [
    "Week 2 check-in scheduled",
    "Remote monitoring baseline verified",
    "Next review: within 72 hours"
  ];

  const careTeamRoles = ["Care coordinator", "RN reviewer", "Program lead", "Engagement ops"];

  const trends: TrendDatum[] = [
    {
      id: "trend-prems",
      label: "PREMs",
      description: "Experience score trend",
      change: "+4%",
      sparkline: [30, 40, 35, 50, 55, 60],
      tooltip: "PREMs are Patient Reported Experience Measures."
    },
    {
      id: "trend-prms",
      label: "PRMs",
      description: "Self-reported symptom score",
      change: "+2%",
      sparkline: [45, 42, 40, 48, 50, 52],
      tooltip: "PRMs are Patient Reported Measures for health status tracking."
    },
    {
      id: "trend-crms",
      label: "CRMs",
      description: "Clinical response metric trend",
      change: "-1%",
      sparkline: [60, 58, 55, 52, 50, 49],
      tooltip: "CRMs refer to Clinical Response Metrics used in care planning."
    }
  ];

  const primaryActions: ActionItem[] = useMemo(
    () => [
      {
        id: "log-action",
        label: "Log Action",
        type: "log",
        payload: { channel: "case-note" },
        tone: "primary"
      },
      {
        id: "assign-task",
        label: "Assign Task",
        type: "request_changes",
        payload: { queue: "care-team-review" },
        tone: "primary"
      },
      {
        id: "send-engagement",
        label: "Send Engagement",
        type: "approve",
        payload: { channel: "patient-outreach" },
        tone: "primary"
      }
    ],
    []
  );

  const secondaryActions: ActionItem[] = useMemo(
    () => [
      {
        id: "escalate",
        label: "Escalate",
        type: "escalate",
        payload: { severity: "medium" },
        tone: "secondary"
      },
      { id: "pause-plan", label: "Pause Plan", type: "pause", tone: "danger" },
      { id: "close-case", label: "Close Case", type: "close", tone: "danger" }
    ],
    []
  );

  const handleAction = (action: ActionItem) => {
    if (action.type === "pause" || action.type === "close") {
      setConfirmState({ open: true, action });
      return;
    }

    setActivity((prev) => [
      {
        id: `${action.id}-${Date.now()}`,
        label: action.label,
        timestamp: buildTimestamp(),
        detail: `Type: ${action.type}${action.payload ? " · Payload staged" : ""}`
      },
      ...prev
    ]);
  };

  const handleConfirm = () => {
    if (!confirmState.action) {
      setConfirmState({ open: false });
      return;
    }

    setActivity((prev) => [
      {
        id: `${confirmState.action?.id}-${Date.now()}`,
        label: confirmState.action.label,
        timestamp: buildTimestamp(),
        detail: `Type: ${confirmState.action.type} · Confirmed by operator.`
      },
      ...prev
    ]);
    setConfirmState({ open: false });
  };

  const handleSignalAction = (signal: Signal) => {
    setActivity((prev) => [
      {
        id: `${signal.id}-${Date.now()}`,
        label: signal.ctaLabel,
        timestamp: buildTimestamp(),
        detail: signal.what
      },
      ...prev
    ]);
  };

  return (
    <main className="min-h-screen bg-canvas text-text">
      <ContextBar
        patientInitials="S.M."
        ageBand="45-54"
        caseId={resolvedCaseId}
        patientIdMasked="PT-00XX"
        mpiMasked="MPI-0X"
        program="Respiratory Support"
        status="Active monitoring"
        urgency="Medium"
        lastReview="Today, 08:30"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-16 pt-6 lg:pr-[340px]">
        <SignalZone signals={signals} onSignalAction={handleSignalAction} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
          <CarePlanSnapshot goals={goals} milestones={milestones} careTeamRoles={careTeamRoles} />
          <OutcomeTrends trends={trends} />
        </div>
        <div className="lg:hidden">
          <ActionRail
            primaryActions={primaryActions}
            secondaryActions={secondaryActions}
            activity={activity}
            onAction={handleAction}
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <ActionRail
          primaryActions={primaryActions}
          secondaryActions={secondaryActions}
          activity={activity}
          onAction={handleAction}
        />
      </div>
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.action ? `${confirmState.action.label}?` : "Confirm action"}
        description={
          confirmState.action
            ? `This will ${confirmState.action.label.toLowerCase()} and notify the care team.`
            : "Confirm the selected action."
        }
        confirmLabel={confirmState.action?.label ?? "Confirm"}
        cancelLabel="Keep case active"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmState({ open: false })}
      />
    </main>
  );
};

export default CarePlanDashboard;
