import type { ReactNode, RefObject } from "react";

interface Props {
  /** Content shown in the indicator column (always visible in strip) */
  indicator: ReactNode;
  /** Content shown in the options column (visible when expanded) */
  children: ReactNode;
  /** Optional ref to the indicator element for positioning external elements */
  indicatorRef?: RefObject<HTMLDivElement | null>;
}

/**
 * ControlPanelSection - A row in the control panel with options and indicator.
 * This is a dumb component that renders its own complete row structure.
 */
export function ControlPanelSection({ indicator, children, indicatorRef }: Props) {
  return (
    <div className="ControlPanelSection">
      <div className="ControlPanelSection__options">{children}</div>
      <div className="ControlPanelSection__indicator" ref={indicatorRef}>
        {indicator}
      </div>
    </div>
  );
}
