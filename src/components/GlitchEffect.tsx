import { useMemo } from "react";

import { useHydrated } from "@tanstack/react-router";
import { cx } from "class-variance-authority";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Enable scanline overlay effect */
  scanlines?: boolean;
  /** Disable the effect entirely */
  disabled?: boolean;
}

export default function GlitchEffect({
  children,
  className,
  scanlines = false,
  disabled = false
}: Props) {
  const hydrated = useHydrated();

  // Generate random delays only client-side after hydration to avoid mismatch
  const delays = useMemo(
    () =>
      hydrated
        ? {
            base: Math.random() * 3, // 0-3s offset for main animation cycle
            before: Math.random() * 0.5, // Slight offset for ::before pseudo-element
            after: Math.random() * 0.5 // Slight offset for ::after pseudo-element
          }
        : { base: 0, before: 0, after: 0 },
    [hydrated]
  );

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <span
      className={cx(
        "GlitchEffect",
        scanlines && "GlitchEffect--scanlines",
        className
      )}
      style={
        {
          "--glitch-delay": `${delays.base}s`,
          "--glitch-delay-before": `${delays.before}s`,
          "--glitch-delay-after": `${delays.after}s`
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
