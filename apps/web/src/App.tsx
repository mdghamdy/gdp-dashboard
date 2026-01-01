const App = () => {
  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-caption uppercase tracking-widest text-text/70">
          GDP Dashboard
        </span>
        <h1 className="text-h1">Setup complete</h1>
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
