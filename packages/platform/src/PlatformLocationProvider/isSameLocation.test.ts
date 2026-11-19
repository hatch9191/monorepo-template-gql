import { describe, expect, it } from "bun:test";

import type { LocationAdapter } from "../adapters/location";
import { isSameLocation } from "./isSameLocation";

describe(isSameLocation.name, () => {
  it("returns false when the current location is missing", () => {
    const next: LocationAdapter = {
      pathname: "/notes",
      searchParams: new URLSearchParams("q=a"),
    };
    const expected = false;
    const result = isSameLocation(null, next);

    expect(result).toEqual(expected);
  });

  it("returns true when the pathname and query string match", () => {
    const current: LocationAdapter = {
      pathname: "/notes",
      searchParams: new URLSearchParams("q=a"),
    };
    const next: LocationAdapter = {
      pathname: "/notes",
      searchParams: new URLSearchParams("q=a"),
    };
    const expected = true;
    const result = isSameLocation(current, next);

    expect(result).toEqual(expected);
  });

  it("returns false when the pathname changes", () => {
    const current: LocationAdapter = {
      pathname: "/notes",
      searchParams: new URLSearchParams("q=a"),
    };
    const next: LocationAdapter = {
      pathname: "/archive",
      searchParams: new URLSearchParams("q=a"),
    };
    const expected = false;
    const result = isSameLocation(current, next);

    expect(result).toEqual(expected);
  });

  it("returns false when the query string changes", () => {
    const current: LocationAdapter = {
      pathname: "/notes",
      searchParams: new URLSearchParams("q=a"),
    };
    const next: LocationAdapter = {
      pathname: "/notes",
      searchParams: new URLSearchParams("q=b"),
    };
    const expected = false;
    const result = isSameLocation(current, next);

    expect(result).toEqual(expected);
  });
});
