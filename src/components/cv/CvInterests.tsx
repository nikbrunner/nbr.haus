interface Props {
  interests: string;
}

export function CvInterests(props: Props) {
  return <p className="CvInterests">{props.interests}</p>;
}
