interface SkillCategory {
  label: string;
  items: string;
}

interface Props {
  categories: SkillCategory[];
}

export function CvSkills(props: Props) {
  return (
    <div className="CvSkills">
      {props.categories.map(category => (
        <p key={category.label}>
          <strong>{category.label}:</strong> {category.items}
        </p>
      ))}
    </div>
  );
}
