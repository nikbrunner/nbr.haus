import { cx } from "class-variance-authority";

import Button from "@/components/Button";
import CopyButton from "@/components/CopyButton";
import { Float } from "@/components/Float";
import GlitchEffect from "@/components/GlitchEffect";
import Hint from "@/components/Hint";
import { Typo } from "@/components/Typo";
import { Trans } from "@/i18n/Trans";

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
      <Float>
        <GlitchEffect scanlines>
          <Typo.H1>
            <Trans>{title}</Trans>
          </Typo.H1>
        </GlitchEffect>
      </Float>
      <div className="LookingForJob__actions">
        <Button variant="accent" size="large" asChild>
          <a href={`mailto:${email}`}>{cta}</a>
        </Button>
        <Hint title={copyEmailTooltip}>
          <CopyButton value={email} ariaLabel={copyEmailTooltip} />
        </Hint>
      </div>
    </div>
  );
}
