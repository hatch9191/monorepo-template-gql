import { describe, expect, it } from "bun:test";

import { app } from "./app";

describe("webhooks", () => {
  it("answers the health check", async () => {
    const response = await app.request("/health");
    const expected = { status: "ok" };
    const result = await response.json();

    expect(response.status).toEqual(200);
    expect(result).toEqual(expected);
  });

  it("rejects a missing secret", async () => {
    const response = await app.request("/webhooks/example", { method: "POST" });

    expect(response.status).toEqual(401);
  });

  it("accepts the matching secret", async () => {
    process.env.WEBHOOK_SECRET = "dev-webhook-secret";
    const response = await app.request("/webhooks/example", {
      method: "POST",
      headers: { "x-webhook-secret": "dev-webhook-secret" },
    });
    const expected = { status: "ok" };
    const result = await response.json();

    expect(response.status).toEqual(200);
    expect(result).toEqual(expected);
  });
});
