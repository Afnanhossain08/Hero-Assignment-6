import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Logo({size="lg"}) 
{
  const big=size==="lg";
  return (
    <Link href="/" className="inline-flex items-center gap-2 rounded-md" aria-label="FitLog home">
      <Dumbbell className="text-accent" size={big ? 28 : 20} strokeWidth={2.2} aria-hidden="true"/>
      <span
        className={`font-display font-bold uppercase text-white ${
          big ? "text-xl tracking-[0.05em]" : "text-sm tracking-[0.05em]"
        }`}
      >
        FitLog
      </span>
    </Link>
  );
}
