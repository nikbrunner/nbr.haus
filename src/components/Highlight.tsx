interface Props {
  children: React.ReactNode;
}

export default function Highlight({ children }: Props) {
  return <span className="Highlight">{children}</span>;
}
