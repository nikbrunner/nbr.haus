interface Props {
  /** Numbers each h2 with this prefix and a counter, e.g. "01" gives 01.1, 01.2 */
  numberPrefix?: string;
  children: React.ReactNode;
}

export default function Prose({ numberPrefix, children }: Props) {
  if (numberPrefix === undefined) return <div className="Prose">{children}</div>;

  return (
    <div
      className="Prose Prose--numbered"
      style={
        { "--prose-number-prefix": `"${numberPrefix}."` } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
