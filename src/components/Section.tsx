interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  const id = title?.toLowerCase().replace(/\s+/g, "-");

  return (
    <section id={id} className="section">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
