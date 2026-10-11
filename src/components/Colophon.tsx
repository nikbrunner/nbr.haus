interface Props {
  start: React.ReactNode;
  end: React.ReactNode;
}

export default function Colophon({ start, end }: Props) {
  return (
    <footer className="Colophon">
      <span>{start}</span>
      <span className="Colophon__end">{end}</span>
    </footer>
  );
}
