"use client";

import { type LocationAdapter, useSetPlatformLocation } from "@repo/platform";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PlatformLocationBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setLocation = useSetPlatformLocation();
  const search = searchParams.toString();

  useEffect(() => {
    const location: LocationAdapter = {
      pathname,
      searchParams: new URLSearchParams(search),
    };

    setLocation(location);
  }, [pathname, search, setLocation]);

  return null;
}
