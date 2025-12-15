import { useRouter, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { useCallback, useEffect } from "react";
import AccentPickerOption from "./AccentPickerOption";
import ColorModePickerOption from "./ColorModePickerOption";
import ContrastPickerOption from "./ContrastPickerOption";
import * as store from "./store";
import "./StylePickers.css";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface PickerRowProps {
  label: string;
  children: React.ReactNode;
}

function PickerRow({ label, children }: PickerRowProps) {
  return (
    <div className="StylePickers__row">
      <span className="StylePickers__label">{label}</span>
      {children}
    </div>
  );
}

/**
 * StylePickers - Options panel that slides up from the bottom.
 * Always rendered, uses CSS transform for show/hide animation.
 */
export default function StylePickers() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

  const isOpen = useStore(store.styleStore, s => s.isExpanded);
  const hue = useStore(store.styleStore, s => s.hue);
  const contrast = useStore(store.styleStore, s => s.contrast);
  const colorMode = useStore(store.styleStore, s => s.colorMode);

  const closePanel = useCallback(() => store.setExpanded(false), []);
  useOnClickOutside([".StylePickers", ".StyleStatus"], closePanel, isOpen);

  // Initialize from URL params or localStorage on mount
  useEffect(() => {
    store.initializeFromParams({
      hue: search.hue,
      contrast: search.contrast,
      colorMode: search.colorMode
    });
  }, [search.hue, search.contrast, search.colorMode]);

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
    <div
      className={cx("StylePickers", isOpen && "StylePickers--open")}
      aria-hidden={!isOpen}
    >
      <PickerRow label="Accent">
        {store.PRESET_HUES.map(presetHue => (
          <div key={presetHue} className="StylePickers__option">
            <AccentPickerOption
              color={`oklch(45% 0.35 ${store.getAccentHue(presetHue)})`}
              variant={hue === presetHue ? "active" : "default"}
              onClick={() => handleSelectHue(presetHue)}
              ariaLabel={`Select accent hue ${presetHue}`}
            />
          </div>
        ))}
      </PickerRow>

      <PickerRow label="Contrast">
        {store.CONTRAST_OPTIONS.map(opt => (
          <div key={opt.value} className="StylePickers__option">
            <ContrastPickerOption
              label={opt.label}
              variant={contrast === opt.value ? "active" : "default"}
              onClick={() => handleSelectContrast(opt.value)}
              ariaLabel={`Select ${opt.value} contrast`}
            />
          </div>
        ))}
      </PickerRow>

      <PickerRow label="Mode">
        {store.COLOR_MODE_OPTIONS.map(opt => (
          <div key={opt.value} className="StylePickers__option">
            <ColorModePickerOption
              label={opt.label}
              variant={colorMode === opt.value ? "active" : "default"}
              onClick={() => handleSelectColorMode(opt.value)}
              ariaLabel={`Select ${opt.value} color mode`}
            />
          </div>
        ))}
      </PickerRow>
    </div>
  );
}
