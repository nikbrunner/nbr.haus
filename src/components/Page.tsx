import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

/**
 * Page component for controlling print page breaks.
 * Each Page starts on a new page when printed (except the first).
 */
export function Page({ children }: PageProps) {
  return <div className="Page">{children}</div>;
}
