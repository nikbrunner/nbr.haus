import { useMemo } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

const glitchVariants = cva("GlitchEffect", {
  variants: {
    intensity: {
      subtle: "GlitchEffect--subtle",
      medium: "GlitchEffect--medium",
      strong: "GlitchEffect--strong"
    }
  },
  defaultVariants: {
    intensity: "subtle"
  }
});

interface Props extends VariantProps<typeof glitchVariants> {
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
  intensity,
  scanlines = false,
  disabled = false
}: Props) {
  // Generate random delays once per instance for desynchronized animations
  const delays = useMemo(
    () => ({
      base: Math.random() * 3, // 0-3s offset for main animation cycle
      before: Math.random() * 0.5, // Slight offset for ::before pseudo-element
      after: Math.random() * 0.5 // Slight offset for ::after pseudo-element
    }),
    []
  );

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <span
      className={cx(
        glitchVariants({ intensity }),
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
