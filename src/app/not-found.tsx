import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="relative min-h-[100dvh] w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="grid-bg" />
      <div className="accent-glow" />

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6">
        <section className="flex w-full max-w-md flex-col gap-4 border border-[var(--border)] p-6 font-mono text-sm">
          <p className="tracking-[0.18em] text-[var(--accent)] uppercase">404</p>
          <h1 className="font-serif text-2xl tracking-tight italic">Page not found</h1>
          <p className="leading-6 text-[var(--muted-foreground)]">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex w-fit items-center justify-center border border-[var(--border)] px-4 py-2.5 text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--glow)] hover:text-[var(--accent)] active:scale-[0.98]"
          >
            Back home
          </Link>
        </section>
      </div>
    </main>
  );
}
