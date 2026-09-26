import Link from "next/link";
import Image from "next/image";
import WorkoutStats from "@/components/WorkoutStats";

export default function WorkoutCard({ workout }) 
{
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-panel-line bg-panel"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[#171a21]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ul className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <li
              key={group}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.05em] text-black"
            >
              {group}
            </li>
          ))}
        </ul>

        <h3 className="mt-3 font-display text-lg font-bold uppercase leading-7 tracking-[0.025em]">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto pt-4">
          <div className="border-t border-[#20242e] pt-3.5">
            <WorkoutStats workout={workout} />
          </div>
        </div>
      </div>
    </Link>
  );
}
