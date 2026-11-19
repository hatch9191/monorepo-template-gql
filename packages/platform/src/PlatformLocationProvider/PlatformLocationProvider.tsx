"use client";

import { createContext, type ReactNode, useCallback, useState } from "react";

import type { LocationAdapter } from "../adapters/location";
import { isSameLocation } from "./isSameLocation";

export const PlatformLocationContext = createContext<
  LocationAdapter | null | undefined
>(undefined);

export const SetPlatformLocationContext = createContext<
  ((location: LocationAdapter) => void) | null
>(null);

type PlatformLocationProviderProps = {
  children: ReactNode;
};

export function PlatformLocationProvider({
  children,
}: PlatformLocationProviderProps) {
  const [location, setLocationState] = useState<LocationAdapter | null>(null);
  const setLocation = useCallback((next: LocationAdapter) => {
    setLocationState((current) => {
      if (isSameLocation(current, next)) {
        return current;
      }

      return next;
    });
  }, []);

  return (
    <SetPlatformLocationContext.Provider value={setLocation}>
      <PlatformLocationContext.Provider value={location}>
        {children}
      </PlatformLocationContext.Provider>
    </SetPlatformLocationContext.Provider>
  );
}
