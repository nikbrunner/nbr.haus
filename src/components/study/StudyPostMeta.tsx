import { Typo } from "@/components/Typo";

interface Props {
  publishedAt: string;
  readingTime: number;
  minReadText: string;
  tags?: string[];
}

export function StudyPostMeta({
  publishedAt,
  readingTime,
  minReadText,
  tags
}: Props) {
  return (
    <div className="StudyPostMeta">
      <Typo.Small color="minor">
        {publishedAt} · {readingTime} {minReadText}
      </Typo.Small>
      {tags && tags.length > 0 && (
        <div className="StudyPostMeta__tags">
          {tags.map(tag => (
            <span key={tag} className="StudyPostMeta__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
