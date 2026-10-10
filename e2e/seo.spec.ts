import { expect, test } from "@playwright/test";

const POST = "/study/out-of-sync";

test("each page names itself as canonical", async ({ page }) => {
  for (const path of ["/", "/study", POST]) {
    await page.goto(path);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute(
      "href",
      new URL(path, "https://nbr.haus").href
    );
  }
});

test("a post carries BlogPosting structured data", async ({ page }) => {
  await page.goto(POST);
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const posting = scripts
    .map(text => JSON.parse(text))
    .find(data => data["@type"] === "BlogPosting");

  expect(posting).toMatchObject({
    headline: "Out of Sync",
    url: "https://nbr.haus/study/out-of-sync"
  });
});

test("the sitemap lists the posts", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.headers()["content-type"]).toContain("application/xml");
  expect(await response.text()).toContain(
    "<loc>https://nbr.haus/study/out-of-sync</loc>"
  );
});

test("the feed lists the posts, also for feed fetchers", async ({
  request,
  page
}) => {
  const response = await request.get("/study/rss.xml", {
    headers: { "User-Agent": "Feedfetcher-Google" }
  });
  expect(response.headers()["content-type"]).toContain("application/rss+xml");
  expect(await response.text()).toContain("<title>Out of Sync</title>");

  await page.goto("/");
  await expect(
    page.locator('link[rel="alternate"][type="application/rss+xml"]')
  ).toHaveAttribute("href", "/study/rss.xml");
});
