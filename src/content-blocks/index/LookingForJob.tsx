import { useTranslation } from "@/i18n";

export default function LookingForJob() {
  const { t } = useTranslation();

  return (
    <div className="LookingForJob">
      <h1>{t.index.jobs.lookingForJob.title}</h1>
    </div>
  );
}
