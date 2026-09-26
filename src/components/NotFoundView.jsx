import Link from "next/link";

export default function NotFoundView() 
{
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <p className="font-display text-8xl font-bold leading-none tracking-tight text-accent sm:text-9xl">404</p>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Page not found</h1>
      <p className="text-sm text-muted">
        That page doesn't exist, or the workout you're looking for has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent-soft px-6 py-2.5 text-xs font-semibold text-black transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}
