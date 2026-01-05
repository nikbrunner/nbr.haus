import type { ReactNode } from "react";

import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

interface Props {
  isExpanded: boolean;
  children: ReactNode;
}

/**
 * ControlPanelExpanded - The expandable options panel.
 * Rendered via portal, slides in from right, positioned under the strip.
 * Uses AnimatePresence for smooth enter/exit animations.
 */
export function ControlPanelExpanded({ isExpanded, children }: Props) {
  return createPortal(
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          className="ControlPanelExpanded"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {
              x: "100%",
              y: "-50%",
              opacity: 0,
              transition: {
                x: {
                  type: "tween",
                  ease: [0.32, 0.72, 0, 1],
                  duration: 0.2
                },
                opacity: { duration: 0.1 }
              }
            },
            visible: {
              x: 0,
              y: "-50%",
              opacity: 1,
              transition: {
                x: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.2 },
                opacity: { duration: 0.15, delay: 0.05 }
              }
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface ExpandedSectionProps {
  children: ReactNode;
}

/**
 * ControlPanelExpanded.Section - Groups related rows within the expanded panel.
 */
export function ControlPanelExpandedSection({ children }: ExpandedSectionProps) {
  return <div className="ControlPanelExpanded__section">{children}</div>;
}
