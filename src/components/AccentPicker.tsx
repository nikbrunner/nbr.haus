import { useRouter, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AccentPicker.module.css";

const PRESET_HUES = [80, 144, 288];

export default function AccentPicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });
  const pickerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  // Utility functions
  const getNextHues = useCallback((hue: number) => {
    const shift = 90;
    const hueActive = hue + shift > 360 ? hue + shift - 360 : hue + shift;
    const hueActiveAlt =
      hueActive + 180 > 360 ? hueActive + 180 - 360 : hueActive + 180;
    return { hue, hueActive, hueActiveAlt };
  }, []);

  const updateCssVars = useCallback(
    (hue: number, hueActive: number, hueActiveAlt: number): void => {
      if (typeof document !== "undefined") {
        document.body.style.setProperty("--hue", hue.toString());
        document.body.style.setProperty("--hue-accent", hueActive.toString());
        document.body.style.setProperty("--hue-accent-alt", hueActiveAlt.toString());
      }
    },
    []
  );

  // Get initial hue from query param, localStorage, or random
  const getInitialHue = useCallback((): number => {
    // 1. Priority: Query param
    if (search.hue !== undefined) {
      return search.hue;
    }

    // 2. Fallback: localStorage
    if (typeof localStorage !== "undefined") {
      const savedHue = localStorage.getItem("hue");
      if (savedHue) {
        return parseInt(savedHue, 10);
      }
    }

    // 3. Default: random from presets
    return PRESET_HUES[Math.floor(Math.random() * PRESET_HUES.length)];
  }, [search.hue]);

  const [selectedHue, setSelectedHue] = useState(getInitialHue);

  // Initialize hue from query param, localStorage, or random on mount
  useEffect(() => {
    const initialHue = getInitialHue();
    const { hue, hueActive, hueActiveAlt } = getNextHues(initialHue);

    updateCssVars(hue, hueActive, hueActiveAlt);
    setSelectedHue(hue);

    // Store initial hue to localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("hue", hue.toString());
      localStorage.setItem("hue-accent", hueActive.toString());
      localStorage.setItem("hue-accent-alt", hueActiveAlt.toString());
    }
  }, [getInitialHue, getNextHues, updateCssVars]);

  // Click outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectHue = (hue: number) => {
    const { hue: finalHue, hueActive, hueActiveAlt } = getNextHues(hue);
    updateCssVars(finalHue, hueActive, hueActiveAlt);
    setSelectedHue(finalHue);
    setIsOpen(false);

    localStorage.setItem("hue", finalHue.toString());
    localStorage.setItem("hue-accent", hueActive.toString());
    localStorage.setItem("hue-accent-alt", hueActiveAlt.toString());

    router.navigate({
      to: "/",
      search: prev => ({ ...prev, hue: finalHue }),
      resetScroll: false,
      replace: true
    });
  };

  // Get the accent hue (what actually shows on the page)
  const getAccentHue = (hue: number) => (hue + 90 > 360 ? hue + 90 - 360 : hue + 90);

  return (
    <div ref={pickerRef} className={styles.accentPicker}>
      <div className={styles.swatchList}>
        {PRESET_HUES.map(hue => (
          <button
            key={hue}
            className={`${styles.swatch} ${selectedHue === hue ? styles.active : ""}`}
            style={{ backgroundColor: `oklch(45% 0.35 ${getAccentHue(hue)})` }}
            onClick={() => handleSelectHue(hue)}
            aria-label={`Select accent color`}
          />
        ))}
      </div>
    </div>
  );
}
