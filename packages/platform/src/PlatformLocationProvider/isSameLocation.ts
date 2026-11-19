import type { LocationAdapter } from "../adapters/location";

export function isSameLocation(
  current: LocationAdapter | null,
  next: LocationAdapter,
): boolean {
  if (current === null) {
    return false;
  }

  return (
    current.pathname === next.pathname &&
    current.searchParams.toString() === next.searchParams.toString()
  );
}
