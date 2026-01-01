import ClickableTag from "@/components/ClickableTag";
import SpecList from "@/components/SpecList";
import { Typo } from "@/components/Typo";
import type { Tech } from "@/config";
import { useTexts } from "@/i18n/useTexts";

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
      <Typo.H3 className="Job__company">{company}</Typo.H3>
      <SpecList items={specs} />
      {children}
    </div>
  );
}
