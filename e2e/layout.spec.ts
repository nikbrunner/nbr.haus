import { expect, test } from "@playwright/test";

test("on a phone the portrait has its caption beside it", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");
  const caption = page.locator(".WithFigure__caption");

  await expect(caption).toBeVisible();
  await expect(caption).toContainText("The specimen");
  const portrait = await page.locator(".Portrait").boundingBox();
  const captionBox = await caption.boundingBox();
  expect(captionBox!.x).toBeGreaterThan(portrait!.x + portrait!.width);
});

test("beside the specs the portrait has its caption below it", async ({ page }) => {
  await page.goto("/");
  const caption = page.locator(".WithFigure__caption");

  await expect(caption).toBeVisible();
  const portrait = await page.locator(".Portrait").boundingBox();
  const captionBox = await caption.boundingBox();
  expect(captionBox!.y).toBeGreaterThan(portrait!.y + portrait!.height);
});

test("on a narrow screen an entry's aside sits above it, not beside it", async ({
  page
}) => {
  await page.setViewportSize({ width: 560, height: 900 });
  await page.goto("/");
  const entry = page.locator("#work .Entry").first();
  const aside = await entry.locator(".Entry__aside").boundingBox();
  const body = await entry.locator(".Entry__body").boundingBox();

  expect(body!.y).toBeGreaterThan(aside!.y + aside!.height - 1);
  expect(body!.x).toBeCloseTo(aside!.x, 0);
});
