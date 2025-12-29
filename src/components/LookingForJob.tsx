import CopyButton from "@/components/CopyButton";
import GlitchEffect from "@/components/GlitchEffect";
import Highlight from "@/components/Highlight";
import { Trans } from "@/i18n/Trans";

interface Props {
  title: string;
  cta: string;
  copyEmailTooltip: string;
}

const EMAIL = "nik@nbr.haus";

export default function LookingForJob({ title, cta, copyEmailTooltip }: Props) {
  return (
    <div className="LookingForJob">
      <GlitchEffect scanlines>
        <h1>
          <Trans
            text={title}
            components={{
              highlight: children => <Highlight>{children}</Highlight>
            }}
          />
        </h1>
      </GlitchEffect>
      <div className="LookingForJob__actions">
        <a href={`mailto:${EMAIL}`} className="LookingForJob__cta">
          {cta}
        </a>
        <CopyButton value={EMAIL} tooltip={copyEmailTooltip} />
      </div>
    </div>
  );
}
