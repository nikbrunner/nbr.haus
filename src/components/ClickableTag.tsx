import Link from "./Link";

import "./ClickableTag.css";

interface Props {
  name: string;
  url: string;
  color: string;
}

export default function ClickableTag({ name, url, color }: Props) {
  return (
    <Link
      className="ClickableTag"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--tag-color": color } as React.CSSProperties}
    >
      {name}
    </Link>
  );
}
