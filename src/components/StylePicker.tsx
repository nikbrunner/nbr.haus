import { useSearch } from "@tanstack/react-router";
import { cx } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";
import AccentPicker from "./AccentPicker";
import ColorModePicker from "./ColorModePicker";
import ContrastPicker from "./ContrastPicker";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";

const CONTRAST_LABELS: Record<Contrast, string> = {
  low: "LC",
  base: "BC",
  high: "HC"
};

const COLOR_MODE_LABELS: Record<ColorMode, string> = {
  light: "LT",
  system: "SYS",
  dark: "DK"
};

// Get accent hue for the swatch color
function getAccentHue(hue: number): number {
  return hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
}

export default function StylePicker() {
  const search = useSearch({ from: "/" });
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current values for collapsed view
  const getCurrentHue = useCallback((): number => {
    if (search.hue !== undefined) return search.hue;
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("hue");
      if (saved) return parseInt(saved, 10);
    }
    return 90; // default
  }, [search.hue]);

  const getCurrentContrast = useCallback((): Contrast => {
    if (search.contrast !== undefined) return search.contrast;
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("contrast") as Contrast | null;
      if (saved && ["low", "base", "high"].includes(saved)) return saved;
    }
    return "base";
  }, [search.contrast]);

  const getCurrentColorMode = useCallback((): ColorMode => {
    if (search.colorMode !== undefined) return search.colorMode;
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("colorMode") as ColorMode | null;
      if (saved && ["light", "system", "dark"].includes(saved)) return saved;
    }
    return "system";
  }, [search.colorMode]);

  const [currentHue, setCurrentHue] = useState(getCurrentHue);
  const [currentContrast, setCurrentContrast] = useState(getCurrentContrast);
  const [currentColorMode, setCurrentColorMode] = useState(getCurrentColorMode);

  // Update current values when they change
  useEffect(() => {
    setCurrentHue(getCurrentHue());
    setCurrentContrast(getCurrentContrast());
    setCurrentColorMode(getCurrentColorMode());
  }, [getCurrentHue, getCurrentContrast, getCurrentColorMode]);

  // Close on click outside (only on mobile when expanded)
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".StylePicker")) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={cx("StylePicker", isExpanded && "StylePicker--expanded")}>
      {/* Row 1: Accent */}
      <div className="StylePicker__row">
        <button
          className="StylePicker__summary"
          onClick={handleToggle}
          aria-label="Toggle style picker"
          aria-expanded={isExpanded}
        >
          <span
            className="StylePicker__swatch"
            style={{
              backgroundColor: `oklch(45% 0.35 ${getAccentHue(currentHue)})`
            }}
          />
        </button>
        <div className="StylePicker__picker">
          <AccentPicker />
        </div>
      </div>

      {/* Row 2: Contrast */}
      <div className="StylePicker__row">
        <button
          className="StylePicker__summary"
          onClick={handleToggle}
          aria-label="Toggle style picker"
          aria-expanded={isExpanded}
        >
          <span className="StylePicker__summary-label">
            {CONTRAST_LABELS[currentContrast]}
          </span>
        </button>
        <div className="StylePicker__picker">
          <ContrastPicker />
        </div>
      </div>

      {/* Row 3: Color Mode */}
      <div className="StylePicker__row">
        <button
          className="StylePicker__summary"
          onClick={handleToggle}
          aria-label="Toggle style picker"
          aria-expanded={isExpanded}
        >
          <span className="StylePicker__summary-label">
            {COLOR_MODE_LABELS[currentColorMode]}
          </span>
        </button>
        <div className="StylePicker__picker">
          <ColorModePicker />
        </div>
      </div>
    </div>
  );
}
