import { describe, expect, it } from "bun:test";

import { normaliseNoteTitle } from "./normaliseNoteTitle";

describe(normaliseNoteTitle.name, () => {
  it("returns a trimmed title with collapsed whitespace", () => {
    const expected = "Week notes";
    const result = normaliseNoteTitle("  Week   notes  ");

    expect(result).toEqual(expected);
  });

  it("returns an empty string when the title is blank", () => {
    const expected = "";
    const result = normaliseNoteTitle("   ");

    expect(result).toEqual(expected);
  });
});
