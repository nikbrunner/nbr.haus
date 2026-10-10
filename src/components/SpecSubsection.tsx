import { useId } from "react";

interface Props {
  number: string;
  title: string;
  note?: React.ReactNode;
  children: React.ReactNode;
}

export default function SpecSubsection({ number, title, note, children }: Props) {
  const titleId = useId();

  return (
    <section className="SpecSubsection" aria-labelledby={titleId}>
      <header className="SpecSubsection__head">
        <h3 id={titleId} className="SpecSubsection__title">
          <span className="SpecSubsection__number">{number}</span>
          {title}
        </h3>
        {note && <div className="SpecSubsection__note">{note}</div>}
      </header>
      <div className="SpecSubsection__body">{children}</div>
    </section>
  );
}
