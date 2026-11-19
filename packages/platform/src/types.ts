import type { AnalyticsAdapter } from "./adapters/analytics";
import type { AuthAdapter } from "./adapters/auth";
import type { LocationAdapter } from "./adapters/location";
import type { RouterAdapter } from "./adapters/router";
import type { KeyValueStore } from "./adapters/storage";

export type PlatformServices = {
  auth: AuthAdapter;
  storage: KeyValueStore;
  analytics: AnalyticsAdapter;
  router: RouterAdapter;
};

export type Platform = PlatformServices & {
  location: LocationAdapter | null;
};
