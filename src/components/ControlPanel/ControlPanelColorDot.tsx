interface Props {
  /** Hue value (0-360) for the color dot */
  hue: number;
}

/**
 * ControlPanelColorDot - A colored dot for accent color display.
 */
export function ControlPanelColorDot({ hue }: Props) {
  return (
    <span
      className="ControlPanelColorDot"
      style={
        {
          "--hue-color": hue
        } as React.CSSProperties
      }
    />
  );
}
