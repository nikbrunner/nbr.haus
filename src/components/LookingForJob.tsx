import { cx } from "class-variance-authority";

import Button from "@/components/Button";
import CopyButton from "@/components/CopyButton";
import GlitchEffect from "@/components/GlitchEffect";
import Hint from "@/components/Hint";
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
      <GlitchEffect scanlines>
        <h1>
          <Trans>{title}</Trans>
        </h1>
      </GlitchEffect>
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
