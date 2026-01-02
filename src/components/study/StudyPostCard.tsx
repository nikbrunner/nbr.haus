import { Link } from "@tanstack/react-router";

import { Typo } from "@/components/Typo";
import type { StudyPostMeta as PostMeta } from "@/lib/study";

interface Props {
  post: PostMeta;
}

export function StudyPostCard({ post }: Props) {
  return (
    <article className="StudyPostCard">
      <Link
        to="/study/$slug"
        params={{ slug: post.slug }}
        className="StudyPostCard__link"
      >
        <Typo.H3>{post.frontmatter.title}</Typo.H3>
        <Typo.P color="support">{post.frontmatter.excerpt}</Typo.P>
        <Typo.Small color="minor">
          {post.frontmatter.publishedAt} · {post.readingTime} min read
        </Typo.Small>
      </Link>
    </article>
  );
}
