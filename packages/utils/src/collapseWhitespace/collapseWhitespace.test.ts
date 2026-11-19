import { describe, expect, it } from "bun:test";

import { collapseWhitespace } from "./collapseWhitespace";

describe(collapseWhitespace.name, () => {
  it("trims and collapses runs of whitespace", () => {
    const expected = "hello world";
    const result = collapseWhitespace("  hello   world  ");

    expect(result).toEqual(expected);
  });
});
