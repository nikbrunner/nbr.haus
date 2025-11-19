import { useRouter, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import styles from "./AccentPicker.module.css";

export default function AccentPicker() {
  const nodeRef = useRef(null);
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

  function updateHueFromPosition(x: number): void {
    if (typeof window === "undefined") return;
    const windowWidth = window.innerWidth;
    const hue = Math.round((x / windowWidth) * 360);
    const clampedHue = Math.max(0, Math.min(360, hue));
    const { hue: finalHue, hueActive, hueActiveAlt } = getNextHues(clampedHue);

    updateCssVars(finalHue, hueActive, hueActiveAlt);
    localStorage.setItem("hue", finalHue.toString());
    localStorage.setItem("hue-accent", hueActive.toString());
  }

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

    // 3. Default: random
    return Math.floor(Math.random() * 360);
  }, [search.hue]);

  // Get initial position from localStorage or generate random position
  function getInitialPosition() {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return { x: 100, y: 100 }; // Default SSR position
    }

    const savedX = localStorage.getItem("bucket-x");
    const savedY = localStorage.getItem("bucket-y");

    if (savedX && savedY) {
      return { x: parseFloat(savedX), y: parseFloat(savedY) };
    }

    // Random position with padding from edges
    const padding = 80;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;
    return { x: randomX, y: randomY };
  }

  // Use lazy initializer to get position from localStorage immediately (no flash)
  const [defaultPos] = useState(getInitialPosition);

  // Initialize hue from query param, localStorage, or random on mount
  useEffect(() => {
    const initialHue = getInitialHue();
    const { hue, hueActive, hueActiveAlt } = getNextHues(initialHue);

    updateCssVars(hue, hueActive, hueActiveAlt);

    // Store initial hue to localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("hue", hue.toString());
      localStorage.setItem("hue-accent", hueActive.toString());
      localStorage.setItem("hue-accent-alt", hueActiveAlt.toString());
    }
  }, [getInitialHue, getNextHues, updateCssVars]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const windowWidth = window.innerWidth;
    const hue = Math.round((data.x / windowWidth) * 360);
    const clampedHue = Math.max(0, Math.min(360, hue));

    updateHueFromPosition(data.x);

    // Update URL with new hue (replace history to avoid pollution)
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, hue: clampedHue }),
      replace: true
    });
  };

  const handleStop = (_e: DraggableEvent, data: DraggableData) => {
    localStorage.setItem("bucket-x", data.x.toString());
    localStorage.setItem("bucket-y", data.y.toString());
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPos}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div ref={nodeRef} className={styles.accentPicker} />
    </Draggable>
  );
}
