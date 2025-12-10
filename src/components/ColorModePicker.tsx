import { useRouter, useSearch } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";
import type { ColorMode } from "@/validators/rootSearchParams";

const option = cva("ColorModePicker__option", {
  variants: {
    active: {
      true: "ColorModePicker__option--active"
    }
  }
});

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

  const [selectedColorMode, setSelectedColorMode] =
    useState<ColorMode>(getInitialColorMode);

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
    <div className="ColorModePicker">
      {COLOR_MODE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          className={option({ active: selectedColorMode === opt.value })}
          onClick={() => handleSelect(opt.value)}
          aria-label={`Select ${opt.value} color mode`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
