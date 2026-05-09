import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-navy-900 text-ivory px-6">
      <span className="eyebrow mb-4">404 · Lost in transit</span>
      <h1 className="font-display text-6xl lg:text-8xl text-ivory mb-6">
        That route is <em className="italic gold-gradient-text">unmapped.</em>
      </h1>
      <p className="text-ivory/65 max-w-md text-center mb-10">
        The page you sought is not on our books. Return to the front desk and we'll begin again.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 px-7 py-4 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-navy-900 transition-all text-xs uppercase tracking-[0.32em] font-mono"
      >
        Return home →
      </Link>
    </main>
  );
}
