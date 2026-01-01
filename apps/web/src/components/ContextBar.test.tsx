import { render, screen } from "@testing-library/react";
import ContextBar from "./ContextBar";

describe("ContextBar", () => {
  it("renders required context fields", () => {
    render(
      <ContextBar
        patientInitials="S.M."
        ageBand="45-54"
        caseId="CASE-1042"
        patientIdMasked="PT-00XX"
        mpiMasked="MPI-0X"
        program="Cardio Care"
        status="Review pending"
        urgency="High"
        lastReview="Today, 09:00"
      />
    );

    expect(screen.getByText("Patient S.M.")).toBeInTheDocument();
    expect(screen.getByText("45-54")).toBeInTheDocument();
    expect(screen.getByText("CASE-1042")).toBeInTheDocument();
    expect(screen.getByText("PT-00XX")).toBeInTheDocument();
    expect(screen.getByText("MPI-0X")).toBeInTheDocument();
    expect(screen.getByText("Cardio Care")).toBeInTheDocument();
    expect(screen.getByText("Review pending")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Today, 09:00")).toBeInTheDocument();
  });
});
