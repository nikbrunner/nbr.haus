interface Props {
  label: string;
  children: React.ReactNode;
}

export default function ControlGroup({ label, children }: Props) {
  return (
    <span className="ControlGroup" role="group" aria-label={label}>
      <span className="ControlGroup__label" aria-hidden="true">
        {label}
      </span>
      {children}
    </span>
  );
}
