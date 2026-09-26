"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PlanContext = createContext(null);

export function PlanProvider({ children }) 
{
  const [plan, setPlan] = useState([]); 
  const [saved, setSaved] = useState([]);
  const addToPlan = useCallback((workout) => {
    setPlan((prev) => [...prev, { id: workout.id, done: false }]);
    toast.success("Added to today's plan");
  }, []);

  const saveForLater = useCallback((workout) => {
    setSaved((prev) => [...prev, workout.id]);
    toast.success("Saved for later");
  }, []);

  const removeFromPlan = useCallback((workout) => {
    setPlan((prev) => prev.filter((p) => p.id !== workout.id));
    toast.success(`${workout.name} removed from today's plan`);
  }, []);

  const removeFromSaved = useCallback((workout) => {
    setSaved((prev) => prev.filter((id) => id !== workout.id));
    toast.success(`${workout.name} removed from saved`);
  }, []);

  const markDone = useCallback((workout) => {
    setPlan((prev) => prev.map((p) => (p.id === workout.id ? { ...p, done: true } : p)));
    toast.success(`${workout.name} marked as done`);
  }, []);

  const value = useMemo(
    () => ({ plan, saved, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }),
    [plan, saved, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2600,
          style: { background: "#1f242d", color: "#fff", border: "1px solid #2b303d", fontSize: "14px" },
          success: { iconTheme: { primary: "#ccff00", secondary: "#0f1115" } },
        }}
      />
    </PlanContext.Provider>
  );
}

export function usePlan() 
{
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
