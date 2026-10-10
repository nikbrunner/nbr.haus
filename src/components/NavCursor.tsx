import { useEffect, useState, useSyncExternalStore } from "react";

import { createPortal } from "react-dom";

import { getSelectedBlock, subscribeToCursor } from "@/lib/navCursor";

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Corner brackets around the block the keyboard cursor selects, drawn over the page */
export default function NavCursor() {
  const block = useSyncExternalStore(
    subscribeToCursor,
    getSelectedBlock,
    () => null
  );
  const [box, setBox] = useState<Box | null>(null);

  useEffect(
    function followSelectedBlock() {
      if (!block) return;

      function measure() {
        if (!block) return;
        // Frame the content box: a head's padding and bottom rule stay outside the brackets
        const rect = block.getBoundingClientRect();
        const style = getComputedStyle(block);
        const inset = (side: "Top" | "Right" | "Bottom" | "Left") =>
          parseFloat(style[`padding${side}`]) +
          parseFloat(style[`border${side}Width`]);
        setBox({
          top: rect.top + window.scrollY + inset("Top"),
          left: rect.left + window.scrollX + inset("Left"),
          width: rect.width - inset("Left") - inset("Right"),
          height: rect.height - inset("Top") - inset("Bottom")
        });
      }

      const frame = requestAnimationFrame(measure);
      // Content above the block can change height (a loaded log, "Show more")
      const observer = new ResizeObserver(measure);
      observer.observe(document.body);
      window.addEventListener("resize", measure);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("resize", measure);
      };
    },
    [block]
  );

  if (!block || !box) return null;

  return createPortal(
    <div className="NavCursor" aria-hidden="true" style={box}>
      <span className="NavCursor__corner NavCursor__corner--top-start" />
      <span className="NavCursor__corner NavCursor__corner--top-end" />
      <span className="NavCursor__corner NavCursor__corner--bottom-start" />
      <span className="NavCursor__corner NavCursor__corner--bottom-end" />
    </div>,
    document.body
  );
}
