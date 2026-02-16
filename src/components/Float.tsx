import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Float({ children, className }: Props) {
  const style = useRef({
    // Random delay so each instance starts at different point in animation
    animationDelay: `${Math.random() * -6}s`,
    // Slight duration variation (5-7s) for more organic feel
    animationDuration: `${5 + Math.random() * 2}s`
  }).current;

  return (
    <div
      className={`Float ${className ?? ""}`}
      style={style}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
