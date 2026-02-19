import ClickableTag from "@/components/ClickableTag";
import SpecList from "@/components/SpecList";
import { Typo } from "@/components/Typo";
import type { Tech } from "@/config";
import { useTexts } from "@/i18n/useTexts";

interface Props {
  company: string;
  url?: string;
  position: string;
  period: string;
  tech: Tech[];
  children: React.ReactNode;
}

export default function Job({ company, url, position, period, tech, children }: Props) {
  const { shared } = useTexts();

  const specs = [
    { label: shared.jobs.meta.position, value: position },
    { label: shared.jobs.meta.period, value: period },
    ...(url
      ? [
          {
            label: shared.jobs.meta.website,
            value: (
              <a href={url} target="_blank" rel="noopener noreferrer" className="Job__website-link">
                {new URL(url).hostname}
              </a>
            )
          }
        ]
      : []),
    ...(tech.length > 0
      ? [
          {
            label: shared.jobs.meta.tech,
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
          <a href={url} target="_blank" rel="noopener noreferrer" className="Job__company-link">
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
