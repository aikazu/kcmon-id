import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <section className="flex w-full max-w-md flex-col gap-4 border border-[var(--border)] p-6 font-mono text-sm">
        <p className="uppercase tracking-[0.18em] text-[var(--accent)]">404</p>
        <h1 className="text-2xl tracking-tight">Page not found</h1>
        <p className="leading-6 text-[var(--muted-foreground)]">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex w-fit items-center justify-center border border-[var(--border)] px-4 py-2 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
