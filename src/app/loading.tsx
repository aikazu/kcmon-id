export default function Loading(): React.JSX.Element {
  return (
    <main className="relative min-h-[100dvh] w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="grid-bg" />
      <div className="accent-glow" />

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 font-mono text-sm tracking-[0.18em] uppercase">
          <span
            className="h-10 w-10 animate-spin rounded-full border border-[var(--border)] border-t-[var(--accent)]"
            aria-hidden="true"
          />
          <p className="text-[var(--muted-foreground)]">Loading</p>
        </div>
      </div>
    </main>
  );
}
