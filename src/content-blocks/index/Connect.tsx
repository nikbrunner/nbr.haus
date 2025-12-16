import Link from "../../components/Link";
import SpecCard from "../../components/SpecCard";
import SpecList from "../../components/SpecList";
import { useTranslation } from "@/i18n";

export default function Connect() {
  const { t } = useTranslation();

  const items = [
    {
      label: t.index.connect.github,
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
      label: t.index.connect.linkedin,
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
      label: t.index.connect.cv,
      value: (
        <Link href="/Nikolaus_Brunner_CV.pdf" download className="Connect__link">
          {t.index.connect.downloadPdf}
        </Link>
      )
    },
    {
      label: t.index.connect.email,
      value: <Link href="mailto:nik@nbr.haus">nik@nbr.haus</Link>
    }
  ];

  return (
    <SpecCard title={t.index.connect.title}>
      <SpecList items={items} />
    </SpecCard>
  );
}
