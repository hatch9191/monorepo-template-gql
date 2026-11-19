import type { ReactNode } from "react";

type ShowProps<T> = {
  when: T | null | undefined | false | "" | 0;
  fallback?: ReactNode;
  children: (value: NonNullable<T>) => ReactNode;
};

export function Show<T>({ when, fallback = null, children }: ShowProps<T>) {
  if (!when) {
    return fallback;
  }

  return children(when);
}
