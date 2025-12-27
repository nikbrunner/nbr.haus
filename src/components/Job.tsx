import ClickableTag from "./ClickableTag";
import SpecList from "./SpecList";

import "./Job.css";
import { useTexts } from "@/i18n";
import type { Tech } from "@/config";

interface Props {
  company: string;
  position: string;
  period: string;
  tech: Tech[];
  children: React.ReactNode;
}

export default function Job({ company, position, period, tech, children }: Props) {
  const { shared } = useTexts();

  const specs = [
    { label: shared.jobs.meta.position, value: position },
    { label: shared.jobs.meta.period, value: period },
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
      <h3 className="Job__company">{company}</h3>
      <SpecList items={specs} />
      {children}
    </div>
  );
}
