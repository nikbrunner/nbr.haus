import { useRouter, useSearch } from "@tanstack/react-router";
import { cx } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";

const PRESET_HUES = [90, 165, 275];

export default function AccentPicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

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

  // Get initial hue from query param, localStorage, or default
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

    // 3. Default: first preset (deterministic for SSR)
    return PRESET_HUES[0];
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

  const handleSelectHue = (hue: number) => {
    const { hue: finalHue, hueActive, hueActiveAlt } = getNextHues(hue);
    updateCssVars(finalHue, hueActive, hueActiveAlt);
    setSelectedHue(finalHue);

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
    <div className="AccentPicker">
      {PRESET_HUES.map(hue => (
        <button
          key={hue}
          className={cx(
            "AccentPicker__swatch",
            selectedHue === hue && "AccentPicker__swatch--active"
          )}
          style={{ backgroundColor: `oklch(45% 0.35 ${getAccentHue(hue)})` }}
          onClick={() => handleSelectHue(hue)}
          aria-label={`Select accent color`}
        />
      ))}
    </div>
  );
}
