interface Props {
  children: React.ReactNode;
}

export default function Note({ children }: Props) {
  return <div className="Note">{children}</div>;
}
