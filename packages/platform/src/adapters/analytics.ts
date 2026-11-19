export type AnalyticsEventProperties = Record<string, unknown>;

export type AnalyticsAdapter = {
  track(event: string, properties?: AnalyticsEventProperties): void;
  identify(userId: string, traits?: AnalyticsEventProperties): void;
};
