import { useId } from "react";

interface Props {
  id?: string;
  number: string;
  title: string;
  note?: React.ReactNode;
  children: React.ReactNode;
}

export default function SpecSection({ id, number, title, note, children }: Props) {
  const titleId = useId();

  return (
    <section id={id} className="SpecSection" aria-labelledby={titleId}>
      <header className="SpecSection__head">
        <h2 id={titleId} className="SpecSection__title">
          <span className="SpecSection__number">{number}</span>
          {title}
        </h2>
        {note && <div className="SpecSection__note">{note}</div>}
      </header>
      <div className="SpecSection__body">{children}</div>
    </section>
  );
}
