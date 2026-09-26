import Logo from "@/components/Logo";

export default function Footer() 
{
  return (
    <footer className="border-t border-[#1a1d24] bg-ink-footer">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-6 sm:px-6 md:flex-row">
        <Logo size="sm" />
        <p className="text-center text-xs text-[#6b7280]">
          © 2026 FitLog-Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
