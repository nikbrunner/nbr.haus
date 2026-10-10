import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  activateBlock,
  centerSelected,
  clearCursor,
  getSelectedBlock,
  moveBlock,
  moveItem,
  moveSection,
  scrollHalfPage,
  selectEdge,
  selectFirst,
  subscribeToCursor,
  topSelected
} from "@/lib/navCursor";

/**
 * A page in miniature: two header columns that start on the same line, a section of rows and
 * prose, a second section, and a hidden row the cursor must skip
 */
const FIXTURE = `
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div class="ControlGroup" id="accent"><button>R</button><button>O</button></div>
    <div class="Contents__row" id="index"><a href="#home">Home</a></div>
  </div>
  <section>
    <header class="SpecSection__head" id="one">01 One</header>
    <div class="SpecList__item" id="name">Name</div>
    <div class="SpecList__item" id="links"><a href="#x">x</a> <a href="#y">y</a></div>
    <div class="SpecList__item" id="hidden" style="display: none"><a href="#h">h</a></div>
    <div class="SpecList__item" id="mixed">
      Text first
      <a href="#local">local</a>
      <button disabled>off</button>
      <a href="#gone" style="display: none">gone</a>
      <button id="print">Print</button>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">external</a>
      <span>trailing text</span>
    </div>
    <div class="Prose">
      <p id="first" style="height: 300px">First paragraph</p>
      <h2 id="sub">Sub</h2>
      <p id="second" style="height: 300px">Second paragraph</p>
    </div>
  </section>
  <section>
    <header class="SpecSection__head" id="two">02 Two</header>
    <p data-nav-block id="tall" style="height: 1200px">Taller than the window</p>
    <p data-nav-block id="last" style="height: 1500px">Last block</p>
  </section>
`;

const READING_ORDER = [
  "accent",
  "index",
  "one",
  "name",
  "links",
  "mixed",
  "first",
  "sub",
  "second",
  "two",
  "tall",
  "last"
];

function selectById(id: string) {
  clearCursor();
  window.scrollTo({ top: 0, behavior: "instant" });
  for (let step = 0; step <= READING_ORDER.indexOf(id); step++) moveBlock(1, false);
  expect(selectedId()).toBe(id);
}

function selectedId() {
  return getSelectedBlock()?.id ?? null;
}

function focusedId() {
  return document.activeElement?.id || document.activeElement?.textContent || null;
}

function topOf(id: string) {
  return document.getElementById(id)!.getBoundingClientRect().top;
}

const scrollTo = window.scrollTo.bind(window);
const scrollBy = window.scrollBy.bind(window);

beforeEach(() => {
  // A page in the background never runs smooth-scroll animations, and the suite runs this page
  // next to others; the tests check where the cursor scrolls to, not the animation
  vi.spyOn(window, "scrollTo").mockImplementation(((options: ScrollToOptions) =>
    scrollTo({ ...options, behavior: "instant" })) as typeof window.scrollTo);
  vi.spyOn(window, "scrollBy").mockImplementation(((options: ScrollToOptions) =>
    scrollBy({ ...options, behavior: "instant" })) as typeof window.scrollBy);
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.margin = "0";
  document.body.innerHTML = FIXTURE;
  window.scrollTo({ top: 0, behavior: "instant" });
});

afterEach(() => {
  clearCursor();
  vi.restoreAllMocks();
});

