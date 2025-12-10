import Link from "../../components/Link";
import SpecCard from "../../components/SpecCard";
import SpecList from "../../components/SpecList";
import "./Connect.css";

export default function Connect() {
  const items = [
    {
      label: "GitHub:",
      value: (
        <Link
          href="https://www.github.com/nikbrunner"
          target="_blank"
          rel="noopener noreferrer"
          className="connect__link"
        >
          github.com/nikbrunner
        </Link>
      )
    },
    {
      label: "LinkedIn:",
      value: (
        <Link
          href="https://www.linkedin.com/in/nbru/"
          target="_blank"
          rel="noopener noreferrer"
          className="connect__link"
        >
          linkedin.com/in/nbru/
        </Link>
      )
    },
    {
      label: "CV:",
      value: (
        <Link href="/Nikolaus_Brunner_CV.pdf" download className="connect__link">
          Download PDF
        </Link>
      )
    },
    {
      label: "Email:",
      value: <Link href="mailto:nik@nbr.haus">nik@nbr.haus</Link>
    }
  ];

  return (
    <SpecCard title="Connect">
      <SpecList items={items} />
    </SpecCard>
  );
}
