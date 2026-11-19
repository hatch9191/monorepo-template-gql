"use client";

import {
  type AnalyticsAdapter,
  type AuthAdapter,
  type KeyValueStore,
  PlatformLocationProvider,
  type PlatformServices,
  PlatformServicesProvider,
  type RouterAdapter,
} from "@repo/platform";
import { useRouter } from "next/navigation";
import { type ReactNode, Suspense, useMemo } from "react";

import { PlatformLocationBridge } from "./PlatformLocationBridge";

const auth: AuthAdapter = {
  getToken: async () => null,
  signOut: async () => {},
};

const storage: KeyValueStore = {
  get: async (key) => window.localStorage.getItem(key),
  set: async (key, value) => {
    window.localStorage.setItem(key, value);
  },
  remove: async (key) => {
    window.localStorage.removeItem(key);
  },
};

const analytics: AnalyticsAdapter = {
  track: () => {},
  identify: () => {},
};

type PlatformProviderProps = {
  children: ReactNode;
};

export function PlatformProvider({ children }: PlatformProviderProps) {
  const router = useRouter();
  const services = useMemo<PlatformServices>(() => {
    const platformRouter: RouterAdapter = {
      push: (path) => {
        router.push(path);
      },
      replace: (path) => {
        router.replace(path);
      },
      refresh: () => {
        router.refresh();
      },
    };

    return {
      auth,
      storage,
      analytics,
      router: platformRouter,
    };
  }, [router]);

  return (
    <PlatformServicesProvider services={services}>
      <PlatformLocationProvider>
        <Suspense fallback={null}>
          <PlatformLocationBridge />
        </Suspense>
        {children}
      </PlatformLocationProvider>
    </PlatformServicesProvider>
  );
}
