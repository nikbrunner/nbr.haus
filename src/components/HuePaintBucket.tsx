import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import { Paintbrush } from "lucide-react";
import styles from "./HuePaintBucket.module.css";

export default function HuePaintBucket() {
  const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  // Utility functions
  function getNextHues(hue: number): { hue: number; hueActive: number } {
    const hueActive = hue + 50 > 360 ? hue + 50 - 360 : hue + 50;
    return { hue, hueActive };
  }

  function updateCssVars(hue: number, hueActive: number): void {
    document.body.style.setProperty("--hue", hue.toString());
    document.body.style.setProperty("--hue-active", hueActive.toString());
  }

  function updateHueFromPosition(x: number): void {
    const windowWidth = window.innerWidth;
    const hue = Math.round((x / windowWidth) * 360);
    const clampedHue = Math.max(0, Math.min(360, hue));
    const { hue: finalHue, hueActive } = getNextHues(clampedHue);

    updateCssVars(finalHue, hueActive);
    localStorage.setItem("hue", finalHue.toString());
    localStorage.setItem("hue-active", hueActive.toString());
  }

  // Initialize position and hue on mount
  useEffect(() => {
    const savedX = localStorage.getItem("bucket-x");
    const savedY = localStorage.getItem("bucket-y");

    if (savedX && savedY) {
      setDefaultPos({ x: parseFloat(savedX), y: parseFloat(savedY) });
    } else {
      // Random position with padding from edges
      const padding = 80;
      const maxX = window.innerWidth - padding;
      const maxY = window.innerHeight - padding;
      const randomX = Math.random() * (maxX - padding) + padding;
      const randomY = Math.random() * (maxY - padding) + padding;
      setDefaultPos({ x: randomX, y: randomY });
    }

    // Restore hue
    const savedHue = localStorage.getItem("hue");
    const savedHueActive = localStorage.getItem("hue-active");

    if (savedHue && savedHueActive) {
      updateCssVars(parseInt(savedHue), parseInt(savedHueActive));
    }
  }, []);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    updateHueFromPosition(data.x);
  };

  const handleStop = (_e: DraggableEvent, data: DraggableData) => {
    localStorage.setItem("bucket-x", data.x.toString());
    localStorage.setItem("bucket-y", data.y.toString());
  };

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={defaultPos} onDrag={handleDrag} onStop={handleStop}>
      <div ref={nodeRef} className={styles.paintBucket}>
        <Paintbrush />
      </div>
    </Draggable>
  );
}
