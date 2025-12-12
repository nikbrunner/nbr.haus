import { useRouter, useSearch } from "@tanstack/react-router";
import { cx } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";
import type { Contrast } from "@/validators/rootSearchParams";

const CONTRAST_OPTIONS: { value: Contrast; label: string }[] = [
  { value: "low", label: "LC" },
  { value: "base", label: "BC" },
  { value: "high", label: "HC" }
];

const CONTRAST_VALUES: Record<Contrast, { l: number; c: number }> = {
  low: { l: 1, c: 0.6 },
  base: { l: 1, c: 1 },
  high: { l: 1, c: 1.4 }
};

export default function ContrastPicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

  const getInitialContrast = useCallback((): Contrast => {
    // 1. Priority: URL param
    if (search.contrast !== undefined) {
      return search.contrast;
    }

    // 2. Fallback: localStorage
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("contrast") as Contrast | null;
      if (saved && ["low", "base", "high"].includes(saved)) {
        return saved;
      }
    }

    // 3. Default: base
    return "base";
  }, [search.contrast]);

  const [selectedContrast, setSelectedContrast] =
    useState<Contrast>(getInitialContrast);

  const applyContrast = useCallback((contrast: Contrast) => {
    if (typeof document !== "undefined") {
      const values = CONTRAST_VALUES[contrast];
      document.body.style.setProperty("--contrast-l", values.l.toString());
      document.body.style.setProperty("--contrast-c", values.c.toString());
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const initial = getInitialContrast();
    applyContrast(initial);
    setSelectedContrast(initial);

    // Store to localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("contrast", initial);
    }
  }, [getInitialContrast, applyContrast]);

  const handleSelect = (contrast: Contrast) => {
    applyContrast(contrast);
    setSelectedContrast(contrast);

    localStorage.setItem("contrast", contrast);

    router.navigate({
      to: "/",
      search: prev => ({ ...prev, contrast }),
      resetScroll: false,
      replace: true
    });
  };

  return (
    <div className="ContrastPicker">
      {CONTRAST_OPTIONS.map(opt => (
        <button
          key={opt.value}
          className={cx(
            "ContrastPicker__option",
            selectedContrast === opt.value && "ContrastPicker__option--active"
          )}
          onClick={() => handleSelect(opt.value)}
          aria-label={`Select ${opt.value} contrast`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
