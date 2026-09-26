"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { useWorkouts } from "@/lib/useWorkouts";
import PlanItem from "@/components/PlanItem";
import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";

const TABS = 
[
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

const SORTERS = 
{
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => b.caloriesBurned - a.caloriesBurned,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlan() 
{
  const { plan, saved, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const { workouts, loading, error, reload } = useWorkouts();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const byId = useMemo(() => new Map(workouts.map((w) => [w.id, w])), [workouts]);
  const planItems = useMemo(
    () => plan.map((p) => ({ workout: byId.get(p.id), done: p.done })).filter((i) => i.workout),
    [plan, byId]
  );
  const savedItems = useMemo(
    () => saved.map((id) => ({ workout: byId.get(id), done: false })).filter((i) => i.workout),
    [saved, byId]
  );

  const metrics = useMemo(
    () => ({
      exercises: planItems.length,
      minutes: planItems.reduce((sum, i) => sum + i.workout.duration, 0),
      calories: planItems.reduce((sum, i) => sum + i.workout.caloriesBurned, 0),
    }),
    [planItems]
  );
  const items = useMemo(() => {
    const source = tab === "plan" ? planItems : savedItems;
    return [...source].sort((a, b) => SORTERS[sortBy](a.workout, b.workout));
  }, [tab, planItems, savedItems, sortBy]);

  const isLoading = loading;
  const stats = 
  [
    { label: "Exercises", value: metrics.exercises, accent: true },
    { label: "Minutes", value: metrics.minutes },
    { label: "Calories", value: metrics.calories },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-8 sm:px-6 lg:px-12 lg:pt-10">
      <header>
        <h1 className="font-display text-3xl font-bold uppercase leading-9 tracking-[-0.025em]">MY PLAN</h1>
        <p className="mt-2 text-sm text-muted-2">Cap of five lifts for today. Finish them, then load more.</p>
      </header>

      {}
      <section
        aria-label="Today's totals"
        className="mt-6 grid grid-cols-3 rounded-2xl border border-[#232732] bg-[#13161d] py-6"
      >
        {stats.map(({ label, value, accent }, i) => (
          <div key={label} className={`px-4 sm:px-8 ${i > 0 ? "border-l border-[#232732]" : ""}`}>
            <p className="text-xs text-muted-2">{label}</p>
            <p
              className={`font-display text-3xl font-bold leading-10 sm:text-4xl ${accent ? "text-accent" : "text-white"}`}
            >
              {isLoading?0:value}
            </p>
          </div>
        ))}
      </section>

      {}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Plan views" className="flex gap-1 rounded-xl border border-[#232732] bg-[#151921] p-1">
          {TABS.map(({ key, label }) => 
          {
            const active=tab===key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={`rounded-lg px-4 py-1.5 text-xs transition-colors ${
                  active
                    ? "border border-[#2b303d] bg-[#1f242d] font-bold text-white"
                    : "border border-transparent text-muted-2 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-by" className="text-xs text-muted-2">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-[34px] cursor-pointer appearance-none rounded-[9px] border border-[#232732] bg-[#13161d] pl-3 pr-8 text-xs text-white [color-scheme:dark]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-2"
            />
          </div>
        </div>
      </div>

      {}
      <section aria-label={tab === "plan" ? "Today's plan" : "Saved workouts"} className="mt-4 flex flex-col gap-4">
        {isLoading ? (
          error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : (
            <Spinner label="Loading workouts…" />
          )
        ) : items.length===0? 
        (
          <EmptyState />
        ) : (
          items.map(({ workout, done }, index) => (
            <PlanItem
              key={`${workout.id}-${index}`}
              workout={workout}
              done={done}
              onDone={tab === "plan" ? () => markDone(workout) : undefined}
              onRemove={() => (tab === "plan" ? removeFromPlan(workout) : removeFromSaved(workout))}
            />
          ))
        )}
      </section>
    </div>
  );
}
function EmptyState() 
{
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#111317]/50 px-6 py-16 text-center">
      <h2 className="font-display text-xl font-bold uppercase tracking-[0.035em]">NOTHING HERE YET</h2>
      <p className="text-xs text-[#a1a1aa]">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-[#c2f10d] px-6 py-2.5 text-xs font-semibold text-black transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}
