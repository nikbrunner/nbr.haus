interface Props {
  /** An alpha mask: opaque where the drawing is, transparent where the paper shows */
  mask: string;
  label: string;
}

/**
 * A drawing printed in ink: the mask decides where the ink shows. On light paper that is the
 * page's own ink; on dark paper the drawing sits on a light print, since light ink would turn it
 * into a negative
 */
export default function Portrait({ mask, label }: Props) {
  return (
    <div className="Portrait" role="img" aria-label={label}>
      <div
        className="Portrait__drawing"
        style={{ "--portrait-mask": `url(${mask})` } as React.CSSProperties}
      />
    </div>
  );
}
