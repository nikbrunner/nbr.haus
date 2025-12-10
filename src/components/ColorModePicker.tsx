import { useRouter, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import type { ColorMode } from "@/validators/rootSearchParams";
import styles from "./ColorModePicker.module.css";

const COLOR_MODE_OPTIONS: { value: ColorMode; label: string }[] = [
  { value: "light", label: "LT" },
  { value: "system", label: "SYS" },
  { value: "dark", label: "DK" }
];

export default function ColorModePicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

  const getInitialColorMode = useCallback((): ColorMode => {
    // 1. Priority: URL param
    if (search.colorMode !== undefined) {
      return search.colorMode;
    }

    // 2. Fallback: localStorage
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("colorMode") as ColorMode | null;
      if (saved && ["light", "system", "dark"].includes(saved)) {
        return saved;
      }
    }

    // 3. Default: system
    return "system";
  }, [search.colorMode]);

  const [selectedColorMode, setSelectedColorMode] = useState<ColorMode>(getInitialColorMode);

  const applyColorMode = useCallback((colorMode: ColorMode) => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (colorMode === "system") {
        html.removeAttribute("data-color-mode");
      } else {
        html.setAttribute("data-color-mode", colorMode);
      }
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const initial = getInitialColorMode();
    applyColorMode(initial);
    setSelectedColorMode(initial);

    // Store to localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("colorMode", initial);
    }
  }, [getInitialColorMode, applyColorMode]);

  const handleSelect = (colorMode: ColorMode) => {
    applyColorMode(colorMode);
    setSelectedColorMode(colorMode);

    localStorage.setItem("colorMode", colorMode);

    router.navigate({
      to: "/",
      search: prev => ({ ...prev, colorMode }),
      resetScroll: false,
      replace: true
    });
  };

  return (
    <div className={styles.colorModePicker}>
      {COLOR_MODE_OPTIONS.map(option => (
        <button
          key={option.value}
          className={`${styles.option} ${selectedColorMode === option.value ? styles.active : ""}`}
          onClick={() => handleSelect(option.value)}
          aria-label={`Select ${option.value} color mode`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
