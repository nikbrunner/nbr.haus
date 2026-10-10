import { useEffect, useState, useSyncExternalStore } from "react";

import { useHotkeys } from "@tanstack/react-hotkeys";
import { useNavigate } from "@tanstack/react-router";

import type { KeyHintGroup } from "@/components/KeyHints";
import { useColorMode } from "@/hooks/useColorMode";
import { useTheme } from "@/hooks/useTheme";
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

const MODIFIER_KEYS = ["Shift", "Control", "Alt", "Meta", "CapsLock"];

type Prefix = "C" | "M" | "G" | "Z";
type SecondKey =
  | "A"
  | "D"
  | "F"
  | "K"
  | "P"
  | "V"
  | "G"
  | "L"
  | "S"
  | "H"
  | "Z"
  | "T";

interface PrefixMap {
  title: string;
  next: { key: SecondKey; label: string; run: () => void }[];
}

/**
 * Vim-style keys: `j` `k` select blocks, `J` `K` section headings, `h` `l` the links inside them (arrow keys too, once
 * a block is selected), `d` `u` `gg` `G` scroll, `c` + a/f/k/p/v sets the colors,
 * `m` + l/d/s sets the color mode and `m t` toggles it, `g` + g/h/s goes places,
 * `zt` / `zz` scroll the selection to the top / middle, `?` lists everything.
 * Returns the which-key groups to show: the next keys after a prefix, or the full list.
 */
export function useSiteHotkeys() {
  const { setTheme } = useTheme();
  const { colorMode, setColorMode } = useColorMode();
  const [open, setOpen] = useState<Prefix | "all" | null>(null);
  const navigate = useNavigate();
  const hasCursor = useSyncExternalStore(
    subscribeToCursor,
    () => getSelectedBlock() !== null,
    () => false
  );

  function toggleColorMode() {
    const dark =
      colorMode === "dark" ||
      (colorMode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    setColorMode(dark ? "light" : "dark");
  }

  async function goTo(to: "/" | "/study") {
    await navigate({ to });
    // On a list page, start on the first entry so Enter opens it
    if (to === "/study") requestAnimationFrame(() => selectFirst(".Entry"));
  }

  const prefixes: Record<Prefix, PrefixMap> = {
    C: {
      title: "Colors",
      next: [
        { key: "A", label: "Atom", run: () => setTheme("atom") },
        { key: "F", label: "Facility", run: () => setTheme("facility") },
        { key: "K", label: "Koyo", run: () => setTheme("koyo") },
        { key: "P", label: "Polymer", run: () => setTheme("polymer") },
        { key: "V", label: "Viridian", run: () => setTheme("viridian") }
      ]
    },
    M: {
      title: "Mode",
      next: [
        { key: "L", label: "Light", run: () => setColorMode("light") },
        { key: "D", label: "Dark", run: () => setColorMode("dark") },
        { key: "S", label: "System", run: () => setColorMode("system") },
        { key: "T", label: "Toggle", run: toggleColorMode }
      ]
    },
    G: {
      title: "Go",
      next: [
        { key: "G", label: "First block", run: () => selectEdge("first") },
        { key: "H", label: "Home", run: () => void goTo("/") },
        { key: "S", label: "Study", run: () => void goTo("/study") }
      ]
    },
    Z: {
      title: "View",
      next: [
        { key: "T", label: "Selected block to top", run: topSelected },
        { key: "Z", label: "Center selected block", run: centerSelected }
      ]
    }
  };

  useHotkeys(
    [
      // A held key repeats; following those steps instantly keeps the page from lagging behind
      {
        hotkey: "J",
        callback: event => moveBlock(1, !event.repeat)
      },
      {
        hotkey: "K",
        callback: event => moveBlock(-1, !event.repeat)
      },
      { hotkey: "Shift+J", callback: event => moveSection(1, !event.repeat) },
      {
        hotkey: "Shift+K",
        callback: event => moveSection(-1, !event.repeat)
      },
      { hotkey: "H", callback: () => moveItem(-1) },
      { hotkey: "L", callback: () => moveItem(1) },
      ...(["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"] as const).map(
        hotkey => ({
          hotkey,
          callback: (event: KeyboardEvent) =>
            hotkey === "ArrowDown" || hotkey === "ArrowUp"
              ? moveBlock(hotkey === "ArrowDown" ? 1 : -1, !event.repeat)
              : moveItem(hotkey === "ArrowRight" ? 1 : -1),
          // Before a block is selected, arrow keys scroll the page as usual
          options: { enabled: hasCursor }
        })
      ),
      {
        hotkey: "Enter",
        callback: () => activateBlock(),
        options: { preventDefault: false }
      },
      { hotkey: "D", callback: () => scrollHalfPage(1) },
      { hotkey: "U", callback: () => scrollHalfPage(-1) },
      { hotkey: "Shift+G", callback: () => selectEdge("last") },
      { hotkey: "C", callback: () => setOpen("C") },
      { hotkey: "M", callback: () => setOpen("M") },
      { hotkey: "G", callback: () => setOpen("G") },
      { hotkey: "Z", callback: () => setOpen("Z") },
      {
        hotkey: "?",
        callback: () => setOpen(current => (current === "all" ? null : "all"))
      },
      {
        hotkey: "Escape",
        callback: () => {
          setOpen(null);
          clearCursor();
        }
      }
    ],
    { ignoreInputs: true }
  );

  useEffect(function clearCursorOnPointer() {
    document.addEventListener("pointerdown", clearCursor);
    return () => document.removeEventListener("pointerdown", clearCursor);
  }, []);

  useEffect(function awaitSecondKey() {
    if (open === null || open === "all") return;
    const { next } = prefixes[open];

    // Capture phase, so the second key (the `d` in `m d`) never reaches its own binding
    function handleSecondKey(event: KeyboardEvent) {
      if (event.repeat || event.isComposing || MODIFIER_KEYS.includes(event.key))
        return;
      setOpen(null);
      // Leave browser shortcuts like Cmd+R alone
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.shiftKey) return;
      next.find(({ key }) => key === event.key.toUpperCase())?.run();
    }

    window.addEventListener("keydown", handleSecondKey, true);
    return () => window.removeEventListener("keydown", handleSecondKey, true);
  });

  const prefixGroup = (prefix: Prefix): KeyHintGroup => ({
    title: prefixes[prefix].title,
    hints: prefixes[prefix].next.map(({ key, label }) => ({
      keys: [`${prefix.toLowerCase()} ${key.toLowerCase()}`],
      label
    }))
  });

  const overview: KeyHintGroup[] = [
    {
      title: "Move",
      hints: [
        { keys: ["j", "k"], label: "Next / previous block" },
        { keys: ["J", "K"], label: "Next / previous section, to top" },
        { keys: ["h", "l"], label: "Previous / next link in block" },
        { keys: ["Arrows"], label: "Same, once a block is selected" },
        { keys: ["Enter"], label: "Open" },
        { keys: ["Esc"], label: "Clear selection" },
        { keys: ["d", "u"], label: "Half page down / up" },
        { keys: ["g g", "G"], label: "First / last block" }
      ]
    },
    prefixGroup("G"),
    prefixGroup("Z"),
    prefixGroup("C"),
    prefixGroup("M"),
    {
      title: "Other",
      hints: [
        { keys: ["Space"], label: "Play / pause audio" },
        { keys: ["?"], label: "Show / hide keys" }
      ]
    }
  ];

  const groups =
    open === null ? null : open === "all" ? overview : [prefixGroup(open)];

  return {
    groups,
    toggleOverview: () => setOpen(current => (current === "all" ? null : "all"))
  };
}
