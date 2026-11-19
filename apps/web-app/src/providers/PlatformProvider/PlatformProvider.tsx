"use client";

import {
  PlatformProvider as BasePlatformProvider,
  type Platform,
} from "@repo/platform";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useMemo } from "react";

type PlatformProviderProps = {
  children: ReactNode;
};

export function PlatformProvider({ children }: PlatformProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const platform = useMemo<Platform>(() => {
    return {
      auth: {
        getToken: async () => null,
        signOut: async () => {},
      },
      storage: {
        get: async (key) => window.localStorage.getItem(key),
        set: async (key, value) => {
          window.localStorage.setItem(key, value);
        },
        remove: async (key) => {
          window.localStorage.removeItem(key);
        },
      },
      analytics: {
        track: () => {},
        identify: () => {},
      },
      router: {
        pathname,
        searchParams: new URLSearchParams(searchParams.toString()),
        push: (path) => {
          router.push(path);
        },
        replace: (path) => {
          router.replace(path);
        },
      },
    };
  }, [pathname, router, searchParams]);

  return (
    <BasePlatformProvider platform={platform}>{children}</BasePlatformProvider>
  );
}
