interface Props {
  figure: React.ReactNode;
  /** Lines set beside the figure on narrow screens, the first as its number */
  caption?: string[];
  children: React.ReactNode;
}

/** Content with a figure beside it; on narrow screens the figure comes first, its caption beside it */
export default function WithFigure({ figure, caption, children }: Props) {
  return (
    <div className="WithFigure">
      <div className="WithFigure__body">{children}</div>
      <div className="WithFigure__figure">{figure}</div>
      {caption && (
        <p className="WithFigure__caption">
          {caption.map(line => (
            <span key={line} className="WithFigure__caption-line">
              {line}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
