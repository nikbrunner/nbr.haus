import Link from "./Link";
import SpecCard from "./SpecCard";
import SpecList from "./SpecList";

interface Props {
  title: string;
  items: {
    github: { label: string; url: string; display: string };
    linkedin: { label: string; url: string; display: string };
    cv: { label: string; url: string; display: string };
    email: { label: string; url: string; display: string };
    languages: { label: string; value: string };
  };
}

export default function Connect({ title, items }: Props) {
  const specItems = [
    {
      label: items.github.label,
      value: (
        <Link
          href={items.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="Connect__link"
        >
          {items.github.display}
        </Link>
      )
    },
    {
      label: items.linkedin.label,
      value: (
        <Link
          href={items.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="Connect__link"
        >
          {items.linkedin.display}
        </Link>
      )
    },
    {
      label: items.cv.label,
      value: (
        <Link href={items.cv.url} download className="Connect__link">
          {items.cv.display}
        </Link>
      )
    },
    {
      label: items.email.label,
      value: <Link href={items.email.url}>{items.email.display}</Link>
    },
    {
      label: items.languages.label,
      value: items.languages.value
    }
  ];

  return (
    <SpecCard title={title}>
      <SpecList items={specItems} padding="small" />
    </SpecCard>
  );
}
