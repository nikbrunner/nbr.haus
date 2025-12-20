import "./ControlPanelColorDot.css";

interface ControlPanelColorDotProps {
  /** Hue value (0-360) for the color dot */
  hue: number;
}

/**
 * ControlPanelColorDot - A colored dot for accent color display.
 */
export function ControlPanelColorDot({ hue }: ControlPanelColorDotProps) {
  return (
    <span
      className="ControlPanelColorDot"
      style={{ backgroundColor: `oklch(45% 0.35 ${hue})` }}
    />
  );
}
