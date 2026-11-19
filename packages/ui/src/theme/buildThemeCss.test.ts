import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildThemeCss } from "./buildThemeCss";

describe(buildThemeCss.name, () => {
  it("matches the committed theme.css", () => {
    const expected = buildThemeCss();
    const result = readFileSync(join(import.meta.dir, "theme.css"), "utf8");

    expect(result).toEqual(expected);
  });
});
