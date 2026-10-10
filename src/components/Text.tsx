interface Props {
  caps?: boolean;
  bold?: boolean;
  muted?: boolean;
  /** A block on its own line, one blank line below the previous block */
  spaced?: boolean;
  children: React.ReactNode;
}

export default function Text({
  caps = false,
  bold = false,
  muted = false,
  spaced = false,
  children
}: Props) {
  const className = [
    "Text",
    caps && "Text--caps",
    bold && "Text--bold",
    muted && "Text--muted",
    spaced && "Text--spaced"
  ]
    .filter(Boolean)
    .join(" ");

  return spaced ? (
    <p className={className}>{children}</p>
  ) : (
    <span className={className}>{children}</span>
  );
}
