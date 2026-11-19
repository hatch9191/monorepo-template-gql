"use client";

import { useContext } from "react";

import type { LocationAdapter } from "../adapters/location";
import { PlatformLocationContext } from "../PlatformLocationProvider/PlatformLocationProvider";

export function usePlatformLocation(): LocationAdapter | null {
  const location = useContext(PlatformLocationContext);

  if (location === undefined) {
    throw new Error(
      "usePlatformLocation must be used within a PlatformLocationProvider",
    );
  }

  return location;
}
