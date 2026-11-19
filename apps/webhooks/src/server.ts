import { logger } from "@repo/logging";

import { app } from "./app";

const port = Number(process.env.PORT ?? 4101);

Bun.serve({
  hostname: "0.0.0.0",
  port,
  fetch: app.fetch,
});

logger.info({
  message: "Webhooks server started",
  url: `http://localhost:${port}`,
});
