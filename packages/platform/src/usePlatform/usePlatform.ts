"use client";

import { useContext } from "react";

import { PlatformContext } from "../PlatformProvider/PlatformProvider";
import type { Platform } from "../types";

export function usePlatform(): Platform {
  const platform = useContext(PlatformContext);

  if (!platform) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }

  return platform;
}
