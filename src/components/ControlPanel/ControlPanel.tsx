import { useSearch } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cx } from "class-variance-authority";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { initializeLocale, type Locale } from "@/i18n";
import ControlPanelStrip from "./ControlPanelStrip";
import ControlPanelExpanded from "./ControlPanelExpanded";
import * as store from "./store";
import "./ControlPanel.css";

/**
 * ControlPanel - Unified control panel for navigation, locale, and style settings.
 * Outer wrapper provides shadow and clips via overflow:hidden.
 * Inner content is full-width, positioned to the right.
 */
export default function ControlPanel() {
  const search = useSearch({ strict: false });
  const isExpanded = store.useSelector(s => s.isExpanded);

  const closePanel = useCallback(() => store.setExpanded(false), []);

  // Close on click outside
  useOnClickOutside([".ControlPanel"], closePanel, isExpanded);

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
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        store.setExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <div className={cx("ControlPanel", isExpanded && "ControlPanel--expanded")}>
      <motion.div
        className="ControlPanel__content"
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={{
          collapsed: {
            clipPath: "inset(0 0 0 calc(100% - var(--strip-total-width)))"
          },
          expanded: { clipPath: "inset(0 0 0 0)" }
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.15
        }}
      >
        {/* Expanded options on the left */}
        <ControlPanelExpanded />

        {/* Strip indicators on the right - always visible */}
        <ControlPanelStrip />
      </motion.div>
    </div>
  );
}
