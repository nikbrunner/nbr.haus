import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * ControlPanelGrid - 3-column grid layout for option cells.
 * Items flow to next row automatically after 3 items.
 */
export function ControlPanelGrid({ children }: Props) {
  return <div className="ControlPanelGrid">{children}</div>;
}
