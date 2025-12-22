import Job from "@/components/Job";
import LookingForJob from "./LookingForJob";
import { useTexts } from "@/i18n";
import { tech } from "@/config";
import { ClientOnly } from "@tanstack/react-router";
import { texts as en } from "./Jobs.en";
import { texts as de } from "./Jobs.de";

export default function Jobs() {
  const t = useTexts({ en, de });

  return (
    <>
      <ClientOnly>
        <LookingForJob />
      </ClientOnly>

      <Job
        company={t.dealerCenter.company}
        position={t.dealerCenter.position}
        period={t.dealerCenter.period}
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
        <p>{t.dealerCenter.p1}</p>
        <p>{t.dealerCenter.p2}</p>
        <p>{t.dealerCenter.p3}</p>
        <p>{t.dealerCenter.p4}</p>
        <p>{t.dealerCenter.p5}</p>
      </Job>

      <Job
        company={t.divaE.company}
        position={t.divaE.position}
        period={t.divaE.period}
        tech={[tech.react, tech.typescript, tech.scss, tech.nodejs]}
      >
        <p>{t.divaE.description}</p>
      </Job>

      <Job
        company={t.campudus.company}
        position={t.campudus.position}
        period={t.campudus.period}
        tech={[tech.react, tech.nodejs]}
      >
        <p>{t.campudus.description}</p>
      </Job>
    </>
  );
}
