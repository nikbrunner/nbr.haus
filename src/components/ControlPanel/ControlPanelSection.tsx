import type { ReactNode } from "react";
import "./ControlPanelSection.css";

interface Props {
  /** Content shown in the indicator column (always visible in strip) */
  indicator: ReactNode;
  /** Content shown in the options column (visible when expanded) */
  children: ReactNode;
}

/**
 * ControlPanelSection - A row in the control panel with options and indicator.
 * This is a dumb component that renders its own complete row structure.
 */
export function ControlPanelSection({ indicator, children }: Props) {
  return (
    <div className="ControlPanelSection">
      <div className="ControlPanelSection__options">{children}</div>
      <div className="ControlPanelSection__indicator">{indicator}</div>
    </div>
  );
}
