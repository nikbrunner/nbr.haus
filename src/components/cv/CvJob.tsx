import { cx } from "class-variance-authority";

import Tag from "@/components/Tag";

interface Props {
  className?: string;
  company: string;
  url?: string;
  position: string;
  period: string;
  location: string;
  intro: string;
  bullets?: readonly string[];
  technologies: readonly string[];
}

export function CvJob(props: Props) {
  return (
    <article className={cx("CvJob", props.className)}>
      <div className="CvJob__header">
        <h3 className="CvJob__company">
          {props.url ? (
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="CvJob__company-link">
              {props.company}
            </a>
          ) : (
            props.company
          )}
        </h3>
        <p className="CvJob__location">{props.location}</p>
        <p className="CvJob__position"> {props.position}</p>
        <p className="CvJob__period">{props.period}</p>
      </div>

      <p className="CvJob__intro">{props.intro}</p>

      {props.bullets && (
        <ul className="CvJob__bullets">
          {props.bullets.map(bullet => {
            return <li key={bullet}>{bullet}</li>;
          })}
        </ul>
      )}

      <p className="CvJob__technologies">
        {props.technologies.map(tech => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </p>
    </article>
  );
}
