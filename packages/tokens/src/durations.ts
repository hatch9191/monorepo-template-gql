export const durations = {
  fast: "150ms",
  standard: "200ms",
} as const;

export type DurationToken = keyof typeof durations;
