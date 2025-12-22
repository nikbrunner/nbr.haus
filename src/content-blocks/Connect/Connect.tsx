import Link from "@/components/Link";
import SpecCard from "@/components/SpecCard";
import SpecList from "@/components/SpecList";
import { useTexts } from "@/i18n";
import { texts as en } from "./Connect.en";
import { texts as de } from "./Connect.de";
import "./Connect.css";

export default function Connect() {
  const t = useTexts({ en, de });

  const items = [
    {
      label: t.github,
      value: (
        <Link
          href="https://www.github.com/nikbrunner"
          target="_blank"
          rel="noopener noreferrer"
          className="Connect__link"
        >
          github.com/nikbrunner
        </Link>
      )
    },
    {
      label: t.linkedin,
      value: (
        <Link
          href="https://www.linkedin.com/in/nbru/"
          target="_blank"
          rel="noopener noreferrer"
          className="Connect__link"
        >
          linkedin.com/in/nbru/
        </Link>
      )
    },
    {
      label: t.cv,
      value: (
        <Link href="/Nikolaus_Brunner_CV.pdf" download className="Connect__link">
          {t.downloadPdf}
        </Link>
      )
    },
    {
      label: t.email,
      value: <Link href="mailto:nik@nbr.haus">nik@nbr.haus</Link>
    },
    {
      label: t.languages,
      value: t.languagesList
    }
  ];

  return (
    <SpecCard title={t.title}>
      <SpecList items={items} padding="small" />
    </SpecCard>
  );
}
