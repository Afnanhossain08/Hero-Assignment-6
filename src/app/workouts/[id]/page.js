import WorkoutDetail from "@/components/WorkoutDetail";

export const metadata = { title: "Workout details" };

export default async function WorkoutPage({ params }) 
{
  const { id } = await params;
  return <WorkoutDetail id={id}/>;
}
