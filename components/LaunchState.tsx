"use client";

import { createContext, useContext, useState, useCallback } from "react";

type LaunchMode = "pre-launch" | "launched";

const LaunchContext = createContext<{
  mode: LaunchMode;
  setMode: (m: LaunchMode) => void;
  dialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}>({ mode: "pre-launch", setMode: () => {}, dialogOpen: false, openDialog: () => {}, closeDialog: () => {} });

export function LaunchProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LaunchMode>("pre-launch");
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <LaunchContext.Provider value={{ mode, setMode, dialogOpen, openDialog, closeDialog }}>
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunchMode() {
  return useContext(LaunchContext);
}
