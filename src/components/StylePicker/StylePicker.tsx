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
} from "./StylePicker.store";
import "./StylePicker.css";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";

const pickerVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: { opacity: 1, width: "auto" }
};

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
        <AccentPickerOption color={`oklch(45% 0.35 ${getAccentHue(hue)})`} />
      ),
      options: PRESET_HUES.map(presetHue => (
        <AccentPickerOption
          key={presetHue}
          color={`oklch(45% 0.35 ${getAccentHue(presetHue)})`}
          isActive={hue === presetHue}
          onClick={() => handleSelectHue(presetHue)}
          ariaLabel={`Select accent hue ${presetHue}`}
        />
      ))
    },
    {
      key: "contrast",
      indicator: (
        <span className="StylePicker__indicator-label">
          {CONTRAST_LABELS[contrast]}
        </span>
      ),
      options: CONTRAST_OPTIONS.map(opt => (
        <ContrastPickerOption
          key={opt.value}
          label={opt.label}
          isActive={contrast === opt.value}
          onClick={() => handleSelectContrast(opt.value)}
          ariaLabel={`Select ${opt.value} contrast`}
        />
      ))
    },
    {
      key: "colorMode",
      indicator: (
        <span className="StylePicker__indicator-label">
          {COLOR_MODE_LABELS[colorMode]}
        </span>
      ),
      options: COLOR_MODE_OPTIONS.map(opt => (
        <ColorModePickerOption
          key={opt.value}
          label={opt.label}
          isActive={colorMode === opt.value}
          onClick={() => handleSelectColorMode(opt.value)}
          ariaLabel={`Select ${opt.value} color mode`}
        />
      ))
    }
  ];

  return (
    <div className={cx("StylePicker", isExpanded && "StylePicker--expanded")}>
      {rows.map((row, index) => (
        <div key={row.key} className="StylePicker__row">
          <button
            className="StylePicker__indicator"
            aria-label="Toggle style picker"
            aria-expanded={isExpanded}
            onClick={toggleExpanded}
            type="button"
          >
            {row.indicator}
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="StylePicker__options"
                variants={pickerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{
                  duration: 0.15,
                  delay: isExpanded ? index * 0.03 : (2 - index) * 0.03
                }}
              >
                {row.options}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
