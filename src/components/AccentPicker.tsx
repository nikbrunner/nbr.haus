import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import styles from "./AccentPicker.module.css";

export default function AccentPicker() {
  const nodeRef = useRef(null);
  const linearGradientId = useId();

  // Utility functions
  function getNextHues(hue: number): { hue: number; hueActive: number } {
    const shift = 90;
    const hueActive = hue + shift > 360 ? hue + shift - 360 : hue + shift;
    return { hue, hueActive };
  }

  const updateCssVars = useCallback((hue: number, hueActive: number): void => {
    if (typeof document !== "undefined") {
      document.body.style.setProperty("--hue", hue.toString());
      document.body.style.setProperty("--hue-active", hueActive.toString());
    }
  }, []);

  function updateHueFromPosition(x: number): void {
    if (typeof window === "undefined") return;
    const windowWidth = window.innerWidth;
    const hue = Math.round((x / windowWidth) * 360);
    const clampedHue = Math.max(0, Math.min(360, hue));
    const { hue: finalHue, hueActive } = getNextHues(clampedHue);

    updateCssVars(finalHue, hueActive);
    localStorage.setItem("hue", finalHue.toString());
    localStorage.setItem("hue-active", hueActive.toString());
  }

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

  // Restore hue from localStorage on mount
  useEffect(() => {
    if (typeof localStorage === "undefined") return;

    const savedHue = localStorage.getItem("hue");
    const savedHueActive = localStorage.getItem("hue-active");

    if (savedHue && savedHueActive) {
      updateCssVars(parseInt(savedHue, 10), parseInt(savedHueActive, 10));
    }
  }, [updateCssVars]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    updateHueFromPosition(data.x);
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
      <div ref={nodeRef} className={styles.accentPicker}>
        <svg
          className={styles.circle}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Accent Color Picker</title>
          <defs>
            <linearGradient
              id={linearGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--bg-main)" />
              <stop offset="50%" stopColor="var(--fg-accent)" />
              <stop offset="100%" stopColor="var(--bg-main)" />
            </linearGradient>
          </defs>
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="transparent"
            stroke="url(#spinningGradient)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </Draggable>
  );
}
