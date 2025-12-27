import type { Tech } from "@/config";

import Badge from "./Badge";
import ClickableTag from "./ClickableTag";
import SpecCard from "./SpecCard";
import SpecList from "./SpecList";
import Tag from "./Tag";

interface Props {
  title: string;
  status: "Active" | "Maintained" | "Complete" | "Archived";
  stack: Tech[];
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
                {stack.map(t => (
                  <ClickableTag key={t.name} {...t} />
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
                  <Tag key={topic}>{topic}</Tag>
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
      <SpecList items={specItems} padding="small" />

      <div className="Project__description">{children}</div>

      <div className="Project__links">
        {allLinks.map((link, index) => (
          <Badge
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant={index === 0 ? "primary" : "default"}
          >
            {link.type}
          </Badge>
        ))}
      </div>
    </SpecCard>
  );
}
