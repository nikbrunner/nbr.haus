import Job from "../../components/Job";
import LookingForJob from "./LookingForJob";
import { useTranslation } from "@/i18n";
import { tech } from "@/config";

export default function Jobs() {
  const { t } = useTranslation();

  return (
    <>
      <LookingForJob />

      <Job
        company={t.index.jobs.dealerCenter.company}
        position={t.index.jobs.dealerCenter.position}
        period={t.index.jobs.dealerCenter.period}
        tech={[
          tech.react,
          tech.typescript,
          tech.scss,
          tech.tanstackStart,
          tech.tanstackRouter,
          tech.tanstackQuery,
          tech.tanstackForm,
          tech.redux,
          tech.graphql,
          tech.tailwind,
          tech.electron,
          tech.nodejs
        ]}
      >
        <p>{t.index.jobs.dealerCenter.p1}</p>
        <p>{t.index.jobs.dealerCenter.p2}</p>
        <p>{t.index.jobs.dealerCenter.p3}</p>
        <p>{t.index.jobs.dealerCenter.p4}</p>
        <p>{t.index.jobs.dealerCenter.p5}</p>
      </Job>

      <Job
        company={t.index.jobs.divaE.company}
        position={t.index.jobs.divaE.position}
        period={t.index.jobs.divaE.period}
        tech={[tech.react, tech.typescript, tech.scss, tech.nodejs]}
      >
        <p>{t.index.jobs.divaE.description}</p>
      </Job>

      <Job
        company={t.index.jobs.campudus.company}
        position={t.index.jobs.campudus.position}
        period={t.index.jobs.campudus.period}
        tech={[tech.react, tech.nodejs]}
      >
        <p>{t.index.jobs.campudus.description}</p>
      </Job>
    </>
  );
}
