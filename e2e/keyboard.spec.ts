import { expect, test, type Locator, type Page } from "@playwright/test";

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

test.describe("g jumps start at the top of the page", () => {
  for (const [keys, from, to] of [
    ["gg", "/", /\/$/],
    ["gh", "/", /\/$/],
    ["gh", "/study", /\/$/],
    ["gs", "/", /\/study$/],
    ["gs", "/study", /\/study$/]
  ] as const) {
    test(`${keys} from ${from}`, async ({ page }) => {
      await open(page, from);
      await page.evaluate(() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant"
        })
      );
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(0);

      await page.keyboard.press(keys[0]);
      await page.keyboard.press(keys[1]);

      await expect(page).toHaveURL(to);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });
  }
});

test("Enter on the index link to the current section scrolls back to it", async ({
  page
}) => {
  await open(page, "/#projects");
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.keyboard.press("g");
  await page.keyboard.press("g");
  for (let i = 0; i < 4; i++) await page.keyboard.press("j");
  await expect(selected(page)).toContainText("Projects");

  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
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

test("c and m prefixes set the colors and color mode, with a which-key hint", async ({
  page
}) => {
  await open(page, "/");

  await page.keyboard.press("c");
  await expect(page.locator(".KeyHints")).toContainText("Colors");
  await page.keyboard.press("k");
  await expect(page).toHaveURL(/theme=koyo/);
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

test.describe("prefixes", () => {
  test("m d sets dark mode without also scrolling half a page", async ({ page }) => {
    await open(page, "/");

    await page.keyboard.press("m");
    await page.keyboard.press("d");

    await expect(page.locator("html")).toHaveAttribute("data-color-mode", "dark");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("m t toggles the color mode, starting from the system one", async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await open(page, "/");

    await page.keyboard.press("m");
    await page.keyboard.press("t");
    await expect(page.locator("html")).toHaveAttribute("data-color-mode", "light");

    await page.keyboard.press("m");
    await page.keyboard.press("t");
    await expect(page.locator("html")).toHaveAttribute("data-color-mode", "dark");
  });

  test("c k sets Koyo without also moving the cursor", async ({ page }) => {
    await open(page, "/");

    await page.keyboard.press("c");
    await page.keyboard.press("k");

    await expect(page.locator("body")).toHaveAttribute("data-theme", "koyo");
    await expect(selected(page)).toHaveCount(0);
    await expect(page.locator(".KeyHints")).toHaveCount(0);
  });

  test("a prefix waits for its second key", async ({ page }) => {
    await open(page, "/?theme=koyo");

    await page.keyboard.press("c");
    await page.waitForTimeout(1500);
    await expect(page.locator(".KeyHints")).toContainText("Colors");
    await page.keyboard.press("v");

    await expect(page).toHaveURL(/theme=viridian/);
    await expect(page.locator(".KeyHints")).toHaveCount(0);
  });

  test("Escape closes a prefix without running anything", async ({ page }) => {
    await open(page, "/?theme=koyo");

    await page.keyboard.press("c");
    await page.keyboard.press("Escape");
    await expect(page.locator(".KeyHints")).toHaveCount(0);
    await page.keyboard.press("p");

    await expect(page).toHaveURL(/theme=koyo/);
  });

  test("an unknown second key cancels the prefix and is swallowed", async ({
    page
  }) => {
    await open(page, "/");

    await page.keyboard.press("c");
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
  await open(page, "/study");

  await page.keyboard.press("Space");

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test.describe("audio", () => {
  /** Opens the newest study; skips the test when it has no narration yet */
  async function openStudy(page: Page) {
    await open(page, "/study");
    await page.locator(".Entry a").first().click();
    await expect(page).toHaveURL(/\/study\/[^/]+$/);
    const mini = page.locator(".MiniPlayer");
    const hasAudio = await mini
      .waitFor({ timeout: 5000 })
      .then(() => true)
      .catch(() => false);
    test.skip(!hasAudio, "the newest study has no audio yet");
    return mini;
  }

  /** Opens the media player's panel on the newest study and starts it */
  async function playInPanel(page: Page) {
    const mini = await openStudy(page);
    await mini.getByRole("button", { name: "Open player" }).click();
    const panel = page.locator(".MediaPlayer--expanded");
    await expect(panel.locator(".MediaPlayer__times")).not.toHaveText(/00:00$/);
    await play(panel).click();
    await expect(play(panel)).toHaveText(/Pause/i);
    return panel;
  }

  function play(panel: Locator) {
    return panel
      .getByRole("group", { name: "Playback" })
      .locator(".ControlButton")
      .nth(1);
  }

  function seconds(text: string) {
    const [minutes, rest] = text.trim().split(":").map(Number);
    return minutes * 60 + rest;
  }

  async function time(panel: Locator) {
    return seconds(
      await panel.locator(".MediaPlayer__times span").first().innerText()
    );
  }

  async function seekTo(page: Page, panel: Locator, fraction: number) {
    const track = await panel.locator(".ProgressTrack__input").boundingBox();
    await page.mouse.click(
      track!.x + track!.width * fraction,
      track!.y + track!.height / 2
    );
  }

  test("the inline player starts the track, which keeps playing on other pages", async ({
    page
  }) => {
    const mini = await openStudy(page);
    await mini.locator(".ControlButton").first().click();
    await expect(mini.locator(".ControlButton").first()).toHaveText(/Pause/i);
    const bar = page.locator(".MediaPlayer__bar");
    await expect(bar.locator(".ControlButton").first()).toHaveText(/Pause/i);

    await page.locator("a", { hasText: "Spec sheet" }).first().click();
    await expect(bar).toBeVisible();
    // Playback advancing on the new page: the time moves past where it was at the switch
    const startedAt = await bar.locator(".MediaPlayer__time").innerText();
    await expect(bar.locator(".MediaPlayer__time")).not.toHaveText(startedAt);

    await page.keyboard.press("Space");
    await expect(bar.locator(".ControlButton").first()).toHaveText(/Play/i);

    await bar.locator(".MediaPlayer__title").click();
    await expect(page).toHaveURL(/\/study\/[^/]+#listen$/);
  });

  test("Space on a study page plays its track", async ({ page }) => {
    const mini = await openStudy(page);
    await page.keyboard.press("Space");
    await expect(mini.locator(".ControlButton").first()).toHaveText(/Pause/i);
  });

  test("the Listen tab and p open the panel, Escape and p close it", async ({
    page
  }) => {
    await open(page, "/");
    const tab = page.locator(".MediaPlayer .ControlButton", { hasText: "Listen" });
    test.skip((await tab.count()) === 0, "no study has audio yet");
    const panel = page.locator(".MediaPlayer--expanded");

    await tab.click();
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);

    await page.keyboard.press("p");
    await expect(panel).toBeVisible();
    await page.keyboard.press("p");
    await expect(panel).toHaveCount(0);
  });

  test("a tap on the bar opens the panel", async ({ page }) => {
    const mini = await openStudy(page);
    await mini.locator(".ControlButton").first().click();

    await page.locator(".MediaPlayer__time").click();
    await expect(page.locator(".MediaPlayer--expanded")).toBeVisible();
  });

  test("a row's button plays and pauses its track, its title opens the page", async ({
    page
  }) => {
    await open(page, "/");
    await page.keyboard.press("p");
    const panel = page.locator(".MediaPlayer--expanded");
    const hasAudio = await panel
      .waitFor({ timeout: 5000 })
      .then(() => true)
      .catch(() => false);
    test.skip(!hasAudio, "no study has audio yet");
    const row = panel.locator(".MediaPlayer__item").last();

    await row.locator(".ControlButton").click();
    await expect(row.locator(".ControlButton")).toHaveText(/Pause/i);
    await expect(play(panel)).toHaveText(/Pause/i);
    await row.locator(".ControlButton").click();
    await expect(row.locator(".ControlButton")).toHaveText(/Play/i);

    await row.locator(".MediaPlayer__entry").click();
    await expect(page).toHaveURL(/#listen$/);
  });

  test("the panel title opens its page at the inline player", async ({ page }) => {
    await open(page, "/study");
    await page.keyboard.press("p");
    const panel = page.locator(".MediaPlayer--expanded");
    const hasAudio = await panel
      .waitFor({ timeout: 5000 })
      .then(() => true)
      .catch(() => false);
    test.skip(!hasAudio, "no study has audio yet");

    await panel.locator(".MediaPlayer__title").click();
    await expect(page).toHaveURL(/#listen$/);
    await expect(page.locator(".MiniPlayer")).toBeVisible();
  });

  test("seeks on the track, and skips ten seconds with buttons and , .", async ({
    page
  }) => {
    const panel = await playInPanel(page);
    await seekTo(page, panel, 0.5);
    const total = seconds(
      await panel.locator(".MediaPlayer__times span").last().innerText()
    );
    await expect.poll(() => time(panel)).toBeGreaterThan(total / 2 - 10);

    await play(panel).click();
    await expect(play(panel)).toHaveText(/Play/i);
    const at = await time(panel);

    await page.keyboard.press(".");
    await expect.poll(() => time(panel)).toBe(at + 10);
    await page.keyboard.press(",");
    await expect.poll(() => time(panel)).toBe(at);
    await panel.getByRole("button", { name: "Forward 10 seconds" }).click();
    await expect.poll(() => time(panel)).toBe(at + 10);
    await panel.getByRole("button", { name: "Back 10 seconds" }).click();
    await expect.poll(() => time(panel)).toBe(at);
  });

  test("the position survives a reload", async ({ page }) => {
    const panel = await playInPanel(page);
    await seekTo(page, panel, 1 / 4);
    await expect.poll(() => time(panel)).toBeGreaterThan(10);
    await play(panel).click();
    const before = await time(panel);

    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open player" }).click();

    await expect
      .poll(() => time(page.locator(".MediaPlayer--expanded")))
      .toBeGreaterThanOrEqual(before - 1);
  });

  test("the bar's + expands the player", async ({ page }) => {
    const mini = await openStudy(page);
    await mini.locator(".ControlButton").first().click();
    const bar = page.locator(".MediaPlayer__bar");

    await bar.getByRole("button", { name: "Expand player" }).click();

    await expect(page.locator(".MediaPlayer--expanded")).toBeVisible();
    await expect(bar).toHaveCount(0);
  });
});
