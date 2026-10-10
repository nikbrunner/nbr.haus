interface Props {
  id?: string;
  aside: React.ReactNode;
  children: React.ReactNode;
}

export default function Entry({ id, aside, children }: Props) {
  return (
    <div className="Entry" id={id}>
      <div className="Entry__aside">{aside}</div>
      <div className="Entry__body">{children}</div>
    </div>
  );
}
