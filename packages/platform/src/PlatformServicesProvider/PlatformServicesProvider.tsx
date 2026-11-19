"use client";

import { createContext, type ReactNode } from "react";

import type { PlatformServices } from "../types";

export const PlatformServicesContext = createContext<PlatformServices | null>(
  null,
);

type PlatformServicesProviderProps = {
  services: PlatformServices;
  children: ReactNode;
};

export function PlatformServicesProvider({
  services,
  children,
}: PlatformServicesProviderProps) {
  return (
    <PlatformServicesContext.Provider value={services}>
      {children}
    </PlatformServicesContext.Provider>
  );
}
