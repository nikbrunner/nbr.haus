import Highlight from "@/components/Highlight";
import { useTranslation } from "@/i18n";

export default function About() {
  const { t } = useTranslation();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="About">
      <p>
        {t.index.about.greeting}
        <br />
        <br />
        {t.index.about.introStart} <Highlight>{t.index.about.name}</Highlight>{" "}
        {t.index.about.introEnd.replace("{years}", String(experienceInYears))}
      </p>

      <p>{t.index.about.ux}</p>

      <p>{t.index.about.independence}</p>

      <p>{t.index.about.passion}</p>

      <p>{t.index.about.personal}</p>
    </div>
  );
}
