interface Props {
  children: React.ReactNode;
}

export default function ControlBar({ children }: Props) {
  return (
    <nav className="ControlBar" aria-label="Settings">
      {children}
    </nav>
  );
}
