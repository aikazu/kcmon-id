"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.JSX.Element {
  return (
    <main className="relative min-h-[100dvh] w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="grid-bg" />
      <div className="accent-glow" />

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6">
        <section className="w-full max-w-md border border-[var(--border)] bg-[var(--background)] p-6 font-mono text-sm">
          <p className="mb-3 uppercase tracking-[0.18em] text-[var(--accent)]">
            Error
          </p>
          <h1 className="mb-3 font-serif text-2xl italic tracking-tight">
            Something went wrong.
          </h1>
          <p className="mb-6 leading-6 text-[var(--muted-foreground)]">
            {error.message}
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center border border-[var(--border)] px-4 py-2 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Try again
          </button>
        </section>
      </div>
    </main>
  );
}
