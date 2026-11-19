import { expect, test } from "@playwright/test";

test("shows the note form", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel("Title")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create" })).toBeVisible();
});
