import { useTranslation } from "@/i18n";
import GlitchEffect from "../../components/GlitchEffect";

export default function LookingForJob() {
  const { t } = useTranslation();

  return (
    <div className="LookingForJob">
      <GlitchEffect intensity="medium" scanlines>
        <h1>{t.index.jobs.lookingForJob.title}</h1>
      </GlitchEffect>
    </div>
  );
}
