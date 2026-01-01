import { render, screen } from "@testing-library/react";
import SignalZone, { type Signal } from "./SignalZone";

const buildSignals = (): Signal[] => [
  {
    id: "signal-low",
    severity: "low",
    due: "Tomorrow",
    what: "Device sync check",
    recommendation: "Confirm sync window.",
    ctaLabel: "Open sync log",
    ctaHref: "/devices/sync"
  },
  {
    id: "signal-high",
    severity: "high",
    due: "Due in 30 min",
    what: "PROM pending response",
    recommendation: "Send engagement reminder.",
    ctaLabel: "Send engagement",
    ctaHref: "/engagements/send"
  },
  {
    id: "signal-medium",
    severity: "medium",
    due: "Due today",
    what: "Care plan review waiting",
    recommendation: "Queue clinician review.",
    ctaLabel: "Review plan",
    ctaHref: "/plans/review"
  }
];

describe("SignalZone", () => {
  it("sorts signals by severity high to low", () => {
    render(<SignalZone signals={buildSignals()} />);

    const rows = screen.getAllByTestId("signal-row");

    expect(rows[0]).toHaveTextContent("high");
    expect(rows[1]).toHaveTextContent("medium");
    expect(rows[2]).toHaveTextContent("low");
  });

  it("renders the PROM pending response signal", () => {
    render(<SignalZone signals={buildSignals()} />);

    expect(screen.getByText("PROM pending response")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Send engagement" })).toHaveAttribute(
      "href",
      "/engagements/send"
    );
  });
});