describe("moveBlock", () => {
  it("walks the blocks in visual reading order and skips hidden ones", () => {
    const visited = READING_ORDER.map(() => {
      moveBlock(1, false);
      return selectedId();
    });

    expect(visited).toEqual(READING_ORDER);
  });

  it("puts left before right when blocks start on the same line", () => {
    moveBlock(1, false);
    moveBlock(1, false);

    expect(selectedId()).toBe("index");
    moveBlock(-1, false);
    expect(selectedId()).toBe("accent");
  });

  it("stays on the first block when moving up from it", () => {
    moveBlock(1, false);
    moveBlock(-1, false);

    expect(selectedId()).toBe("accent");
  });

  it("starts from the viewport once scrolling has taken the selection out of view", () => {
    moveBlock(1, false);
    window.scrollTo({
      top: topOf("two") + window.scrollY - 10,
      behavior: "instant"
    });

    moveBlock(1, false);

    // The first block in view, not the block after the old selection ("index")
    expect(selectedId()).toBe("two");
  });

  it("scrolls a block below the viewport into view", () => {
    for (let step = 0; step < READING_ORDER.indexOf("second") + 1; step++)
      moveBlock(1, false);

    const { top, bottom } = document
      .getElementById("second")!
      .getBoundingClientRect();
    expect(top).toBeGreaterThanOrEqual(0);
    expect(bottom).toBeLessThanOrEqual(window.innerHeight);
  });
});

describe("moveSection", () => {
  it("jumps between section headings and article headings only", () => {
    const visited = [1, 1, 1].map(() => {
      moveSection(1, false);
      return selectedId();
    });

    expect(visited).toEqual(["one", "sub", "two"]);
    moveSection(-1, false);
    expect(selectedId()).toBe("sub");
  });

  it("scrolls the heading to the top of the window", () => {
    moveSection(1, false);
    moveSection(1, false);

    expect(topOf("sub")).toBeCloseTo(48, 0);
  });
});

describe("moveItem", () => {
  beforeEach(() => {
    for (let step = 0; step < READING_ORDER.indexOf("links") + 1; step++)
      moveBlock(1, false);
  });

  it("enters the block at its first item and walks its items", () => {
    moveItem(1);
    expect(focusedId()).toBe("x");
    moveItem(1);
    expect(focusedId()).toBe("y");
    moveItem(1);
    expect(focusedId()).toBe("y");
  });

  it("returns to the block before the first item", () => {
    moveItem(1);
    moveItem(-1);

    expect(document.activeElement?.id).toBe("links");
    expect(selectedId()).toBe("links");
  });
});

describe("activateBlock", () => {
  it("follows the selected block's first link", () => {
    for (let step = 0; step < READING_ORDER.indexOf("links") + 1; step++)
      moveBlock(1, false);
    const click = vi.fn((event: Event) => event.preventDefault());
    document.querySelector('a[href="#x"]')!.addEventListener("click", click);

    activateBlock();

    expect(click).toHaveBeenCalledOnce();
  });

  it("leaves a focused item to the browser's own Enter", () => {
    for (let step = 0; step < READING_ORDER.indexOf("links") + 1; step++)
      moveBlock(1, false);
    moveItem(1);
    const click = vi.fn((event: Event) => event.preventDefault());
    document.querySelector('a[href="#x"]')!.addEventListener("click", click);

    activateBlock();

    expect(click).not.toHaveBeenCalled();
  });
});

describe("scrollHalfPage", () => {
  it("carries the selection along so it keeps its place on screen", async () => {
    moveBlock(1, false);
    moveBlock(1, false);
    moveBlock(1, false);
    const before = topOf("one");

    scrollHalfPage(1);

    await expect.poll(() => window.scrollY).toBeCloseTo(window.innerHeight / 2, -1);
    const after = topOf(selectedId()!);
    expect(selectedId()).not.toBe("one");
    expect(Math.abs(after - before)).toBeLessThan(window.innerHeight / 4);
  });

  it("only scrolls without a selection", async () => {
    scrollHalfPage(1);

    await expect.poll(() => window.scrollY).toBeGreaterThan(0);
    expect(selectedId()).toBeNull();
  });
});

describe("selectEdge", () => {
  it("selects the first and the last block", () => {
    selectEdge("last");
    expect(selectedId()).toBe("last");
    selectEdge("first");
    expect(selectedId()).toBe("accent");
  });
});

