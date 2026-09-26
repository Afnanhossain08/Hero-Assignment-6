"use client";

import WorkoutCard from "@/components/WorkoutCard";
import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";
import { useWorkouts } from "@/lib/useWorkouts";

export default function Library() 
{
  const { workouts, loading, error, reload } = useWorkouts();

  return (
    <section id="library" className="scroll-mt-24">
      <header className="mb-8">
        <h2 className="font-display text-3xl font-bold uppercase leading-9 tracking-[-0.025em]">THE LIBRARY</h2>
        <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
      </header>

      {loading ? 
      (
        <Spinner />
      ) : error ? 
      (
        <ErrorState message={error} onRetry={reload} />
      ):(
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
