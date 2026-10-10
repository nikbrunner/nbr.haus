import { Children } from "react";

interface Props {
  children: React.ReactNode;
}

export default function InlineList({ children }: Props) {
  return (
    <ul className="InlineList">
      {Children.toArray(children).map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}
