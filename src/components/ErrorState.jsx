export default function ErrorState({ message, onRetry }) 
{
  return (
    <div role="alert" className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide">Couldn't load workouts</h2>
      <p className="text-sm text-muted">{message || "Check your connection and try again."}</p>
      {onRetry && 
      (
        <button
          onClick={onRetry}
          className="rounded-full bg-accent-soft px-6 py-2.5 text-xs font-semibold text-black transition hover:brightness-95"
        >
          Try again
        </button>
      )}
    </div>
  );
}
