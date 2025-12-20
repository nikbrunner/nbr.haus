import { cva, cx, type VariantProps } from "class-variance-authority";
import "./GlitchEffect.css";

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
    >
      {children}
    </span>
  );
}
