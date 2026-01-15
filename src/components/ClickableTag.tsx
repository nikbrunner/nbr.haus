import { Float } from "@/components/Float";

interface Props {
  name: string;
  url: string;
  color: string;
}

export default function ClickableTag({ name, url, color }: Props) {
  return (
    <Float>
      <a
        className="ClickableTag"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ "--tag-color": color } as React.CSSProperties}
      >
        {name}
      </a>
    </Float>
  );
}
