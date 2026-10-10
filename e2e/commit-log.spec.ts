import { expect, test } from "@playwright/test";

test.skip(
  process.env.GITHUB_LOG !== "on",
  "needs the live commit log: npm run test:e2e:token"
);

test("the commit log lists commits and shows more on request", async ({
  page,
  context
}) => {
  await page.goto("/");
  const log = page.locator("#projects .SpecSubsection").filter({ hasText: "Log" });
  const entries = log.locator(".Entry");

  await expect(entries.first()).toBeVisible({ timeout: 15_000 });
  await expect(entries).toHaveCount(10);
  await expect(entries.first()).toContainText("/");

  const hash = entries.first().locator("a");
  await expect(hash).toHaveText(/^[0-9a-f]{7}$/);
  const popup = context.waitForEvent("page");
  await hash.click();
  expect((await popup).url()).toContain("github.com");

  await log.getByRole("button", { name: /Show \d+ more/i }).click();
  await expect(entries).toHaveCount(20);
});
