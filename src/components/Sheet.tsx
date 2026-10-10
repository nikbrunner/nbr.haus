interface Props {
  punched?: boolean;
  children: React.ReactNode;
}

export default function Sheet({ punched = false, children }: Props) {
  return (
    <div className={punched ? "Sheet Sheet--punched" : "Sheet"}>{children}</div>
  );
}
