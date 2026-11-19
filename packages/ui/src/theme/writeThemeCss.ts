import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { buildThemeCss } from "./buildThemeCss";

const target = join(import.meta.dir, "theme.css");

writeFileSync(target, buildThemeCss());
