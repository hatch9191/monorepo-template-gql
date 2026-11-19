"use client";

import { createContext, type ReactNode } from "react";

import type { Platform } from "../types";

export const PlatformContext = createContext<Platform | null>(null);

type PlatformProviderProps = {
  platform: Platform;
  children: ReactNode;
};

export function PlatformProvider({
  platform,
  children,
}: PlatformProviderProps) {
  return (
    <PlatformContext.Provider value={platform}>
      {children}
    </PlatformContext.Provider>
  );
}
