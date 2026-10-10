interface Props {
  punched?: boolean;
  children: React.ReactNode;
}

export default function Sheet({ punched = false, children }: Props) {
  // The shadow sits on a wrapper: the punched sheet's mask would clip a shadow of its own
  return (
    <div className="Sheet__shadow">
      <div className={punched ? "Sheet Sheet--punched" : "Sheet"}>{children}</div>
    </div>
  );
}
