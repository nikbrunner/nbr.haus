import { useRouter, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import AccentPickerOption from "./AccentPickerOption";
import ColorModePickerOption from "./ColorModePickerOption";
import ContrastPickerOption from "./ContrastPickerOption";
import * as store from "./store";
import "./StylePicker.css";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";

export default function StylePicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

  const isExpanded = useStore(store.styleStore, s => s.isExpanded);
  const hue = useStore(store.styleStore, s => s.hue);
  const contrast = useStore(store.styleStore, s => s.contrast);
  const colorMode = useStore(store.styleStore, s => s.colorMode);

  // Initialize from URL params or localStorage on mount
  useEffect(() => {
    store.initializeFromParams({
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
        store.setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded]);

  const handleSelectHue = (newHue: number) => {
    store.setHue(newHue);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, hue: newHue }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectContrast = (newContrast: Contrast) => {
    store.setContrast(newContrast);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, contrast: newContrast }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectColorMode = (newColorMode: ColorMode) => {
    store.setColorMode(newColorMode);
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
            onClick={store.toggleExpanded}
            color={`oklch(45% 0.35 ${store.getAccentHue(hue)})`}
          />
        </div>
      ),
      options: (
        <motion.div
          className="StylePicker__options"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {store.PRESET_HUES.map(presetHue => (
            <motion.div
              key={presetHue}
              className="StylePicker__option"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <AccentPickerOption
                color={`oklch(45% 0.35 ${store.getAccentHue(presetHue)})`}
                variant={hue === presetHue ? "active" : "default"}
                onClick={() => handleSelectHue(presetHue)}
                ariaLabel={`Select accent hue ${presetHue}`}
              />
            </motion.div>
          ))}
        </motion.div>
      )
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
          <ContrastPickerOption
            label={store.CONTRAST_LABELS[contrast]}
            onClick={store.toggleExpanded}
            ariaLabel={`Select ${store.CONTRAST_LABELS[contrast]}`}
          />
        </div>
      ),
      options: (
        <motion.div
          className="StylePicker__options"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {store.CONTRAST_OPTIONS.map(opt => (
            <motion.div
              key={opt.value}
              className="StylePicker__option"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ staggerChildren: 0.25 }}
            >
              <ContrastPickerOption
                label={opt.label}
                variant={contrast === opt.value ? "active" : "default"}
                onClick={() => handleSelectContrast(opt.value)}
                ariaLabel={`Select ${opt.value} contrast`}
              />
            </motion.div>
          ))}
        </motion.div>
      )
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
          <ColorModePickerOption
            label={store.COLOR_MODE_LABELS[colorMode]}
            onClick={store.toggleExpanded}
            ariaLabel={`Select ${store.COLOR_MODE_LABELS[colorMode]} color mode`}
          />
        </div>
      ),
      options: (
        <motion.div
          className="StylePicker__options"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {store.COLOR_MODE_OPTIONS.map(opt => (
            <motion.div
              key={opt.value}
              className="StylePicker__option"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                staggerChildren: 0.25
              }}
            >
              <ColorModePickerOption
                label={opt.label}
                variant={colorMode === opt.value ? "active" : "default"}
                onClick={() => handleSelectColorMode(opt.value)}
                ariaLabel={`Select ${opt.value} color mode`}
              />
            </motion.div>
          ))}
        </motion.div>
      )
    }
  ];

  return (
    <div className={cx("StylePicker", isExpanded && "StylePicker--expanded")}>
      {rows.map(row => (
        <div key={row.key} className="StylePicker__row">
          {row.indicator}
          <AnimatePresence mode="wait">{isExpanded && row.options}</AnimatePresence>
        </div>
      ))}
    </div>
  );
}
