"use client";

import { useMemo } from "react";

import type { Platform } from "../types";
import { usePlatformLocation } from "../usePlatformLocation/usePlatformLocation";
import { usePlatformServices } from "../usePlatformServices/usePlatformServices";

export function usePlatform(): Platform {
  const services = usePlatformServices();
  const location = usePlatformLocation();

  return useMemo(
    () => ({
      ...services,
      location,
    }),
    [location, services],
  );
}
