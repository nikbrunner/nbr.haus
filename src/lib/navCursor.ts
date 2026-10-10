/**
 * The keyboard cursor: `j` / `k` select blocks in reading order, `h` / `l` the links and buttons
 * inside the selected block. The selection lives here, outside React, so it survives the
 * route change of `g h` / `g s`; NavCursor draws it.
 */

/** Everything a reader moves through line by line */
const BLOCK_SELECTOR = [
  ".ControlGroup",
  ".Contents__row",
  ".SpecSection__head",
  ".SpecSubsection__head",
  ".SpecList__item",
  ".Entry",
  ".Prose > :is(p, h2, h3, ul, ol, blockquote, pre)",
  "[data-nav-block]"
].join(", ");

const ITEM_SELECTOR = "a[href], button:not(:disabled)";

/** The blocks `J` / `K` jump between, skipping everything inside a section */
const SECTION_SELECTOR =
  ".SpecSection__head, .SpecSubsection__head, .Prose > :is(h2, h3)";

/** Space kept between a selected block and the viewport edge, in pixels */
const REVEAL_MARGIN = 48;

let selected: HTMLElement | null = null;
const listeners = new Set<() => void>();

export function subscribeToCursor(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSelectedBlock(): HTMLElement | null {
  return selected?.isConnected ? selected : null;
}

function setSelected(block: HTMLElement | null) {
  selected?.removeAttribute("data-nav-selected");
  selected = block;
  block?.setAttribute("data-nav-selected", "");
  listeners.forEach(listener => listener());
}

/** Moves to the next or previous block; without a selection, starts from the viewport */
export function moveBlock(direction: 1 | -1, smooth: boolean) {
  const all = blocks();
  const current = visibleSelection();
  const next = current
    ? all[all.indexOf(current) + direction]
    : firstInView(all, direction);
  if (next) selectBlock(next, smooth);
}

/** Moves to the next or previous section heading; without a selection, starts from the viewport */
export function moveSection(direction: 1 | -1, smooth: boolean) {
  const all = blocks();
  const current = visibleSelection();
  const firstVisible = all.findIndex(
    block => block.getBoundingClientRect().top >= 0
  );
  const start = current
    ? all.indexOf(current)
    : firstVisible - (direction === 1 ? 1 : 0);

  for (
    let index = start + direction;
    index >= 0 && index < all.length;
    index += direction
  ) {
    if (all[index].matches(SECTION_SELECTOR)) {
      selectBlock(all[index], smooth, "top");
      return;
    }
  }
}

/**
 * `d` / `u`: scrolls half a page and carries the selection along, so it keeps its place on screen.
 * Without a selection it only scrolls
 */
export function scrollHalfPage(direction: 1 | -1) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.min(
    maxScroll,
    Math.max(0, window.scrollY + (direction * window.innerHeight) / 2)
  );
  const delta = target - window.scrollY;

  const current = getSelectedBlock();
  if (current) {
    const goal = current.getBoundingClientRect().top + delta;
    const nearest = blocks().reduce((best, block) =>
      Math.abs(block.getBoundingClientRect().top - goal) <
      Math.abs(best.getBoundingClientRect().top - goal)
        ? block
        : best
    );
    if (nearest.tabIndex < 0) nearest.tabIndex = -1;
    nearest.focus({ preventScroll: true });
    setSelected(nearest);
  }

  window.scrollBy({ top: delta, behavior: "smooth" });
}

/** `top` scrolls the block to the top of the window, like Vim's `zt`; `nearest` scrolls only as far as needed; `none` leaves the scroll to the caller */
function selectBlock(
  block: HTMLElement,
  smooth = true,
  align: "nearest" | "top" | "none" = "nearest"
) {
  // Blocks are not focusable by default; -1 keeps them out of the Tab order
  if (block.tabIndex < 0) block.tabIndex = -1;
  block.focus({ preventScroll: true });
  setSelected(block);
  if (align === "top") scrollToTop(block, smooth);
  else if (align === "nearest") reveal(block, smooth);
}

