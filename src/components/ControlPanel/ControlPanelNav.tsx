import type { ReactNode } from "react";

interface Props {
  /** Left column content (routes) */
  routes: ReactNode;
  /** Right column content (sections) */
  sections?: ReactNode;
}

/**
 * ControlPanelNav - Two-column grid layout for navigation.
 * Pure layout component with no knowledge of child internals.
 */
export function ControlPanelNav({ routes, sections }: Props) {
  return (
    <div className="ControlPanelNav">
      <div className="ControlPanelNav__column">{routes}</div>
      {sections && <div className="ControlPanelNav__column">{sections}</div>}
    </div>
  );
}
