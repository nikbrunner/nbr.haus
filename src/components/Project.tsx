import { cva } from "class-variance-authority";
import SpecCard from "./SpecCard";
import SpecList from "./SpecList";

const badge = cva("Project__badge", {
  variants: {
    primary: {
      true: "Project__badge--primary"
    }
  }
});

interface Props {
  title: string;
  status: "Active" | "Maintained" | "Complete" | "Archived";
  stack: string[];
  topics: string[];
  primaryLink: {
    url: string;
    type: string;
  };
  year?: string | number;
  platforms?: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  additionalLinks?: Array<{
    url: string;
    type: string;
  }>;
  children: React.ReactNode;
}

export default function Project({
  title,
  stack,
  topics,
  status,
  primaryLink,
  year,
  platforms,
  metrics,
  additionalLinks,
  children
}: Props) {
  const allLinks = [primaryLink, ...(additionalLinks || [])];

  const specItems = [
    { label: "Status:", value: status },
    ...(stack.length > 0
      ? [
          {
            label: "Stack:",
            value: (
              <div className="Project__tags">
                {stack.map(tech => (
                  <span key={tech} className="Project__tag">
                    {tech}
                  </span>
                ))}
              </div>
            )
          }
        ]
      : []),
    ...(topics.length > 0
      ? [
          {
            label: "Topics:",
            value: (
              <div className="Project__tags">
                {topics.map(topic => (
                  <span key={topic} className="Project__tag">
                    {topic}
                  </span>
                ))}
              </div>
            )
          }
        ]
      : []),
    ...(year ? [{ label: "Year:", value: year }] : []),
    ...(platforms && platforms.length > 0
      ? [{ label: "Platforms:", value: platforms.join(", ") }]
      : []),
    ...(metrics ? metrics.map(m => ({ label: `${m.label}:`, value: m.value })) : [])
  ];

  return (
    <SpecCard title={title}>
      <SpecList items={specItems} />

      <div className="Project__description">{children}</div>

      <div className="Project__links">
        {allLinks.map((link, index) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={badge({ primary: index === 0 })}
          >
            {link.type}
          </a>
        ))}
      </div>
    </SpecCard>
  );
}
