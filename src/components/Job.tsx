import "./Job.css";

interface Props {
  company: string;
  position: string;
  period: string;
  children: React.ReactNode;
}

export default function Job({ company, position, period, children }: Props) {
  return (
    <div className="job">
      <h3 className="job__company">{company}</h3>
      <div className="job__header">
        <div className="job__role">{position}</div>
        <div className="job__period">{period}</div>
      </div>
      {children}
    </div>
  );
}
