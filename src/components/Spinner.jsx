export default function Spinner({ label = "Loading workouts…" }) 
{
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-4 py-24">
      <span className="relative grid h-14 w-14 place-items-center" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border-4 border-[#232732]" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-accent" />
      </span>
      <p className="text-sm text-muted-2">{label}</p>
    </div>
  );
}