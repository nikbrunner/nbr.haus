interface Props {
  start: React.ReactNode;
  center: React.ReactNode;
  end: React.ReactNode;
}

export default function Colophon({ start, center, end }: Props) {
  return (
    <footer className="Colophon">
      <span>{start}</span>
      <span className="Colophon__center">{center}</span>
      <span className="Colophon__end">{end}</span>
    </footer>
  );
}
