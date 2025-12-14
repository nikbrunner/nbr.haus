import { useRouter, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import AccentPickerOption from "./AccentPickerOption";
import ColorModePickerOption from "./ColorModePickerOption";
import ContrastPickerOption from "./ContrastPickerOption";
import {
  COLOR_MODE_LABELS,
  COLOR_MODE_OPTIONS,
  CONTRAST_LABELS,
  CONTRAST_OPTIONS,
  PRESET_HUES,
  getAccentHue,
  initializeFromParams,
  setColorMode,
  setContrast,
  setExpanded,
  setHue,
  styleStore,
  toggleExpanded
} from "./store";
import "./StylePicker.css";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";

export default function StylePicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

  const isExpanded = useStore(styleStore, s => s.isExpanded);
  const hue = useStore(styleStore, s => s.hue);
  const contrast = useStore(styleStore, s => s.contrast);
  const colorMode = useStore(styleStore, s => s.colorMode);

  // Initialize from URL params or localStorage on mount
  useEffect(() => {
    initializeFromParams({
      hue: search.hue,
      contrast: search.contrast,
      colorMode: search.colorMode
    });
  }, [search.hue, search.contrast, search.colorMode]);

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".StylePicker")) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded]);

  const handleSelectHue = (newHue: number) => {
    setHue(newHue);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, hue: newHue }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectContrast = (newContrast: Contrast) => {
    setContrast(newContrast);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, contrast: newContrast }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectColorMode = (newColorMode: ColorMode) => {
    setColorMode(newColorMode);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, colorMode: newColorMode }),
      resetScroll: false,
      replace: true
    });
  };

  const rows = [
    {
      key: "accent",
      indicator: (
        <div
          role="button"
          className="StylePicker__indicator"
          aria-label="Toggle style picker"
          aria-expanded={isExpanded}
        >
          <AccentPickerOption
            onClick={toggleExpanded}
            color={`oklch(45% 0.35 ${getAccentHue(hue)})`}
          />
        </div>
      ),
      options: PRESET_HUES.map(presetHue => (
        <motion.div
          key={presetHue}
          className="StylePicker__options"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ staggerChildren: 0.25 }}
        >
          <AccentPickerOption
            color={`oklch(45% 0.35 ${getAccentHue(presetHue)})`}
            variant={hue === presetHue ? "active" : "default"}
            onClick={() => handleSelectHue(presetHue)}
            ariaLabel={`Select accent hue ${presetHue}`}
          />
        </motion.div>
      ))
    },
    {
      key: "contrast",
      indicator: (
        <div
          role="button"
          className="StylePicker__indicator"
          aria-label="Toggle style picker"
          aria-expanded={isExpanded}
        >
          {CONTRAST_LABELS[contrast]}
        </div>
      ),
      options: CONTRAST_OPTIONS.map(opt => (
        <motion.div
          key={opt.value}
          className="StylePicker__options"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ staggerChildren: 0.25 }}
        >
          <ContrastPickerOption
            label={opt.label}
            isActive={contrast === opt.value}
            onClick={() => handleSelectContrast(opt.value)}
            ariaLabel={`Select ${opt.value} contrast`}
          />
        </motion.div>
      ))
    },
    {
      key: "colorMode",
      indicator: (
        <div
          role="button"
          className="StylePicker__indicator"
          aria-label="Toggle style picker"
          aria-expanded={isExpanded}
        >
          {COLOR_MODE_LABELS[colorMode]}
        </div>
      ),
      options: COLOR_MODE_OPTIONS.map(opt => (
        <motion.div
          key={opt.value}
          className="StylePicker__options"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            staggerChildren: 0.25
          }}
        >
          <ColorModePickerOption
            label={opt.label}
            isActive={colorMode === opt.value}
            onClick={() => handleSelectColorMode(opt.value)}
            ariaLabel={`Select ${opt.value} color mode`}
          />
        </motion.div>
      ))
    }
  ];

  return (
    <div className={cx("StylePicker", isExpanded && "StylePicker--expanded")}>
      {rows.map(row => (
        <div key={row.key} className="StylePicker__row">
          {row.indicator}
          <AnimatePresence>{isExpanded && row.options}</AnimatePresence>
        </div>
      ))}
    </div>
  );
}
