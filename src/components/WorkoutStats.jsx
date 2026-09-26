import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutStats({ workout, className = "text-muted", iconClass = "text-muted" }) 
{
  const items = 
  [
    { Icon: Clock, text: `${workout.duration} min` },
    { Icon: Flame, text: `${workout.caloriesBurned} kcal` },
    { Icon: Star, text: `${workout.rating}` },
  ];
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${className}`}>
      {items.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-1.5">
          <Icon size={14} strokeWidth={1.75} className={iconClass} aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}
