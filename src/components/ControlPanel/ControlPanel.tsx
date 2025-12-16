import { useSearch } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { initializeLocale, type Locale } from "@/i18n";
import ControlPanelStrip from "./ControlPanelStrip";
import ControlPanelExpanded from "./ControlPanelExpanded";
import * as store from "./store";
import "./ControlPanel.css";

/**
 * ControlPanel - Unified control panel for navigation, locale, and style settings.
 * Consists of a collapsed strip (always visible) and an expanded panel (slides out on toggle).
 */
export default function ControlPanel() {
  const search = useSearch({ from: "/" });
  const isOpen = store.useSelector(s => s.isExpanded);

  const closePanel = useCallback(() => store.setExpanded(false), []);

  // Close on click outside
  useOnClickOutside(
    [".ControlPanelStrip", ".ControlPanelExpanded"],
    closePanel,
    isOpen
  );

  // Initialize from URL params or localStorage on mount
  useEffect(() => {
    store.initializeStyleFromParams({
      hue: search.hue,
      contrast: search.contrast,
      colorMode: search.colorMode
    });
    initializeLocale(search.lang as Locale | undefined);
  }, [search.hue, search.contrast, search.colorMode, search.lang]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        store.setExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <ControlPanelStrip />
      <ControlPanelExpanded />
    </>
  );
}
