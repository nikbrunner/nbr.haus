interface Props {
  figure: React.ReactNode;
  children: React.ReactNode;
}

/** Content with a figure beside it; on narrow screens the figure comes first */
export default function WithFigure({ figure, children }: Props) {
  return (
    <div className="WithFigure">
      <div className="WithFigure__body">{children}</div>
      <div className="WithFigure__figure">{figure}</div>
    </div>
  );
}
