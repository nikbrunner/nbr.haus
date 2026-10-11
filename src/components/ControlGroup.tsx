interface Props {
  label: string;
  children: React.ReactNode;
  /** Hidden on phone-sized screens */
  desktopOnly?: boolean;
}

export default function ControlGroup({ label, children, desktopOnly }: Props) {
  return (
    <span
      className={
        desktopOnly ? "ControlGroup ControlGroup--desktop-only" : "ControlGroup"
      }
      role="group"
      aria-label={label}
    >
      <span className="ControlGroup__label" aria-hidden="true">
        {label}
      </span>
      {children}
    </span>
  );
}
