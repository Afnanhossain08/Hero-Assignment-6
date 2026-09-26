"use client";
import { useCallback, useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
let cache = null;
export function useWorkouts() 
{
  const [workouts, setWorkouts] = useState(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try 
    {
      const data = await getWorkouts();
      cache = data;
      setWorkouts(data);
    } 
    catch (err) 
    {
      setError(err.message || "Something went wrong");
    } 
    finally 
    {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!cache) load();
  }, [load]);

  return { workouts, loading, error, reload: load };
}
