import CopyButton from "@/components/CopyButton";
import GlitchEffect from "@/components/GlitchEffect";
import Highlight from "@/components/Highlight";
import Hint from "@/components/Hint";
import { Trans } from "@/i18n/Trans";
import { cx } from "class-variance-authority";

interface Props {
  title: string;
  cta: string;
  email: string;
  copyEmailTooltip: string;
  className?: string;
}

export default function LookingForJob({
  title,
  cta,
  copyEmailTooltip,
  email,
  className
}: Props) {
  return (
    <div className={cx("LookingForJob", className)}>
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
        <a href={`mailto:${email}`} className="LookingForJob__cta">
          {cta}
        </a>
        <Hint title={copyEmailTooltip}>
          <CopyButton value={email} ariaLabel={copyEmailTooltip} size={24} />
        </Hint>
      </div>
    </div>
  );
}