/** `gg` and `G`: the first or last block on the page; `gg` also scrolls to the very top */
export function selectEdge(edge: "first" | "last") {
  const all = blocks();
  const block = edge === "first" ? all[0] : all.at(-1);
  if (!block) return;
  if (edge === "last") return selectBlock(block);
  selectBlock(block, true, "none");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** `zt`: scrolls the selected block to the top of the window */
export function topSelected() {
  const block = getSelectedBlock();
  if (block) scrollToTop(block, true);
}

/** `zz`: scrolls the selected block to the middle of the window */
export function centerSelected() {
  const block = getSelectedBlock();
  if (!block) return;
  const { top, height } = block.getBoundingClientRect();
  window.scrollBy({
    top: top + height / 2 - window.innerHeight / 2,
    behavior: "smooth"
  });
}

export function selectFirst(selector: string) {
  const block = blocks().find(candidate => candidate.matches(selector));
  if (block) selectBlock(block);
}

/** `l` enters the block at its first item; `h` before the first item returns to the block */
export function moveItem(direction: 1 | -1) {
  const block = getSelectedBlock();
  if (!block) return;

  const list = items(block);
  const index = list.indexOf(document.activeElement as HTMLElement);
  if (index === -1) {
    if (direction === 1) list[0]?.focus({ preventScroll: true });
    return;
  }

  const next = index + direction;
  if (next < 0) block.focus({ preventScroll: true });
  else list[next]?.focus({ preventScroll: true });
}

/** Opens the selected block's first link or button, unless an item has focus already */
export function activateBlock() {
  const block = getSelectedBlock();
  if (!block || document.activeElement !== block) return;
  items(block)[0]?.click();
}

export function clearCursor() {
  if (!getSelectedBlock()) return;
  if (selected?.contains(document.activeElement)) {
    (document.activeElement as HTMLElement).blur();
  }
  setSelected(null);
}

/**
 * Without a selection, `j` starts at the first block that begins in view and `k` at the last that
 * ends in view. When the window shows only the inside of one long block, that block is it
 */
function firstInView(
  all: HTMLElement[],
  direction: 1 | -1
): HTMLElement | undefined {
  const rect = (block: HTMLElement) => block.getBoundingClientRect();
  const overlapping = (block: HTMLElement) =>
    rect(block).bottom > 0 && rect(block).top < window.innerHeight;

  const startsInView = (block: HTMLElement) =>
    rect(block).top >= 0 && rect(block).top < window.innerHeight;
  const endsInView = (block: HTMLElement) =>
    rect(block).bottom > 0 && rect(block).bottom <= window.innerHeight;

  if (direction === 1) return all.find(startsInView) ?? all.find(overlapping);
  const reversed = all.slice().reverse();
  return reversed.find(endsInView) ?? reversed.find(overlapping);
}

/** The selection, unless scrolling (wheel, trackpad) has taken it out of view: then moves start from the viewport, as in Vim */
function visibleSelection(): HTMLElement | null {
  const current = getSelectedBlock();
  if (!current) return null;
  const { top, bottom } = current.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight ? current : null;
}

/** Blocks in visual reading order: top to bottom, then left to right (the header has columns) */
function blocks(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR)]
    .filter(isRendered)
    .map(block => ({ block, rect: block.getBoundingClientRect() }))
    .sort((a, b) => Math.round(a.rect.top - b.rect.top) || a.rect.left - b.rect.left)
    .map(({ block }) => block);
}

function items(block: HTMLElement): HTMLElement[] {
  return [...block.querySelectorAll<HTMLElement>(ITEM_SELECTOR)].filter(isRendered);
}

/** False for `display: none`, such as print-only or narrow-hidden elements */
function isRendered(element: HTMLElement): boolean {
  return element.getClientRects().length > 0;
}

function scrollToTop(block: HTMLElement, smooth: boolean) {
  const top = block.getBoundingClientRect().top - REVEAL_MARGIN;
  window.scrollBy({ top, behavior: smooth ? "smooth" : "instant" });
}

function reveal(block: HTMLElement, smooth: boolean) {
  const { top, bottom } = block.getBoundingClientRect();
  const behavior = smooth ? "smooth" : "instant";
  const tooTall = bottom - top > window.innerHeight - 2 * REVEAL_MARGIN;

  if (top < REVEAL_MARGIN || tooTall) {
    window.scrollBy({ top: top - REVEAL_MARGIN, behavior });
  } else if (bottom > window.innerHeight - REVEAL_MARGIN) {
    window.scrollBy({ top: bottom - window.innerHeight + REVEAL_MARGIN, behavior });
  }
}
