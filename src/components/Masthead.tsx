interface Props {
  start: React.ReactNode;
  end: React.ReactNode;
}

export default function Masthead({ start, end }: Props) {
  return (
    <div className="Masthead">
      <div className="Masthead__start">{start}</div>
      <div className="Masthead__end">{end}</div>
    </div>
  );
}
