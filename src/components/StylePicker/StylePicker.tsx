import { useRouter, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import AccentPickerOption from "./AccentPickerOption";
import ColorModePickerOption from "./ColorModePickerOption";
import ContrastPickerOption from "./ContrastPickerOption";
import * as store from "./store";
import "./StylePicker.css";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";

/** Animation timing (seconds) */
const TIMING = {
  optionsExpand: 0.12,
  optionsCollapse: 0.1,
  optionEnter: 0.08,
  optionExit: 0.06
};

interface PickerRowProps {
  delay?: number;
  label: string;
  indicator: ReactNode;
  options: ReactNode;
  isExpanded: boolean;
}

function PickerRow({
  delay = 0,
  label,
  indicator,
  options,
  isExpanded
}: PickerRowProps) {
  return (
    <motion.div className="StylePicker__row" layout style={{ originX: 1 }}>
      <div
        role="button"
        className="StylePicker__indicator"
        aria-label="Toggle style picker"
        aria-expanded={isExpanded}
      >
        {indicator}
      </div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className="StylePicker__options"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "auto",
              opacity: 1,
              transition: {
                delay,
                width: { duration: TIMING.optionsExpand, ease: "linear" },
                opacity: { duration: TIMING.optionEnter, delay }
              }
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: {
                width: { duration: TIMING.optionsCollapse, ease: "linear" },
                opacity: { duration: TIMING.optionExit }
              }
            }}
            style={{ overflow: "hidden" }}
          >
            {options}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span
            className="StylePicker__label"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "100%",
              opacity: 1,
              transition: {
                delay,
                width: { duration: TIMING.optionsExpand, ease: "linear" },
                opacity: { duration: TIMING.optionEnter, delay: delay + 0.05 }
              }
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: {
                width: { duration: TIMING.optionsCollapse, ease: "linear" },
                opacity: { duration: TIMING.optionExit }
              }
            }}
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface OptionProps {
  children: ReactNode;
}

function Option({ children }: OptionProps) {
  return (
    <motion.div
      className="StylePicker__option"
      variants={{
        collapsed: {
          opacity: 0
        },
        expanded: {
          opacity: 1,
          transition: { duration: TIMING.optionEnter, ease: "linear" }
        },
        exit: {
          opacity: 0,
          transition: { duration: TIMING.optionExit }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

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

  return (
    <motion.div
      className={cx("StylePicker", isExpanded && "StylePicker--expanded")}
      layout
    >
      {/* Accent Row */}
      <PickerRow
        label="Accent"
        isExpanded={isExpanded}
        indicator={
          <AccentPickerOption
            onClick={store.toggleExpanded}
            color={`oklch(45% 0.35 ${store.getAccentHue(hue)})`}
          />
        }
        options={store.PRESET_HUES.map(presetHue => (
          <Option key={presetHue}>
            <AccentPickerOption
              color={`oklch(45% 0.35 ${store.getAccentHue(presetHue)})`}
              variant={hue === presetHue ? "active" : "default"}
              onClick={() => handleSelectHue(presetHue)}
              ariaLabel={`Select accent hue ${presetHue}`}
            />
          </Option>
        ))}
      />

      {/* Contrast Row */}
      <PickerRow
        label="Contrast"
        isExpanded={isExpanded}
        indicator={
          <ContrastPickerOption
            label={store.CONTRAST_LABELS[contrast]}
            onClick={store.toggleExpanded}
            ariaLabel={`Select ${store.CONTRAST_LABELS[contrast]}`}
          />
        }
        options={store.CONTRAST_OPTIONS.map(opt => (
          <Option key={opt.value}>
            <ContrastPickerOption
              label={opt.label}
              variant={contrast === opt.value ? "active" : "default"}
              onClick={() => handleSelectContrast(opt.value)}
              ariaLabel={`Select ${opt.value} contrast`}
            />
          </Option>
        ))}
      />

      {/* Color Mode Row */}
      <PickerRow
        label="Mode"
        isExpanded={isExpanded}
        indicator={
          <ColorModePickerOption
            label={store.COLOR_MODE_LABELS[colorMode]}
            onClick={store.toggleExpanded}
            ariaLabel={`Select ${store.COLOR_MODE_LABELS[colorMode]} color mode`}
          />
        }
        options={store.COLOR_MODE_OPTIONS.map(opt => (
          <Option key={opt.value}>
            <ColorModePickerOption
              label={opt.label}
              variant={colorMode === opt.value ? "active" : "default"}
              onClick={() => handleSelectColorMode(opt.value)}
              ariaLabel={`Select ${opt.value} color mode`}
            />
          </Option>
        ))}
      />
    </motion.div>
  );
}
