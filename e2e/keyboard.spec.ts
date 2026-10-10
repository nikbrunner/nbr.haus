import { expect, test, type Page } from "@playwright/test";

function selected(page: Page) {
  return page.locator("[data-nav-selected]");
}

/** Waits until React has hydrated, so the key bindings are registered */
async function open(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator(".ControlButton").first()).toBeVisible();
  await page.waitForLoadState("networkidle");
}

test("j and k walk the blocks, with brackets around the selection", async ({
  page
}) => {
  await open(page, "/");

  await page.keyboard.press("g");
  await page.keyboard.press("g");
  await expect(selected(page)).toContainText("Spec sheet");
  await expect(page.locator(".NavCursor")).toBeVisible();

  await page.keyboard.press("j");
  await expect(selected(page)).toContainText("Ident");
  await page.keyboard.press("k");
  await expect(selected(page)).toContainText("Spec sheet");

  await page.keyboard.press("Escape");
  await expect(selected(page)).toHaveCount(0);
  await expect(page.locator(".NavCursor")).toHaveCount(0);
});

test("J jumps to the next section and scrolls it to the top", async ({ page }) => {
  await open(page, "/");

  await page.keyboard.press("Shift+J");
  await expect(selected(page)).toContainText("01");
  await page.keyboard.press("Shift+J");
  await expect(selected(page)).toContainText("About");
  await expect
    .poll(() =>
      selected(page).evaluate(element => element.getBoundingClientRect().top)
    )
    .toBeCloseTo(48, 0);
});

test("g s opens the study list on its first entry, Enter opens it", async ({
  page
}) => {
  await open(page, "/");

  await page.keyboard.press("g");
  await page.keyboard.press("s");
  await expect(page).toHaveURL(/\/study$/);
  await expect(selected(page)).toHaveClass(/Entry/);

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/study\/[^/]+$/);
});

test("h and l move between the links of a block", async ({ page }) => {
  await open(page, "/");

  await page.keyboard.press("Shift+J");
  // Ident: Name, Role, Base, Born, Code, Languages, Mail, Elsewhere
  for (let step = 0; step < 8; step++) await page.keyboard.press("j");
  await expect(selected(page)).toContainText("Elsewhere");

  await page.keyboard.press("l");
  await expect(page.locator(":focus")).toHaveText("GitHub");
  await page.keyboard.press("l");
  await expect(page.locator(":focus")).toHaveText("LinkedIn");
  await page.keyboard.press("h");
  await page.keyboard.press("h");
  await expect(page.locator(":focus")).toContainText("Elsewhere");
});

test("t and m prefixes set the accent and color mode, with a which-key hint", async ({
  page
}) => {
  await open(page, "/");

  await page.keyboard.press("t");
  await expect(page.locator(".KeyHints")).toContainText("Theme");
  await page.keyboard.press("b");
  await expect(page).toHaveURL(/accent=265/);
  await expect(page.locator(".KeyHints")).toHaveCount(0);

  await page.keyboard.press("m");
  await page.keyboard.press("d");
  await expect(page.locator("html")).toHaveAttribute("data-color-mode", "dark");
});

test("? lists every binding", async ({ page }) => {
  await open(page, "/");

  await page.keyboard.press("?");
  await expect(page.locator(".KeyHints")).toContainText("Next / previous block");
  await page.keyboard.press("Escape");
  await expect(page.locator(".KeyHints")).toHaveCount(0);
});

test("audio keeps playing on another page in the mini player", async ({ page }) => {
  await open(page, "/study");
  await page.locator(".Entry a").first().click();
  await expect(page).toHaveURL(/\/study\/[^/]+$/);
  await expect(page.locator("h1")).not.toContainText("Study");
  const player = page.locator(".AudioPlayer");
  const hasAudio = await player
    .waitFor({ timeout: 5000 })
    .then(() => true)
    .catch(() => false);
  test.skip(!hasAudio, "the newest study has no audio yet");

  await player.locator(".ControlButton").first().click();
  await expect(player.locator(".ControlButton").first()).toHaveText(/Pause/i);

  await page.locator("a", { hasText: "Spec sheet" }).first().click();
  const mini = page.locator(".MiniPlayer");
  await expect(mini).toBeVisible();
  await expect(mini.locator(".ControlButton").first()).toHaveText(/Pause/i);
  // Playback advancing on the new page: the time moves past where it was at the switch
  const startedAt = await mini.locator(".MiniPlayer__time").innerText();
  await expect(mini.locator(".MiniPlayer__time")).not.toHaveText(startedAt);

  await page.keyboard.press("Space");
  await expect(mini.locator(".ControlButton").first()).toHaveText(/Play/i);

  await mini.locator(".MiniPlayer__title").click();
  await expect(mini).toHaveCount(0);
  await expect(player).toBeVisible();
});

