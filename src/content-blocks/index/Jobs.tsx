import Job from "../../components/Job";
import LookingForJob from "./LookingForJob";
import { useTranslation } from "@/i18n";

export default function Jobs() {
  const { t } = useTranslation();

  return (
    <>
      <LookingForJob />

      <Job
        company={t.index.jobs.dealerCenter.company}
        position={t.index.jobs.dealerCenter.position}
        period={t.index.jobs.dealerCenter.period}
        tech={t.cv.jobs.dealerCenter.tech}
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
        tech={t.cv.jobs.divaE.tech}
      >
        <p>{t.index.jobs.divaE.description}</p>
      </Job>

      <Job
        company={t.index.jobs.campudus.company}
        position={t.index.jobs.campudus.position}
        period={t.index.jobs.campudus.period}
        tech={t.cv.jobs.campudus.tech}
      >
        <p>{t.index.jobs.campudus.description}</p>
      </Job>
    </>
  );
}
