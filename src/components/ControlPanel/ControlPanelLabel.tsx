import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * ControlPanelLabel - Styled label element for control panel sections.
 * Self-contained element that owns its styling.
 */
export function ControlPanelLabel({ children }: Props) {
  return <span className="ControlPanelLabel">{children}</span>;
}
