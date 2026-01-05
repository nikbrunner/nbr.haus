import type { KeyboardEvent, ReactNode } from "react";

import { cx } from "class-variance-authority";
import { createPortal } from "react-dom";

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
  ariaLabel: string;
  children: ReactNode;
}

/**
 * ControlPanelStrip - The always-visible indicator column.
 * Rendered via portal, positioned on the right edge.
 * Clicking toggles the expanded panel.
 */
export function ControlPanelStrip({
  isExpanded,
  onToggle,
  ariaLabel,
  children
}: Props) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return createPortal(
    <div
      className={cx(
        "ControlPanelStrip",
        isExpanded && "ControlPanelStrip--expanded"
      )}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>,
    document.body
  );
}

interface StripSectionProps {
  children: ReactNode;
}

/**
 * ControlPanelStrip.Section - Groups related indicators within the strip.
 */
export function ControlPanelStripSection({ children }: StripSectionProps) {
  return <div className="ControlPanelStrip__section">{children}</div>;
}
