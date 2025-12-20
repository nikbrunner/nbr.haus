import "./Tag.css";

interface Props {
  children: React.ReactNode;
}

export default function Tag({ children }: Props) {
  return <span className="Tag">{children}</span>;
}
