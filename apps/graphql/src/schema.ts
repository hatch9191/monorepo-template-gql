import { readFileSync } from "node:fs";
import { join } from "node:path";

export const typeDefs = readFileSync(
  join(import.meta.dir, "graphql", "notes.graphql"),
  "utf8",
);
