import ClickableTag from "@/components/ClickableTag";
import SpecList from "@/components/SpecList";
import { Typo } from "@/components/Typo";
import type { Tech } from "@/config";

interface Props {
  company: string;
  url?: string;
  position: string;
  period: string;
  tech: Tech[];
  children: React.ReactNode;
}

export default function Job({
  company,
  url,
  position,
  period,
  tech,
  children
}: Props) {
  const specs = [
    { label: "Position", value: position },
    { label: "Period", value: period },
    ...(url
      ? [
          {
            label: "Website",
            value: (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="Job__website-link"
              >
                {new URL(url).hostname}
              </a>
            )
          }
        ]
      : []),
    ...(tech.length > 0
      ? [
          {
            label: "Tech",
            value: (
              <span className="Job__tags">
                {tech.map(item => (
                  <ClickableTag key={item.name} {...item} />
                ))}
              </span>
            )
          }
        ]
      : [])
  ];

  return (
    <div className="Job">
      <Typo.H3 className="Job__company">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="Job__company-link"
          >
            {company}
          </a>
        ) : (
          company
        )}
      </Typo.H3>
      <SpecList background="transparent" items={specs} />
      {children}
    </div>
  );
}
