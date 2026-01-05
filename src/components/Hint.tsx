import { useLayoutEffect, useRef, useState } from "react";

import { useHydrated } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

type Position = "top" | "left";

interface Props {
  title: string;
  position?: Position;
  children: React.ReactNode;
}

export default function Hint({ title, position = "top", children }: Props) {
  const hydrated = useHydrated();
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!isHovered || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    if (position === "top") {
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top - 8
      });
    } else {
      setCoords({
        x: rect.left - 8,
        y: rect.top + rect.height / 2
      });
    }
  }, [isHovered, position]);

  const tooltipStyle: React.CSSProperties =
    position === "top"
      ? { left: coords.x, top: coords.y, transform: "translate(-50%, -100%)" }
      : { left: coords.x, top: coords.y, transform: "translate(-100%, -50%)" };

  return (
    <span
      ref={triggerRef}
      className="Hint"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {hydrated &&
        createPortal(
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="Hint__tooltip"
                style={tooltipStyle}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {title}
              </motion.span>
            )}
          </AnimatePresence>,
          document.body
        )}
    </span>
  );
}
