interface Props {
  title: string;
  subtitle: string;
  bullets: readonly string[];
}

export function CvProject(props: Props) {
  return (
    <article className="CvProject">
      <h3 className="CvProject__title">{props.title}</h3>
      <span className="CvProject__subtitle">{props.subtitle}</span>
      <ul className="CvProject__list">
        {props.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}
