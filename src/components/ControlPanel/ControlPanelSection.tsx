import type { ReactNode } from "react";
import "./ControlPanelSection.css";

export interface ControlPanelSectionProps {
  /** Content shown in the indicator column (always visible in strip) */
  indicator: ReactNode;
  /** Content shown in the options column (visible when expanded) */
  children: ReactNode;
}

/**
 * ControlPanelSection - A row in the control panel with options and indicator.
 * This is a dumb component that renders its own complete row structure.
 */
export function ControlPanelSection({
  indicator,
  children
}: ControlPanelSectionProps) {
  return (
    <div className="ControlPanelSection">
      <div className="ControlPanelSection__options">{children}</div>
      <div className="ControlPanelSection__indicator">{indicator}</div>
    </div>
  );
}
