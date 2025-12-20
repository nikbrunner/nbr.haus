import type { ReactNode } from "react";
import "./ControlPanelRow.css";

interface ControlPanelRowProps {
  /** Label displayed on the left side of the row */
  label: string;
  /** Option cells to render in this row */
  children: ReactNode;
}

/**
 * ControlPanelRow - A labeled row within a section's options.
 * Contains a label and a container for option cells.
 */
export function ControlPanelRow({ label, children }: ControlPanelRowProps) {
  return (
    <div className="ControlPanelRow">
      <span className="ControlPanelRow__label">{label}</span>
      <div className="ControlPanelRow__options">{children}</div>
    </div>
  );
}
