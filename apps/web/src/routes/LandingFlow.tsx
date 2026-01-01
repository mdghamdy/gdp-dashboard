import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

type TokenResponseStatus = "valid" | "expired" | "used";

const apiBase = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const createIdempotencyKey = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `idempotency-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const LandingFlow = () => {
  const { token } = useParams();
  const [status, setStatus] = useState<
    "loading" | "valid" | "expired" | "used" | "submitted" | "error"
  >("loading");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tokenValue = useMemo(() => token ?? "", [token]);

  useEffect(() => {
    if (!tokenValue) {
      setStatus("error");
      setErrorMessage("Token not provided.");
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${apiBase}/tokens/${tokenValue}`);
        if (!response.ok) {
          setStatus("expired");
          return;
        }
        const payload = (await response.json()) as { status: TokenResponseStatus };
        setStatus(payload.status);
      } catch (error) {
        setStatus("error");
        setErrorMessage("Unable to reach the service.");
      }
    };

    fetchStatus();
  }, [tokenValue]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tokenValue) {
      return;
    }
    setErrorMessage(null);

    try {
      const response = await fetch(`${apiBase}/tokens/${tokenValue}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": createIdempotencyKey()
        },
        body: JSON.stringify({ answer })
      });
      const payload = (await response.json()) as { status: TokenResponseStatus };
      if (payload.status === "expired" || payload.status === "used") {
        setStatus("submitted");
      } else {
        setStatus(payload.status);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Submission failed. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-text/60">Loading</p>
        <h1 className="text-h2">Checking your link</h1>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-text/60">Connection issue</p>
        <h1 className="text-h2">We could not open this link</h1>
        <p className="text-body text-text/70">{errorMessage}</p>
      </section>
    );
  }

  if (status === "expired" || status === "used") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-text/60">Link unavailable</p>
        <h1 className="text-h2">This request has expired</h1>
        <p className="text-body text-text/70">
          The link is no longer active. Please contact your coordinator for a new request.
        </p>
      </section>
    );
  }

  if (status === "submitted") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-text/60">Complete</p>
        <h1 className="text-h2">Response received</h1>
        <p className="text-body text-text/70">
          Thanks for confirming. You can close this window.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-caption uppercase tracking-[0.2em] text-text/60">Quick check-in</p>
      <h1 className="text-h2">One question</h1>
      <p className="text-body text-text/70">
        Please confirm the status below. Your response is logged to the case.
      </p>
      <form
        className="w-full rounded-2xl border border-border bg-surface px-6 py-5 text-left"
        onSubmit={handleSubmit}
      >
        <label className="text-caption uppercase tracking-[0.2em] text-text/60" htmlFor="answer">
          Response
        </label>
        <select
          id="answer"
          className="mt-2 w-full rounded-lg border border-border bg-canvas px-3 py-2 text-body text-text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          required
        >
          <option value="" disabled>
            Select one response
          </option>
          <option value="received">I have received the message</option>
          <option value="need-help">I need follow-up support</option>
          <option value="reschedule">Please reschedule</option>
        </select>
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-border bg-info/20 px-4 py-2 text-body font-semibold text-info transition hover:bg-info/30"
        >
          Submit response
        </button>
        {errorMessage ? <p className="mt-3 text-caption text-danger">{errorMessage}</p> : null}
      </form>
    </section>
  );
};

export default LandingFlow;
