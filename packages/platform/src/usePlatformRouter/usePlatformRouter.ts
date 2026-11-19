"use client";

import type { RouterAdapter } from "../adapters/router";
import { usePlatformServices } from "../usePlatformServices/usePlatformServices";

export function usePlatformRouter(): RouterAdapter {
  const { router } = usePlatformServices();

  return router;
}
