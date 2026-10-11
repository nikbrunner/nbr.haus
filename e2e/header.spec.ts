import { expect, test, type Page } from "@playwright/test";

async function boxes(page: Page) {
  const title = await page.locator(".DocumentHeader__title").boundingBox();
  const header = await page.locator(".DocumentHeader").boundingBox();
  if (!title || !header) throw new Error("header not rendered");
  return { title, header };
}

test("the title box sits centered and narrower than the sheet", async ({ page }) => {
  await page.goto("/study");
  const { title, header } = await boxes(page);

  expect(title.width).toBeLessThan(header.width);
  const left = title.x - header.x;
  const right = header.x + header.width - (title.x + title.width);
  expect(Math.abs(left - right)).toBeLessThan(2);
});

test("on a phone the title box takes the full width and wraps", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/study");
  const { title, header } = await boxes(page);

  expect(title.x).toBeCloseTo(header.x, 0);
  expect(title.width).toBeCloseTo(header.width, 0);
});
