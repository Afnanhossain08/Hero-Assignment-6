import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import WorkoutStats from "@/components/WorkoutStats";


export default function PlanItem({ workout, done = false, onDone, onRemove }) 
{
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[#232732] bg-[#14171e] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[#1f2937] sm:w-36">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            sizes="144px"
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate font-display text-base font-bold uppercase leading-6 tracking-[0.025em]">
            {workout.name}
          </h3>
          <p className="text-xs font-semibold text-muted-2">{workout.equipment}</p>
          <div className="mt-1.5">
            <WorkoutStats workout={workout} className="text-[#d1d5db]" iconClass="text-[#d1d5db]" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#374151] px-[18px] py-[9px] text-xs text-white hover:border-[#4b5563] hover:bg-white/5"
        >
          View Details
        </Link>

        {onDone &&
          (done ? (
            <span
              aria-label="Done"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-xs font-semibold text-accent"
            >
              <Check size={14} strokeWidth={2.5} aria-hidden="true" />
              Done
            </span>
          ) : (
            <button
              onClick={onDone}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black hover:brightness-95"
            >
              <Check size={14} strokeWidth={2.5} aria-hidden="true" />
              Mark as Done
            </button>
          ))}

        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="grid h-7 w-7 place-items-center rounded-md text-muted hover:bg-red-500/10 hover:text-red-400"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
