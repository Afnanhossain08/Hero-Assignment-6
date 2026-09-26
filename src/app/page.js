import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function HomePage() 
{
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-4 pb-16 pt-8 sm:px-6 lg:gap-16 lg:pt-12">
      <Hero/>
      <Library/>
    </div>
  );
}
