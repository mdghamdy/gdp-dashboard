import { render, screen } from "@testing-library/react";
import ContextBar from "./ContextBar";

describe("ContextBar", () => {
  it("renders required context fields", () => {
    render(
      <ContextBar
        caseId="CASE-1042"
        program="Cardio Care"
        status="Review pending"
        urgency="High"
        urgencyReason="Time-sensitive escalation"
        actionBy="Today, 16:00"
        owner="Ops Queue A"
      />
    );

    expect(screen.getByText("CASE-1042")).toBeInTheDocument();
    expect(screen.getByText("Cardio Care")).toBeInTheDocument();
    expect(screen.getByText("Review pending")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Time-sensitive escalation")).toBeInTheDocument();
    expect(screen.getByText("Today, 16:00")).toBeInTheDocument();
    expect(screen.getByText("Ops Queue A")).toBeInTheDocument();
  });
});
