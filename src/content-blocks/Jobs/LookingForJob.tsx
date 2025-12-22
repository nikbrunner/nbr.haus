import { useTexts } from "@/i18n";
import GlitchEffect from "@/components/GlitchEffect";
import { texts as en } from "./Jobs.en";
import { texts as de } from "./Jobs.de";
import "./LookingForJob.css";

export default function LookingForJob() {
  const t = useTexts({ en, de });

  return (
    <div className="LookingForJob">
      <GlitchEffect intensity="medium" scanlines>
        <h1>{t.lookingForJob.title}</h1>
      </GlitchEffect>
    </div>
  );
}
