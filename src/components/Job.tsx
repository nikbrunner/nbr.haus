import SpecList from "./SpecList";
import Tag from "./Tag";

import "./Job.css";
import { useTranslation } from "@/i18n";

interface Props {
  company: string;
  position: string;
  period: string;
  tech: string;
  children: React.ReactNode;
}

export default function Job({ company, position, period, tech, children }: Props) {
  const { t } = useTranslation();

  const techItems = tech.split(", ") ?? [];

  const specs = [
    { label: t.common.jobs.meta.position, value: position },
    { label: t.common.jobs.meta.period, value: period },
    ...(techItems.length > 0
      ? [
          {
            label: t.common.jobs.meta.tech,
            value: (
              <div className="Job__tags">
                {techItems.map(item => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
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