describe("selection state", () => {
  it("notifies subscribers and marks the selected block", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToCursor(listener);

    moveBlock(1, false);
    expect(listener).toHaveBeenCalled();
    expect(
      document.getElementById("accent")!.hasAttribute("data-nav-selected")
    ).toBe(true);

    clearCursor();
    expect(selectedId()).toBeNull();
    expect(document.querySelector("[data-nav-selected]")).toBeNull();
    unsubscribe();
  });
});

describe("edges", () => {
  it("k without a selection starts from the last block fully in view", () => {
    const fullyVisible = READING_ORDER.filter(id => {
      const { top, bottom } = document.getElementById(id)!.getBoundingClientRect();
      return top >= 0 && bottom <= window.innerHeight;
    });

    moveBlock(-1, false);

    expect(selectedId()).toBe(fullyVisible.at(-1));
  });

  it("reveals a block taller than the window from its top", () => {
    selectById("tall");

    expect(topOf("tall")).toBeCloseTo(48, 0);
  });

  it("stops at the end of the page when scrolling half a page", async () => {
    moveBlock(1, false);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll - 100, behavior: "instant" });

    scrollHalfPage(1);

    await expect.poll(() => window.scrollY).toBeCloseTo(maxScroll, 0);
    expect(getSelectedBlock()).not.toBeNull();
  });

  it("j and k select the block the window is inside when no block starts in view", () => {
    window.scrollTo({
      top: topOf("last") + window.scrollY + 200,
      behavior: "instant"
    });

    moveBlock(1, false);
    expect(selectedId()).toBe("last");

    clearCursor();
    window.scrollTo({
      top: topOf("last") + window.scrollY + 200,
      behavior: "instant"
    });
    moveBlock(-1, false);
    expect(selectedId()).toBe("last");
  });

  it("forgets a selection whose element left the page, as after a route change", () => {
    selectById("name");
    document.getElementById("name")!.remove();

    expect(getSelectedBlock()).toBeNull();
    moveBlock(1, false);
    expect(selectedId()).toBe("accent");
  });

  it("ignores h and l without a selection", () => {
    moveItem(1);
    moveItem(-1);

    expect(selectedId()).toBeNull();
    expect(document.activeElement).toBe(document.body);
  });

  it("does nothing when no block matches selectFirst", () => {
    selectFirst(".Entry");

    expect(selectedId()).toBeNull();
  });

  it("selects the first matching block with selectFirst", () => {
    selectFirst(".SpecList__item");

    expect(selectedId()).toBe("name");
  });
});

describe("a row of mixed items", () => {
  beforeEach(() => selectById("mixed"));

  it("walks links and buttons, skipping disabled and hidden ones and plain text", () => {
    const visited = [1, 1, 1, 1].map(() => {
      moveItem(1);
      return document.activeElement?.textContent?.trim();
    });

    expect(visited).toEqual(["local", "Print", "external", "external"]);
  });

  it("walks back to the block from the last item", () => {
    for (let step = 0; step < 3; step++) moveItem(1);
    for (let step = 0; step < 3; step++) moveItem(-1);

    expect(document.activeElement?.id).toBe("mixed");
  });

  it("opens the first item, even when it is a link after plain text", () => {
    const click = vi.fn((event: Event) => event.preventDefault());
    document.querySelector('a[href="#local"]')!.addEventListener("click", click);

    activateBlock();

    expect(click).toHaveBeenCalledOnce();
  });
});

describe("zt and zz", () => {
  it("scrolls the selection to the top", async () => {
    selectById("first");

    topSelected();

    await expect.poll(() => topOf("first")).toBeCloseTo(48, 0);
  });

  it("scrolls the selection to the middle", async () => {
    selectById("sub");

    centerSelected();

    await expect
      .poll(() => {
        const { top, height } = document
          .getElementById("sub")!
          .getBoundingClientRect();
        return top + height / 2;
      })
      .toBeCloseTo(window.innerHeight / 2, 0);
  });

  it("do nothing without a selection", () => {
    topSelected();
    centerSelected();

    expect(window.scrollY).toBe(0);
  });
});
