export default function Loading(): React.JSX.Element {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <div className="flex flex-col items-center gap-4 font-mono text-sm tracking-[0.18em] uppercase">
        <span
          className="h-10 w-10 animate-spin rounded-full border border-[var(--border)] border-t-[var(--accent)]"
          aria-hidden="true"
        />
        <p className="text-[var(--muted-foreground)]">Loading</p>
      </div>
    </main>
  );
}
