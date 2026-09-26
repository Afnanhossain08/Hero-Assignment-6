const BASE = "https://api.abcz.workers.dev/api/fitlog";
export async function getWorkouts() 
{
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Could not load workouts (${res.status})`);
  const data = await res.json();
  return Array.isArray(data) ? data : data?.data ?? [];
}
export async function getWorkout(id) 
{
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`);
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error(`Could not load workout (${res.status})`);
  const data = await res.json();
  const item = Array.isArray(data) ? data.find((w) => String(w.id) === String(id)) : data?.data ?? data;
  return item && typeof item === "object" && item.name ? item : null;
}
