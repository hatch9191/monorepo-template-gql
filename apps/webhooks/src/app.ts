import { createHash, timingSafeEqual } from "node:crypto";
import { Hono } from "hono";

export const app = new Hono();

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/webhooks/example", (c) => {
  const header = c.req.header("x-webhook-secret");

  if (!header) {
    return c.json({ error: "Unauthorised" }, 401);
  }

  const secret = process.env.WEBHOOK_SECRET ?? "";
  const headerDigest = createHash("sha256").update(header).digest();
  const secretDigest = createHash("sha256").update(secret).digest();

  if (!timingSafeEqual(headerDigest, secretDigest)) {
    return c.json({ error: "Unauthorised" }, 401);
  }

  return c.json({ status: "ok" });
});
