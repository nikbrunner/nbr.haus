interface Props {
  company: string;
  position: string;
  period: string;
  children: React.ReactNode;
}

export default function Job({ company, position, period, children }: Props) {
  return (
    <div className="Job">
      <h3 className="Job__company">{company}</h3>
      <div className="Job__header">
        <div className="Job__role">{position}</div>
        <div className="Job__period">{period}</div>
      </div>
      {children}
    </div>
  );
}
