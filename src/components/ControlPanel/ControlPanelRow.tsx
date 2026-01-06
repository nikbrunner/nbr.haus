import type { ReactNode } from "react";

import { ControlPanelLabel } from "@/components/ControlPanel/ControlPanelLabel";

interface Props {
  /** Label text displayed on the left */
  label: string;
  /** Option cells to render in this row */
  children: ReactNode;
}

/**
 * ControlPanelRow - Horizontal row with label and options.
 * Uses ControlPanelLabel internally for the label element.
 */
export function ControlPanelRow({ label, children }: Props) {
  return (
    <div className="ControlPanelRow">
      <ControlPanelLabel>{label}</ControlPanelLabel>
      <div className="ControlPanelRow__options">{children}</div>
    </div>
  );
}
