"use client";

import { useContext } from "react";

import type { LocationAdapter } from "../adapters/location";
import { SetPlatformLocationContext } from "../PlatformLocationProvider/PlatformLocationProvider";

export function useSetPlatformLocation(): (location: LocationAdapter) => void {
  const setLocation = useContext(SetPlatformLocationContext);

  if (!setLocation) {
    throw new Error(
      "useSetPlatformLocation must be used within a PlatformLocationProvider",
    );
  }

  return setLocation;
}
