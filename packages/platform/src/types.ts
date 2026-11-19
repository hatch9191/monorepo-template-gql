import type { AnalyticsAdapter } from "./adapters/analytics";
import type { AuthAdapter } from "./adapters/auth";
import type { RouterAdapter } from "./adapters/router";
import type { KeyValueStore } from "./adapters/storage";

export type Platform = {
  auth: AuthAdapter;
  storage: KeyValueStore;
  analytics: AnalyticsAdapter;
  router?: RouterAdapter;
};
