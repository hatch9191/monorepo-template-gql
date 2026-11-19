"use client";

import { useContext } from "react";

import { PlatformServicesContext } from "../PlatformServicesProvider/PlatformServicesProvider";
import type { PlatformServices } from "../types";

export function usePlatformServices(): PlatformServices {
  const services = useContext(PlatformServicesContext);

  if (!services) {
    throw new Error(
      "usePlatformServices must be used within a PlatformServicesProvider",
    );
  }

  return services;
}