test.describe("prefixes", () => {
  test("m d sets dark mode without also scrolling half a page", async ({ page }) => {
    await open(page, "/");

    await page.keyboard.press("m");
    await page.keyboard.press("d");

    await expect(page.locator("html")).toHaveAttribute("data-color-mode", "dark");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("t g sets green without opening the Go hint", async ({ page }) => {
    await open(page, "/?accent=27");

    await page.keyboard.press("t");
    await page.keyboard.press("g");

    // Green is the default accent, so the router drops it from the URL
    await expect
      .poll(() =>
        page.evaluate(() => document.body.style.getPropertyValue("--hue-accent"))
      )
      .toBe("155");
    await expect(page.locator(".KeyHints")).toHaveCount(0);
  });

  test("a prefix waits for its second key", async ({ page }) => {
    await open(page, "/?accent=27");

    await page.keyboard.press("t");
    await page.waitForTimeout(1500);
    await expect(page.locator(".KeyHints")).toContainText("Theme");
    await page.keyboard.press("b");

    await expect(page).toHaveURL(/accent=265/);
    await expect(page.locator(".KeyHints")).toHaveCount(0);
  });

  test("Escape closes a prefix without running anything", async ({ page }) => {
    await open(page, "/?accent=27");

    await page.keyboard.press("t");
    await page.keyboard.press("Escape");
    await expect(page.locator(".KeyHints")).toHaveCount(0);
    await page.keyboard.press("b");

    await expect(page).toHaveURL(/accent=27/);
  });

  test("an unknown second key cancels the prefix and is swallowed", async ({
    page
  }) => {
    await open(page, "/");

    await page.keyboard.press("t");
    await page.keyboard.press("j");

    await expect(page.locator(".KeyHints")).toHaveCount(0);
    await expect(selected(page)).toHaveCount(0);
  });
});

test.describe("cursor edges", () => {
  test("arrow keys scroll before a selection and move it after", async ({
    page
  }) => {
    await open(page, "/");

    await page.keyboard.press("ArrowDown");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(selected(page)).toHaveCount(0);

    await page.keyboard.press("j");
    const first = await selected(page).innerText();
    await page.keyboard.press("ArrowDown");
    await expect(selected(page)).not.toHaveText(first);
  });

  test("a click clears the selection", async ({ page }) => {
    await open(page, "/");

    await page.keyboard.press("j");
    await expect(selected(page)).toHaveCount(1);
    await page.mouse.click(600, 700);

    await expect(selected(page)).toHaveCount(0);
  });

  test("a route change leaves no stale selection behind", async ({ page }) => {
    await open(page, "/");
    await page.keyboard.press("Shift+J");
    await expect(selected(page)).toContainText("Ident");

    await page.keyboard.press("g");
    await page.keyboard.press("s");
    await expect(page).toHaveURL(/\/study$/);
    await expect(selected(page)).toHaveCount(1);
    await expect(selected(page)).toHaveClass(/Entry/);

    await page.keyboard.press("g");
    await page.keyboard.press("h");
    await expect(page).toHaveURL(/\/$|\/\?/);
    await expect(page.locator(".NavCursor")).toHaveCount(0);
    await page.keyboard.press("j");
    await expect(selected(page)).toHaveCount(1);
  });
});

test.describe("a row of mixed items", () => {
  async function selectRow(page: Page, label: string) {
    await page.keyboard.press("Shift+J");
    for (let step = 0; step < 15; step++) {
      if ((await selected(page).innerText()).startsWith(label)) return;
      await page.keyboard.press("j");
    }
    throw new Error(`No row starting with ${label}`);
  }

  test("l skips plain text and reaches a button", async ({ page }) => {
    await open(page, "/");
    await selectRow(page, "CV");

    await page.keyboard.press("l");

    await expect(page.locator(":focus")).toHaveText(/Print/i);
  });

  test("Enter on an external link opens it in a new tab", async ({
    page,
    context
  }) => {
    await open(page, "/");
    await selectRow(page, "ELSEWHERE");
    await page.keyboard.press("l");
    await expect(page.locator(":focus")).toHaveText("GitHub");

    const popup = context.waitForEvent("page");
    await page.keyboard.press("Enter");

    expect((await popup).url()).toContain("github.com");
    await expect(page).toHaveURL(/localhost/);
  });
});

test("Space scrolls a page without audio", async ({ page }) => {
  await open(page, "/");

  await page.keyboard.press("Space");

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test.describe("audio player", () => {
  async function openStudy(page: Page) {
    await open(page, "/study");
    await page.locator(".Entry a").first().click();
    await expect(page).toHaveURL(/\/study\/[^/]+$/);
    const player = page.locator(".AudioPlayer");
    const hasAudio = await player
      .waitFor({ timeout: 5000 })
      .then(() => true)
      .catch(() => false);
    test.skip(!hasAudio, "the newest study has no audio yet");
    await expect(player.locator(".AudioPlayer__time")).not.toHaveText(/\/ 00:00$/);
    return player;
  }

  function seconds(text: string) {
    const [minutes, rest] = text.split("/")[0].trim().split(":").map(Number);
    return minutes * 60 + rest;
  }

  async function time(player: ReturnType<Page["locator"]>) {
    return seconds(await player.locator(".AudioPlayer__time").innerText());
  }

  test("plays, seeks on the track and pauses", async ({ page }) => {
    const player = await openStudy(page);
    const button = player.locator(".ControlButton").first();

    await button.click();
    await expect(button).toHaveText(/Pause/i);

    const track = await player.locator(".AudioPlayer__progress").boundingBox();
    await page.mouse.click(
      track!.x + track!.width / 2,
      track!.y + track!.height / 2
    );
    const total = seconds(
      (await player.locator(".AudioPlayer__time").innerText()).split("/")[1]
    );
    await expect.poll(() => time(player)).toBeGreaterThan(total / 2 - 10);

    await button.click();
    await expect(button).toHaveText(/Play/i);
  });

  test("a voice switch keeps playing, five seconds earlier", async ({ page }) => {
    const player = await openStudy(page);
    await player.locator(".ControlButton").first().click();
    const track = await player.locator(".AudioPlayer__progress").boundingBox();
    await page.mouse.click(
      track!.x + track!.width / 3,
      track!.y + track!.height / 2
    );
    await expect.poll(() => time(player)).toBeGreaterThan(20);
    const before = await time(player);

    await player.locator(".ControlButton", { hasText: "Sadie" }).click();

    await expect(
      player.locator(".ControlButton", { hasText: "Sadie" })
    ).toHaveAttribute("aria-pressed", "true");
    await expect(player.locator(".ControlButton").first()).toHaveText(/Pause/i);
    const after = await time(player);
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThanOrEqual(before - 7);
  });

  test("the position survives a reload", async ({ page }) => {
    const player = await openStudy(page);
    await player.locator(".ControlButton").first().click();
    const track = await player.locator(".AudioPlayer__progress").boundingBox();
    await page.mouse.click(
      track!.x + track!.width / 4,
      track!.y + track!.height / 2
    );
    await expect.poll(() => time(player)).toBeGreaterThan(10);
    await player.locator(".ControlButton").first().click();
    const before = await time(player);

    await page.reload();

    await expect
      .poll(() => time(page.locator(".AudioPlayer")))
      .toBeGreaterThanOrEqual(before - 1);
  });

  test("the close button stops playback and hides the mini player", async ({
    page
  }) => {
    const player = await openStudy(page);
    await player.locator(".ControlButton").first().click();
    await expect(player.locator(".ControlButton").first()).toHaveText(/Pause/i);

    await page.locator("a", { hasText: "Spec sheet" }).first().click();
    const mini = page.locator(".MiniPlayer");
    await expect(mini).toBeVisible();
    await mini.getByRole("button", { name: "Stop and close" }).click();

    await expect(mini).toHaveCount(0);
    await page.goBack();
    await expect(page.locator(".AudioPlayer .ControlButton").first()).toHaveText(
      /Play/i
    );
  });
});
