import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() 
{
  return (
    <section className="rounded-2xl border border-panel-line bg-panel px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-16">
        <div className="flex max-w-[558px] flex-col gap-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent-soft">WORKOUT LIBRARY</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em] sm:text-5xl lg:text-[60px]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="max-w-[512px] text-base leading-6 text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>
          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-6 py-3 text-xs font-bold uppercase tracking-[0.025em] text-black transition hover:brightness-95"
            >
              BROWSE WORKOUTS
              <ArrowDown size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <Image
          src="/hero.webp"
          alt="Anatomical illustration of a lifter working the biceps on a preacher curl bench"
          width={334}
          height={334}
          priority
          className="h-auto w-56 sm:w-72 lg:w-[334px]"
        />
      </div>
    </section>
  );
}
