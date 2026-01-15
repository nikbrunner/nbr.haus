import { useMemo } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Float({ children, className }: Props) {
  const style = useMemo(() => {
    // Random delay so each instance starts at different point in animation
    const delay = Math.random() * -6;
    // Slight duration variation (5-7s) for more organic feel
    const duration = 5 + Math.random() * 2;

    return {
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    };
  }, []);

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
