"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, PlusCircle } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";
import NotFoundView from "@/components/NotFoundView";

export default function WorkoutDetail({ id }) 
{
  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading"); 
  const [error, setError] = useState(null);
  const { addToPlan, saveForLater } = usePlan();
  const load = useCallback(async () => {
    setStatus("loading");
    try 
    {
      const data = await getWorkout(id);
      if (!data) return setStatus("missing");
      setWorkout(data);
      setStatus("ready");
    } 
    catch (err) 
    {
      setError(err.message);
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  
  if (status==="loading") return <Spinner label="Loading workout…" />;
  if (status==="missing") return <NotFoundView />;
  if (status==="error") return <ErrorState message={error} onRetry={load} />;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-8 sm:px-6 lg:pt-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] lg:aspect-auto lg:min-h-[640px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 588px, 100vw"
            className="object-cover"
          />
        </div>

        {}
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase leading-10 tracking-[-0.025em] sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-base leading-6 text-muted">{workout.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {workout.muscleGroups.map((group) => (
              <li key={group} className="rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-ink">
                {group}
              </li>
            ))}
          </ul>

          <dl className="mt-7 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
            {specs.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-4 px-6 py-3.5 ${i > 0 ? "border-t border-[#1e2330]" : ""}`}
              >
                <dt className="text-xs font-bold uppercase tracking-[0.05em] text-muted">{label}</dt>
                <dd className="text-right text-sm font-medium text-[#e5e7eb]">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-8" aria-labelledby="instructions-heading">
            <h2 id="instructions-heading" className="text-base font-extrabold uppercase tracking-[0.05em]">
              Instructions
            </h2>
            <ol className="mt-4 flex flex-col gap-3 text-sm leading-[23px] text-[#d1d5db]">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted" aria-hidden="true">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => addToPlan(workout)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-ink hover:brightness-95"
            >
              <PlusCircle size={16} aria-hidden="true" />
              Add to today&apos;s plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#374151] px-6 text-sm font-medium text-[#e5e7eb] hover:border-[#4b5563] hover:bg-white/5"
            >
              <Bookmark size={16} aria-hidden="true" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
