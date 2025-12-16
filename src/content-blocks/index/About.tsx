import Highlight from "@/components/Highlight";
import { useTranslation, Trans } from "@/i18n";

export default function About() {
  const { t } = useTranslation();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="About">
      <p>
        {t.index.about.greeting}
        <br />
        <br />
        <Trans
          text={t.index.about.intro.replace("{years}", String(experienceInYears))}
          components={{
            highlight: children => <Highlight>{children}</Highlight>
          }}
        />
      </p>

      <p>{t.index.about.ux}</p>

      <p>{t.index.about.independence}</p>

      <p>{t.index.about.passion}</p>

      <p>{t.index.about.personal}</p>
    </div>
  );
}
