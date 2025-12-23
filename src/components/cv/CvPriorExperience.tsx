interface Props {
  title: string;
  description: string;
  educationLabel: string;
  education: string;
}

export function CvPriorExperience(props: Props) {
  return (
    <div className="CvPriorExperience">
      <p className="CvPriorExperience__text">
        <strong>{props.title}</strong> {props.description}
      </p>
      <p className="CvPriorExperience__education">
        <strong>{props.educationLabel}:</strong> {props.education}
      </p>
    </div>
  );
}
