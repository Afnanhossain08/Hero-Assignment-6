"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() 
{
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="border-b border-[#1c1f26] bg-ink-deep">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-y-3 px-4 py-3 sm:px-6 md:grid md:h-20 md:grid-cols-[1fr_auto_1fr] md:py-0">
        <Logo />

        <nav aria-label="Primary" className="order-last flex w-full justify-center md:order-none md:w-auto">
          {links.map(({href,label}) => {
            const active=pathname===href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                  active
                    ? "bg-accent-tint font-semibold text-accent-soft"
                    : "font-medium text-muted hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6 justify-self-end">
          <Link
            href="/my-plan"
            aria-label={`Today's plan: ${plan.length} workouts`}
            className="flex items-center gap-2 rounded-full text-xs font-medium text-[#d1d5db]"
          >
            Plan
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent-soft px-1 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved: ${saved.length} workouts`}
            className="flex items-center gap-2 rounded-full text-xs font-medium text-muted"
          >
            Saved
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-[#2d313b] px-1 text-[11px] font-medium text-[#d1d5db]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
