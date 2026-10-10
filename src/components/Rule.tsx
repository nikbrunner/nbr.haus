interface Props {
  dashed?: boolean;
}

export default function Rule({ dashed = false }: Props) {
  return <hr className={dashed ? "Rule Rule--dashed" : "Rule"} />;
}
