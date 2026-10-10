interface Props {
  name?: string;
  role?: string;
  meta?: [string, string];
  title: string[];
}

export default function DocumentHeader({
  name = "Nikolaus Brunner",
  role = "Senior Design Engineer",
  meta,
  title
}: Props) {
  return (
    <header className="DocumentHeader">
      <div className="DocumentHeader__top">
        <p className="DocumentHeader__block">
          {name}
          <br />
          {role}
        </p>
        {meta && (
          <p className="DocumentHeader__block">
            {meta[0]}
            <br />
            {meta[1]}
          </p>
        )}
      </div>
      <h1 className="DocumentHeader__title">
        {title.map((line, index) => (
          <span key={index} className="DocumentHeader__title-line">
            {line}
          </span>
        ))}
      </h1>
    </header>
  );
}
